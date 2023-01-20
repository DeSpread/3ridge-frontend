import { ReactElement, useEffect } from "react";
import { Box, Typography, Stack, Grid } from "@mui/material";
import Head from "next/head";
import MainLayout from "../../layouts/main-layout";
import type { AppProps } from "next/app";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UpDownAnimatedComponent from "../../components/atoms/animation/up-down-animated-component";
import backgroundIconImageProps from "./data.json";
import HomeFooter from "../../layouts/footer/home-footer";
import EventCollectionCard from "../../components/molecules/event-collection-card";
import EventSingleCard from "../../components/molecules/event-single-card";
import SecondaryButton from "../../components/atoms/secondary-button";

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
  useEffect(() => {}, []);

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
            height: `calc(100vh - 56px)`,
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
              height: "100%",
              background: "",
              top: "56px",
              overflow: "hidden",
              position: "absolute",
              zIndex: 0,
            }}
          >
            {backgroundIconImageProps.map((e, index) => {
              return (
                <UpDownAnimatedComponent
                  key={index}
                  yDist={e.yDist}
                  width={e.width}
                  height={e.height}
                  duration={e.duration}
                  src={`https://sakura-frontend.s3.ap-northeast-2.amazonaws.com/background/${e.fileName}`}
                  sx={{
                    position: "absolute",
                    left: `calc(50% ${
                      e.leftOffset.includes("-")
                        ? "-" + e.leftOffset.replace("-", " ")
                        : "+ " + e.leftOffset
                    })`,
                    top: `calc(50% ${
                      e.topOffset.includes("-")
                        ? "-" + e.topOffset.replace("-", " ")
                        : "+ " + e.topOffset
                    })`,
                    userSelect: "none",
                    zIndex: 0,
                  }}
                />
              );
            })}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                width: "100%",
                background: "",
              }}
            >
              <Typography textAlign={"center"} variant={"h3"}>
                You have a wallet.
              </Typography>
              <Typography
                textAlign={"center"}
                sx={{
                  fontSize: "4.8rem",
                  fontWeight: 600,
                }}
              >
                Now what?
              </Typography>
              <Typography
                textAlign={"center"}
                // @ts-ignore
                sx={{ marginTop: 1, color: theme.palette.neutral["400"] }}
                variant={"h5"}
              >
                Join 100,000+ people exploring
              </Typography>
              <Typography
                textAlign={"center"}
                // @ts-ignore
                sx={{ color: theme.palette.neutral["400"] }}
                variant={"h5"}
              >
                web3 every day with us
              </Typography>
            </Box>
            <UpDownAnimatedComponent
              yDist={"6px"}
              duration={1}
              sx={{
                position: "absolute",
                bottom: "60px",
                right: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <KeyboardArrowDownIcon
                fontSize={"large"}
                // @ts-ignore
                sx={{ color: theme.palette.neutral["500"] }}
              ></KeyboardArrowDownIcon>
            </UpDownAnimatedComponent>
          </div>
        </Stack>
        <Stack
          direction={"column"}
          alignItems={"center"}
          sx={{
            background: theme.palette.background.default,
            zIndex: 1,
            marginBottom: 6,
          }}
        >
          <Stack
            direction={"row"}
            justifyContent={"center"}
            sx={{ marginTop: "48px" }}
          >
            <Typography variant={"h5"}>
              Start with these introductory Quests:
            </Typography>
          </Stack>
          <Box sx={{ maxWidth: "1200px", padding: "24px" }}>
            <Grid container sx={{ flex: 1 }} columnSpacing={2} rowSpacing={1}>
              {eventCardData.map((x, i) => {
                return (
                  <Grid key={i} item sm={12} md={12} lg={6}>
                    {x.type === "collection" && (
                      <EventCollectionCard
                        sx={{ margin: 1 }}
                        title={x.title}
                        bountyCount={x.bountyCount}
                        thumbnailUrl={x.thumbnailUrl}
                        community={x.community}
                      />
                    )}
                    {x.type === "single" && (
                      <EventSingleCard
                        sx={{ margin: 1 }}
                        title={x.title}
                        summary={x.summary}
                        community={x.community}
                      ></EventSingleCard>
                    )}
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          <SecondaryButton size={"medium"} style={{ marginTop: 16 }}>
            Explore more Quests
          </SecondaryButton>
        </Stack>
      </Stack>
    </>
  );
};

Home.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout
    backgroundComponent={
      <div
        style={{
          position: "absolute",
          backgroundImage: `url("https://sakura-frontend.s3.ap-northeast-2.amazonaws.com/background/dot-grid.png")`,
          backgroundRepeat: "repeat-x",
          width: "100%",
          height: "280px",
          zIndex: 0,
          backgroundSize: "22px 426px",
          left: 0,
          top: 56,
          right: 0,
        }}
      />
    }
    footerComponent={<HomeFooter />}
  >
    {page}
  </MainLayout>
);

export default Home;
