import React, { ReactElement } from "react";
import {
  Box,
  CardContent,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Head from "next/head";
import MainLayout from "../../layouts/main-layout";
import type { AppProps } from "next/app";
import HomeFooter from "../../layouts/footer/home-footer";
import GradientTypography from "../../components/atoms/gradient-typography";
import UpDownAnimatedComponent from "../../components/atoms/animation/up-down-animated-component";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { useLoading } from "../../provider/loading/loading-provider";
import { useRouter } from "next/router";
import PrimaryButton from "../../components/atoms/primary-button";
import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslation, Trans } from "next-i18next";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { makeStaticProps, getStaticPaths } from "../../lib/getStatic";

SwiperCore.use([Navigation, Pagination]);

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };

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
                  width={smUp ? 256 : 218}
                  height={smUp ? 256 : 218}
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
            sx={{ marginLeft: mdUp ? 8 : 0, minWidth: mdUp ? 400 : 320 }}
          >
            <Stack
              direction={"column"}
              justifyContent={"center"}
              alignItems={smUp ? "flex-start" : "center"}
              sx={{ height: "100%" }}
            >
              <Box>
                <GradientTypography
                  variant={smUp ? "h3" : "h5"}
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
                  maxWidth: smUp ? 420 : 320,
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
                          variant={smUp ? "h6" : "body2"}
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

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const { showLoading, closeLoading } = useLoading();
  const router = useRouter();
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>3ridge : Bridge to Web3</title>
      </Head>
      <Stack
        direction={"column"}
        sx={{
          marginTop: "-8px",
          background: "",
          width: "100%",
        }}
      >
        <Stack
          direction={"column"}
          justifyContent={"center"}
          // alignItems={"center"}
          sx={{
            width: "100%",
            height: `calc(100vh - 56px)`,
            background: "",
          }}
        >
          <Stack
            sx={{
              paddingLeft: 12,
              paddingRight: 12,
              background: "",
              flex: 1,
              zIndex: 3,
            }}
            spacing={3}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Stack
              sx={{
                padding: smUp ? 0 : 4,
                paddingBottom: 0,
                background: "",
                width: "100%",
              }}
            >
              {smUp ? (
                <GradientTypography
                  sx={{
                    textAlign: smUp ? "left" : "center",
                    fontFamily: "LINESeedKR-Bd",
                    fontSize: mdUp ? "6.7rem" : smUp ? "5.7rem" : "2.7rem",
                    lineHeight: 1.3,
                  }}
                >
                  {t("welcome")}
                  {/*We Bridge You and Web3*/}
                </GradientTypography>
              ) : (
                <Stack direction={"column"}>
                  <GradientTypography
                    sx={{
                      textAlign: "center",
                      fontFamily: "LINESeedKR-Bd",
                      fontSize: "2.3rem",
                      lineHeight: 1.3,
                    }}
                  >
                    We
                  </GradientTypography>
                  <GradientTypography
                    sx={{
                      textAlign: "center",
                      fontFamily: "LINESeedKR-Bd",
                      fontSize: "2.3rem",
                      lineHeight: 1.3,
                    }}
                  >
                    Bridge
                  </GradientTypography>
                  <GradientTypography
                    sx={{
                      textAlign: "center",
                      fontFamily: "LINESeedKR-Bd",
                      fontSize: "2.3rem",
                      lineHeight: 1.3,
                    }}
                  >
                    You and Web3
                  </GradientTypography>
                </Stack>
              )}

              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={smUp ? "flex-start" : "center"}
                sx={{ marginTop: 4 }}
              >
                <Typography
                  variant={mdUp ? "h2" : smUp ? "h3" : "h5"}
                  textAlign={smUp ? "left" : "center"}
                >
                  Start your journey to web3 here
                </Typography>
              </Stack>
              <Stack
                direction={smUp ? "row" : "column"}
                sx={{ marginTop: 2 }}
                alignItems={smUp ? "flex-start" : "center"}
              >
                <Box sx={{ marginLeft: 1 }}>
                  <Typography variant={mdUp ? "body1" : "body2"}>
                    Support now
                  </Typography>
                </Box>
                <Box sx={{ marginLeft: mdUp ? 2 : smUp ? 1 : 0 }}>
                  <img
                    style={{ width: mdUp ? 90 : smUp ? 68 : 42 }}
                    src={
                      "https://sakura-frontend.s3.ap-northeast-2.amazonaws.com/logo/aptos-full.svg"
                    }
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
                    width: smUp ? 186 : 100,
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
                      variant={smUp ? "h6" : "caption"}
                      color={theme.palette.neutral[900]}
                      fontFamily={"LINESeedKR-Bd"}
                    >
                      Start Now
                    </Typography>
                  </Box>
                </PrimaryButton>
              </Stack>
            </Stack>
          </Stack>

          <div
            style={{
              width: "100%",
              height: `calc(100vh - 42px)`,
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
            ></div>
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

          {smUp && (
            <UpDownAnimatedComponent
              yDist={"6px"}
              duration={1}
              sx={{
                position: "absolute",
                bottom: "8px",
                right: "50%",
                left: "50%",
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
          )}
        </Stack>
        <Stack
          direction={"column"}
          sx={{
            width: "100%",
          }}
        >
          {/*<Swiper*/}
          {/*  spaceBetween={50}*/}
          {/*  slidesPerView={3}*/}
          {/*  scrollbar={{ draggable: true }}*/}
          {/*  navigation*/}
          {/*  pagination={{ clickable: true }}*/}
          {/*  breakpoints={{*/}
          {/*    768: {*/}
          {/*      slidesPerView: 7,*/}
          {/*    },*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <SwiperSlide>Slide 1</SwiperSlide>*/}
          {/*  <SwiperSlide>Slide 2</SwiperSlide>*/}
          {/*  <SwiperSlide>Slide 3</SwiperSlide>*/}
          {/*  <SwiperSlide>Slide 4</SwiperSlide>*/}
          {/*</Swiper>*/}
          <Stack
            direction={"column"}
            alignItems={"center"}
            sx={{ marginTop: 8, marginBottom: 8 }}
          >
            <Typography
              variant={smUp ? "h2" : "h4"}
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
                  width: mdUp ? 1000 : smUp ? 600 : 360,
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
//
export default Home;
