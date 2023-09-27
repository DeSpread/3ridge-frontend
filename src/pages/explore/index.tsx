import Head from "next/head";
import React, { ReactElement } from "react";

import { AllEvents } from "@/components/section/_all-events";
import FeaturedEventsSection from "@/components/section/featured-events-section";
import MainLayout from "@/layouts/main-layout";

const Explore = () => {
  return (
    <>
      <Head>
        <title>3ridge : Web3 온보딩 플랫폼</title>
      </Head>
      <div className="flex flex-col gap-8 px-8 py-12 sm:py-8">
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
