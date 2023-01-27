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

export async function getStaticProps() {
  return { props: {} };
}

const Explore = (props: AppProps) => {
  const { ticketData, ticketDataLoading } = useTicketsQuery();
  const [value, setValue] = useState("1");
  const { showLoading, closeLoading } = useLoading();
  const router = useRouter();

  console.log(ticketData);

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
                    {ticketDataLoading && (
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
                    {ticketData && (
                      <Grid
                        container
                        sx={{ flex: 1 }}
                        columnSpacing={2}
                        rowSpacing={1}
                      >
                        {ticketData?.tickets?.map((x, index) => {
                          return (
                            <Grid key={index} item sm={12} md={12} lg={6}>
                              <EventCollectionCard
                                sx={{ margin: 1 }}
                                title={x.title ?? undefined}
                                questsCount={x.quests?.length}
                                summary={x.description ?? undefined}
                                onClick={async (e) => {
                                  showLoading();
                                  await router.push("/event/1");
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
                    {ticketDataLoading && (
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
                    {ticketData && (
                      <Grid
                        container
                        sx={{ flex: 1 }}
                        columnSpacing={2}
                        rowSpacing={1}
                      >
                        {ticketData?.tickets?.map((x, index) => {
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
      </div>
    </>
  );
};

Explore.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default Explore;
