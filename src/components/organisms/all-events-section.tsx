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
import { Link, Stack, Typography } from "@mui/material";
import PrimaryButton from "../atoms/primary-button";
import TicketsSection from "./tickets-section";

const AllEventsSection = () => {
  const router = useRouter();
  const { showLoading, closeLoading } = useLoading();

  const [filterType, setFilterType] = useState<FilterType>(
    FILTER_TYPE.AVAILABLE
  );

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
        {/*<Stack direction={"row"} spacing={1}>*/}
        {/*  <Link*/}
        {/*    href="https://airtable.com/shrOt7v8B4WntvR1h"*/}
        {/*    color="inherit"*/}
        {/*    underline="hover"*/}
        {/*    target="_blank"*/}
        {/*    rel="noreferrer"*/}
        {/*  >*/}
        {/*    <PrimaryButton fullWidth={true}>이벤트 등록</PrimaryButton>*/}
        {/*  </Link>*/}
        {/*</Stack>*/}
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
                ? FILTER_TYPE.AVAILABLE
                : index === 1
                ? FILTER_TYPE.COMPLETE
                : FILTER_TYPE.MISSED;
            setFilterType(filterType);
          }}
          onTab2Click={async (e) => {
            const sortType =
              e === 0 ? TicketSortType.Trending : TicketSortType.Newest;
            setTicketSortType(sortType);
          }}
        ></TicketsSection>
      )}
      {/*<Box*/}
      {/*  sx={{*/}
      {/*    display: "flex",*/}
      {/*    alignItems: "center",*/}
      {/*    justifyContent: "center",*/}
      {/*    padding: 8,*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <GradientButton size={"large"} sx={{ width: 156, height: 60 }}>*/}
      {/*    Load more*/}
      {/*  </GradientButton>*/}
      {/*</Box>*/}
    </Stack>
  );
};

export default AllEventsSection;
