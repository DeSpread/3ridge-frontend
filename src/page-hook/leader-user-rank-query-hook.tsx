import { useEffect, useState } from "react";
import { User } from "../type";
import { client } from "../apollo/client";
import { FIND_RANK_BY_USER_ID } from "../apollo/query";

export function useLeaderUserRankQuery(userId?: string) {
  const [userRank, setUserRank] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    (async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const { data } = await client.query({
          query: FIND_RANK_BY_USER_ID,
          variables: {
            userId,
          },
        });
        console.log(data);
        // setLeaderUsersData((prevState) => {
        //   return (
        //     leaderUsersData.usersOrderByRewardPointDesc.map((e) => {
        //       return {
        //         _id: e._id ?? undefined,
        //         walletAddress:
        //           (e.wallets?.length ?? 0) > 0
        //             ? e.wallets?.[0].address
        //             : undefined,
        //         name: e.name ?? undefined,
        //         email: e.email ?? undefined,
        //         profileImageUrl: e.profileImageUrl ?? undefined,
        //         rewardPoint: e.rewardPoint ?? undefined,
        //       };
        //     }) ?? undefined
        //   );
        // });
      } catch (e) {
        if (e instanceof Error) setError(e);
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  return { userRank, loading, error };
}
