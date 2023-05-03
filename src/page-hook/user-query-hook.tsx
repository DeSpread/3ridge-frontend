import { useEffect, useState } from "react";
import { client } from "../apollo/client";
import { GET_USER_BY_NAME } from "../apollo/query";
import { User } from "../type";
import TypeParseHelper from "../helper/type-parse-helper";
import { convertToSuppoertedNetwork } from "../util/type-util";
import { ChainType } from "../__generated__/graphql";

export function useUserQuery(props: { name?: string }) {
  const [userData, setUserData] = useState<User>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      if (!props.name) {
        return;
      }
      try {
        setLoading(true);
        const res = await client.query({
          query: GET_USER_BY_NAME,
          variables: {
            name: props.name,
          },
        });
        updateUserData(res.data.userByName);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [props.name]);

  const updateUserData = (data: {
    __typename?: "User";
    _id?: string | null;
    name?: string | null;
    profileImageUrl?: string | null;
    email?: string | null;
    rewardPoint?: number | null;
    wallets?: Array<{
      __typename?: "UserWallet";
      address: string;
      chain: ChainType;
    }> | null;
    userSocial?: {
      __typename?: "UserSocial";
      twitterId?: string | null;
      telegramUser?: {
        __typename?: "TelegramUser";
        authDate?: number | null;
        firstName?: string | null;
        hash?: string | null;
        id: number;
        photoUrl?: string | null;
        username: string;
      } | null;
    } | null;
  }) => {
    const {
      email,
      name,
      profileImageUrl,
      wallets,
      _id,
      rewardPoint,
      userSocial,
    } = data;
    setUserData((prevState) => {
      return {
        ...prevState,
        _id: _id ?? undefined,
        email: email ?? undefined,
        name: name ?? undefined,
        profileImageUrl: profileImageUrl ?? undefined,
        walletAddressInfos: wallets?.map((e) => {
          return {
            address: e.address,
            network: convertToSuppoertedNetwork(e.chain),
          };
        }),
        rewardPoint: rewardPoint ?? undefined,
        userSocial: {
          twitterId: userSocial?.twitterId ?? "",
          telegramUser: userSocial?.telegramUser
            ? {
                authDate: userSocial?.telegramUser.authDate ?? 0,
                firstName: userSocial?.telegramUser.firstName ?? "",
                hash: userSocial?.telegramUser.hash ?? "",
                id: userSocial?.telegramUser.id ?? 0,
                photoUrl: userSocial?.telegramUser.photoUrl ?? "",
                username: userSocial?.telegramUser.username ?? "",
              }
            : undefined,
        },
      };
    });
  };

  return {
    userData,
    loading,
  };
}
