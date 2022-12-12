import { ReactElement, useEffect, useState, SyntheticEvent } from "react";
import MainLayout from "../../components/layouts/main-layout";
import { AppProps } from "next/app";
import { useTheme } from "@mui/material/styles";
import Head from "next/head";
import { Chip, Stack, Typography, Skeleton, Grid, Box } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import { useQuery } from "@apollo/client";
import { gql } from "../../../src/__generated__/gql";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import EventSingleCard from "../../components/molecules/event-single-card";
import StyledTabs from "../../components/atoms/styled-tabs";

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
  const [value, setValue] = useState(1);

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
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <StyledTabs
                  value={value}
                  onChange={(event: SyntheticEvent, newValue: number) => {
                    setValue(newValue);
                  }}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Item One"></Tab>
                  <Tab label="Item Two"></Tab>
                </StyledTabs>
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
