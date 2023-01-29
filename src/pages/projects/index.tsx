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
      <Grid
        container
        direction={"row"}
        justifyContent={"center"}
        spacing={5}
        sx={{ marginTop: 1, marginBottom: 12, background: "" }}
      >
        <Grid item sx={{ background: "" }}>
          <Box px={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
            <Stack direction={"column"}>
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
                          transform: "scale(1)",
                          transition: "all 0.1s ease-in-out",
                          "&:hover": {
                            transform: "scale(1.05)",
                            transition: "all 0.1s ease-in-out",
                            //@ts-ignore
                            backgroundColor: theme.palette.neutral["800"],
                          },
                        }}
                        onClick={async (e) => {
                          showLoading();
                          await router.push(`/project/1`);
                          closeLoading();
                        }}
                      >
                        <CardContent>
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
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

Projects.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default Projects;
