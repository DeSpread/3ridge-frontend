import React, { ReactElement } from "react";
import MainLayout from "../../layouts/main-layout";
import { AppProps } from "next/app";
import Head from "next/head";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AllEventsSection from "../../components/organisms/all-events-section";
import FeaturedEventsSection from "../../components/organisms/featured-events-section";
import SwiperCore, { Navigation } from "swiper";

const Explore = (props: AppProps) => {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <Head>
        <title>3ridge : 국내 Web3 플랫폼</title>
      </Head>
      <Box
        style={{
          flex: 1,
          background: "",
          paddingLeft: 24,
          paddingRight: 24,
          paddingBottom: 48,
          paddingTop: smUp ? 0 : 16,
        }}
      >
        <FeaturedEventsSection></FeaturedEventsSection>
        <Box sx={{ marginTop: 4 }}></Box>
        <AllEventsSection></AllEventsSection>
      </Box>
    </>
  );
};

Explore.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default Explore;
