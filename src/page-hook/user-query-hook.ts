import { useEffect, useState } from "react";
import { client } from "../apollo/client";
import { GET_USER_BY_EMAIL, GET_USER_BY_NAME } from "../apollo/query";
import { PartialTicket, REWARD_POLICY_TYPE, User } from "../type";
import TypeParseHelper from "../helper/type-parse-helper";
import { convertToSuppoertedNetwork } from "../util/type-convert";

export function useUserQuery(props: { name?: string }) {
  const [userData, setUserData] = useState<User>();
  const typeParseHelper = TypeParseHelper.getInstance();
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
        const {
          _id,
          wallets,
          name,
          email,
          profileImageUrl,
          rewardPoint,
          userSocial,
          participatingTickets,
        } = res.data.userByName;

        console.log(wallets);

        setUserData({
          _id: _id ?? undefined,
          walletAddressInfos: wallets?.map((e) => {
            return {
              address: e.address,
              network: convertToSuppoertedNetwork(e.chain),
            };
          }),
          name: name ?? undefined,
          email: email ?? undefined,
          profileImageUrl: profileImageUrl ?? undefined,
          rewardPoint: rewardPoint ?? undefined,
          userSocial: {
            twitterId: userSocial?.twitterId ?? "",
          },
          participatingTickets: participatingTickets?.map((e) => {
            return {
              _id: e._id ?? undefined,
              imageUrl: e.imageUrl ?? undefined,
              description: e.description ?? undefined,
              project: {
                _id: e.project?._id ?? undefined,
                description: e.project?.description ?? undefined,
                imageUrl: e.project?.imageUrl ?? undefined,
                name: e.project?.name ?? undefined,
              },
              rewardPolicy: {
                context: typeParseHelper.parseRewardPolicy(
                  e.rewardPolicy?.context ?? undefined,
                  e.rewardPolicy?.rewardPolicyType ?? undefined
                ),
                rewardPolicyType: e.rewardPolicy?.rewardPolicyType,
              },
              title: e.title ?? undefined,
              winners: e.winners?.map((e) => {
                return {
                  _id: e._id ?? undefined,
                  name: e.name ?? undefined
                }
              })
            };
          }),
        });
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [props.name]);

  return {
    userData,
    loading,
  };
}
