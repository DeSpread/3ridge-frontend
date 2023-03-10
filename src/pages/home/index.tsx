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
import SecondaryButton from "../../components/atoms/secondary-button";
import { useLoading } from "../../provider/loading/loading-provider";
import { useRouter } from "next/router";
import PrimaryButton from "../../components/atoms/primary-button";

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
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

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
              alignItems={smUp ? "flex-start" : "center"}
              sx={{ height: "100%" }}
            >
              <Box>
                <GradientTypography
                  variant={smUp ? "h3" : "h4"}
                  sx={{
                    fontFamily: "LINESeedKR-Bd",
                  }}
                  textAlign={smUp ? "left" : "center"}
                >
                  {props.title}
                </GradientTypography>
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
                    paddingLeft: 0,
                    lineHeight: "4em",
                  }}
                >
                  {props.contents.map((e, index) => {
                    return (
                      <div key={index}>
                        <Typography
                          variant={"h6"}
                          sx={{ color: theme.palette.neutral[400] }}
                        >
                          {e}
                        </Typography>
                      </div>
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
  const { showLoading, closeLoading } = useLoading();
  const router = useRouter();

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
                sx={{
                  paddingLeft: 12,
                  paddingRight: 12,
                  background: "",
                  flex: 1,
                }}
                spacing={3}
                alignItems={"center"}
              >
                <Stack
                  // spacing={1}
                  sx={{
                    padding: smUp ? 0 : 4,
                    paddingBottom: 0,
                    background: "",
                    width: "100%",
                  }}
                >
                  <GradientTypography
                    // variant={mdUp ? "h1" : smUp ? "h2" : "h4"}
                    sx={{
                      textAlign: smUp ? "left" : "center",
                      fontFamily: "LINESeedKR-Bd",
                      fontSize: mdUp ? "6.7rem" : smUp ? "5.7rem" : "2.7rem",
                      lineHeight: 1.3,
                    }}
                  >
                    We Bridge You and Web3
                  </GradientTypography>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={smUp ? "flex-start" : "center"}
                    sx={{ marginTop: 4 }}
                  >
                    <Typography variant={mdUp ? "h2" : smUp ? "h3" : "h5"}>
                      Start your journey to web3 here
                    </Typography>
                    {/*<img*/}
                    {/*  src={*/}
                    {/*    "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/only-logo-white.svg"*/}
                    {/*  }*/}
                    {/*  style={{ marginTop: 2 }}*/}
                    {/*  height={mdUp ? "64px" : smUp ? "48px" : "32px"}*/}
                    {/*/>*/}
                  </Stack>
                  <Stack direction={"row"} sx={{ marginTop: 2 }}>
                    <Box sx={{ marginLeft: 1 }}>
                      <Typography variant={mdUp ? "body1" : "body2"}>
                        Support now
                      </Typography>
                    </Box>
                    <Box sx={{ marginLeft: smUp ? 2 : 1 }}>
                      <img
                        style={{ width: mdUp ? 90 : 68 }}
                        src={"https://indexer.xyz/icons/logos/aptos-full.svg"}
                      />
                    </Box>
                  </Stack>
                  <Stack
                    direction={"row"}
                    justifyContent={smUp ? "flex-start" : "center"}
                    sx={{
                      background: "",
                      width: "100%",
                      marginTop: smUp ? 4 : 2,
                    }}
                  >
                    <PrimaryButton
                      sx={{
                        marginRight: mdUp ? 10 : 0,
                        width: 186,
                        marginTop: 4,
                      }}
                      onClick={async () => {
                        showLoading();
                        await router.push("/explore");
                        closeLoading();
                      }}
                    >
                      <Box sx={{ padding: smUp ? 0 : 0 }}>
                        <Typography
                          className={"MuiTypography"}
                          variant={smUp ? "h6" : "body2"}
                          color={theme.palette.neutral[900]}
                          fontFamily={"LINESeedKR-Bd"}
                        >
                          Start Now
                        </Typography>
                      </Box>
                    </PrimaryButton>
                  </Stack>
                </Stack>
                {/*<Stack*/}
                {/*  direction={"row"}*/}
                {/*  sx={{ background: "white", width: "100%" }}*/}
                {/*>*/}

                {/*</Stack>*/}
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
                    src={
                      "https://3ridge.s3.ap-northeast-2.amazonaws.com/top-section-bg.png"
                    }
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
              bottom: "8px",
              right: "50%",
              left: "50%",
              // transform: "translate(-50%, -50%)",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: "16px",
              }}
            >
              <Image
                src={
                  "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/down_arrow.svg"
                }
                width={smUp ? 48 : 28}
                height={smUp ? 48 : 28}
                alt={""}
              ></Image>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: smUp ? "32px" : "28px",
              }}
            >
              <Image
                src={
                  "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/down_arrow.svg"
                }
                width={smUp ? 48 : 28}
                height={smUp ? 48 : 28}
                alt={""}
              ></Image>
            </div>
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
              <Box
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
              </Box>
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
