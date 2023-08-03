import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import Head from "next/head";
import React, { ReactElement } from "react";
import MainLayout from "../../layouts/main-layout";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useLoading } from "../../provider/loading/loading-provider";
import { useProjectsQuery } from "../../hooks/projects-query-hook";
import HomeFooter from "../../layouts/footer/home-footer";
import ProjectOverlayStyleCard from "../../components/atomic/molecules/project-overlay-style-card";
import SkeletonOverlayCard from "../../components/atomic/molecules/skelton-overlay-card";

const Projects = () => {
  const { projectsData, projectsDataLoading } = useProjectsQuery({});
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const xsUp = useMediaQuery(theme.breakpoints.up("xs"));
  const router = useRouter();
  const { showLoading, closeLoading } = useLoading();

  const getLeftPadding = (index: number) => {
    if (lgUp) {
      return index % 6 === 0 ? "0px" : "5px";
    } else if (mdUp) {
      return index % 4 === 0 ? "0px" : "5px";
    } else if (smUp) {
      return index % 3 === 0 ? "0px" : "5px";
    } else if (xsUp) {
      return index % 2 === 0 ? "0px" : "5px";
    }
    return "5px";
  };

  const getRightPadding = (index: number) => {
    if (lgUp) {
      return index % 6 === 5 ? "0px" : "5px";
    } else if (mdUp) {
      return index % 4 === 3 ? "0px" : "5px";
    } else if (smUp) {
      return index % 3 === 2 ? "0px" : "5px";
    } else if (xsUp) {
      return index % 2 === 1 ? "0px" : "5px";
    }
    return "5px";
  };

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
          sx={{ marginTop: 1, marginBottom: 12, background: "" }}
        >
          <Grid container={true} sx={{ background: "" }}>
            {!projectsDataLoading &&
              projectsData.map((e, index) => {
                return (
                  <Grid
                    item
                    key={index}
                    xs={6}
                    sm={4}
                    md={3}
                    lg={2}
                    sx={{
                      paddingLeft: getLeftPadding(index),
                      paddingRight: getRightPadding(index),
                      paddingTop: "5px",
                      paddingBottom: "5px",
                    }}
                  >
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
