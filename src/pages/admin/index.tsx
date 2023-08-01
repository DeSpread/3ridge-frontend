import React, { MouseEventHandler, ReactElement } from "react";
import MainLayout from "../../layouts/main-layout";
import Head from "next/head";
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
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PrimaryButton from "../../components/atomic/atoms/primary-button";
import { useSignedUserQuery } from "../../page-hook/signed-user-query-hook";
import { useAdminQuery } from "../../page-hook/admin-query-hook";
import { useAlert } from "../../provider/alert/alert-provider";
import { getLocaleErrorMessage } from "../../error/my-error";
import { useTicketsQuery } from "../../page-hook/tickets-query-hook";
import { FILTER_TYPE } from "../../type";
import { TicketSortType } from "../../__generated__/graphql";
import TicketCard from "../../components/atomic/molecules/ticket-card";
import { RecoilLoadable } from "recoil";
import Image from "next/image";
import WithEditorContainer from "../../hoc/with-editor-container";
import { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";
import loading = RecoilLoadable.loading;
import { useTicketQuery } from "../../page-hook/ticket-query-hook";
import { useLoading } from "../../provider/loading/loading-provider";

const _TicketCard = WithEditorContainer(TicketCard);

const TicketAddCard = (
  props: CardProps & { onAddButtonClicked?: MouseEventHandler }
) => {
  const theme = useTheme();

  const { onAddButtonClicked } = props;

  return (
    <div style={{ position: "relative" }}>
      <TicketCard
        ticket={{
          _id: "-1",
          title: "스택스 한국 커뮤니티 OG NFT",
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

const Admin = () => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  const { asyncClearParticipatedAllEventsByUserId } = useAdminQuery();
  const { userData } = useSignedUserQuery();
  const { showAlert, closeAlert, showErrorAlert } = useAlert();
  const router = useRouter();

  const { ticketsData, ticketsDataLoading, asyncRefreshTicketsData } =
    useTicketsQuery({
      filterType: FILTER_TYPE.ALL,
      sort: TicketSortType.Newest,
      fetchPolicy: "no-cache",
    });
  const { asyncCreateTicket, asyncDeleteTicket } = useTicketQuery({});
  const { showLoading, closeLoading } = useLoading();

  return (
    <>
      <Head>
        <title>3ridge : 관리자 페이지</title>
      </Head>
      <Box sx={{ padding: 4, background: "" }}>
        <Stack>
          <Card sx={{ maxWidth: 800 }}>
            <CardContent>
              <Stack direction={"column"} spacing={2}>
                <Stack spacing={1}>
                  <Typography variant={"h6"}>계정 관리</Typography>
                  <Divider></Divider>
                </Stack>
                <Box>
                  {!userData?._id && (
                    <Typography>로그인 해주시기 바랍니다</Typography>
                  )}
                  {userData?._id && (
                    <PrimaryButton
                      onClick={async (e) => {
                        try {
                          if (userData?._id) {
                            await asyncClearParticipatedAllEventsByUserId(
                              userData._id
                            );
                            showAlert({
                              content: "초기화 되었습니다",
                              title: "알림",
                            });
                          } else {
                            showAlert({
                              content: "로그인 되어있지 않습니다.",
                              title: "알림",
                            });
                          }
                        } catch (e) {
                          showErrorAlert({ content: getLocaleErrorMessage(e) });
                        }
                      }}
                    >
                      계정 초기화
                    </PrimaryButton>
                  )}
                </Box>
              </Stack>
            </CardContent>
          </Card>
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
                              <Grid
                                key={index}
                                item
                                xs={30}
                                sm={15}
                                md={10}
                                lg={6}
                              >
                                <_TicketCard
                                  ticket={ticket}
                                  onClickForEdit={async (e) => {
                                    showLoading();
                                    await router.push(
                                      `admin/event/${ticket?._id}`
                                    );
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
                      {!loading &&
                        (ticketsData?.length === 0 || !ticketsData) && (
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
        </Stack>
      </Box>
    </>
  );
};

Admin.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default Admin;
