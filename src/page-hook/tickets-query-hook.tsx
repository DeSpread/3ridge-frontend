import { GET_ALL_TICKETS } from "../apollo/query";
import { client } from "../apollo/client";
import { useEffect, useState } from "react";
import { Ticket } from "../type";
import TypeParseHelper from "../helper/type-parse-helper";

export function useTicketsQuery() {
  const [ticketsData, setTicketsData] = useState<Ticket[]>([]);
  const [ticketsDataLoading, setTicketsDataLoading] = useState(false);
  const typeParseHelper = TypeParseHelper.getInstance();

  useEffect(() => {
    (async () => {
      setTicketsDataLoading(true);
      const { data } = await client.query({ query: GET_ALL_TICKETS });
      setTicketsData((prevState) => {
        return data.tickets.map((e) => {
          return {
            _id: e._id ?? undefined,
            title: e.title ?? undefined,
            description: e.description ?? undefined,
            completed: e.completed ?? undefined,
            participants: e.participants?.map((_e) => {
              return {
                name: _e.name ?? undefined,
                profileImageUrl: _e.profileImageUrl ?? undefined,
              };
            }),
            imageUrl: e.imageUrl ?? undefined,
            quests: e.quests?.map((_e) => {
              return {
                _id: _e._id ?? undefined,
                title: _e.title ?? undefined,
                description: _e.description ?? undefined,
                questPolicy: {
                  context: TypeParseHelper.getInstance().parseQuestPolicy(
                    _e.questPolicy?.context,
                    _e.questPolicy?.questPolicy
                  ),
                  questPolicy: _e.questPolicy?.questPolicy ?? undefined,
                },
                isComplete: false,
              };
            }),
            rewardPolicy: {
              context: typeParseHelper.parseRewardPolicy(
                e.rewardPolicy?.context ?? undefined,
                e.rewardPolicy?.rewardPolicyType ?? undefined
              ),
              rewardPolicyType: e.rewardPolicy?.rewardPolicyType ?? undefined,
            },
            winners: e.winners?.map((_e) => {
              return {
                name: _e.name ?? undefined,
              };
            }),
          };
        });
      });
      setTicketsDataLoading(false);
    })();
  }, []);

  return { ticketsData, ticketsDataLoading };
}
