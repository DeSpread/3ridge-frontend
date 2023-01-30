import React, { ReactElement, SyntheticEvent, useState } from "react";
import MainLayout from "../../layouts/main-layout";
import { AppProps } from "next/app";
import Head from "next/head";
import { Box, Divider, Grid, Skeleton, Stack, Typography } from "@mui/material";
import StyledTabs from "../../components/atoms/styled/styled-tabs";
import StyledTab from "../../components/atoms/styled/styled-tab";
import { TabContext, TabPanel } from "@mui/lab";
import { useRouter } from "next/router";
import StyledChip from "../../components/atoms/styled/styled-chip";
import BoltIcon from "@mui/icons-material/Bolt";
import { useTicketsQuery } from "../../page-hook/tickets-query-hook";
import EventCollectionCard from "../../components/molecules/event-collection-card";
import { useLoading } from "../../provider/loading/loading-provider";
import TicketsSection from "../../components/organisms/tickets-section";
import { MouseEventWithParam, TicketEventParam } from "../../type";

export async function getStaticProps() {
  return { props: {} };
}

const Explore = (props: AppProps) => {
  const { ticketsData, ticketsDataLoading } = useTicketsQuery();
  const [value, setValue] = useState("1");
  const { showLoading, closeLoading } = useLoading();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Sakura</title>
      </Head>
      <div style={{ flex: 1, background: "" }}>
        <Stack
          direction={"column"}
          alignItems={"center"}
          sx={{ background: "" }}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={1}
            sx={{ marginTop: "32px" }}
          >
            <Typography variant={"h6"}>Explore</Typography>
            <StyledChip
              icon={<BoltIcon color={"secondary"}></BoltIcon>}
              label={
                <Typography variant={"body2"} color={"neutral.100"}>
                  Quests
                </Typography>
              }
            ></StyledChip>
            <Typography variant={"body2"} color={"neutral.600"}>
              Learn and explore the best of web3
            </Typography>
          </Stack>

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
          ></TicketsSection>
        </Stack>
      </div>
    </>
  );
};

Explore.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default Explore;
