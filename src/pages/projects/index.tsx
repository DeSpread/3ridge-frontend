import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Head from "next/head";
import React, { ReactElement } from "react";
import MainLayout from "../../layouts/main-layout";
import { useTheme } from "@mui/material/styles";
import CheckIcon from "../../components/atoms/svg/check-icon";
import { useRouter } from "next/router";
import { useLoading } from "../../provider/loading/loading-provider";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useProjectsQuery } from "../../page-hook/projects-query-hook";
import PrimaryButton from "../../components/atoms/primary-button";
import HomeFooter from "../../layouts/footer/home-footer";
import ProjectOverlayStyleCard from "../../components/molecules/project-overlay-style-card";
import SkeletonOverlayCard from "../../components/molecules/skelton-overlay-card";

const Projects = () => {
  const { projectsData, projectsDataLoading } = useProjectsQuery({});
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
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
          background: "",
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: smUp ? 0 : 16,
          minHeight: "100vh",
          paddingBottom: 1,
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{
            marginTop: "32px",
            marginBottom: 3,
            paddingLeft: 1,
            paddingRight: 1,
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
                    sx={{ padding: "10px" }}
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
