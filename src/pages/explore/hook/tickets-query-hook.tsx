import { GET_ALL_TICKETS } from "../../../apollo/query";
import { useQuery } from "@apollo/client";

const useTicketsQueryHook = () => {
  const { data: ticketData, loading: ticketDataLoading } =
    useQuery(GET_ALL_TICKETS);
  return { ticketData, ticketDataLoading };
};

export { useTicketsQueryHook };
