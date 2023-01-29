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
            backgroundSize: "cover",
            backgroundPosition: "center center",
            background:
              "linear-gradient(to bottom, rgb(15, 14, 20, 0), rgba(15, 14, 20, 1)), url('https://galxe.com/_nuxt/img/space-detail-bg.569713b.jpg')",
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
              // height: "100%",
              // paddingTop: 12,
              // paddingBottom: 8,
            }}
            // direction={"column"}
            // alignItems={"center"}
            spacing={3}
          >
            <Grid item sx={{ background: "" }} lg={10}>
              <Stack
                direction={"column"}
                // justifyContent={"center"}
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
            <Grid item lg={2}>
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
        </Stack>
        {/*<Divider sx={{ borderStyle: "dashed" }}></Divider>*/}
        <Box sx={{ maxWidth: "1200px", marginTop: 4 }}>
          <Box sx={{}}>
            <TabContext value={value}>
              <Box
                sx={{
                  width: "100%",
                  background: "",
                }}
              >
                <StyledTabs
                  centered
                  value={value}
                  onChange={(event: SyntheticEvent, newValue: string) => {
                    setValue(newValue);
                  }}
                  aria-label="lab API tabs example"
                >
                  <StyledTab label="Available" value={"1"}></StyledTab>
                  <StyledTab label="Missed" value={"2"}></StyledTab>
                </StyledTabs>
              </Box>
              <Divider
                sx={{ color: "divider", marginRight: 4, marginLeft: 4 }}
              ></Divider>
              <TabPanel value={"1"}>
                <Box>
                  {ticketsDataLoading && (
                    <Grid
                      container
                      sx={{ flex: 1 }}
                      columnSpacing={2}
                      rowSpacing={1}
                    >
                      <Grid item sm={12} md={12} lg={6}>
                        <Skeleton
                          width={"552px"}
                          height={"186px"}
                          variant={"rounded"}
                          animation={"wave"}
                        />
                      </Grid>
                      <Grid item sm={12} md={12} lg={6}>
                        <Skeleton
                          width={"552px"}
                          height={"186px"}
                          variant={"rounded"}
                          animation={"wave"}
                        />
                      </Grid>
                    </Grid>
                  )}
                  {ticketsData && (
                    <Grid
                      container
                      sx={{ flex: 1 }}
                      columnSpacing={2}
                      rowSpacing={1}
                    >
                      {ticketsData?.tickets?.map((x, index) => {
                        return (
                          <Grid key={index} item sm={12} md={12} lg={6}>
                            <EventCollectionCard
                              sx={{ margin: 1 }}
                              title={x.title ?? undefined}
                              questsCount={x.quests?.length}
                              summary={x.description ?? undefined}
                              onClick={async (e) => {
                                showLoading();
                                // await router.push("/event/1");
                                closeLoading();
                              }}
                            ></EventCollectionCard>
                          </Grid>
                        );
                      })}
                    </Grid>
                  )}
                </Box>
              </TabPanel>
              <TabPanel value={"2"}>
                <Box>
                  {ticketsDataLoading && (
                    <Grid
                      container
                      sx={{ flex: 1 }}
                      columnSpacing={2}
                      rowSpacing={1}
                    >
                      <Grid item sm={12} md={12} lg={6}>
                        <Skeleton
                          width={"552px"}
                          height={"186px"}
                          variant={"rounded"}
                          animation={"wave"}
                        />
                      </Grid>
                      <Grid item sm={12} md={12} lg={6}>
                        <Skeleton
                          width={"552px"}
                          height={"186px"}
                          variant={"rounded"}
                          animation={"wave"}
                        />
                      </Grid>
                    </Grid>
                  )}
                  {ticketsData && (
                    <Grid
                      container
                      sx={{ flex: 1 }}
                      columnSpacing={2}
                      rowSpacing={1}
                    >
                      {ticketsData?.tickets?.map((x, index) => {
                        return (
                          <Grid key={index} item sm={12} md={12} lg={6}>
                            <EventCollectionCard
                              sx={{ margin: 1 }}
                              title={x.title ?? undefined}
                              questsCount={x.quests?.length}
                              summary={x.description ?? undefined}
                              onClick={(e) => {
                                e.preventDefault();
                                // router.push("");
                              }}
                            ></EventCollectionCard>
                          </Grid>
                        );
                      })}
                    </Grid>
                  )}
                </Box>
              </TabPanel>
            </TabContext>
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
