import { ReactElement, useEffect, useState } from "react";
import { Box, Typography, Stack, Grid, Button } from "@mui/material";
import Head from "next/head";
import MainLayout from "../../layouts/main-layout";
import type { AppProps } from "next/app";
import { useTheme } from "@mui/material/styles";
import { useFirebaseAuth } from "../../firebase/hook/firebase-hook";
import HomeFooter from "../../layouts/footer/home-footer";
import GradientTypography from "../../components/atoms/gradient-typography";
import UpDownAnimatedComponent from "../../components/atoms/animation/up-down-animated-component";
import StyledChip from "../../components/atoms/styled/styled-chip";

export async function getStaticProps() {
  return { props: {} };
}

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
        }}
      >
        <Stack
          direction={"column"}
          sx={{
            width: "100%",
            height: `calc(100vh - 56px)`, // 56
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
                // zIndex: 0,
              }}
            >
              <video
                style={{ marginLeft: 400, height: "100%" }}
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
                zIndex: 2,
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
              <Stack sx={{ marginLeft: 15 }} spacing={3}>
                <Stack spacing={1}>
                  <GradientTypography variant={"h1"}>
                    Bridge your web project
                  </GradientTypography>
                  <Typography variant={"h2"}>It`s your 3ridge</Typography>
                </Stack>
                <Grid container>
                  <Grid item>
                    <StyledChip
                      label={
                        <Stack direction={"row"} alignItems={"center"}>
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              background: "red",
                              borderRadius: 12,
                              marginRight: 1,
                            }}
                          ></Box>
                          <Typography>onboarding</Typography>
                        </Stack>
                      }
                    ></StyledChip>
                  </Grid>
                  <Grid item>
                    <StyledChip
                      label={
                        <Stack direction={"row"} alignItems={"center"}>
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              background: "green",
                              borderRadius: 12,
                              marginRight: 1,
                            }}
                          ></Box>
                          <Typography>onboarding</Typography>
                        </Stack>
                      }
                    ></StyledChip>
                  </Grid>
                  <Grid item>
                    <StyledChip
                      label={
                        <Stack direction={"row"} alignItems={"center"}>
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              background: "blue",
                              borderRadius: 12,
                              marginRight: 1,
                            }}
                          ></Box>
                          <Typography>onboarding</Typography>
                        </Stack>
                      }
                    ></StyledChip>
                  </Grid>
                </Grid>
                <Stack direction={"row"}>
                  <Box sx={{ marginLeft: 1 }}>
                    <Typography>Powered by</Typography>
                  </Box>
                  <Box sx={{ marginLeft: 2 }}>
                    <img
                      style={{ width: 90 }}
                      src={"https://indexer.xyz/icons/logos/aptos-full.svg"}
                    />
                  </Box>
                </Stack>
              </Stack>
            </div>
            <UpDownAnimatedComponent
              yDist={"8px"}
              duration={1}
              sx={{
                position: "absolute",
                bottom: "10px",
              }}
            >
              <img
                style={{ height: "100vh" }}
                src={"https://indexer.xyz/assets/top-section-bg.png"}
              />
            </UpDownAnimatedComponent>
          </div>
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
          zIndex: 1,
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
