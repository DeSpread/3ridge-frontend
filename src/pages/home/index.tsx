import React, { PropsWithChildren, ReactElement, useEffect } from "react";
import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import Head from "next/head";
import MainLayout from "../../layouts/main-layout";
import type { AppProps } from "next/app";
import HomeFooter from "../../layouts/footer/home-footer";
import GradientTypography from "../../components/atoms/gradient-typography";
import UpDownAnimatedComponent from "../../components/atoms/animation/up-down-animated-component";
import StyledChip from "../../components/atoms/styled/styled-chip";
import { useTheme } from "@mui/material/styles";

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
                <Box>
                  {smUp && (
                    <Grid
                      container
                      columnSpacing={1}
                      rowSpacing={1}
                      justifyContent={mdUp ? "flex-start" : "center"}
                      sx={{
                        padding: mdUp ? 0 : 2,
                        paddingBottom: 0,
                        paddingTop: 0,
                      }}
                    >
                      <Grid item>
                        <HomeTag color={"red"}>onboarding</HomeTag>
                      </Grid>
                      <Grid item>
                        <HomeTag color={"green"}>on-chain</HomeTag>
                      </Grid>
                      <Grid item>
                        <HomeTag color={"blue"}>community</HomeTag>
                      </Grid>
                    </Grid>
                  )}
                </Box>
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
                <img
                  style={{ width: "100%", height: "100vh" }}
                  src={"https://indexer.xyz/assets/top-section-bg.png"}
                />
              </UpDownAnimatedComponent>
            </div>
          </div>
        </Stack>
      </Stack>
    </>
  );
};

Home.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout footerComponent={<HomeFooter />}>{page}</MainLayout>
);

export default Home;
