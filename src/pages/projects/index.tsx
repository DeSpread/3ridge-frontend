import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

import ProjectOverlayStyleCard from "../../components/atomic/molecules/project-overlay-style-card";
import SkeletonOverlayCard from "../../components/atomic/molecules/skelton-overlay-card";
import { useProjectsQuery } from "../../hooks/projects-query-hook";
import HomeFooter from "../../layouts/footer/home-footer";
import MainLayout from "../../layouts/main-layout";
import { useLoading } from "../../provider/loading/loading-provider";

const Projects = () => {
  const { projectsData, projectsDataLoading } = useProjectsQuery({});
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const xsUp = useMediaQuery(theme.breakpoints.up("xs"));
  const router = useRouter();
  const { showLoading, closeLoading } = useLoading();

  return (
    <>
      <Head>
        <title>3ridge : Web3 온보딩 플랫폼</title>
      </Head>
      <Box
        style={{
          flex: 1,
          paddingLeft: "32px",
          paddingRight: "32px",
          paddingTop: smUp ? "32px" : "48px",
          minHeight: "100vh",
          paddingBottom: smUp ? "32px" : "48px",
          backgroundColor: "",
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{
            marginBottom: 3,
          }}
        >
          <Stack direction={"row"} spacing={1}>
            <Typography variant={"h4"}>전체 프로젝트</Typography>
          </Stack>
        </Stack>
        <Grid
          container
          direction={"row"}
          justifyContent={"center"}
          sx={{
            marginTop: 1,
            marginBottom: 12,
            width: "100%",
          }}
        >
          <Grid container={true} sx={{ background: "" }} spacing={3}>
            {!projectsDataLoading &&
              projectsData.map((e, index) => {
                return (
                  <Grid item key={index} xs={6} sm={4} md={3} lg={2}>
                    <ProjectOverlayStyleCard
                      project={e}
                      onClick={async (_e) => {
                        showLoading();
                        await router.push(`/project/${e._id}`);
                        closeLoading();
                      }}
                    ></ProjectOverlayStyleCard>
                  </Grid>
                );
              })}
            {projectsDataLoading &&
              [1, 2, 3, 4].map((e, index) => {
                return (
                  <Grid
                    item
                    key={index}
                    xs={6}
                    sm={4}
                    md={3}
                    lg={2}
                    sx={{ padding: "10px" }}
                  >
                    <SkeletonOverlayCard></SkeletonOverlayCard>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

Projects.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout footerComponent={<HomeFooter />}>{page}</MainLayout>
);

export default Projects;
