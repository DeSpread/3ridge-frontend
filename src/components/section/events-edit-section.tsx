"use client";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Card,
  CardContent,
  CardProps,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { MouseEventHandler } from "react";
import { RecoilLoadable } from "recoil";

import { TicketSortType } from "../../__generated__/graphql";
import WithEditorContainer from "../../hoc/with-editor-container";
import { useSignedUserQuery } from "../../hooks/signed-user-query-hook";
import { useTicketQuery } from "../../hooks/ticket-query-hook";
import { useTicketsQuery } from "../../hooks/tickets-query-hook";
import { useLoading } from "../../provider/loading/loading-provider";
import { FILTER_TYPE } from "../../types";
import TicketCard from "../form/ticket-card";

import loading = RecoilLoadable.loading;

const _TicketCard = WithEditorContainer(TicketCard);

const TicketAddCard = (
  props: CardProps & { onAddButtonClicked?: MouseEventHandler },
) => {
  const theme = useTheme();

  const { onAddButtonClicked } = props;

  return (
    <div style={{ position: "relative" }}>
      <TicketCard
        ticket={{
          _id: "-1",
          title: "스택스 한국 커뮤니티 OG NFT",
          eventTypes: [],
        }}
      ></TicketCard>
      <Box
        sx={{
          position: "absolute",
          top: "8px",
          left: "8px",
          width: `calc(100% - 16px)`,
          height: `calc(100% - 16px)`,
          background: theme.palette.neutral[800],
        }}
      >
        <IconButton
          sx={{ width: "100%", height: "100%" }}
          onClick={onAddButtonClicked}
        >
          <AddIcon fontSize={"large"}></AddIcon>
        </IconButton>
      </Box>
    </div>
  );
};

const EventsEditSection = () => {
  const { userData } = useSignedUserQuery();
  const router = useRouter();
  const { ticketsData, ticketsDataLoading, asyncRefreshTicketsData } =
    useTicketsQuery({
      filterType: FILTER_TYPE.ALL,
      sort: TicketSortType.Newest,
      fetchPolicy: "no-cache",
      ticketIsVisibleOnly: false,
    });
  const { asyncCreateTicket, asyncDeleteTicket } = useTicketQuery({});
  const { showLoading, closeLoading } = useLoading();

  return (
    <Card sx={{ width: "100%", marginTop: 1 }}>
      <CardContent>
        <Stack direction={"column"} spacing={2}>
          <Stack spacing={1}>
            <Typography variant={"h6"}>이벤트 관리</Typography>
            <Divider></Divider>
          </Stack>
          <Box>
            {!userData?._id && (
              <Typography>로그인 해주시기 바랍니다</Typography>
            )}
            {userData?._id && (
              <Grid container spacing={2} columns={30}>
                {ticketsDataLoading &&
                  [1, 2, 3, 4, 5].map((e) => {
                    return (
                      <Grid key={e} item xs={30} sm={15} md={10} lg={6}>
                        <Skeleton
                          height={400}
                          variant={"rounded"}
                          animation={"wave"}
                        />
                      </Grid>
                    );
                  })}
                {!ticketsDataLoading && (
                  <>
                    <Grid item xs={30} sm={15} md={10} lg={6}>
                      <TicketAddCard
                        onAddButtonClicked={async (e) => {
                          showLoading();
                          await asyncCreateTicket();
                          await asyncRefreshTicketsData();
                          closeLoading();
                        }}
                      ></TicketAddCard>
                    </Grid>
                    {ticketsData?.map((ticket, index) => {
                      return (
                        <Grid key={index} item xs={30} sm={15} md={10} lg={6}>
                          <_TicketCard
                            ticket={ticket}
                            onClickForEdit={async (e) => {
                              showLoading();
                              await router.push(`admin/event/${ticket?._id}`);
                              closeLoading();
                            }}
                            onClickForDelete={async (e) => {
                              showLoading();
                              await asyncDeleteTicket(ticket?._id);
                              await asyncRefreshTicketsData();
                              closeLoading();
                            }}
                          ></_TicketCard>
                        </Grid>
                      );
                    })}
                  </>
                )}
                {!loading && (ticketsData?.length === 0 || !ticketsData) && (
                  <Stack
                    direction={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    sx={{
                      marginTop: 4,
                      background: "",
                      width: "100%",
                      minHeight: 300,
                    }}
                  >
                    <Image
                      src={
                        "https://3ridge.s3.ap-northeast-2.amazonaws.com/empty-box_.svg"
                      }
                      alt={""}
                      width={256}
                      height={256}
                      style={{}}
                    ></Image>
                    <Typography variant={"h5"}>
                      앗! 컨텐츠가 없어요 :(
                    </Typography>
                  </Stack>
                )}
              </Grid>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default EventsEditSection;
