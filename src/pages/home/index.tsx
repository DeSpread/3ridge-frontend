import { ReactElement, useEffect, useState } from "react";
import { Box, Typography, Stack, Grid, Button } from "@mui/material";
import Head from "next/head";
import MainLayout from "../../layouts/main-layout";
import type { AppProps } from "next/app";
import { useTheme } from "@mui/material/styles";
import { useFirebaseAuth } from "../../firebase/hook/firebase-hook";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import UpDownAnimatedComponent from "../../components/atoms/animation/up-down-animated-component";
// import backgroundIconImageProps from "./data.json";
// import HomeFooter from "../../layouts/footer/home-footer";
// import EventCollectionCard from "../../components/molecules/event-collection-card";
// import EventSingleCard from "../../components/molecules/event-single-card";
// import SecondaryButton from "../../components/atoms/secondary-button";
// import ModelViewer from "./ModelViewer";

export async function getStaticProps() {
  return { props: {} };
}

const eventCardData = [
  {
    type: "collection",
    title: "The Magic Starts Here ✨",
    bountyCount: 4,
    community: {
      name: "uniswap",
      thumbnailUrl:
        "https://pinx.layer3.xyz/ipfs/Qmc1k2ARRhYgHTggx3L9E8YjMWtxMtFhuaWmLvApFKsdm3?img-width=16",
    },
    thumbnailUrl:
      "https://pinx.layer3.xyz/ipfs/QmcmGhyD31imuhFZw32teTqQSEax4nh9D8gsfVQrDj38Nz",
    progress: 50,
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

const Home = (props: AppProps) => {
  const theme = useTheme();
  const { asyncTwitterSignInPopUp } = useFirebaseAuth();

  return (
    <>
      <Head>
        <title>Sakura</title>
      </Head>
      <Stack
        direction={"column"}
        sx={{
          marginTop: "-8px",
          background: "",
          zIndex: 0,
        }}
      >
        <Stack
          direction={"column"}
          sx={{
            width: "100%",
            height: `calc(100vh - 56px)`, // 56
          }}
        >
          <img
            src={
              "https://sakura-frontend.s3.ap-northeast-2.amazonaws.com/background/ellipse.png"
            }
            style={{
              position: "absolute",
              left: "50%",
              right: "50%",
              bottom: "0px",
              height: "200px",
              width: "1000px",
              transform: "translateX(-50%)",
              userSelect: "none",
            }}
          />
          <div
            style={{
              width: "100%",
              height: `calc(100vh - 56px)`,
              // height: "100%",
              background: "",
              // top: "56px",
              overflow: "hidden",
              position: "absolute",
              zIndex: 0,
            }}
          >
            {/*<ModelViewer*/}
            {/*  // @ts-ignore*/}
            {/*  scale="5"*/}
            {/*  modelPath={"Kitty.glb"}*/}
            {/*  position={[-3.5, -1.5, -2]}*/}
            {/*/>*/}
          </div>
        </Stack>
        {/*<Stack*/}
        {/*  direction={"column"}*/}
        {/*  alignItems={"center"}*/}
        {/*  sx={{*/}
        {/*    background: theme.palette.background.default,*/}
        {/*    zIndex: 1,*/}
        {/*    marginBottom: 6,*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Stack*/}
        {/*    direction={"row"}*/}
        {/*    justifyContent={"center"}*/}
        {/*    sx={{ marginTop: "48px" }}*/}
        {/*  >*/}
        {/*    <Typography variant={"h5"}>*/}
        {/*      Start with these introductory Quests:*/}
        {/*    </Typography>*/}
        {/*  </Stack>*/}
        {/*  <Box sx={{ maxWidth: "1200px", padding: "24px" }}>*/}
        {/*    <Grid container sx={{ flex: 1 }} columnSpacing={2} rowSpacing={1}>*/}
        {/*      {eventCardData.map((x, i) => {*/}
        {/*        return (*/}
        {/*          <Grid key={i} item sm={12} md={12} lg={6}>*/}
        {/*            {x.type === "collection" && (*/}
        {/*              <EventCollectionCard*/}
        {/*                sx={{ margin: 1 }}*/}
        {/*                title={x.title}*/}
        {/*                bountyCount={x.bountyCount}*/}
        {/*                thumbnailUrl={x.thumbnailUrl}*/}
        {/*                community={x.community}*/}
        {/*              />*/}
        {/*            )}*/}
        {/*            {x.type === "single" && (*/}
        {/*              <EventSingleCard*/}
        {/*                sx={{ margin: 1 }}*/}
        {/*                title={x.title}*/}
        {/*                summary={x.summary}*/}
        {/*                community={x.community}*/}
        {/*              ></EventSingleCard>*/}
        {/*            )}*/}
        {/*          </Grid>*/}
        {/*        );*/}
        {/*      })}*/}
        {/*    </Grid>*/}
        {/*  </Box>*/}
        {/*  <SecondaryButton size={"medium"} style={{ marginTop: 16 }}>*/}
        {/*    Explore more Quests*/}
        {/*  </SecondaryButton>*/}
        {/*</Stack>*/}
      </Stack>
    </>
  );
};

Home.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout
    backgroundComponent={
      <div
        style={
          {
            // position: "absolute",
            // backgroundImage: `url("https://sakura-frontend.s3.ap-northeast-2.amazonaws.com/background/dot-grid.png")`,
            // backgroundRepeat: "repeat-x",
            // width: "100%",
            // height: "280px",
            // zIndex: 0,
            // backgroundSize: "22px 426px",
            // left: 0,
            // top: 56,
            // right: 0,
          }
        }
      />
    }
    // footerComponent={<HomeFooter />}
  >
    {page}
  </MainLayout>
);

export default Home;
