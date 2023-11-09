import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { TicketSortType } from "../../__generated__/graphql";
import { useAllTicketsQuery } from "../../hooks/query/use-all-tickets";
import { useLoading } from "../../provider/loading/loading-provider";
import {
  FILTER_TYPE,
  FilterType,
  MouseEventWithParam,
  TicketEventParam,
} from "../../types";

import TicketsSection from "./tickets-section";


const AllEventsSection = () => {
  const router = useRouter();
  const { showLoading, closeLoading } = useLoading();

  const [isLastTicketData, setIsLastTicketData] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<FilterType>(FILTER_TYPE.ALL);
  const [ticketSortType, setTicketSortType] = useState<TicketSortType>(
    TicketSortType.Trending
  );

  const {
    data: ticketsData,
    loading: ticketsDataLoading,
    fetchMoreTickets,
  } = useAllTicketsQuery({
    filterType,
    sort: ticketSortType,
  });

  const handleListEnd = async () => {
    const result = await fetchMoreTickets();

    if (result?.data?.tickets.length === 0) {
      setIsLastTicketData(true);
    }
  };

  return (
    <Stack direction={"column"} alignItems={""} sx={{ background: "" }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ marginTop: "32px" }}
      >
        <Typography variant={"h4"}>전체 이벤트</Typography>
      </Stack>
      {ticketsData && (
        <TicketsSection
          tickets={ticketsData}
          loading={ticketsDataLoading}
          isLastTicketData={isLastTicketData}
          onTicketClick={async (e) => {
            showLoading();
            const myEvent = e as MouseEventWithParam<TicketEventParam>;
            const { ticket } = myEvent.params;
            await router.push(`/event/${ticket._id}`);
            closeLoading();
          }}
          onListEnd={handleListEnd}
          sx={{ marginTop: 4 }}
          onTabClick={async (e) => {
            const index = e;
            const filterType =
              index === 0
                ? FILTER_TYPE.ALL
                : index === 1
                ? FILTER_TYPE.AVAILABLE
                : index === 2
                ? FILTER_TYPE.MISSED
                : FILTER_TYPE.COMPLETE;
            setFilterType(filterType);
          }}
          onTab2Click={async (e) => {
            const sortType =
              e === 0 ? TicketSortType.Trending : TicketSortType.Newest;
            setTicketSortType(sortType);
          }}
        />
      )}
    </Stack>
  );
};

export default AllEventsSection;
