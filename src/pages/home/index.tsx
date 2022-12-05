import { ReactElement, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import Head from "next/head";
import HomeLayout from "../../components/layouts/home-layout";
import type { AppProps } from "next/app";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UpDownAnimatedComponent from "../../components/atoms/animation/up-down-animated-component";
import backgroundIconImageProps from "./data.json";
// import { backgroundIconImageProps } from "./data";

// const backgroundIconImageProps = [
//   {
//     fileName: "ethereum.png",
//     width: "600px",
//     height: "600px",
//     leftOffset: "142px",
//     topOffset: "-370px",
//     yDist: "24px",
//     duration: 6,
//   },
//   {
//     fileName: "aave.png",
//     width: "500px",
//     height: "500px",
//     leftOffset: "160px",
//     topOffset: "-80px",
//     yDist: "24px",
//     duration: 6,
//   },
//   {
//     fileName: "tether.png",
//     width: "150px",
//     height: "150px",
//     leftOffset: "100px",
//     topOffset: "180px",
//     yDist: "12px",
//     duration: 3,
//   },
//   {
//     fileName: "0x.png",
//     width: "320px",
//     height: "280px",
//     leftOffset: "-260px",
//     topOffset: "120px",
//     yDist: "24px",
//     duration: 6,
//   },
//   {
//     fileName: "maker.png",
//     width: "200px",
//     height: "200px",
//     leftOffset: "-340px",
//     topOffset: "120px",
//     yDist: "12px",
//     duration: 3,
//   },
//   {
//     fileName: "avalanche.png",
//     width: "280px",
//     height: "280px",
//     leftOffset: "-740px",
//     topOffset: "70px",
//     yDist: "12px",
//     duration: 3,
//   },
//   {
//     fileName: "polygon.png",
//     width: "600px",
//     height: "600px",
//     leftOffset: "-790px",
//     topOffset: "-220px",
//     yDist: "24px",
//     duration: 6,
//   },
//   {
//     fileName: "uniswap.png",
//     width: "500px",
//     height: "500px",
//     leftOffset: "-710px",
//     topOffset: "-480px",
//     yDist: "24px",
//     duration: 6,
//   },
//   {
//     fileName: "yearn.png",
//     width: "200px",
//     height: "200px",
//     leftOffset: "-280px",
//     topOffset: "-370px",
//     yDist: "12px",
//     duration: 3,
//   },
//   {
//     fileName: "chainlink.png",
//     width: "300px",
//     height: "300px",
//     leftOffset: "0px",
//     topOffset: "-390px",
//     yDist: "24px",
//     duration: 6,
//   },
// ];

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
      <Box
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
            left: "0px",
            bottom: "0px",
            height: "200px",
            width: "1000px",
            transform: "translateX(25%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            right: "50%",
            width: "100%",
            height: `calc(100vh - 56px)`,
            background: "",
            transform: "translateX(-50%)",
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
            yDist={"5px"}
            duration={1}
            sx={{
              position: "absolute",
              bottom: "8px",
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
      </Box>
    </>
  );
};

Home.getLayout = (page: ReactElement | ReactElement[]) => (
  <HomeLayout
    backgroundComponent={
      <div
        style={{
          position: "absolute",
          backgroundImage: `url("https://sakura-frontend.s3.ap-northeast-2.amazonaws.com/background/dot-grid.png")`,
          backgroundRepeat: "repeat",
          width: "100%",
          height: "280px",
          zIndex: 0,
          backgroundSize: "1.3%",
          left: 0,
          top: 56,
        }}
      />
    }
  >
    {page}
  </HomeLayout>
);

export default Home;
