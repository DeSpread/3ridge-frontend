import { useLazyQuery, useMutation } from "@apollo/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";

import {
  GetUserByAccessTokenDocument,
  SignInByEmailDocument,
} from "@/__generated__/graphql";
import TypeHelper from "@/helper/type-helper";
import { userDataState } from "@/lib/recoil";

export function useSignIn() {
  const setUserData = useSetRecoilState(userDataState);

  const accessToken = useRef<string>();
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [getUserByAccessToken] = useLazyQuery(GetUserByAccessTokenDocument);

  const [signInByEmailMutation] = useMutation(SignInByEmailDocument);

  const updateUserDataByAccessToken = useCallback(
    async (token: string) => {
      const userRes = await getUserByAccessToken({
        variables: {
          token: token,
        },
      });

      const user = userRes.data?.userByAccessToken;

      if (user) {
        setIsSignedIn(true);
        setUserData({
          _id: user._id ?? undefined,
          email: user.email ?? undefined,
          name: user.name ?? undefined,
          profileImageUrl: user.profileImageUrl ?? undefined,
          walletAddressInfos: user.wallets?.map((e) => {
            return {
              address: e.address,
              network: TypeHelper.convertToSuppoertedNetwork(e.chain),
            };
          }),
          rewardPoint: user.rewardPoint ?? undefined,
          userSocial: {
            twitterId: user.userSocial?.twitterId ?? "",
            telegramUser: user.userSocial?.telegramUser
              ? {
                  authDate: user.userSocial?.telegramUser.authDate ?? 0,
                  firstName: user.userSocial?.telegramUser.firstName ?? "",
                  hash: user.userSocial?.telegramUser.hash ?? "",
                  id: user.userSocial?.telegramUser.id ?? 0,
                  photoUrl: user.userSocial?.telegramUser.photoUrl ?? "",
                  username: user.userSocial?.telegramUser.username ?? "",
                }
              : undefined,
          },
          kakao: user.kakao
            ? {
                id: user.kakao.id,
                connected_at: user.kakao.connected_at,
                properties: user.kakao
                  ? {
                      profile_image: user.kakao.properties?.profile_image ?? "",
                      thumbnail_image:
                        user.kakao.properties?.thumbnail_image ?? "",
                      nickname: user.kakao.properties?.nickname ?? "",
                    }
                  : undefined,
              }
            : undefined,
          discord: user.discord ?? undefined,
        });
      } else {
        setIsSignedIn(false);
        setUserData({});
      }
    },
    [getUserByAccessToken, setUserData],
  );

  useEffect(() => {
    accessToken.current = localStorage.getItem("accessToken") ?? undefined;
    if (accessToken.current) {
      updateUserDataByAccessToken(accessToken.current);
    }
  }, [updateUserDataByAccessToken]);

  return {
    isSignedIn,
    async signInByEmail(email: string, password: string) {
      return signInByEmailMutation({
        variables: {
          email,
          password,
        },
      }).then((res) => {
        const newAccessToken = res.data?.signInByEmail.accessToken;
        accessToken.current = newAccessToken ?? undefined;
        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          updateUserDataByAccessToken(newAccessToken);
        }
        return res;
      });
    },
    async logout() {
      localStorage.removeItem("accessToken");
      accessToken.current = undefined;
      setUserData({});
    },
  };
}
