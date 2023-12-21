"use client";
import { FetchPolicy } from "@apollo/client/core/watchQueryOptions";
import { useEffect, useState } from "react";

import {
  CategoryType,
  ContentEncodingType,
  ContentFormatType,
  EventType,
  QuestPolicyType,
  RewardPolicyType,
  TicketSortType,
  TicketStatusType,
} from "../__generated__/graphql";
import TypeParseHelper from "../helper/type-parse-helper";
import { client } from "../lib/apollo/client";
import { GET_TICKETS, GET_TICKETS_BY_PROJECT_ID } from "../lib/apollo/query";
import { FILTER_TYPE, FilterType, Ticket } from "../types";

export function useTicketsQuery(props: {
  projectId?: string;
  filterType?: FilterType;
  sort?: TicketSortType;
  eventTypes?: EventType[];
  fetchPolicy?: FetchPolicy;
  ticketIsVisibleOnly?: boolean;
}) {
  const [ticketsData, setTicketsData] = useState<Ticket[]>([]);
  const [ticketsDataLoading, setTicketsDataLoading] = useState(true);
  const { fetchPolicy, ticketIsVisibleOnly } = props;

  useEffect(() => {
    (async () => {
      await asyncRefreshTicketsData(fetchPolicy ? fetchPolicy : "cache-first");
    })();
  }, [props.filterType, props.projectId, props.sort]);

  const asyncRefreshTicketsData = async (
    fetchPolicy: FetchPolicy = "no-cache",
  ) => {
    if (!props.filterType || !props.sort) {
      return;
    }

    setTicketsDataLoading(true);

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
          eventTypes: props.eventTypes,
          isVisibleOnly: ticketIsVisibleOnly,
        },
        fetchPolicy: fetchPolicy,
      });
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
          eventTypes: props.eventTypes,
          isVisibleOnly: ticketIsVisibleOnly,
        },
        fetchPolicy: fetchPolicy,
      });
      // console.log(data.ticketsByProjectId);
      updateSetTicketsData(data.ticketsByProjectId);
    }
    setTicketsDataLoading(false);
  };

  const updateSetTicketsData = (
    tickets: Array<{
      __typename?: "Ticket";
      _id?: string | null;
      beginTime?: any | null;
      untilTime?: any | null;
      completed?: boolean | null;
      description?: string | null;
      description_v2?: {
        __typename?: "ContentMetadata";
        contentFormatType: ContentFormatType;
        contentEncodingType: ContentEncodingType;
        content: string;
      } | null;
      shortDescription?: string | null;
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
        title_v2?: {
          __typename?: "ContentMetadata";
          contentFormatType: ContentFormatType;
          contentEncodingType: ContentEncodingType;
          content: string;
        } | null;
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
          mediumUrl?: string | null;
          naverBlogUrl?: string | null;
          kakaoUrl?: string | null;
        } | null;
      } | null;
      rewardPolicy?: {
        __typename?: "RewardPolicy";
        context: string;
        rewardPoint: number;
        rewardPolicyType: RewardPolicyType;
      } | null;
      winners?: Array<{ __typename?: "User"; name?: string | null }> | null;
      visible?: boolean | null;
    }>,
  ) => {
    setTicketsData((prevState) => {
      return tickets.map((e) => {
        return {
          _id: e._id ?? undefined,
          beginTime: e.beginTime ?? undefined,
          untilTime: e.untilTime ?? undefined,
          title: e.title ?? undefined,
          description: e.description ?? undefined,
          description_v2: e.description_v2 ?? undefined,
          shortDescription: e.shortDescription ?? undefined,
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
              title_v2: _e.title_v2 ?? undefined,
              description: _e.description ?? undefined,
              questPolicy: {
                context: TypeParseHelper.parseQuestPolicy(
                  _e.questPolicy?.context,
                  _e.questPolicy?.questPolicy,
                ),
                questPolicy: _e.questPolicy?.questPolicy ?? undefined,
              },
              isComplete: false,
            };
          }),
          rewardPolicy: {
            context: TypeParseHelper.parseRewardPolicy(
              e.rewardPolicy?.context ?? undefined,
              e.rewardPolicy?.rewardPolicyType ?? undefined,
            ),
            rewardPoint: e.rewardPolicy?.rewardPoint ?? undefined,
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
              mediumUrl: e.project?.projectSocial?.mediumUrl ?? "",
              naverBlogUrl: e.project?.projectSocial?.naverBlogUrl ?? "",
              kakaoUrl: e.project?.projectSocial?.kakaoUrl ?? "",
            },
          },
          visible: e.visible,
        };
      });
    });
  };

  return { ticketsData, ticketsDataLoading, asyncRefreshTicketsData };
}
