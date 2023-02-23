import React, { ReactElement, useState } from "react";
import MainLayout from "../../layouts/main-layout";
import { AppProps } from "next/app";
import Head from "next/head";
import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useTicketsQuery } from "../../page-hook/tickets-query-hook";
import { useLoading } from "../../provider/loading/loading-provider";
import TicketsSection from "../../components/organisms/tickets-section";
import { MouseEventWithParam, TicketEventParam } from "../../type";
import GradientButton from "../../components/atoms/gradient-button";
// import { GetServerSideProps } from "next";

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
//
//   return {
//     props: {},
//   };
// };

const Explore = (props: AppProps) => {
  const { ticketsData, ticketsDataLoading } = useTicketsQuery();
  const [value, setValue] = useState("1");
  const { showLoading, closeLoading } = useLoading();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Explore</title>
      </Head>
      <Box
        style={{ flex: 1, background: "", paddingLeft: 24, paddingRight: 24 }}
      >
        <Stack direction={"column"} alignItems={""} sx={{ background: "" }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={1}
            sx={{ marginTop: "32px" }}
          >
            <Typography variant={"h4"}>Explore Events</Typography>
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
            sx={{
              marginTop: 4,
            }}
          ></TicketsSection>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 8,
            }}
          >
            <GradientButton size={"large"} sx={{ width: 156, height: 60 }}>
              Load more
            </GradientButton>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

Explore.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default Explore;
