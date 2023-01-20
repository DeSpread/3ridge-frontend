import { GET_TICKET_BY_ID } from "../apollo/query";
import { client } from "../apollo/client";
import { useEffect, useState } from "react";
import { Ticket } from "../type";
import TypeParseHelper from "../helper/type-parse-helper";

export function useTicketQuery({ id }: { id?: string }) {
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
            return { name: e.name };
          }),
          quests: quests?.map((e) => {
            return {
              title: e.title ?? undefined,
              description: e.description ?? undefined,
              questPolicy: {
                context: e.questPolicy?.context ?? undefined,
                questPolicy: e.questPolicy?.questPolicy ?? undefined,
              },
            };
          }),
          rewardPolicy: {
            context: _rewardPolicy, //rewardPolicy?.context ?? undefined,
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
