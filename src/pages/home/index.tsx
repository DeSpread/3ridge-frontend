import { ReactElement, useEffect } from "react";
import { Box, Typography, Stack, Grid } from "@mui/material";
import Head from "next/head";
import MainLayout from "../../components/layouts/main-layout";
import type { AppProps } from "next/app";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UpDownAnimatedComponent from "../../components/atoms/animation/up-down-animated-component";
import backgroundIconImageProps from "./data.json";
import HomeFooter from "../../components/layouts/footer/home-footer";
import BountyCard from "../../components/atoms/bounty-card";

export async function getStaticProps() {
  return { props: {} };
}

const Home = (props: AppProps) => {
  const theme = useTheme();
  useEffect(() => {}, []);

  return (
    <>
      <Head>
        <title>Staking</title>
      </Head>
      <Stack direction={"column"} sx={{ marginTop: "-8px" }}>
        <Stack
          direction={"column"}
          sx={{
            width: "100%",
            background: "",
            zIndex: 0,
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
            }}
          />
          <div
            style={{
              width: "100%",
              height: `calc(100vh - 56px)`,
              background: "",
              backgroundColor: "",
              top: "56px",
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
              <Typography textAlign={"center"} variant={"h1"}>
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
                bottom: "12px",
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
          sx={{ background: "", marginTop: 8 }}
        >
          <Stack direction={"row"} justifyContent={"center"}>
            <Typography variant={"h5"}>
              Start with these introductory Quests:
            </Typography>
          </Stack>
          <Stack direction={"column"} alignItems={"center"}>
            <Grid container sx={{ flex: 1 }} columnSpacing={2} rowSpacing={2}>
              <Grid item sm={6}>
                <BountyCard>aaablkajsdflkglkasdhf</BountyCard>
              </Grid>
              <Grid item sm={6}>
                <BountyCard>aaablkajsdflkglkasdhf</BountyCard>
              </Grid>
            </Grid>
          </Stack>
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
