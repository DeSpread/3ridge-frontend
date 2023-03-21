import React, { ReactElement, useState } from "react";
import MainLayout from "../../layouts/main-layout";
import { AppProps } from "next/app";
import Head from "next/head";
import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useTicketsQuery } from "../../page-hook/tickets-query-hook";
import { useLoading } from "../../provider/loading/loading-provider";
import TicketsSection from "../../components/organisms/tickets-section";
import {
  FILTER_TYPE,
  FilterType,
  MouseEventWithParam,
  TicketEventParam,
} from "../../type";
import { TicketSortType } from "../../__generated__/graphql";

const Explore = (props: AppProps) => {
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
  const { showLoading, closeLoading } = useLoading();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>3ridge : Bridge to Web3</title>
      </Head>
      <Box
        style={{
          flex: 1,
          background: "",
          paddingLeft: 24,
          paddingRight: 24,
          paddingBottom: 48,
        }}
      >
        <Stack direction={"column"} alignItems={""} sx={{ background: "" }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={1}
            sx={{ marginTop: "32px" }}
          >
            <Typography variant={"h4"}>Explore</Typography>
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
      </Box>
    </>
  );
};

Explore.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default Explore;
