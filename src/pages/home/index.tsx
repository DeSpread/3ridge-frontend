import React, { PropsWithChildren, ReactElement, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Head from "next/head";
import MainLayout from "../../layouts/main-layout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { AppProps } from "next/app";
import HomeFooter from "../../layouts/footer/home-footer";
import GradientTypography from "../../components/atoms/gradient-typography";
import UpDownAnimatedComponent from "../../components/atoms/animation/up-down-animated-component";
import StyledChip from "../../components/atoms/styled/styled-chip";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";

export async function getStaticProps() {
  return { props: {} };
}

const HomeTag = (props: PropsWithChildren & { color: string }) => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <StyledChip
      sx={{
        paddingTop: smUp ? "18px" : 0,
        paddingBottom: smUp ? "20px" : 0,
        paddingLeft: "5px",
        paddingRight: "5px",
      }}
      label={
        <Stack direction={"row"} alignItems={"center"}>
          <Box
            sx={{
              width: mdUp ? 12 : smUp ? 12 : 12, //12,
              height: mdUp ? 12 : smUp ? 12 : 12,
              background: props.color,
              borderRadius: 12,
              marginRight: 1,
            }}
          ></Box>
          <Typography variant={mdUp ? "body1" : smUp ? "body2" : "subtitle2"}>
            {props.children}
          </Typography>
        </Stack>
      }
    ></StyledChip>
  );
};

const DescContent = (props: {
  title: string;
  index: number;
  imageUrl: string;
  contents: string[];
}) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      sx={{
        borderWidth: 1,
        // borderStyle: "solid",
        // borderColor: theme.palette.neutral[100],
        padding: 2,
      }}
    >
      <Box>
        <Grid
          container
          sx={{ background: "" }}
          direction={"row"}
          rowSpacing={4}
          justifyContent={"center"}
        >
          <Grid item sx={{ background: "" }}>
            <Stack direction={"column"}>
              <Box
                sx={{
                  background: "",
                  flex: 1,
                  width: "100%",
                }}
              >
                <Image
                  src={props.imageUrl}
                  alt={""}
                  width={256}
                  height={256}
                  style={{
                    borderRadius: 8,
                    borderWidth: 0,
                    borderColor: "white",
                    borderStyle: "solid",
                  }}
                ></Image>
              </Box>
            </Stack>
          </Grid>
          <Grid
            item
            sx={{ marginLeft: mdUp ? 8 : 0, minWidth: mdUp ? 400 : 400 }}
          >
            <Stack
              direction={"column"}
              justifyContent={"center"}
              sx={{ height: "100%" }}
            >
              <Box>
                {/*<Typography variant={"h5"}>*/}
                {/*  {props.index.toString().padStart(2, "0")}*/}
                {/*</Typography>*/}
                <Typography
                  variant={"h5"}
                  sx={{
                    fontFamily: "LINESeedKR-Bd",
                  }}
                >
                  {props.title}
                </Typography>
              </Box>
              <Box
                sx={{
                  marginTop: 2,
                  maxWidth: 420,
                  background: "",
                }}
              >
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 18,
                    lineHeight: "4em",
                  }}
                >
                  {props.contents.map((e, index) => {
                    return (
                      <li key={index}>
                        <Typography variant={"h6"}>{e}</Typography>
                      </li>
                    );
                  })}
                </ul>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

const Home = (props: AppProps) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <Head>
        <title>3ridge</title>
      </Head>
      <Stack
        direction={"column"}
        sx={{
          marginTop: "-8px",
          background: "",
        }}
      >
        <Stack
          direction={"column"}
          sx={{
            width: "100%",
            height: `calc(100vh - 56px)`,
          }}
        >
          <div
            style={{
              width: "100%",
              height: `calc(100vh - 56px)`,
              background: "",
              overflow: "hidden",
              position: "absolute",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "#1a1a1a",
                zIndex: 2,
                flex: 1,
              }}
            >
              <video
                style={{
                  display: "block",
                  margin: "auto",
                  height: "100%",
                  zIndex: 2,
                  transform: mdUp ? "translateX(22%)" : "translateX(-22%)",
                }}
                className="videoTag"
                autoPlay
                loop
                muted
              >
                <source
                  src={
                    "https://sakura-frontend.s3.ap-northeast-2.amazonaws.com/background/background.mp4"
                  }
                  type="video/mp4"
                />
              </video>
            </div>
            <div
              style={{
                zIndex: 3,
                position: "absolute",
                top: `calc(50vh)`,
                display: "flex",
                alignItems: "center",
                background: "",
                flex: 1,
                width: "100%",
                transform: "translateY(-70%)",
              }}
            >
              <Stack
                sx={{ marginLeft: mdUp ? 15 : 0, background: "", flex: 1 }}
                spacing={3}
                alignItems={mdUp ? "flex-start" : "center"}
              >
                <Stack
                  spacing={1}
                  sx={{ padding: smUp ? 0 : 4, paddingBottom: 0 }}
                >
                  <GradientTypography
                    variant={mdUp ? "h1" : smUp ? "h2" : "h4"}
                    sx={{
                      textAlign: smUp ? "left" : "center",
                      fontFamily: "LINESeedKR-Bd",
                    }}
                  >
                    Bridge your web3 project
                  </GradientTypography>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={smUp ? "flex-start" : "center"}
                  >
                    <Typography variant={mdUp ? "h2" : smUp ? "h3" : "h5"}>
                      It`s your
                    </Typography>
                    <img
                      src={
                        "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/only-logo-white.svg"
                      }
                      style={{ marginTop: 2 }}
                      height={mdUp ? "64px" : smUp ? "48px" : "32px"}
                    />
                  </Stack>
                </Stack>
                <Stack direction={"row"}>
                  <Box sx={{ marginLeft: 1 }}>
                    <Typography variant={mdUp ? "body1" : "body2"}>
                      Powered by
                    </Typography>
                  </Box>
                  <Box sx={{ marginLeft: smUp ? 2 : 1 }}>
                    <img
                      style={{ width: mdUp ? 90 : 68 }}
                      src={"https://indexer.xyz/icons/logos/aptos-full.svg"}
                    />
                  </Box>
                </Stack>
              </Stack>
            </div>
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100vh",
                bottom: 0,
              }}
            >
              <UpDownAnimatedComponent yDist={"8px"} duration={1}>
                <div style={{ flex: 1, width: "100%", height: "100vh" }}>
                  <Image
                    fill
                    src={"https://indexer.xyz/assets/top-section-bg.png"}
                    alt={""}
                    style={{ zIndex: 1 }}
                  />
                </div>
              </UpDownAnimatedComponent>
            </div>
          </div>

          <UpDownAnimatedComponent
            yDist={"6px"}
            duration={1}
            sx={{
              position: "absolute",
              bottom: "32px",
              right: "50%",
              left: "50%",
              // transform: "translate(-50%, -50%)",
            }}
          >
            {/*<div*/}
            {/*  style={{*/}
            {/*    "& .polyline": {*/}
            {/*      stroke: "blue",*/}
            {/*    },*/}
            {/*  }}*/}
            {/*></div>*/}
            <Image
              src={
                "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/down_arrow.svg"
              }
              width={smUp ? 48 : 28}
              height={smUp ? 48 : 28}
              style={
                {
                  // ".polyline": {},
                  // fill: "white",
                }
              }
              alt={""}
            ></Image>
            {/*<KeyboardArrowDownIcon*/}
            {/*  fontSize={"large"}*/}
            {/*  sx={{ color: theme.palette.neutral["500"] }}*/}
            {/*></KeyboardArrowDownIcon>*/}
          </UpDownAnimatedComponent>
        </Stack>
        <Stack
          direction={"column"}
          sx={{
            width: "100%",
          }}
        >
          <Stack
            direction={"column"}
            alignItems={"center"}
            sx={{ marginTop: 8, marginBottom: 8 }}
          >
            <Typography
              variant={"h2"}
              sx={{
                fontFamily: "LINESeedKR-Bd",
              }}
            >
              How it works
            </Typography>
            <Box sx={{ marginTop: 4 }}>
              <Card
                sx={{
                  background: "transparent",
                  width: mdUp ? 1000 : smUp ? 600 : 400,
                }}
              >
                <CardContent>
                  <Stack alignItems={"center"} spacing={14}>
                    <DescContent
                      index={1}
                      title={"Connect your account/wallet"}
                      contents={["Sign up or Sign in your account/wallet"]}
                      imageUrl={
                        "https://3ridge.s3.ap-northeast-2.amazonaws.com/main/how_it_works_connect.gif"
                      }
                    />
                    <DescContent
                      index={2}
                      title={"Join the community"}
                      contents={["Join your favorite project or community!"]}
                      imageUrl={
                        "https://3ridge.s3.ap-northeast-2.amazonaws.com/main/how_it_works_community.gif"
                      }
                    />
                    <DescContent
                      index={3}
                      title={"Complete Quests"}
                      contents={["Complete your quest and try to get verified"]}
                      imageUrl={
                        "https://3ridge.s3.ap-northeast-2.amazonaws.com/main/how_it_works_complete_quest.gif"
                      }
                    />
                    <DescContent
                      index={4}
                      title={"Claim your reward"}
                      contents={["Get reward from completed quests"]}
                      imageUrl={
                        "https://3ridge.s3.ap-northeast-2.amazonaws.com/main/how_it_works_complete_claim.gif"
                      }
                    />
                  </Stack>
                  {/*<Box sx={{ padding: 4, paddingBottom: 2 }}>*/}
                  {/*  <Divider*/}
                  {/*    sx={{*/}
                  {/*      width: "100%",*/}
                  {/*      borderWidth: 1,*/}
                  {/*    }}*/}
                  {/*  ></Divider>*/}
                  {/*</Box>*/}
                </CardContent>
              </Card>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

Home.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout footerComponent={<HomeFooter />}>{page}</MainLayout>
);

export default Home;
