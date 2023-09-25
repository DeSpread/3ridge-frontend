import { useQuery } from "react-query";

import { APP_ERROR_MESSAGE, AppError } from "../error/my-error";

// FIXME: remove this eslint-disable after check discord-oauth2 types
// eslint-disable-next-line @typescript-eslint/no-var-requires
const DiscordOauth2 = require("discord-oauth2");

const oauth = new DiscordOauth2();

export default function useDiscordAuth(props: { code?: string }) {
  const asyncGenerateToken = async (code: string) => {
    const originUrl = window.location.origin;
    const response = await oauth.tokenRequest({
      clientId: process.env["NEXT_PUBLIC_DISCORD_CLIENT_ID"],
      clientSecret: process.env["NEXT_PUBLIC_DISCORD_CLIENT_SECRET"],
      code,
      scope: "identify",
      grantType: "authorization_code",

      redirectUri: `${originUrl}/discord`,
    });
    const { access_token, token_type } = response;
    return { access_token, token_type };
  };

  const asyncGetUserInfo = async (code?: string) => {
    if (!code) return null;
    const { access_token, token_type } = await asyncGenerateToken(code);
    const response = await fetch("https://discord.com/api/users/@me", {
      headers: {
        authorization: `${token_type} ${access_token}`,
      },
    });
    if (!response.ok)
      throw new AppError(APP_ERROR_MESSAGE.FAIL_TO_FETCH_DISCORD_USER_INFO);
    return response.json();
  };

  const {
    data: userInfo,
    isLoading,
    error,
  } = useQuery(["code", props.code], () => asyncGetUserInfo(props.code));

  return { userInfo, error, isLoading };
}
