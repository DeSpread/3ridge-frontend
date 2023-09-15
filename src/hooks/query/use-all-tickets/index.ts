import { useQuery } from "@apollo/client";
import { FilterType, FILTER_TYPE } from "../../../types";
import {
  EventType,
  TicketSortType,
  TicketStatusType,
} from "../../../__generated__/graphql";
import { convertTicketData } from "./helper";
import { GET_All_TICKETS } from "./query";

export interface AllTicketsQueryProps {
  // FIXME: filterType should be TicketStatusType
  filterType: FilterType;
  // filterType: TicketStatusType;
  sort: TicketSortType;
  // FIXME: eventType should not be optional
  eventTypes?: EventType[];
  projectId?: string;
  limit?: number;
  skip?: number;
}

// FIXME: filterType should be TicketStatusType
const FILTER_TYPE_TO_STATUS = {
  [FILTER_TYPE.ALL]: TicketStatusType.All,
  [FILTER_TYPE.AVAILABLE]: TicketStatusType.Available,
  [FILTER_TYPE.COMPLETE]: TicketStatusType.Completed,
  [FILTER_TYPE.MISSED]: TicketStatusType.Missed,
};

export const useAllTicketsQuery = ({
  filterType,
  sort,
  eventTypes,
  limit = 30,
  skip = 0,
}: AllTicketsQueryProps) => {
  const { data, loading, fetchMore, previousData } = useQuery(GET_All_TICKETS, {
    variables: {
      sort,
      status: FILTER_TYPE_TO_STATUS[filterType],
      eventTypes,
      isVisibleOnly: true,
      skip,
      limit,
    },
  });

  // TODO: after refactor component tree, remove this
  const cachedData = data ?? previousData;

  // convert data type
  const ticketsData = cachedData?.tickets.map((ticket) => {
    return convertTicketData(ticket);
  });

  return { data: ticketsData, loading, fetchMore };
};
