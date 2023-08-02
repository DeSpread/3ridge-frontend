import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Box, Stack, useMediaQuery } from "@mui/material";
import Head from "next/head";
import MainLayout from "../../layouts/main-layout";
import HomeFooter from "../../layouts/footer/home-footer";
import { useTheme } from "@mui/material/styles";

import { Swiper, SwiperSlide } from "swiper/react"; // basic
import "swiper/css"; //basic
import { useTicketsQuery } from "../../hooks/tickets-query-hook";
import { FILTER_TYPE } from "../../type";
import { EventType, TicketSortType } from "../../__generated__/graphql";
import useWindowDimensions from "../../hooks/window-dimensions";
import BannerOverlayStyleCard from "../../components/atomic/molecules/banner-overlay-style-card";
import RecommendEventSwiperSection from "../../components/atomic/organisms/recommend-event-swiper-section";
import BannerSwiperSection from "../../components/atomic/organisms/banner-swiper-section";
import RecommendProjectSwiperSection from "../../components/atomic/organisms/recommend-project-swiper-section";
import { useProjectsQuery } from "../../hooks/projects-query-hook";

const Home = () => {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const { ticketsData, ticketsDataLoading } = useTicketsQuery({
    filterType: FILTER_TYPE.ALL,
    sort: TicketSortType.Newest,
    eventTypes: [EventType.Recommended],
  });
  const { projectsData, projectsDataLoading } = useProjectsQuery({
    eventTypes: [EventType.Recommended],
  });
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const [width] = useWindowDimensions();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setPageLoading(false);
  }, []);

  const swiperWidth = useMemo(() => {
    return width * (lgUp ? 0.85 : mdUp ? 0.75 : 0.85);
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
            minHeight: "100vh",
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
                width: swiperWidth,
                background: "",
                flex: 1,
                zIndex: 3,
                marginLeft: mdUp ? 15 : 5,
                marginRight: mdUp ? 15 : 5,
                marginTop: mdUp ? 0 : 8,
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
                    autoplay={{ delay: 1000 }} // 추가
                  >
                    <SwiperSlide>
                      <BannerOverlayStyleCard />
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
                <RecommendEventSwiperSection
                  isLoading={ticketsDataLoading}
                  width={swiperWidth}
                  ticketsData={ticketsData}
                ></RecommendEventSwiperSection>
                <Box sx={{ marginTop: 8, marginBottom: 4 }}>
                  <RecommendProjectSwiperSection
                    isLoading={projectsDataLoading}
                    width={swiperWidth}
                    projectsData={projectsData}
                  ></RecommendProjectSwiperSection>
                </Box>
              </Stack>
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
          backgroundImage: `linear-gradient(to bottom, rgb(15, 14, 20, 0), rgba(15, 14, 20, 1)), url("https://3ridge.s3.ap-northeast-2.amazonaws.com/top-section-bg.png")`,
          backgroundSize: "cover",
        }}
      >
        <Stack
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            width: "100%",
          }}
        >
          <Stack
            sx={{
              width: swiperWidth,
              flex: 1,
            }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Stack
              direction={"column"}
              ref={swiperContainerRef}
              sx={{
                width: "100%",
              }}
            >
              <Box sx={{ marginTop: 16, marginBottom: 4 }}>
                <BannerSwiperSection width={swiperWidth}></BannerSwiperSection>
              </Box>
              <Box sx={{ marginTop: 8, marginBottom: 8 }}>
                <RecommendEventSwiperSection
                  isLoading={ticketsDataLoading}
                  width={swiperWidth}
                  ticketsData={ticketsData}
                ></RecommendEventSwiperSection>
              </Box>
              <Box sx={{ marginTop: 8, marginBottom: 16 }}>
                <RecommendProjectSwiperSection
                  isLoading={projectsDataLoading}
                  width={swiperWidth}
                  projectsData={projectsData}
                ></RecommendProjectSwiperSection>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  };

  return (
    <>
      <Head>
        <title>3ridge : Web3 온보딩 플랫폼</title>
      </Head>
      {!pageLoading && smUp ? renderDesktop() : renderMobile()}
    </>
  );
};

Home.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout footerComponent={<HomeFooter />}>{page}</MainLayout>
);

export default Home;
