import React, { ReactElement, useEffect, useLayoutEffect, useRef } from "react";
import {
  Box,
  Button,
  CardContent,
  Grid,
  IconButton,
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

import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Navigation } from "swiper";
import "swiper/css"; //basic
import { useTicketsQuery } from "../../page-hook/tickets-query-hook";
import { FILTER_TYPE, FilterType } from "../../type";
import { TicketSortType } from "../../__generated__/graphql";
import TicketCard from "../../components/molecules/ticket-card";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import TutorialDescCard from "../../components/molecules/tutorial-desc-card";
import useWindowDimensions from "../../page-hook/window-dimensions";
import TicketOverlayStyleCard from "../../components/molecules/ticket-overlay-style-card";

SwiperCore.use([Navigation]);

const Home = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const { showLoading, closeLoading } = useLoading();
  const router = useRouter();
  const { ticketsData, ticketsDataLoading } = useTicketsQuery({
    filterType: FILTER_TYPE.AVAILABLE,
    sort: TicketSortType.Newest,
  });
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  // const [swiperWidth, setSwiperWidth] = React.useState(0);
  const [width] = useWindowDimensions();

  return (
    <>
      <Head>
        <title>3ridge : 국내 Web3 플랫폼</title>
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
            <Stack direction={"row"} alignItems={"center"} spacing={3}>
              <Box>
                <IconButton
                  ref={prevRef}
                  sx={{
                    borderRadius: 32,
                    width: 48,
                    height: 48,
                    borderWidth: 2,
                    borderStyle: "solid",
                  }}
                >
                  <ArrowBackIosNewIcon />
                </IconButton>
              </Box>
              <Box width={width * 0.8}>
                <Swiper
                  spaceBetween={4}
                  slidesPerView={4}
                  scrollbar={{ draggable: true }}
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  onBeforeInit={(swiper: SwiperCore) => {
                    if (typeof swiper.params.navigation !== "boolean") {
                      if (swiper.params.navigation) {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                      }
                    }
                    swiper.navigation.update();
                  }}
                >
                  {ticketsData?.map((ticket, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <TicketOverlayStyleCard
                          ticket={ticket}
                          onClick={(e) => {
                            // onTicketCardClick(ticket);
                          }}
                        ></TicketOverlayStyleCard>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </Box>
              <Box>
                <IconButton
                  ref={nextRef}
                  sx={{
                    borderRadius: 32,
                    width: 48,
                    height: 48,
                    borderWidth: 2,
                    borderStyle: "solid",
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
            </Stack>
            {/*<Stack*/}
            {/*  sx={{*/}
            {/*    padding: smUp ? 0 : 4,*/}
            {/*    paddingBottom: 0,*/}
            {/*    background: "",*/}
            {/*    width: "100%",*/}
            {/*  }}*/}
            {/*>*/}
            {/*  {smUp ? (*/}
            {/*    <GradientTypography*/}
            {/*      sx={{*/}
            {/*        textAlign: smUp ? "left" : "center",*/}
            {/*        fontFamily: "LINESeedKR-Bd",*/}
            {/*        fontSize: mdUp ? "6.7rem" : smUp ? "5.7rem" : "2.7rem",*/}
            {/*        lineHeight: 1.3,*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      /!*{t("welcome")}*!/*/}
            {/*      /!*We Bridge You and Web3*!/*/}
            {/*    </GradientTypography>*/}
            {/*  ) : (*/}
            {/*    <Stack direction={"column"}>*/}
            {/*      <GradientTypography*/}
            {/*        sx={{*/}
            {/*          textAlign: "center",*/}
            {/*          fontFamily: "LINESeedKR-Bd",*/}
            {/*          fontSize: "2.3rem",*/}
            {/*          lineHeight: 1.3,*/}
            {/*        }}*/}
            {/*      >*/}
            {/*        We*/}
            {/*      </GradientTypography>*/}
            {/*      <GradientTypography*/}
            {/*        sx={{*/}
            {/*          textAlign: "center",*/}
            {/*          fontFamily: "LINESeedKR-Bd",*/}
            {/*          fontSize: "2.3rem",*/}
            {/*          lineHeight: 1.3,*/}
            {/*        }}*/}
            {/*      >*/}
            {/*        Bridge*/}
            {/*      </GradientTypography>*/}
            {/*      <GradientTypography*/}
            {/*        sx={{*/}
            {/*          textAlign: "center",*/}
            {/*          fontFamily: "LINESeedKR-Bd",*/}
            {/*          fontSize: "2.3rem",*/}
            {/*          lineHeight: 1.3,*/}
            {/*        }}*/}
            {/*      >*/}
            {/*        You and Web3*/}
            {/*      </GradientTypography>*/}
            {/*    </Stack>*/}
            {/*  )}*/}
            {/*  <Stack*/}
            {/*    direction={"row"}*/}
            {/*    alignItems={"center"}*/}
            {/*    justifyContent={smUp ? "flex-start" : "center"}*/}
            {/*    sx={{ marginTop: 4 }}*/}
            {/*  >*/}
            {/*    <Typography*/}
            {/*      variant={mdUp ? "h2" : smUp ? "h3" : "h5"}*/}
            {/*      textAlign={smUp ? "left" : "center"}*/}
            {/*    >*/}
            {/*      국내 Web3 컨텐츠 플랫폼, 3ridge에서 시작하세요*/}
            {/*    </Typography>*/}
            {/*  </Stack>*/}
            {/*  <Stack*/}
            {/*    direction={smUp ? "row" : "column"}*/}
            {/*    sx={{ marginTop: 2 }}*/}
            {/*    alignItems={smUp ? "flex-start" : "center"}*/}
            {/*  >*/}
            {/*    <Box>*/}
            {/*      <Typography variant={mdUp ? "h5" : "body2"}>*/}
            {/*        웹3의 다양한 경험에 함께 참여하세요!*/}
            {/*      </Typography>*/}
            {/*    </Box>*/}
            {/*  </Stack>*/}
            {/*  <Stack*/}
            {/*    direction={"row"}*/}
            {/*    justifyContent={smUp ? "flex-start" : "center"}*/}
            {/*    sx={{*/}
            {/*      background: "",*/}
            {/*      width: "100%",*/}
            {/*      marginTop: smUp ? 4 : 2,*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    <PrimaryButton*/}
            {/*      sx={{*/}
            {/*        marginRight: mdUp ? 10 : 0,*/}
            {/*        width: smUp ? 186 : 100,*/}
            {/*        marginTop: 4,*/}
            {/*      }}*/}
            {/*      onClick={async () => {*/}
            {/*        showLoading();*/}
            {/*        await router.push("/explore");*/}
            {/*        closeLoading();*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      <Box sx={{ padding: smUp ? 0 : 0 }}>*/}
            {/*        <Typography*/}
            {/*          className={"MuiTypography"}*/}
            {/*          variant={smUp ? "h6" : "caption"}*/}
            {/*          color={theme.palette.neutral[900]}*/}
            {/*          fontFamily={"LINESeedKR-Bd"}*/}
            {/*        >*/}
            {/*          시작하기*/}
            {/*        </Typography>*/}
            {/*      </Box>*/}
            {/*    </PrimaryButton>*/}
            {/*  </Stack>*/}
            {/*</Stack>*/}
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
              {/*<video*/}
              {/*  style={{*/}
              {/*    display: "block",*/}
              {/*    margin: "auto",*/}
              {/*    height: "100%",*/}
              {/*    zIndex: 2,*/}
              {/*    transform: mdUp ? "translateX(22%)" : "translateX(-22%)",*/}
              {/*  }}*/}
              {/*  className="videoTag"*/}
              {/*  autoPlay*/}
              {/*  loop*/}
              {/*  muted*/}
              {/*>*/}
              {/*  <source*/}
              {/*    src={*/}
              {/*      "https://sakura-frontend.s3.ap-northeast-2.amazonaws.com/background/background.mp4"*/}
              {/*    }*/}
              {/*    type="video/mp4"*/}
              {/*  />*/}
              {/*</video>*/}
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
                    <TutorialDescCard
                      index={1}
                      title={"Connect your account/wallet"}
                      contents={["Sign up or Sign in your account/wallet"]}
                      imageUrl={
                        "https://3ridge.s3.ap-northeast-2.amazonaws.com/main/how_it_works_connect.gif"
                      }
                    />
                    <TutorialDescCard
                      index={2}
                      title={"Join the community"}
                      contents={["Join your favorite project or community!"]}
                      imageUrl={
                        "https://3ridge.s3.ap-northeast-2.amazonaws.com/main/how_it_works_community.gif"
                      }
                    />
                    <TutorialDescCard
                      index={3}
                      title={"Complete Quests"}
                      contents={["Complete your quest and try to get verified"]}
                      imageUrl={
                        "https://3ridge.s3.ap-northeast-2.amazonaws.com/main/how_it_works_complete_quest.gif"
                      }
                    />
                    <TutorialDescCard
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
