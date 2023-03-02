import {
  FIND_MISSED_TICKETS,
  GET_ALL_TICKETS,
  GET_AVAILABLE_TICKETS,
  GET_COMPLETED_TICKETS,
  GET_TICKETS_BY_PROJECT_ID,
} from "../apollo/query";
import { client } from "../apollo/client";
import { useEffect, useState } from "react";
import { FILTER_TYPE, FilterType, Ticket } from "../type";
import TypeParseHelper from "../helper/type-parse-helper";
import {
  AllTicketsQuery,
  AvailableTicketsQuery,
  CategoryType,
  QuestPolicyType,
  RewardPolicyType,
  TicketStatusType,
} from "../__generated__/graphql";

export function useTicketsQuery(props: {
  projectId?: string;
  filterType: FilterType;
}) {
  const [ticketsData, setTicketsData] = useState<Ticket[]>([]);
  const [ticketsDataLoading, setTicketsDataLoading] = useState(false);
  const typeParseHelper = TypeParseHelper.getInstance();

  useEffect(() => {
    (async () => {
      setTicketsDataLoading(true);
      if (!props.projectId) {
        if (props.filterType === FILTER_TYPE.AVAILABLE) {
          const { data } = await client.query({ query: GET_AVAILABLE_TICKETS });
          updateSetTicketsData(data.availableTickets);
        } else if (props.filterType === FILTER_TYPE.COMPLETE) {
          const { data } = await client.query({ query: GET_COMPLETED_TICKETS });
          updateSetTicketsData(data.completedTickets);
        } else if (props.filterType === FILTER_TYPE.MISSED) {
          const { data } = await client.query({ query: FIND_MISSED_TICKETS });
          updateSetTicketsData(data.findMissedTickets);
        }
      } else {
        const status =
          props.filterType === FILTER_TYPE.AVAILABLE
            ? TicketStatusType.Available
            : FILTER_TYPE.MISSED
            ? TicketStatusType.Missed
            : TicketStatusType.Completed;
        const { data } = await client.query({
          query: GET_TICKETS_BY_PROJECT_ID,
          variables: {
            projectId: props.projectId,
            status: status,
          },
        });
        updateSetTicketsData(data.ticketsByProjectId);
      }
      setTicketsDataLoading(false);
    })();
  }, [props.filterType, props.projectId]);

  const updateSetTicketsData = (
    tickets: Array<{
      __typename?: "Ticket";
      _id?: string | null;
      completed?: boolean | null;
      description?: string | null;
      imageUrl?: string | null;
      title?: string | null;
      participants?: Array<{
        __typename?: "User";
        name?: string | null;
        profileImageUrl?: string | null;
      }> | null;
      quests?: Array<{
        __typename?: "Quest";
        _id?: string | null;
        title?: string | null;
        description?: string | null;
        questPolicy?: {
          __typename?: "QuestPolicy";
          context: string;
          questPolicy: QuestPolicyType;
        } | null;
      }> | null;
      project?: {
        __typename?: "Project";
        _id?: string | null;
        categories?: Array<CategoryType> | null;
        description?: string | null;
        imageUrl?: string | null;
        name: string;
        projectSocial?: {
          __typename?: "ProjectSocial";
          discordUrl?: string | null;
          officialUrl?: string | null;
          telegramUrl?: string | null;
          twitterUrl?: string | null;
        } | null;
      } | null;
      rewardPolicy?: {
        __typename?: "RewardPolicy";
        context: string;
        rewardPolicyType: RewardPolicyType;
      } | null;
      winners?: Array<{ __typename?: "User"; name?: string | null }> | null;
    }>
  ) => {
    setTicketsData((prevState) => {
      return tickets.map((e) => {
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
          project: {
            _id: e.project?._id ?? "",
            categories: e.project?.categories ?? [],
            description: e.project?.description ?? "",
            imageUrl: e.project?.imageUrl ?? "",
            name: e.project?.name ?? "",
            projectSocial: {
              discordUrl: e.project?.projectSocial?.discordUrl ?? "",
              officialUrl: e.project?.projectSocial?.officialUrl ?? "",
              telegramUrl: e.project?.projectSocial?.telegramUrl ?? "",
              twitterUrl: e.project?.projectSocial?.twitterUrl ?? "",
            },
          },
        };
      });
    });
  };

  return { ticketsData, ticketsDataLoading };
}
