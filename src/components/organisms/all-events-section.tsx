import { useRouter } from "next/router";
import { useLoading } from "../../provider/loading/loading-provider";
import React, { useState } from "react";
import {
  FILTER_TYPE,
  FilterType,
  MouseEventWithParam,
  TicketEventParam,
} from "../../type";
import { TicketSortType } from "../../__generated__/graphql";
import { useTicketsQuery } from "../../page-hook/tickets-query-hook";
import { Stack, Typography } from "@mui/material";
import TicketsSection from "./tickets-section";

const AllEventsSection = () => {
  const router = useRouter();
  const { showLoading, closeLoading } = useLoading();

  const [filterType, setFilterType] = useState<FilterType>(FILTER_TYPE.ALL);

  const [ticketSortType, setTicketSortType] = useState<TicketSortType>(
    TicketSortType.Trending
  );
  const { ticketsData, ticketsDataLoading } = useTicketsQuery({
    filterType,
    sort: ticketSortType,
  });

  return (
    <Stack direction={"column"} alignItems={""} sx={{ background: "" }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ marginTop: "32px" }}
      >
        <Stack direction={"row"} spacing={1}>
          <Typography variant={"h4"}>전체 이벤트</Typography>
        </Stack>
      </Stack>
      {ticketsData && (
        <TicketsSection
          tickets={ticketsData}
          loading={ticketsDataLoading}
          onTicketClick={async (e) => {
            showLoading();
            const myEvent = e as MouseEventWithParam<TicketEventParam>;
            const { ticket } = myEvent.params;
            await router.push(`/event/${ticket._id}`);
            closeLoading();
          }}
          sx={{
            marginTop: 4,
          }}
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
        ></TicketsSection>
      )}
    </Stack>
  );
};

export default AllEventsSection;
