import { GET_TICKET_BY_ID } from "../apollo/query";
import { client } from "../apollo/client";
import { useEffect, useState } from "react";
import { Ticket } from "../type";
import TypeParseHelper from "../helper/type-parse-helper";

export function useTicketQuery({
  userId,
  id,
}: {
  userId?: string;
  id?: string;
}) {
  const [ticketData, setTicketData] = useState<Ticket>({});
  const typeParseHelper = TypeParseHelper.getInstance();
  useEffect(() => {
    (async () => {
      if (!id) {
        return;
      }
      const { data } = await client.query({
        query: GET_TICKET_BY_ID,
        variables: {
          id,
        },
      });
      const {
        title,
        description,
        completed,
        participants,
        quests,
        rewardPolicy,
        winners,
      } = data.ticketById;
      const _rewardPolicy = typeParseHelper.parseRewardPolicy(
        rewardPolicy?.context ?? undefined,
        rewardPolicy?.rewardPolicyType ?? undefined
      );
      setTicketData((prevState) => {
        return {
          ...prevState,
          title: title ?? undefined,
          description: description ?? undefined,
          completed: completed ?? undefined,
          participants: participants?.map((e) => {
            return {
              name: e.name,
              profileImageUrl: e.profileImageUrl ?? undefined,
            };
          }),
          quests: quests?.map((e) => {
            console.log("aaa", userId);
            let isComplete = false;
            if (userId) {
              isComplete =
                e.completedUsers
                  ?.map((_e) => {
                    return _e._id;
                  })
                  .includes(userId) ?? false;
            }
            return {
              title: e.title ?? undefined,
              description: e.description ?? undefined,
              questPolicy: {
                context: TypeParseHelper.getInstance().parseQuestPolicy(
                  e.questPolicy?.context,
                  e.questPolicy?.questPolicy
                ),
                questPolicy: e.questPolicy?.questPolicy ?? undefined,
              },
              isComplete,
              completedUsers: e.completedUsers
                ? e.completedUsers.map((_e) => {
                    return {
                      _id: _e._id ?? undefined,
                      walletAddress:
                        _e.wallets && _e.wallets.length > 0
                          ? _e.wallets[0].address
                          : undefined,
                      name: _e.name ?? undefined,
                      email: _e.email ?? undefined,
                      profileImageUrl: _e.profileImageUrl ?? undefined,
                    };
                  })
                : undefined,
            };
          }),
          rewardPolicy: {
            context: _rewardPolicy,
            rewardPolicyType: rewardPolicy?.rewardPolicyType ?? undefined,
          },
          winners: winners?.map((e) => {
            return {
              name: e.name,
            };
          }),
        };
      });
    })();
  }, [id]);
  return { ticketData };
}
