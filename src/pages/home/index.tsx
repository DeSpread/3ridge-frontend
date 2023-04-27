import React, {ReactElement, useMemo, useRef} from "react";
import {Box, IconButton, Stack, Typography, useMediaQuery,} from "@mui/material";
import Head from "next/head";
import MainLayout from "../../layouts/main-layout";
import HomeFooter from "../../layouts/footer/home-footer";
import UpDownAnimatedComponent from "../../components/atoms/animation/up-down-animated-component";
import {useTheme} from "@mui/material/styles";
import Image from "next/image";

import {Swiper, SwiperSlide} from "swiper/react"; // basic
import SwiperCore, {Navigation} from "swiper";
import "swiper/css"; //basic
import {useTicketsQuery} from "../../page-hook/tickets-query-hook";
import {FILTER_TYPE, Ticket} from "../../type";
import {TicketSortType} from "../../__generated__/graphql";
import useWindowDimensions from "../../page-hook/window-dimensions";
import TicketOverlayStyleCard from "../../components/molecules/ticket-overlay-style-card";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {useLoading} from "../../provider/loading/loading-provider";
import {useRouter} from "next/router";
import BannerOverlayStyleCard from "../../components/molecules/banner-overlay-style-card";

SwiperCore.use([Navigation]);

const SwipeSection = (props: {
  width: number | string;
  ticketsData: Ticket[];
}) => {
  const theme = useTheme();
  const { showLoading, closeLoading } = useLoading();
  const router = useRouter();

  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
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
          <Typography variant={"h5"}>추천 이벤트</Typography>
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
              marginRight: 1,
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
    </Stack>
      <Stack
        direction={"column"}
        sx={{
          width: "100%",
        }}
      >
        <Box width={props.width}>
          <Swiper
            spaceBetween={lgUp ? 4 : mdUp ? 3 : smUp ? 2 : 1}
            slidesPerView={lgUp ? 4 : mdUp ? 3 : smUp ? 2 : 1}
            scrollbar={{ draggable: true }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
          >
            {props.ticketsData?.map((ticket, index) => {
              return (
                <SwiperSlide key={index}>
                  <TicketOverlayStyleCard
                    ticket={ticket}
                    onClick={async (e) => {
                      showLoading();
                      await router.push(`/event/${ticket._id}`);
                      closeLoading();
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
  );
};

const Home = () => {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const { ticketsData, ticketsDataLoading } = useTicketsQuery({
    filterType: FILTER_TYPE.AVAILABLE,
    sort: TicketSortType.Newest,
  });
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const [width] = useWindowDimensions();

  const swiperWidth = useMemo(() => {
    return width * (lgUp ? 0.85 : mdUp ? 0.75 : smUp ? 0.85 : 0.65);
  }, [width, lgUp, mdUp, smUp]);

  const renderMobile = () => {
    return (
      <>
        <Stack
          direction={"column"}
          sx={{
            marginTop: "0px",
            background: "",
            width: "100%",
            backgroundImage: `url("https://3ridge.s3.ap-northeast-2.amazonaws.com/top-section-bg.png")`,
            backgroundSize: "cover",
          }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Stack
            sx={{
              width: swiperWidth,
              background: "",
              flex: 1,
              zIndex: 3,
            }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Stack
              sx={{
                background: "",
                width: "100%",
                marginTop: 8,
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
                    // WebkitLineClamp: "3",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  국내 Web3 컨텐츠 플랫폼, 3ridge에서 시작하세요
                </Typography>
              </Stack>
              <Stack sx={{ marginTop: 4 }} alignItems={"left"}>
                <Box>
                  <Typography
                    variant={mdUp ? "h5" : "body2"}
                    textAlign={"left"}
                  >
                    웹3, 다양한 경험에 함께 참여하세요!
                  </Typography>
                </Box>
              </Stack>
            </Stack>
            <Box sx={{ marginTop: 6 }}></Box>
            <Stack
              direction={"column"}
              ref={swiperContainerRef}
              sx={{
                position: "relative",
                width: "100%",
                background: "",
              }}
            >
              <SwipeSection
                width={swiperWidth}
                ticketsData={ticketsData}
              ></SwipeSection>
            </Stack>
            <Box sx={{ marginTop: 12 }}></Box>
          </Stack>
        </Stack>
      </>
    );
  };

  const renderDesktop = () => {
    return (
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
          alignItems={"center"}
          sx={{
            width: "100%",
            height: `calc(100vh - 56px)`,
            background: "",
          }}
        >
          <Stack
            sx={{
              width: swiperWidth,
              background: "",
              flex: 1,
              zIndex: 3,
              marginLeft: mdUp ? 15 : 5,
              marginRight: mdUp ? 15 : 5,
            }}
            spacing={10}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Stack
              direction={"column"}
              sx={{
                  width: "100%",
              }}
            >
                <Box>
                    <Swiper
                        className="banner"
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 1000 }}	// 추가
                    >
                        <SwiperSlide>
                            <BannerOverlayStyleCard/>
                        </SwiperSlide>
                    </Swiper>
                </Box>
            </Stack>
            <Stack
              direction={"column"}
              ref={swiperContainerRef}
              sx={{
                position: "relative",
                width: "100%",
              }}
            >
              <SwipeSection
                width={swiperWidth}
                ticketsData={ticketsData}
              ></SwipeSection>
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
        </Stack>
      </Stack>
    );
  };

  return (
    <>
      <Head>
        <title>3ridge : 국내 Web3 플랫폼</title>
      </Head>
      {smUp ? renderDesktop() : renderMobile()}
    </>
  );
};

Home.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout footerComponent={<HomeFooter />}>{page}</MainLayout>
);

export default Home;
