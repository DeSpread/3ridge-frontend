import { useQuery } from "@apollo/client";
import TypeHelper from "../../helper/type-helper";
import { GET_All_TICKETS } from "../../lib/apollo/query";
import { FilterType, FILTER_TYPE } from "../../types";
import {
  TicketSortType,
  EventType,
  TicketStatusType,
} from "../../__generated__/graphql";

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
  limit = 10,
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
    return TypeHelper.convertTicket(ticket);
  });

  const fetchMoreTickets = (size = 5) => {
    if (loading || !ticketsData || !ticketsData.length) return;

    fetchMore({
      variables: {
        filterType,
        sort,
        skip: ticketsData.length,
        limit: ticketsData.length + size,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          tickets: [...prev.tickets, ...fetchMoreResult.tickets],
        };
      },
    });
  };

  return { data: ticketsData, loading, fetchMore, fetchMoreTickets };
};
