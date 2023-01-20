import { ReactElement, useEffect, useState } from "react";
import MainLayout from "../../layouts/main-layout";
import { AppProps } from "next/app";
import { useTheme } from "@mui/material/styles";
import Head from "next/head";
import { Avatar, Box, Chip, Grid, Stack, Typography } from "@mui/material";
import VerifyCard from "../../components/molecules/verify-card";
import { GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { useTicketQueryHook } from "./hook/ticket-query-hook";
import { format } from "date-fns";
import StyledChip from "../../components/atoms/styled/styled-chip";
import Image from "next/image";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

export const getStaticPaths: GetStaticPaths<{ id: string }> = (id) => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export async function getStaticProps() {
  return { props: {} };
}

const Event = (props: AppProps) => {
  const { ticketData } = useTicketQueryHook({
    id: "63bfd87b73405e8b13784612", //router.query.id,
  });

  return (
    <>
      <Head>
        <title>Event</title>
      </Head>
      <Grid
        container
        direction={"row"}
        justifyContent={"center"}
        spacing={5}
        sx={{ marginTop: 4, marginBottom: 12 }}
      >
        <Grid item>
          <Stack direction={"column"} spacing={8}>
            <Grid
              container
              spacing={2}
              direction={"row"}
              alignItems="center"
              // alignItems={""}
              sx={{ background: "", marginBottom: 2 }}
            >
              <Grid item>
                <Box sx={{ height: 128, width: 128, background: "" }}>
                  <img
                    style={{
                      width: 128,
                      height: 128,
                      borderRadius: 10,
                    }}
                    src={
                      "https://imgp.layer3cdn.com/ipfs/QmUnZrLc6F4u4VZyvHoxkerPe9ZvfBdEkx7BSW4naWWBe9"
                    }
                    // width={100}
                    // height={100}
                    // alt={""}
                  />
                </Box>
              </Grid>
              <Grid item>
                {/*<Typography sx={{ background: "red" }}>aaa</Typography>*/}
                {/*<Box sx={{ height: 128, width: 128, background: "blue" }} />*/}
                <Stack spacing={1} sx={{ marginBottom: 2 }}>
                  <Typography variant="h3">{ticketData?.title}</Typography>
                  <Stack direction={"row"} alignItems={"left"} spacing={1}>
                    {!ticketData?.completed && (
                      <StyledChip label={"Ongoing"}></StyledChip>
                    )}
                    {ticketData?.completed && (
                      <StyledChip label={"completed"}></StyledChip>
                    )}
                    {ticketData?.rewardPolicy?.context?.untilTime && (
                      <StyledChip
                        label={`Until ${format(
                          new Date(
                            ticketData?.rewardPolicy?.context?.untilTime
                          ),
                          "yyyy/MM/dd hh:mm"
                        )} (UTC+09:00)`}
                      ></StyledChip>
                    )}
                  </Stack>
                </Stack>
              </Grid>
            </Grid>

            <Stack direction={"column"} spacing={2}>
              <Typography variant={"h5"}>Description</Typography>
              <Box sx={{ maxWidth: 800 }}>
                <Typography
                  variant={"body1"}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "5",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {ticketData?.description}
                </Typography>
              </Box>
            </Stack>

            <Stack
              direction={"column"}
              alignItems={"left"}
              spacing={2}
              maxWidth={1200}
            >
              <Typography variant="h5">Quest</Typography>
              <Stack direction={"column"} spacing={4}>
                <VerifyCard
                  community={{
                    name: "1",
                  }}
                  title={"Hold any of the Layer3 NFTs?"}
                  summary={
                    "If you've hold any of the Layer3 NFTs, you're eligible for this Quest!"
                  }
                />
                <VerifyCard
                  community={{
                    name: "2",
                  }}
                  title={"Follow @zetablockchain on Twitter"}
                />
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        <Grid item>
          <Stack direction={"column"} spacing={10} sx={{ minWidth: 260 }}>
            <Stack direction={"column"} spacing={5}>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                sx={{ background: "" }}
              >
                <Typography variant="h5">Reward</Typography>
                <StyledChip
                  label={"FCFS"}
                  icon={<DirectionsRunIcon></DirectionsRunIcon>}
                ></StyledChip>
              </Stack>
              <Typography variant="body1">1000 USDT</Typography>
            </Stack>

            <Box>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Typography variant="h6">Participants</Typography>
                <Typography variant="h6">(22,712)</Typography>
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

Event.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default Event;
