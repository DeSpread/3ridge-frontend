import { useEffect, useState } from "react";
import { User } from "../type";
import { client } from "../lib/apollo/client";
import { FIND_RANK_BY_USER_ID } from "../lib/apollo/query";

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
        setUserRank(data.findRankByUserId);
        setLoading(false);
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
