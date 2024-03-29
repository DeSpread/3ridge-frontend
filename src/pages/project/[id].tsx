import LanguageIcon from "@mui/icons-material/Language";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";

import { TicketSortType } from "../../__generated__/graphql";
import CheckIcon from "../../components/atomic/atoms/svg/check-icon";
import { LinkIconButton } from "../../components/atomic/molecules/link-icon-button";
import { useProjectQuery } from "../../hooks/project-query-hook";
import { useTicketsQuery } from "../../hooks/tickets-query-hook";
import MainLayout from "../../layouts/main-layout";
import { useLoading } from "../../provider/loading/loading-provider";
import {
  FILTER_TYPE,
  FilterType,
  MouseEventWithParam,
  TicketEventParam,
} from "../../types";

import KakaoGreyIcon from "@/components/atomic/atoms/svg/kakao-grey-icon";
import TicketsSection from "@/components/section/tickets-section";

const Project = () => {
  const [filterType, setFilterType] = useState<FilterType>(FILTER_TYPE.ALL);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  const { showLoading, closeLoading } = useLoading();
  const router = useRouter();
  const [ticketSortType, setTicketSortType] = useState<TicketSortType>(
    TicketSortType.Trending,
  );
  const { ticketsData, ticketsDataLoading } = useTicketsQuery({
    filterType: router.isReady ? filterType : undefined,
    projectId: router.isReady
      ? typeof router.query.id === "string"
        ? router.query.id
        : undefined
      : undefined,
    sort: router.isReady ? ticketSortType : undefined,
    ticketIsVisibleOnly: true,
  });
  const { projectData, projectDataLoading } = useProjectQuery({
    projectId: router.isReady
      ? typeof router.query.id === "string"
        ? router.query.id
        : undefined
      : undefined,
  });

  return (
    <>
      <Head>
        <title>3ridge : Web3 온보딩 플랫폼</title>
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
                          "noopener,noreferrer",
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
                {projectData?.projectSocial?.mediumUrl && (
                  <LinkIconButton
                    sx={{
                      width: 36,
                      height: 36,
                      background: (theme) => theme.palette.neutral["900"],
                      borderRadius: 16,
                    }}
                    linkUrl={projectData?.projectSocial?.mediumUrl}
                  >
                    <Image
                      src={
                        "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/medium_icon_icon_3.svg"
                      }
                      alt={""}
                      width={24}
                      height={24}
                    ></Image>
                  </LinkIconButton>
                )}
                {projectData?.projectSocial?.naverBlogUrl && (
                  <LinkIconButton
                    sx={{
                      width: 36,
                      height: 36,
                      background: (theme) => theme.palette.neutral["900"],
                      borderRadius: 16,
                    }}
                    linkUrl={projectData?.projectSocial?.naverBlogUrl}
                  >
                    <Image
                      src={
                        "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/naver-svgrepo-com.svg"
                      }
                      alt={""}
                      width={24}
                      height={24}
                    ></Image>
                  </LinkIconButton>
                )}
                {projectData?.projectSocial?.kakaoUrl && (
                  <LinkIconButton
                    sx={{
                      width: 36,
                      height: 36,
                      background: (theme) => theme.palette.neutral["900"],
                      borderRadius: 16,
                    }}
                    linkUrl={projectData?.projectSocial?.kakaoUrl}
                  >
                    <KakaoGreyIcon width={24} height={24}></KakaoGreyIcon>
                  </LinkIconButton>
                )}
              </Stack>
            </Grid>
          </Grid>
          <div
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundImage:
                "url('https://3ridge.s3.ap-northeast-2.amazonaws.com/space-detail-bg.569713b.jpg')",
              // background:
              //   "linear-gradient(to bottom, rgb(15, 14, 20, 0), rgba(15, 14, 20, 1)))",
              width: "100%",
              // height: "100%",
              height: smUp ? 300 : 400,
              position: "absolute",
              zIndex: 0,
            }}
          ></div>
          <div
            style={{
              width: "100%",
              // height: "100%",
              height: smUp ? 300 : 400,
              background:
                "linear-gradient(to bottom, rgb(15, 14, 20, 0), rgba(15, 14, 20, 1))",
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
              const filterType =
                index === 0
                  ? FILTER_TYPE.ALL
                  : index === 1
                  ? FILTER_TYPE.AVAILABLE
                  : index === 2
                  ? FILTER_TYPE.MISSED
                  : FILTER_TYPE.COMPLETE;
              setFilterType(filterType);
            }}
            onTab2Click={async (e) => {
              const sortType =
                e === 0 ? TicketSortType.Trending : TicketSortType.Newest;
              setTicketSortType(sortType);
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
