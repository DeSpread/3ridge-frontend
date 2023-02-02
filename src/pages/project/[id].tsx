import { GetStaticPaths } from "next";
import React, { ReactElement, SyntheticEvent, useState } from "react";
import MainLayout from "../../layouts/main-layout";
import Head from "next/head";
import {
  Stack,
  Box,
  Typography,
  Avatar,
  Divider,
  Grid,
  IconButton,
  Skeleton,
} from "@mui/material";
import CheckIcon from "../../components/atoms/svg/check-icon";
import LanguageIcon from "@mui/icons-material/Language";
import { useTicketsQuery } from "../../page-hook/tickets-query-hook";
import { useLoading } from "../../provider/loading/loading-provider";
import { TabContext, TabPanel } from "@mui/lab";
import StyledTabs from "../../components/atoms/styled/styled-tabs";
import StyledTab from "../../components/atoms/styled/styled-tab";
import EventCollectionCard from "../../components/molecules/event-collection-card";
import TicketsSection from "../../components/organisms/tickets-section";
import GradientButton from "../../components/atoms/gradient-button";

export const getStaticPaths: GetStaticPaths<{ id: string }> = (id) => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export async function getStaticProps() {
  return { props: {} };
}

const Project = () => {
  const iconUrl =
    "https://cdn-2.galxe.com/galaxy/images/1635133810/1635133810-logo-1635133810.jpeg?optimizer=image&width=200&quality=100";
  const { ticketsData, ticketsDataLoading } = useTicketsQuery();
  const [value, setValue] = useState("1");
  const { showLoading, closeLoading } = useLoading();

  return (
    <>
      <Head>
        <title>Leaderboard</title>
      </Head>
      <Stack direction={"column"} alignItems={"center"}>
        <Stack
          sx={{
            // backgroundSize: "contain",
            // backgroundPosition: "center",
            // background:
            //   "linear-gradient(to bottom, rgb(15, 14, 20, 0), rgba(15, 14, 20, 1)), url('https://indexer.xyz/assets/top-section-bg.png')",
            height: 300,
            paddingLeft: 16,
            paddingRight: 16,
            borderStyle: "dashed",
            borderWidth: 0,
            borderBottomWidth: 1,
            borderColor: (theme) => theme.palette.divider,
          }}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid
            container={true}
            sx={{
              background: "",
              zIndex: 1,
            }}
            spacing={3}
          >
            <Grid item sx={{ background: "" }} lg={9}>
              <Stack
                direction={"column"}
                sx={{ background: "", height: "100%" }}
                spacing={2}
              >
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  sx={{ background: "" }}
                >
                  <Avatar sx={{ width: 48, height: 48 }} src={iconUrl}></Avatar>
                  <Box sx={{ marginLeft: 2 }}>
                    <Typography variant={"h5"}>Polygon</Typography>
                  </Box>
                  <Box sx={{ marginLeft: 1 }}>
                    <CheckIcon
                      sx={{ width: 36, height: 36, background: "" }}
                    ></CheckIcon>
                  </Box>
                </Stack>
                <Typography
                  variant={"body2"}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  Polygon is a protocol and a framework for building and
                  connecting Ethereum-compatible blockchain networks.
                  Aggregating scalable solutions on Ethereum supporting a
                  multi-chain Ethereum ecosystem.
                </Typography>
              </Stack>
            </Grid>
            <Grid item lg={3}>
              <IconButton
                sx={{
                  width: 36,
                  height: 36,
                  //@ts-ignore
                  background: (theme) => theme.palette.neutral["900"],
                  borderRadius: 16,
                }}
              >
                <LanguageIcon></LanguageIcon>
              </IconButton>
            </Grid>
          </Grid>
          <div
            style={{
              backgroundSize: "cover",
              backgroundPosition: "left",
              backgroundRepeat: "no-repeat",
              background:
                "linear-gradient(to bottom, rgb(15, 14, 20, 0), rgba(15, 14, 20, 1)), url('https://galxe.com/_nuxt/img/space-detail-bg.569713b.jpg')",
              width: "100%",
              height: 300,
              position: "absolute",
              zIndex: 0,
            }}
          ></div>
        </Stack>
        <Box
          style={{
            flex: 1,
            background: "",
            paddingLeft: 24,
            paddingRight: 24,
          }}
        >
          <TicketsSection
            tickets={ticketsData}
            loading={ticketsDataLoading}
            onTicketClick={(e) => {
              console.log(e);
            }}
            sx={{
              marginTop: 6,
              marginBottom: 2,
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
        </Box>
      </Stack>
    </>
  );
};

Project.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default Project;
