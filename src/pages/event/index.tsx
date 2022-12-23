import { ReactElement, useEffect, useState } from "react";
import MainLayout from "../../layouts/main-layout";
import { AppProps } from "next/app";
import { useTheme } from "@mui/material/styles";
import Head from "next/head";
import { Avatar, Box, Chip, Grid, Stack, Typography } from "@mui/material";
import CenterLayout from "../../layouts/center-layout";
import VerifyCard from "../../components/molecules/verify-card";

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
  const [value, setValue] = useState("1");

  useEffect(() => {}, []);

  return (
    <>
      <Head>
        <title>Event</title>
      </Head>
      <Stack direction={"column"}>
        <Grid
          container
          direction={"row"}
          justifyContent={"space-between"}
          spacing={5}
        >
          <Grid item>
            <Stack direction={"column"} spacing={5} mb={5}>
              <Stack direction={"row"} alignItems={"center"} spacing={3}>
                <Avatar
                  alt=""
                  src="https://s3.ap-northeast-1.amazonaws.com/quest3.xyz/community/713027752387899472.png"
                  sx={{
                    width: 70,
                    height: 70,
                  }}
                />
                <Typography variant="h5" fontWeight={"bold"}>
                  DeSpread Labs
                </Typography>
              </Stack>
              <Typography variant="h3">
                Stake your claim to the $100,000+ prize pool
              </Typography>
              <Stack direction={"row"} alignItems={"left"} spacing={1}>
                <Chip label={"ongoing"}></Chip>
                <Chip
                  label={"2022/12/09 22:00 ~ 2022/12/27 09:00 (UTC+09:00)"}
                ></Chip>
              </Stack>

              <Typography variant="h5">Description</Typography>
              <Typography variant="body1">
                Join Oath of Peak’s Early Access to win big prizes and a ticket
                to the blockchain beta launching on Jan 1, 2023!
              </Typography>

              <Stack
                direction={"column"}
                alignItems={"left"}
                spacing={4}
                pt={5}
                maxWidth={1200}
              >
                <Typography variant="h5">Quest</Typography>
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
                <VerifyCard
                  community={{
                    name: "3",
                  }}
                  title={"Join ZetaChain Discord server"}
                />
                <VerifyCard
                  community={{
                    name: "4",
                  }}
                  title={"Join @zetachainofficial on Telegram"}
                />
                <VerifyCard
                  community={{
                    name: "5",
                  }}
                  title={"1 Mission Bring ZETA Home NFT for current address"}
                />
              </Stack>
            </Stack>
          </Grid>
          <Grid item>
            <Stack direction={"column"} spacing={10}>
              <Stack direction={"column"} spacing={5}>
                <Typography variant="h4">Reward</Typography>
                <Typography variant="body1">1000 USDT</Typography>
              </Stack>

              <Box>
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Typography variant="h4">Participants</Typography>
                  <Typography variant="h5">(22,712)</Typography>
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

Event.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>
    <CenterLayout>{page}</CenterLayout>
  </MainLayout>
);

export default Event;
