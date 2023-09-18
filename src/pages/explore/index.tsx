import React, { ReactElement } from "react";
import MainLayout from "../../layouts/main-layout";
import { AppProps } from "next/app";
import Head from "next/head";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AllEventsSection from "../../components/section/all-events-section";
import FeaturedEventsSection from "../../components/section/featured-events-section";
import { AllEvents } from "../../components/section/all-events";

const Explore = (props: AppProps) => {
  return (
    <>
      <Head>
        <title>3ridge : Web3 온보딩 플랫폼</title>
      </Head>
      <div className="px-8 py-12 sm:py-8 flex flex-col gap-8">
        <FeaturedEventsSection />
        <AllEvents />
      </div>
    </>
  );
};

Explore.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default Explore;
