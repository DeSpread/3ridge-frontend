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
            {projectsData.map((e, index) => {
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
                  <Card
                    sx={{
                      background: "transparent",
                      transform: "translateY(0%)",
                      transition: "all 0.2s ease-out 0s",
                      transitionDuration: "0.2s",
                      transitionDelay: "0s",
                      borderWidth: 3,
                      borderColor: theme.palette.neutral[700], //"#343238",
                      borderStyle: "solid",
                      transitionTimingFunction: "ease-out",
                      "&:hover": {
                        borderColor: theme.palette.secondary.main,
                        transform: "translate(0,-2px)",
                      },
                      cursor: "pointer",
                    }}
                    onClick={async (_e) => {
                      showLoading();
                      await router.push(`/project/${e._id}`);
                      closeLoading();
                    }}
                  >
                    <CardContent
                      sx={{ background: theme.palette.neutral[800] }}
                    >
                      <Stack direction={"column"} alignItems={"center"}>
                        {e.imageUrl && (
                          <LazyLoadImage
                            width={52}
                            height={52}
                            src={e.imageUrl}
                            style={{
                              borderRadius: 52,
                              objectFit: "cover",
                            }}
                            effect="blur"
                            beforeLoad={() => {
                              return (
                                <Skeleton
                                  width={52}
                                  height={52}
                                  animation={"wave"}
                                  variant={"rounded"}
                                ></Skeleton>
                              );
                            }}
                          ></LazyLoadImage>
                        )}
                        <Box sx={{ marginTop: 2 }}>
                          <Stack
                            direction={"row"}
                            spacing={1}
                            alignItems={"center"}
                            marginRight={"-30px"}
                          >
                            <Typography
                              variant={smUp ? "body2" : "caption"}
                              color={"neutral.100"}
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "1",
                                WebkitBoxOrient: "vertical",
                              }}
                            >
                              {e.name}
                            </Typography>
                            <CheckIcon width={20}></CheckIcon>
                          </Stack>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
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
