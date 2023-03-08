import { GetStaticPaths } from "next";
import React, { ReactElement, useMemo, useState } from "react";
import MainLayout from "../../layouts/main-layout";
import Head from "next/head";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CheckIcon from "../../components/atoms/svg/check-icon";
import LanguageIcon from "@mui/icons-material/Language";
import { useTicketsQuery } from "../../page-hook/tickets-query-hook";
import { useLoading } from "../../provider/loading/loading-provider";
import TicketsSection from "../../components/organisms/tickets-section";
import {
  FILTER_TYPE,
  FilterType,
  MouseEventWithParam,
  TicketEventParam,
} from "../../type";
import { useRouter } from "next/router";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useTheme } from "@mui/material/styles";
import { useProjectQuery } from "../../page-hook/project-query-hook";
import { LinkIconButton } from "../../components/molecules/link-icon-button";
import Image from "next/image";

export const getStaticPaths: GetStaticPaths<{ id: string }> = (id) => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export async function getStaticProps() {
  return { props: {} };
}

const Project = () => {
  const [filterType, setFilterType] = useState<FilterType>(
    FILTER_TYPE.AVAILABLE
  );
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [value, setValue] = useState("1");
  const { showLoading, closeLoading } = useLoading();
  const router = useRouter();
  const { ticketsData, ticketsDataLoading } = useTicketsQuery({
    filterType,
    projectId:
      typeof router.query.id === "string" ? router.query.id : undefined,
  });
  const { projectData, projectDataLoading } = useProjectQuery({
    projectId:
      typeof router.query.id === "string" ? router.query.id : undefined,
  });

  return (
    <>
      <Head>
        <title>{projectData?.name ?? "Project"}</title>
      </Head>
      <Stack direction={"column"} alignItems={"center"}>
        <Stack
          sx={{
            height: smUp ? 300 : 400,
            paddingLeft: smUp ? 16 : 4,
            paddingRight: smUp ? 16 : 4,
            borderStyle: "dashed",
            borderWidth: 0,
            borderBottomWidth: 1,
            borderColor: (theme) => theme.palette.divider,
            background: "",
            width: "100%",
          }}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid
            container={true}
            sx={{
              zIndex: 1,
              background: "",
            }}
            spacing={3}
            justifyContent={"center"}
          >
            <Grid item sx={{ background: "" }} lg={9}>
              <Stack
                direction={"column"}
                sx={{ height: "100%", flex: 1, background: "" }}
                spacing={2}
              >
                {smUp ? (
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    sx={{ background: "" }}
                  >
                    <Avatar
                      sx={{ width: 48, height: 48 }}
                      src={projectData?.imageUrl}
                    ></Avatar>
                    <Box sx={{ marginLeft: 2 }}>
                      <Typography variant={"h5"}>
                        {projectData?.name}
                      </Typography>
                    </Box>
                    <Box sx={{ marginLeft: 1 }}>
                      <CheckIcon
                        sx={{ width: 36, height: 36, background: "" }}
                      ></CheckIcon>
                    </Box>
                  </Stack>
                ) : (
                  <Stack
                    direction={"column"}
                    alignItems={"center"}
                    sx={{ background: "", flex: 1, width: "100%" }}
                  >
                    <Avatar
                      sx={{ width: 64, height: 64 }}
                      src={projectData?.imageUrl}
                    ></Avatar>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      sx={{ marginTop: 1, flex: 1 }}
                    >
                      <Typography variant={"h5"} textAlign={"center"}>
                        {projectData?.name}
                      </Typography>
                      <Box sx={{ marginLeft: 1 }}>
                        <CheckIcon
                          sx={{ width: 36, height: 36, background: "" }}
                        ></CheckIcon>
                      </Box>
                    </Stack>
                  </Stack>
                )}
                <Typography
                  variant={"h6"}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {projectData?.description}
                </Typography>
              </Stack>
            </Grid>
            <Grid item lg={3}>
              <Stack direction={"row"} spacing={1}>
                {projectData?.projectSocial.officialUrl && (
                  <IconButton
                    sx={{
                      width: 36,
                      height: 36,
                      background: (theme) => theme.palette.neutral["900"],
                      borderRadius: 16,
                    }}
                    onClick={() => {
                      if (projectData?.projectSocial.officialUrl) {
                        const newWindow = window.open(
                          projectData?.projectSocial.officialUrl,
                          "_blank",
                          "noopener,noreferrer"
                        );
                        if (newWindow) newWindow.opener = null;
                      }
                    }}
                  >
                    <LanguageIcon></LanguageIcon>
                  </IconButton>
                )}
                {projectData?.projectSocial?.twitterUrl && (
                  <LinkIconButton
                    sx={{
                      width: 36,
                      height: 36,
                      background: (theme) => theme.palette.neutral["900"],
                      borderRadius: 16,
                    }}
                    linkUrl={projectData?.projectSocial?.twitterUrl}
                  >
                    <TwitterIcon></TwitterIcon>
                  </LinkIconButton>
                )}
                {projectData?.projectSocial?.discordUrl && (
                  <LinkIconButton
                    sx={{
                      width: 36,
                      height: 36,
                      background: (theme) => theme.palette.neutral["900"],
                      borderRadius: 16,
                    }}
                    linkUrl={projectData?.projectSocial?.discordUrl}
                  >
                    <Image
                      src={
                        "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/discord.svg"
                      }
                      alt={""}
                      width={24}
                      height={24}
                    ></Image>
                  </LinkIconButton>
                )}
                {projectData?.projectSocial?.telegramUrl && (
                  <LinkIconButton
                    sx={{
                      width: 36,
                      height: 36,
                      background: (theme) => theme.palette.neutral["900"],
                      borderRadius: 16,
                    }}
                    linkUrl={projectData?.projectSocial?.telegramUrl}
                  >
                    <TelegramIcon></TelegramIcon>
                  </LinkIconButton>
                )}
              </Stack>
            </Grid>
          </Grid>
          <div
            style={{
              backgroundSize: "cover",
              backgroundPosition: "left",
              backgroundRepeat: "no-repeat",
              background:
                "linear-gradient(to bottom, rgb(15, 14, 20, 0), rgba(15, 14, 20, 1)), url('https://galxe.com/_nuxt/img/space-detail-bg.569713b.jpg')",
              width: "100%",
              height: smUp ? 300 : 400,
              position: "absolute",
              zIndex: 0,
            }}
          ></div>
        </Stack>
        <Box
          style={{
            flex: 1,
            background: "",
            width: "100%",
            paddingLeft: 24,
            paddingRight: 24,
            paddingBottom: 24,
          }}
        >
          <TicketsSection
            tickets={ticketsData}
            loading={ticketsDataLoading}
            onTicketClick={async (e) => {
              showLoading();
              const myEvent = e as MouseEventWithParam<TicketEventParam>;
              const { ticket } = myEvent.params;
              await router.push(`/event/${ticket._id}`);
              closeLoading();
            }}
            sx={{
              marginTop: 6,
              marginBottom: 2,
            }}
            onTabClick={async (e) => {
              const index = e;
              let filterType =
                index === 0
                  ? FILTER_TYPE.AVAILABLE
                  : index === 1
                  ? FILTER_TYPE.COMPLETE
                  : FILTER_TYPE.MISSED;
              setFilterType(filterType);
            }}
          ></TicketsSection>
        </Box>
      </Stack>
    </>
  );
};

Project.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default Project;
