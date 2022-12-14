import {ReactElement, SyntheticEvent, useEffect, useState} from "react";
import MainLayout from "../../components/layouts/main-layout";
import {AppProps} from "next/app";
import {useTheme} from "@mui/material/styles";
import Head from "next/head";
import {Box, Divider, Grid, Skeleton, Stack, Typography} from "@mui/material";
import {useQuery} from "@apollo/client";
import {gql} from "../../../src/__generated__/gql";
import StyledTabs from "../../components/atoms/styled/styled-tabs";
import StyledTab from "../../components/atoms/styled/styled-tab";
import EventSingleCard from "../../components/molecules/event-single-card";
import {TabContext, TabPanel} from "@mui/lab";
import {useRouter} from "next/router";


const GET_USERS = gql(/* GraphQL */ `
    query GetUsersQuery {
        users {
            username
        }
    }
`);

const eventCardData = [
  {
    type: "collection",
    title: "Beyond Ethereum ⛓️",
    bountyCount: 4,
    thumbnailUrl:
      "https://pinx.layer3.xyz/ipfs/QmfD9H662bi5fKMsYqFV1bw2BzjcWjd2MitJG3J1zXaaG3",
    progress: 10,
  },

  {
    type: "collection",
    title: "Beyond Ethereum ⛓️",
    bountyCount: 4,
    thumbnailUrl:
      "https://pinx.layer3.xyz/ipfs/QmfD9H662bi5fKMsYqFV1bw2BzjcWjd2MitJG3J1zXaaG3",
    progress: 10,
  },
  {
    type: "single",
    title: "Holiday Cheer 🌟",
    summary:
      "Spread the Holiday Cheer! All you need to prepare for the Holidays and participate in Layer3's Winter Extravaganza.aaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaaaa ",
    thumbnailUrl:
      "https://pinx.layer3.xyz/ipfs/QmfTeu2b7opBffc3DPLuT67si63rngLdT46i3cbbSFEtQN",
    expiredDate: "2022-11-08 09:00:00",
    reward: {
      type: "instant",
      amount: 100,
      unit: "xp",
    },
  },
  {
    type: "single",
    title: "Holiday Cheer 🌟",
    summary:
      "Spread the Holiday Cheer! All you need to prepare for the Holidays and participate in Layer3's Winter Extravaganza.",
    thumbnailUrl:
      "https://pinx.layer3.xyz/ipfs/QmfTeu2b7opBffc3DPLuT67si63rngLdT46i3cbbSFEtQN",
    expiredDate: "2022-11-08 09:00:00",
    community: {
      name: "uniswap",
      thumbnailUrl:
        "https://pinx.layer3.xyz/ipfs/Qmc1k2ARRhYgHTggx3L9E8YjMWtxMtFhuaWmLvApFKsdm3?img-width=16",
    },
    reward: {
      type: "instant",
      amount: 100,
      unit: "xp",
    },
  },
];

export async function getStaticProps() {
  return { props: {} };
}

const Explore = (props: AppProps) => {
  const theme = useTheme();
  const { loading, data } = useQuery(GET_USERS);
  const [value, setValue] = useState("1");
  const router = useRouter();

  useEffect(() => {}, []);

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
          </Stack>

          <Box sx={{ maxWidth: "1200px" }}>
            <Box sx={{}}>
              <TabContext value={value}>
                <Box
                  sx={{
                    width: "100%",
                    // borderBottom: 1,
                    // borderColor: "divider",
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
                    {loading && (
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
                    {data && (
                      <Grid
                        container
                        sx={{ flex: 1 }}
                        columnSpacing={2}
                        rowSpacing={1}
                      >
                        {data?.users?.map((x, index) => {
                          return (
                            <Grid key={index} item sm={12} md={12} lg={6}>
                              <EventSingleCard
                                  sx={{margin: 1}}
                                  title={x.username}
                                  summary={"summary"}
                                  onCardItemClick={(e) => {
                                    e.preventDefault();
                                    router.push('/event').then();
                                  }}
                                  isCursorPointer={true}
                              ></EventSingleCard>
                            </Grid>
                          );
                        })}
                      </Grid>
                    )}
                  </Box>
                </TabPanel>
                <TabPanel value={"2"}>
                  <Box>
                    {loading && (
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
                    {data && (
                      <Grid
                        container
                        sx={{ flex: 1 }}
                        columnSpacing={2}
                        rowSpacing={1}
                      >
                        {data?.users?.map((x, index) => {
                          return (
                            <Grid key={index} item sm={12} md={12} lg={6}>
                              <EventSingleCard
                                sx={{ margin: 1 }}
                                title={x.username}
                                summary={"summary"}
                              ></EventSingleCard>
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
