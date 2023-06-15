import { GET_TICKETS, GET_TICKETS_BY_PROJECT_ID } from "../lib/apollo/query";
import { client } from "../lib/apollo/client";
import { useEffect, useState } from "react";
import { FILTER_TYPE, FilterType, Ticket } from "../type";
import TypeParseHelper from "../helper/type-parse-helper";
import {
  CategoryType,
  QuestPolicyType,
  RewardPolicyType,
  TicketSortType,
  TicketStatusType,
} from "../__generated__/graphql";

const ticketIsVisibleOnly =
  (process.env["NEXT_PUBLIC_TICKET_VISIBLE"] ?? "false").toLowerCase() ===
  "true"
    ? true
    : false;

export function useTicketsQuery(props: {
  projectId?: string;
  filterType?: FilterType;
  sort?: TicketSortType;
}) {
  const [ticketsData, setTicketsData] = useState<Ticket[]>([]);
  const [ticketsDataLoading, setTicketsDataLoading] = useState(true);
  const typeParseHelper = TypeParseHelper.getInstance();

  useEffect(() => {
    (async () => {
      if (!props.filterType || !props.sort) {
        return;
      }

      setTicketsDataLoading(true);
      console.log(
        "useTicketsQuery",
        "sort",
        props.sort,
        "status",
        props.filterType,
        "projectId",
        props.projectId,
        ticketIsVisibleOnly
      );

      if (!props.projectId) {
        const status =
          props.filterType === FILTER_TYPE.AVAILABLE
            ? TicketStatusType.Available
            : props.filterType === FILTER_TYPE.MISSED
            ? TicketStatusType.Missed
            : props.filterType === FILTER_TYPE.COMPLETE
            ? TicketStatusType.Completed
            : TicketStatusType.All;
        const { data } = await client.query({
          query: GET_TICKETS,
          variables: {
            sort: props.sort,
            status,
            isVisibleOnly: ticketIsVisibleOnly,
          },
        });
        // console.log("bbb");
        // console.log(data.tickets);
        updateSetTicketsData(data.tickets);
      } else {
        const status =
          props.filterType === FILTER_TYPE.AVAILABLE
            ? TicketStatusType.Available
            : props.filterType === FILTER_TYPE.MISSED
            ? TicketStatusType.Missed
            : props.filterType === FILTER_TYPE.COMPLETE
            ? TicketStatusType.Completed
            : TicketStatusType.All;
        const { data } = await client.query({
          query: GET_TICKETS_BY_PROJECT_ID,
          variables: {
            projectId: props.projectId,
            sort: props.sort,
            status: status,
          },
        });
        console.log(data.ticketsByProjectId);
        updateSetTicketsData(data.ticketsByProjectId);
      }
      setTicketsDataLoading(false);
    })();
  }, [props.filterType, props.projectId, props.sort]);

  const updateSetTicketsData = (
    tickets: Array<{
      __typename?: "Ticket";
      _id?: string | null;
      beginTime?: any | null;
      untilTime?: any | null;
      completed?: boolean | null;
      description?: string | null;
      imageUrl?: string | null;
      title?: string | null;
      participants?: Array<{
        __typename?: "User";
        _id?: string | null;
        name?: string | null;
        profileImageUrl?: string | null;
      }> | null;
      participantCount?: number | null;
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
          beginTime: e.beginTime ?? undefined,
          untilTime: e.untilTime ?? undefined,
          title: e.title ?? undefined,
          description: e.description ?? undefined,
          completed: e.completed ?? undefined,
          participants: e.participants?.map((_e) => {
            return {
              _id: _e._id ?? undefined,
              name: _e.name ?? undefined,
              profileImageUrl: _e.profileImageUrl ?? undefined,
            };
          }),
          participantCount: e.participantCount ?? undefined,
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
