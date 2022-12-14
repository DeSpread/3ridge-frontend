import {ReactElement, SyntheticEvent, useEffect, useState} from "react";
import MainLayout from "../../components/layouts/main-layout";
import {AppProps} from "next/app";
import {useTheme} from "@mui/material/styles";
import Head from "next/head";
import {Avatar, Box, Chip, Fab, Grid, Skeleton, Stack, Typography} from "@mui/material";
import {useQuery} from "@apollo/client";
import { gql } from "../../../src/__generated__/gql";
import StyledTabs from "../../components/atoms/styled/styled-tabs";
import StyledTab from "../../components/atoms/styled/styled-tab";
import EventSingleCard from "../../components/molecules/event-single-card";
import {TabContext, TabPanel} from "@mui/lab";
import CenterLayout from "../../components/layouts/center-layout";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

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

const Event = (props: AppProps) => {
  const theme = useTheme();
  const { loading, data } = useQuery(GET_USERS);
  const [value, setValue] = useState("1");

  useEffect(() => {}, []);

  return (
      <>
        <Head>
          <title>Event</title>
        </Head>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Stack direction={"column"} spacing={5}>
              <Stack direction={"row"} alignItems={"center"} spacing={3}>
                <Avatar alt=""
                        src="https://s3.ap-northeast-1.amazonaws.com/quest3.xyz/community/713027752387899472.png"
                        sx={{
                          width: 70,
                          height: 70
                        }}/>
                <Typography variant="h5" fontWeight={"bold"}>
                  DeSpread Labs
                </Typography>
              </Stack>
              <Typography variant="h3">
                Stake your claim to the $100,000+ prize pool
              </Typography>
              <Stack direction={"row"} alignItems={"left"} spacing={1}>
                <Chip
                    label={"ongoing"}
                ></Chip>
                <Chip
                    label={"2022/12/09 22:00 ~ 2022/12/27 09:00 (UTC+09:00)"}
                ></Chip>
              </Stack>

              <Typography variant="h5">
                Description
              </Typography>
              <Typography variant="body1">
                Join Oath of Peak’s Early Access to win big prizes and a ticket to the blockchain beta launching on Jan 1, 2023!
              </Typography>

              <Stack direction={"column"} alignItems={"left"} spacing={4} mr={50}>
                <Fab variant="extended">
                  Follow @zetablockchain on Twitter
                </Fab>
                <Fab variant="extended">
                  Join ZetaChain Discord server
                </Fab>
                <Fab variant="extended">
                  Join @zetachainofficial on Telegram
                </Fab>
                <Fab variant="extended">
                  1 Mission Bring ZETA Home NFT for current address
                </Fab>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack direction={"column"} spacing={10}>
              <Box>
                <Typography variant="h4">
                  Reward
                </Typography>
              </Box>

              <Box>
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Typography variant="h4">
                    Participants
                  </Typography>
                  <Typography variant="h5">
                    (22,712)
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </>
  );
};

Event.getLayout = (page: ReactElement | ReactElement[]) => (
    <MainLayout>
      <CenterLayout>
        {page}
      </CenterLayout>
    </MainLayout>
);

export default Event;
