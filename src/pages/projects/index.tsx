import projectsData from "./data.json";
import {
  Card,
  CardContent,
  Grid,
  Box,
  Stack,
  Typography,
  Avatar,
} from "@mui/material";
import Head from "next/head";
import React, { ReactElement } from "react";
import MainLayout from "../../layouts/main-layout";
import { useTheme } from "@mui/material/styles";
import CheckIcon from "../../components/atoms/svg/check-icon";
import { useRouter } from "next/router";
import { useLoading } from "../../provider/loading/loading-provider";

const Projects = () => {
  const theme = useTheme();
  const router = useRouter();
  const { showLoading, closeLoading } = useLoading();

  return (
    <>
      <Head>
        <title>Leaderboard</title>
      </Head>
      <Box
        style={{ flex: 1, background: "", paddingLeft: 24, paddingRight: 24 }}
      >
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
                      transitionTimingFunction: "ease-out",
                      "&:hover": {
                        transform: "translate(0,-2px)",
                        boxShadow: "12px 12px 2px 1px rgba(128, 128, 128, .2)",
                      },
                    }}
                    onClick={async (e) => {
                      showLoading();
                      await router.push(`/project/1`);
                      closeLoading();
                    }}
                  >
                    <CardContent
                      sx={{
                        boxShadow:
                          "inset 4px 4px 4px #35333a, inset -4px -4px 4px #35333a",
                      }}
                    >
                      <Stack direction={"column"} alignItems={"center"}>
                        <Avatar
                          sx={{ width: 52, height: 52 }}
                          src={e.iconUrl}
                        ></Avatar>
                        <Box sx={{ marginTop: 2 }}>
                          <Stack
                            direction={"row"}
                            spacing={1}
                            alignItems={"center"}
                          >
                            <Typography
                              variant={"body2"}
                              color={"neutral.100"}
                              sx={{
                                wordBreak: "keep-all",
                              }}
                            >
                              {e.name}
                            </Typography>
                            <CheckIcon></CheckIcon>
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
  <MainLayout>{page}</MainLayout>
);

export default Projects;
