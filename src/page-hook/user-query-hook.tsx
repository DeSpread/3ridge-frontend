import { useEffect, useState } from "react";
import { client } from "../lib/apollo/client";
import { GET_USER_BY_NAME } from "../lib/apollo/query";
import { FCFSRewardContext, User } from "../type";
import TypeParseHelper from "../helper/type-parse-helper";
import { convertToSuppoertedNetwork } from "../util/type-util";
import {
  CategoryType,
  ChainType,
  RewardPolicyType,
} from "../__generated__/graphql";

export function useUserQuery(props: { name?: string }) {
  const [userData, setUserData] = useState<User>();
  const [loading, setLoading] = useState(false);
  const typeParseHelper = TypeParseHelper.getInstance();

  useEffect(() => {
    (async () => {
      if (!props.name) {
        return;
      }
      try {
        setLoading(true);
        console.log("name", props.name);
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
    gmail?: string | null;
    rewardPoint?: number | null;
    participatingTickets?: Array<{
      __typename?: "Ticket";
      _id?: string | null;
      imageUrl?: string | null;
      description?: string | null;
      title?: string | null;
      project?: {
        __typename?: "Project";
        _id?: string | null;
        categories?: Array<CategoryType> | null;
        description?: string | null;
        imageUrl?: string | null;
        name: string;
      } | null;
      rewardPolicy?: {
        __typename?: "RewardPolicy";
        context: string;
        rewardPolicyType: RewardPolicyType;
      } | null;
      winners?: Array<{
        __typename?: "User";
        _id?: string | null;
        name?: string | null;
      }> | null;
      quests?: Array<{ __typename?: "Quest"; _id?: string | null }> | null;
    }> | null;
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
      participatingTickets,
      gmail,
    } = data;
    console.log("aaa", participatingTickets);
    setUserData((prevState) => {
      return {
        ...prevState,
        _id: _id ?? undefined,
        email: email ?? undefined,
        gmail: gmail ?? undefined,
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
        participatingTickets: participatingTickets?.map((e) => {
          return {
            _id: e._id ?? undefined,
            title: e.title ?? undefined,
            description: e.description ?? undefined,
            project: e.project
              ? {
                  _id: e.project?._id ?? undefined,
                  categories: e.project?.categories ?? undefined,
                  description: e.project?.description ?? undefined,
                  imageUrl: e.project?.imageUrl ?? undefined,
                  name: e.project.name,
                }
              : undefined,
            imageUrl: e.imageUrl ?? undefined,
            rewardPolicy: {
              context: typeParseHelper.parseRewardPolicy(
                e.rewardPolicy?.context ?? undefined,
                e.rewardPolicy?.rewardPolicyType ?? undefined
              ),
              rewardPolicyType: e.rewardPolicy?.rewardPolicyType ?? undefined,
            },
            quests: e.quests
              ? e.quests?.map((e) => {
                  return { _id: e._id ?? undefined };
                })
              : undefined,
            winners: e.winners?.map((_e) => {
              return {
                name: _e.name ?? undefined,
              };
            }),
          };
        }),
      };
    });
  };

  return {
    userData,
    loading,
  };
}
