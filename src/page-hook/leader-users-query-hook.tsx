import {
  GET_TICKET_BY_ID,
  GET_USERS_ORDER_BY_REWARD_POINT_DESC,
} from "../apollo/query";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { User } from "../type";
import { client } from "../apollo/client";

export function useLeaderUsersQuery() {
  const [leaderUsersData, setLeaderUsersData] = useState<User[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await client.query({
        query: GET_USERS_ORDER_BY_REWARD_POINT_DESC,
      });
      setLoading(true);
      setLeaderUsersData((prevState) => {
        return (
          data.usersOrderByRewardPointDesc.map((e) => {
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
      setLoading(false);
    })();
  }, []);

  const findUserRank = (userId?: string) => {
    if (!userId) return -1;
    if (leaderUsersData && leaderUsersData.length > 0) {
      const ids = leaderUsersData.map((e) => {
        return e._id;
      });
      return ids.indexOf(userId) + 1;
    }
    return -1;
  };

  return { leaderUsersData, leaderUsersDataLoading: loading, findUserRank };
}
