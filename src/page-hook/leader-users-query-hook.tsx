import {
  GET_TICKET_BY_ID,
  GET_USERS_ORDER_BY_REWARD_POINT_DESC,
  FIND_RANK_BY_USER_ID,
} from "../apollo/query";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { User } from "../type";
import { client } from "../apollo/client";
import { AppError } from "../error/my-error";

export function useLeaderUsersQuery() {
  const [leaderUsersData, setLeaderUsersData] = useState<User[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data: leaderUsersData } = await client.query({
          query: GET_USERS_ORDER_BY_REWARD_POINT_DESC,
          variables: {
            skip: 0,
            take: 100,
          },
        });

        setLeaderUsersData((prevState) => {
          return (
            leaderUsersData.usersOrderByRewardPointDesc.map((e) => {
              return {
                _id: e._id ?? undefined,
                walletAddress:
                  (e.wallets?.length ?? 0) > 0
                    ? e.wallets?.[0].address
                    : undefined,
                name: e.name ?? undefined,
                email: e.email ?? undefined,
                profileImageUrl: e.profileImageUrl ?? undefined,
                rewardPoint: e.rewardPoint ?? undefined,
              };
            }) ?? undefined
          );
        });
      } catch (e) {
        if (e instanceof Error) setError(e);
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { leaderUsersData, leaderUsersDataLoading: loading, error };
}
