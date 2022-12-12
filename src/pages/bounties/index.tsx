import { ReactElement, useEffect, useState, SyntheticEvent } from "react";
import MainLayout from "../../components/layouts/main-layout";
import { AppProps } from "next/app";
import { useTheme } from "@mui/material/styles";
import Head from "next/head";
import { Chip, Stack, Typography, Skeleton, Grid, Box } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import { useQuery } from "@apollo/client";
import { gql } from "../../../src/__generated__/gql";
import StyledTabs from "../../components/atoms/styled/styled-tabs";
import StyledTab from "../../components/atoms/styled/styled-tab";
import EventSingleCard from "../../components/molecules/event-single-card";
import { TabContext, TabPanel } from "@mui/lab";

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

const Bounties = (props: AppProps) => {
  const theme = useTheme();
  const { loading, data } = useQuery(GET_USERS);
  const [value, setValue] = useState("1");

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <>
      <Head>
        <title>Staking</title>
      </Head>
      <div style={{ flex: 1, background: "", marginTop: 32 }}>
        <Stack
          direction={"column"}
          alignItems={"center"}
          sx={{ background: "" }}
          spacing={4}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Typography variant={"h6"}>Explore</Typography>
            <Chip
              icon={<BoltIcon color={"secondary"} />}
              label={"Bounties"}
            ></Chip>
            <Typography variant={"body2"} color={"neutral.600"}>
              Instantly earn crypto by discovering web3
            </Typography>
          </Stack>
          <Stack direction={"column"} alignItems={"center"}>
            <Box sx={{ maxWidth: "1200px", padding: "24px" }}>
              <Box sx={{}}>
                <TabContext value={value}>
                  <Box
                    sx={{
                      width: "100%",
                      borderBottom: 1,
                      borderColor: "divider",
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
                  <TabPanel value={"1"}>
                    <Box>
                      <Grid
                        container
                        sx={{ flex: 1 }}
                        columnSpacing={2}
                        rowSpacing={1}
                      >
                        <Grid item sm={12} md={12} lg={6}>
                          <EventSingleCard
                            sx={{ margin: 1 }}
                            title={"aaa"}
                            summary={"bbb"}
                          ></EventSingleCard>
                        </Grid>
                        <Grid item sm={12} md={12} lg={6}>
                          <EventSingleCard
                            sx={{ margin: 1 }}
                            title={"aaa"}
                            summary={"bbb"}
                          ></EventSingleCard>
                        </Grid>
                      </Grid>
                    </Box>
                  </TabPanel>
                  <TabPanel value={"2"}>
                    <Box>
                      <Grid
                        container
                        sx={{ flex: 1 }}
                        columnSpacing={2}
                        rowSpacing={1}
                      >
                        <Grid item sm={12} md={12} lg={6}>
                          <EventSingleCard
                            sx={{ margin: 1 }}
                            title={"aaa"}
                            summary={"bbb"}
                          ></EventSingleCard>
                        </Grid>
                        <Grid item sm={12} md={12} lg={6}>
                          <EventSingleCard
                            sx={{ margin: 1 }}
                            title={"aaa"}
                            summary={"bbb"}
                          ></EventSingleCard>
                        </Grid>
                      </Grid>
                    </Box>
                  </TabPanel>
                </TabContext>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </div>
    </>
  );
};

Bounties.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default Bounties;
