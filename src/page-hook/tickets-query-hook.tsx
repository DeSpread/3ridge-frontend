import { GET_ALL_TICKETS } from "../apollo/query";
import { useQuery } from "@apollo/client";

export function useTicketsQuery() {
  const { data: ticketData, loading: ticketDataLoading } =
    useQuery(GET_ALL_TICKETS);
  return { ticketData, ticketDataLoading };
}
