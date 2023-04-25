import React, { ReactElement, useRef } from "react";
import {
  Box,
  CardContent,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Head from "next/head";
import MainLayout from "../../layouts/main-layout";
import HomeFooter from "../../layouts/footer/home-footer";
import UpDownAnimatedComponent from "../../components/atoms/animation/up-down-animated-component";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Navigation } from "swiper";
import "swiper/css"; //basic

import { useTicketsQuery } from "../../page-hook/tickets-query-hook";
import { FILTER_TYPE } from "../../type";
import { TicketSortType } from "../../__generated__/graphql";
import TutorialDescCard from "../../components/molecules/tutorial-desc-card";
import useWindowDimensions from "../../page-hook/window-dimensions";
import TicketOverlayStyleCard from "../../components/molecules/ticket-overlay-style-card";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

SwiperCore.use([Navigation]);

const Home = () => {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const { ticketsData, ticketsDataLoading } = useTicketsQuery({
    filterType: FILTER_TYPE.AVAILABLE,
    sort: TicketSortType.Newest,
  });
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperContainerRef = useRef<HTMLDivElement>(null);
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
          sx={{
            width: "100%",
            height: `calc(100vh - 56px)`,
            background: "",
          }}
        >
          <Stack
            sx={{
              background: "",
              flex: 1,
              zIndex: 3,

              marginLeft: mdUp ? 15 : 5,
              marginRight: mdUp ? 15 : 5
            }}
            spacing={16}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Stack
              sx={{
                background: "",
                width: "100%",
              }}
            >
              <Stack
                direction={"row"}
                alignItems={"left"}
                justifyContent={"left"}
              >
                {/*<Box sx={{ display: "flex", alignItems: "center" }}>*/}
                <Typography
                  variant={mdUp ? "h2" : smUp ? "h3" : "h3"}
                  textAlign={"left"}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  국내 Web3 컨텐츠 플랫폼, 3ridge에서 시작하세요
                </Typography>
                {/*</Box>*/}
              </Stack>
              <Stack sx={{ marginTop: 4 }} alignItems={"left"}>
                <Box>
                  <Typography
                    variant={mdUp ? "h5" : "h6"}
                    textAlign={"left"}
                  >
                    웹3, 다양한 경험에 함께 참여하세요!
                  </Typography>
                </Box>
              </Stack>
            </Stack>
            <Stack
              direction={"column"}
              ref={swiperContainerRef}
              sx={{
                position: "relative",
                width: "100%",
              }}
            >
                <Stack
                    direction={"column"}
                    sx={{
                        width: "100%",
                    }}
                >
                    <Stack
                        direction={"row"}
                        alignItems={"flex-start"}
                        justifyContent={"space-between"}
                        marginBottom={3}
                    >
                        <Box>
                            <Typography
                                variant={"h5"}
                            >
                                추천 이벤트
                            </Typography>
                        </Box>
                        <Box>
                            <IconButton
                                ref={prevRef}
                                sx={{
                                    borderRadius: 32,
                                    width: smUp ? 38 : 32,
                                    height: smUp ? 38 : 32,
                                    borderWidth: 2,
                                    borderStyle: "solid",
                                    marginRight: 1
                                }}
                            >
                                <ArrowBackIosNewIcon fontSize={smUp ? "medium" : "small"} />
                            </IconButton>
                            <IconButton
                                ref={nextRef}
                                sx={{
                                    borderRadius: 32,
                                    width: smUp ? 38 : 32,
                                    height: smUp ? 38 : 32,
                                    borderWidth: 2,
                                    borderStyle: "solid",
                                }}
                            >
                                <ArrowForwardIosIcon fontSize={smUp ? "medium" : "small"} />
                            </IconButton>
                        </Box>
                    </Stack>
                    <Stack
                        direction={"column"}
                        sx={{
                            width: "100%",
                        }}
                    >
                      <Box
                        width={width * (lgUp ? 0.85 : mdUp ? 0.75 : smUp ? 0.85 : 0.85)}
                      >
                        <Swiper
                          spaceBetween={lgUp ? 4 : mdUp ? 3 : smUp ? 2 : 1}
                          slidesPerView={lgUp ? 4 : mdUp ? 3 : smUp ? 2 : 1}
                          scrollbar={{ draggable: true }}
                          navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
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
                    </Stack>
                    <Box sx={{ height: 4 }}></Box>
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
            ></div>
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
          {/*{smUp && (*/}
          {/*  <UpDownAnimatedComponent*/}
          {/*    yDist={"6px"}*/}
          {/*    duration={1}*/}
          {/*    sx={{*/}
          {/*      position: "absolute",*/}
          {/*      bottom: "32px",*/}
          {/*      right: "50%",*/}
          {/*      left: "50%",*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <KeyboardDoubleArrowDownIcon*/}
          {/*      fontSize={"large"}*/}
          {/*    ></KeyboardDoubleArrowDownIcon>*/}
          {/*  </UpDownAnimatedComponent>*/}
          {/*)}*/}
        </Stack>
        {/*<Stack*/}
        {/*  direction={"column"}*/}
        {/*  sx={{*/}
        {/*    width: "100%",*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Stack*/}
        {/*    direction={"column"}*/}
        {/*    alignItems={"center"}*/}
        {/*    sx={{ marginTop: 8, marginBottom: 8 }}*/}
        {/*  >*/}
        {/*    <Typography*/}
        {/*      variant={smUp ? "h2" : "h4"}*/}
        {/*      sx={{*/}
        {/*        fontFamily: "LINESeedKR-Bd",*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      3ridge 어떻게 활용할까요?*/}
        {/*    </Typography>*/}
        {/*    <Box sx={{ marginTop: 4 }}>*/}
        {/*      <Box*/}
        {/*        sx={{*/}
        {/*          background: "transparent",*/}
        {/*          width: mdUp ? 1000 : smUp ? 600 : 360,*/}
        {/*        }}*/}
        {/*      >*/}
        {/*        <CardContent>*/}
        {/*          <Stack alignItems={"center"} spacing={14}>*/}
        {/*            <TutorialDescCard*/}
        {/*              index={1}*/}
        {/*              title={"로그인 해주세요!"}*/}
        {/*              contents={["지갑 또는 이메일로 가입할 수 있어요"]}*/}
        {/*              imageUrl={*/}
        {/*                "https://3ridge.s3.ap-northeast-2.amazonaws.com/main/how_it_works_connect.gif"*/}
        {/*              }*/}
        {/*            />*/}
        {/*            <TutorialDescCard*/}
        {/*              index={2}*/}
        {/*              title={"이벤트에 참여해주세요"}*/}
        {/*              contents={["이벤트에 따라 온체인 검증을 할 수 있어요"]}*/}
        {/*              imageUrl={*/}
        {/*                "https://3ridge.s3.ap-northeast-2.amazonaws.com/main/how_it_works_community.gif"*/}
        {/*              }*/}
        {/*            />*/}
        {/*            <TutorialDescCard*/}
        {/*              index={3}*/}
        {/*              title={"이벤트의 퀘스트를 완료해주세요"}*/}
        {/*              contents={[""]}*/}
        {/*              imageUrl={*/}
        {/*                "https://3ridge.s3.ap-northeast-2.amazonaws.com/main/how_it_works_complete_quest.gif"*/}
        {/*              }*/}
        {/*            />*/}
        {/*            <TutorialDescCard*/}
        {/*              index={4}*/}
        {/*              title={"리워드를 받으세요"}*/}
        {/*              contents={["퀘스트를 완료하면 리워드를 받을 수 있습니다"]}*/}
        {/*              imageUrl={*/}
        {/*                "https://3ridge.s3.ap-northeast-2.amazonaws.com/main/how_it_works_complete_claim.gif"*/}
        {/*              }*/}
        {/*            />*/}
        {/*          </Stack>*/}
        {/*        </CardContent>*/}
        {/*      </Box>*/}
        {/*    </Box>*/}
        {/*  </Stack>*/}
        {/*</Stack>*/}
      </Stack>
    </>
  );
};

Home.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout footerComponent={<HomeFooter />}>{page}</MainLayout>
);

export default Home;
