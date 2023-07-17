import { Box, Grid, Stack, useMediaQuery } from "@mui/material";
import React, { ReactElement, useState } from "react";
import MainLayout from "../../../layouts/main-layout";
import Head from "next/head";
import { useTheme } from "@mui/material/styles";
import { useSignedUserQuery } from "../../../page-hook/signed-user-query-hook";
import { useTicketQuery } from "../../../page-hook/ticket-query-hook";
import { useRouter } from "next/router";
import EventImage from "../../event/components/event-image";
import WithEditorContainer from "../../../hoc/with-editor-container";
import { EditorAction, EditorTargetAction } from "../../../type";

const _EventImage = WithEditorContainer(EventImage);

const Event = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  const router = useRouter();

  const { userData } = useSignedUserQuery();

  const [selectedTargetAction, setSelectedTargetAction] =
    useState<EditorTargetAction>();

  const { ticketData } = useTicketQuery({
    userId: userData._id,
    id: router.isReady
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
      <Grid
        container
        direction={"row"}
        justifyContent={"center"}
        columnSpacing={6}
        rowSpacing={6}
        sx={{ marginTop: smUp ? 8 : 0, marginBottom: 12 }}
      >
        <Grid item>
          <Stack
            direction={"column"}
            spacing={8}
            sx={{ background: "", padding: mdUp ? 0 : 4 }}
          >
            <Grid
              container
              spacing={4}
              direction={"row"}
              justifyContent={mdUp ? "flex-start" : "center"}
              sx={{ background: "", marginBottom: 2 }}
            >
              <Grid item>
                <Box
                  sx={{
                    height: 128,
                    width: 128,
                    background: "",
                  }}
                >
                  <_EventImage
                    imageUrl={ticketData?.imageUrl}
                    onClickForEdit={(e) => {
                      setSelectedTargetAction({
                        target: "imageUrl",
                        action: EditorAction.UPDATE,
                      });
                    }}
                    onClickForDelete={(e) => {}}
                  ></_EventImage>
                </Box>
              </Grid>
              <Grid item>
                {/*<Stack spacing={1} sx={{ marginBottom: 2 }}>*/}
                {/*  <EventTitle title={ticketData?.title}></EventTitle>*/}
                {/*  {smUp ? (*/}
                {/*    <Grid*/}
                {/*      container*/}
                {/*      alignItems={"left"}*/}
                {/*      justifyContent={smUp ? "flex-start" : "center"}*/}
                {/*      rowSpacing={1}*/}
                {/*    >*/}
                {/*      {ticketData?.beginTime && !isEventStarted() && (*/}
                {/*        <Grid item>*/}
                {/*          <StyledChip*/}
                {/*            label={"이벤트 시작전"}*/}
                {/*            // color={"success"}*/}
                {/*            variant="outlined"*/}
                {/*            sx={{*/}
                {/*              boxShadow: "inset 0px 0px 0px 2px #61e1ff",*/}
                {/*              borderWidth: 0,*/}
                {/*            }}*/}
                {/*          ></StyledChip>*/}
                {/*        </Grid>*/}
                {/*      )}*/}
                {/*      {ticketData && isEventStarted() && !isEventComplete() && (*/}
                {/*        <Grid item>*/}
                {/*          <StyledChip*/}
                {/*            label={"진행중"}*/}
                {/*            variant="outlined"*/}
                {/*            sx={{*/}
                {/*              boxShadow: "inset 0px 0px 0px 2px #0E8074",*/}
                {/*              borderWidth: 0,*/}
                {/*            }}*/}
                {/*          ></StyledChip>*/}
                {/*        </Grid>*/}
                {/*      )}*/}
                {/*      {ticketData && isEventStarted() && isEventComplete() && (*/}
                {/*        <Grid item>*/}
                {/*          <StyledChip*/}
                {/*            label={"이벤트 종료"}*/}
                {/*            variant="outlined"*/}
                {/*            sx={{*/}
                {/*              boxShadow: "inset 0px 0px 0px 2px #D14343",*/}
                {/*              borderWidth: 0,*/}
                {/*            }}*/}
                {/*          ></StyledChip>*/}
                {/*        </Grid>*/}
                {/*      )}*/}
                {/*      {ticketData?.beginTime && (*/}
                {/*        <Grid item sx={{ marginLeft: 1 }}>*/}
                {/*          {smUp ? (*/}
                {/*            <StyledChip*/}
                {/*              label={`${format(*/}
                {/*                parseStrToDate(ticketData?.beginTime ?? ""),*/}
                {/*                "yyyy/MM/dd"*/}
                {/*              )} ~ ${format(*/}
                {/*                parseStrToDate(ticketData?.untilTime ?? ""),*/}
                {/*                "yyyy/MM/dd"*/}
                {/*              )} (UTC+09:00)`}*/}
                {/*            ></StyledChip>*/}
                {/*          ) : (*/}
                {/*            <StyledChip*/}
                {/*              sx={{ paddingTop: 4, paddingBottom: 4 }}*/}
                {/*              label={*/}
                {/*                <Stack sx={{}}>*/}
                {/*                  <Typography variant={"body2"}>*/}
                {/*                    {`${format(*/}
                {/*                      parseStrToDate(*/}
                {/*                        ticketData?.beginTime ?? ""*/}
                {/*                      ),*/}
                {/*                      "yyyy/MM/dd"*/}
                {/*                    )}*/}
                {/*                  ~`}*/}
                {/*                  </Typography>*/}
                {/*                  <Typography variant={"body2"}>*/}
                {/*                    {`${format(*/}
                {/*                      parseStrToDate(*/}
                {/*                        ticketData?.untilTime ?? ""*/}
                {/*                      ),*/}
                {/*                      "yyyy/MM/dd"*/}
                {/*                    )} (UTC+09:00)*/}
                {/*                  `}*/}
                {/*                  </Typography>*/}
                {/*                </Stack>*/}
                {/*              }*/}
                {/*            ></StyledChip>*/}
                {/*          )}*/}
                {/*        </Grid>*/}
                {/*      )}*/}
                {/*    </Grid>*/}
                {/*  ) : (*/}
                {/*    <Stack*/}
                {/*      alignItems={"center"}*/}
                {/*      justifyContent={"center"}*/}
                {/*      sx={{ background: "" }}*/}
                {/*    >*/}
                {/*      {ticketData?.beginTime && ticketData?.untilTime && (*/}
                {/*        <>*/}
                {/*          <Typography>{`${format(*/}
                {/*            parseStrToDate(ticketData?.beginTime ?? ""),*/}
                {/*            "yyyy/MM/dd"*/}
                {/*          )}`}</Typography>*/}
                {/*          <Typography>*/}
                {/*            {`~ ${format(*/}
                {/*              parseStrToDate(ticketData?.untilTime ?? ""),*/}
                {/*              "yyyy/MM/dd"*/}
                {/*            )} (UTC+09:00)`}*/}
                {/*          </Typography>*/}
                {/*        </>*/}
                {/*      )}*/}
                {/*      {ticketData?.beginTime && !isEventStarted() && (*/}
                {/*        <Box sx={{ marginTop: 2 }}>*/}
                {/*          <StyledChip*/}
                {/*            label={"이벤트 시작전"}*/}
                {/*            // color={"success"}*/}
                {/*            variant="outlined"*/}
                {/*            sx={{*/}
                {/*              boxShadow: "inset 0px 0px 0px 2px #61e1ff",*/}
                {/*              borderWidth: 0,*/}
                {/*            }}*/}
                {/*          ></StyledChip>*/}
                {/*        </Box>*/}
                {/*      )}*/}
                {/*      {ticketData && isEventStarted() && !isEventComplete() && (*/}
                {/*        <Box sx={{ marginTop: 2 }}>*/}
                {/*          <StyledChip*/}
                {/*            label={"진행중"}*/}
                {/*            variant="outlined"*/}
                {/*            sx={{*/}
                {/*              boxShadow: "inset 0px 0px 0px 2px #0E8074",*/}
                {/*              borderWidth: 0,*/}
                {/*            }}*/}
                {/*          ></StyledChip>*/}
                {/*        </Box>*/}
                {/*      )}*/}
                {/*      {ticketData && isEventStarted() && isEventComplete() && (*/}
                {/*        <Box sx={{ marginTop: 2 }}>*/}
                {/*          <StyledChip*/}
                {/*            label={"이벤트 종료"}*/}
                {/*            variant="outlined"*/}
                {/*            sx={{*/}
                {/*              boxShadow: "inset 0px 0px 0px 2px #D14343",*/}
                {/*              borderWidth: 0,*/}
                {/*            }}*/}
                {/*          ></StyledChip>*/}
                {/*        </Box>*/}
                {/*      )}*/}
                {/*    </Stack>*/}
                {/*  )}*/}
                {/*</Stack>*/}
              </Grid>
            </Grid>
            {/*{isExceededTicketParticipants() && (*/}
            {/*  <Box sx={{}}>*/}
            {/*    <>*/}
            {/*      <Card>*/}
            {/*        <CardContent>*/}
            {/*          <Typography*/}
            {/*            variant={"body1"}*/}
            {/*            sx={{*/}
            {/*              color: theme.palette.warning.main,*/}
            {/*              marginTop: smUp ? 0 : -5,*/}
            {/*              background: "",*/}
            {/*              textAlign: smUp ? "left" : "center",*/}
            {/*            }}*/}
            {/*          >*/}
            {/*            최대 참여자{" "}*/}
            {/*            {ticketData?.rewardPolicy?.context?.limitNumber}명을*/}
            {/*            초과하여 이벤트에 참여하실 수 없습니다 😅*/}
            {/*          </Typography>*/}
            {/*        </CardContent>*/}
            {/*      </Card>*/}
            {/*    </>*/}
            {/*  </Box>*/}
            {/*)}*/}

            {/*{hasMetamask &&*/}
            {/*  !isExceededTicketParticipants() &&*/}
            {/*  userData?._id === undefined && (*/}
            {/*    <Box sx={{}}>*/}
            {/*      <>*/}
            {/*        <Card>*/}
            {/*          <CardContent>*/}
            {/*            <LinkTypography*/}
            {/*              variant={"body1"}*/}
            {/*              href={"#"}*/}
            {/*              sx={{*/}
            {/*                fontWeight: "bold",*/}
            {/*                "&:hover": {*/}
            {/*                  color: "#914e1d",*/}
            {/*                  textDecoration: "underline",*/}
            {/*                },*/}
            {/*                color: theme.palette.warning.main,*/}
            {/*              }}*/}
            {/*              onClick={async (e) => {*/}
            {/*                setShowSignInDialog(true);*/}
            {/*              }}*/}
            {/*              textAlign={mdUp ? "left" : "center"}*/}
            {/*            >*/}
            {/*              로그인 후, 이벤트에 참여하실 수 있어요 😅*/}
            {/*            </LinkTypography>*/}
            {/*          </CardContent>*/}
            {/*        </Card>*/}
            {/*      </>*/}
            {/*    </Box>*/}
            {/*  )}*/}
            {/*{userData?._id &&*/}
            {/*  !walletConnectedForTicket &&*/}
            {/*  ticketData.rewardPolicy?.context?.rewardNetwork && (*/}
            {/*    <Card>*/}
            {/*      <CardContent>*/}
            {/*        <Stack*/}
            {/*          direction={smUp ? "row" : "column"}*/}
            {/*          alignItems={"center"}*/}
            {/*          justifyContent={"space-between"}*/}
            {/*          spacing={smUp ? 0 : 2}*/}
            {/*          sx={{ padding: 1, paddingTop: 0, paddingBottom: 0 }}*/}
            {/*        >*/}
            {/*          <Stack direction={"column"}>*/}
            {/*            <Typography*/}
            {/*              variant={"h6"}*/}
            {/*              sx={{ color: theme.palette.warning.main }}*/}
            {/*              textAlign={"center"}*/}
            {/*            >*/}
            {/*              {`이벤트를 위해 ${ticketData.rewardPolicy?.context?.rewardNetwork}을 지원하는 지갑 연결이 필요해요`}{" "}*/}
            {/*            </Typography>*/}
            {/*          </Stack>*/}
            {/*          <Stack direction={"column"}>*/}
            {/*            <SecondaryButton*/}
            {/*              onClick={async (e) => {*/}
            {/*                e.preventDefault();*/}
            {/*                await asyncGoToProfileAndEditDialogOpen();*/}
            {/*              }}*/}
            {/*            >*/}
            {/*              지갑 연결하러 가기*/}
            {/*            </SecondaryButton>*/}
            {/*          </Stack>*/}
            {/*        </Stack>*/}
            {/*      </CardContent>*/}
            {/*    </Card>*/}
            {/*  )}*/}
            {/*<Stack*/}
            {/*  direction={"column"}*/}
            {/*  spacing={2}*/}
            {/*  alignItems={mdUp ? "flex-start" : "center"}*/}
            {/*>*/}
            {/*  <Typography textAlign={mdUp ? "left" : "center"} variant={"h5"}>*/}
            {/*    이벤트 설명*/}
            {/*  </Typography>*/}
            {/*  <Box>*/}
            {/*    <ContentMetaDataRenderComponent*/}
            {/*      contentMetaData={ticketData?.description_v2}*/}
            {/*      textComponentFunc={(content) => {*/}
            {/*        return (*/}
            {/*          <Box sx={{ width: mdUp ? 800 : smUp ? 600 : 300 }}>*/}
            {/*            <Typography sx={{ wordBreak: "keep-all" }}>*/}
            {/*              {content}*/}
            {/*            </Typography>*/}
            {/*          </Box>*/}
            {/*        );*/}
            {/*      }}*/}
            {/*      htmlComponentFunc={(content) => {*/}
            {/*        return (*/}
            {/*          <div*/}
            {/*            dangerouslySetInnerHTML={{*/}
            {/*              __html: content ?? "<></>",*/}
            {/*            }}*/}
            {/*          ></div>*/}
            {/*        );*/}
            {/*      }}*/}
            {/*    ></ContentMetaDataRenderComponent>*/}
            {/*  </Box>*/}
            {/*</Stack>*/}

            {/*<Stack*/}
            {/*  direction={"column"}*/}
            {/*  alignItems={mdUp ? "flex-start" : "center"}*/}
            {/*  spacing={2}*/}
            {/*  sx={{ background: "" }}*/}
            {/*>*/}
            {/*  <Typography variant="h5" textAlign={mdUp ? "left" : "center"}>*/}
            {/*    퀘스트*/}
            {/*  </Typography>*/}
            {/*<Stack*/}
            {/*  direction={"column"}*/}
            {/*  spacing={4}*/}
            {/*  alignItems={mdUp ? "flex-start" : "center"}*/}
            {/*  sx={{}}*/}
            {/*>*/}
            {/*  {ticketData?.quests?.map((quest, index) => {*/}
            {/*    const autoVerified =*/}
            {/*      quest.questPolicy?.questPolicy ===*/}
            {/*      QuestPolicyType.VerifyDiscord ||*/}
            {/*      quest.questPolicy?.questPolicy ===*/}
            {/*      QuestPolicyType.VerifyTelegram ||*/}
            {/*      quest.questPolicy?.questPolicy ===*/}
            {/*      QuestPolicyType.VerifyVisitWebsite;*/}

            {/*    return (*/}
            {/*      <VerifyCard*/}
            {/*        key={index + 1}*/}
            {/*        sx={{ width: mdUp ? 800 : smUp ? 600 : 300 }}*/}
            {/*        index={index + 1}*/}
            {/*        title={quest.title}*/}
            {/*        title_v2={quest.title_v2}*/}
            {/*        description={quest.description}*/}
            {/*        disabled={*/}
            {/*          (userData?._id ? false : true) ||*/}
            {/*          isExceededTicketParticipants() ||*/}
            {/*          !isStarted() ||*/}
            {/*          isExpired()*/}
            {/*        }*/}
            {/*        verified={verifiedList[index]}*/}
            {/*        overrideConfirmBtnLabel={getConfirmBtnLabel(quest)}*/}
            {/*        hideStartButton={*/}
            {/*          quest.questPolicy?.questPolicy ===*/}
            {/*          QUEST_POLICY_TYPE.VERIFY_3RIDGE_POINT ||*/}
            {/*          quest.questPolicy?.questPolicy ===*/}
            {/*          QUEST_POLICY_TYPE.VERIFY_APTOS_BRIDGE_TO_APTOS ||*/}
            {/*          quest.questPolicy?.questPolicy ===*/}
            {/*          QUEST_POLICY_TYPE.VERIFY_APTOS_HAS_NFT ||*/}
            {/*          quest.questPolicy?.questPolicy ===*/}
            {/*          QUEST_POLICY_TYPE.VERIFY_APTOS_EXIST_TX ||*/}
            {/*          quest.questPolicy?.questPolicy ===*/}
            {/*          QuestPolicyType.VerifyEmail ||*/}
            {/*          quest.questPolicy?.questPolicy ===*/}
            {/*          QuestPolicyType.VerifyHasEmail ||*/}
            {/*          quest.questPolicy?.questPolicy ===*/}
            {/*          QuestPolicyType.VerifyHasWalletAddress ||*/}
            {/*          quest.questPolicy?.questPolicy ===*/}
            {/*          QuestPolicyType.VerifyHasTwitter ||*/}
            {/*          quest.questPolicy?.questPolicy ===*/}
            {/*          QuestPolicyType.VerifyHasTelegram ||*/}
            {/*          quest.questPolicy?.questPolicy ===*/}
            {/*          QuestPolicyType.Quiz ||*/}
            {/*          quest.questPolicy?.questPolicy ===*/}
            {/*          QuestPolicyType.VerifyAgreement*/}
            {/*        }*/}
            {/*        onVerifyBtnClicked={async (e) => {*/}
            {/*          await asyncVerifyQuest(e, quest, index);*/}
            {/*        }}*/}
            {/*        onStartBtnClicked={async (e) => {*/}
            {/*          await asyncStartQuest(e, quest, index);*/}
            {/*        }}*/}
            {/*        autoVerified={autoVerified}*/}
            {/*      ></VerifyCard>*/}
            {/*    );*/}
            {/*  })}*/}
            {/*</Stack>*/}
            {/*</Stack>*/}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

Event.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default Event;
