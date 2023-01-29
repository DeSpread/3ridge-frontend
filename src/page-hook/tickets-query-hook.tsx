import { GET_ALL_TICKETS } from "../apollo/query";
import { useQuery } from "@apollo/client";

export function useTicketsQuery() {
  const { data: ticketsData, loading: ticketsDataLoading } =
    useQuery(GET_ALL_TICKETS);
  return { ticketsData, ticketsDataLoading };
}
