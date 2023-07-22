import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import React, { ReactElement, useMemo, useState } from "react";
import MainLayout from "../../../layouts/main-layout";
import Head from "next/head";
import { useTheme } from "@mui/material/styles";
import { useSignedUserQuery } from "../../../page-hook/signed-user-query-hook";
import { useTicketQuery } from "../../../page-hook/ticket-query-hook";
import { useRouter } from "next/router";
import EventImage from "../../../components/pages/event/event-image";
import WithEditorContainer from "../../../hoc/with-editor-container";
import useSimpleStorage from "../../../page-hook/simple-storage-hook";
import {
  asyncReadAsBase64Data,
  getFileExtension,
} from "../../../util/file-util";
// import MarkdownPreview from "@uiw/react-markdown-preview";
import { useLoading } from "../../../provider/loading/loading-provider";
import EventTitle from "../../../components/pages/event/event-title";
import EventEmptyBox from "../../../components/pages/event/event-empty-box";
import InputButton from "../../../components/atomic/molecules/input-button";
import TextEditDialog from "../../../components/dialogs/text-edit-dialog";
import EventDateRange from "../../../components/pages/event/event-date-range";
import DateEditDialog from "../../../components/dialogs/date-range-edit-dialog";
import { parseStrToDate } from "../../../util/date-util";
import EventDescription from "../../../components/pages/event/event-description";
import ContentMetaDataEditDialog from "../../../components/dialogs/content-meta-data-edit-dialog";

const _EventDateRange = WithEditorContainer(EventDateRange);
const _EmptyBox = WithEditorContainer(EventEmptyBox);
const _EventImage = WithEditorContainer(EventImage);
const _EventTitle = WithEditorContainer(EventTitle);
const _EventDescription = WithEditorContainer(EventDescription);

enum EVENT_COMPONENT_TARGET {
  "TITLE",
  "DATE_RANGE_TIME",
  "DESCRIPTION",
}

const Event = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  const router = useRouter();

  const { userData } = useSignedUserQuery();
  const { asyncUploadImage } = useSimpleStorage();
  const { showLoading, closeLoading } = useLoading();

  const [openTextEditDialog, setOpenTextEditDialog] = useState(false);
  const [openContentMetaDataEditDialog, setOpenContentMetaDataEditDialog] =
    useState(false);
  const [textEditDefaultText, setTextEditDefaultText] = useState<string>();
  const [openDateEditDialog, setOpenDateEditDialog] = useState(false);
  const [eventComponentTarget, setEventComponentTarget] =
    useState<EVENT_COMPONENT_TARGET>();

  const {
    ticketData,
    asyncUpdateImageUrl,
    asyncUpdateTitle,
    asyncRefreshTicketData,
    asyncUpdateTicketDateRangeTime,
  } = useTicketQuery({
    userId: userData._id,
    id: router.isReady
      ? typeof router.query.id === "string"
        ? router.query.id
        : undefined
      : undefined,
  });

  const dialogTitle = useMemo(() => {
    switch (eventComponentTarget) {
      case EVENT_COMPONENT_TARGET.TITLE:
        return "제목";
      case EVENT_COMPONENT_TARGET.DATE_RANGE_TIME:
        return "일정 설정";
      case EVENT_COMPONENT_TARGET.DESCRIPTION:
        return "이벤트 설명";
    }
  }, [eventComponentTarget]);

  const asyncRefreshAll = async () => {
    await asyncRefreshTicketData();
  };

  const showTextEditDialog = (
    target: EVENT_COMPONENT_TARGET,
    defaultText?: string
  ) => {
    setOpenTextEditDialog(true);
    setEventComponentTarget(target);
    setTextEditDefaultText(defaultText);
  };

  const showDateEditDialog = (target: EVENT_COMPONENT_TARGET) => {
    setOpenDateEditDialog(true);
    setEventComponentTarget(target);
    setTextEditDefaultText("");
  };

  const showOpenContentMetaDataEditDialog = (
    target: EVENT_COMPONENT_TARGET
  ) => {
    setOpenContentMetaDataEditDialog(true);
    setEventComponentTarget(target);
  };

  const closeTextEditDialog = () => {
    setOpenTextEditDialog(false);
    setEventComponentTarget(undefined);
  };

  const closeDateEditDialog = () => {
    setOpenDateEditDialog(false);
    setEventComponentTarget(undefined);
  };

  const closeOpenContentMetaDataEditDialog = () => {
    setOpenContentMetaDataEditDialog(false);
    setEventComponentTarget(undefined);
  };

  const asyncUpdateImageUrlByFile = async (file: File) => {
    showLoading();
    const includeQuestion = ticketData?.imageUrl?.includes("?");
    const base64Data = await asyncReadAsBase64Data(file);
    const ext = getFileExtension(file);
    await asyncUploadImage(`event/cover/${ticketData?._id}.${ext}`, base64Data);
    let ticketImageUrl = `https://3ridge.s3.ap-northeast-2.amazonaws.com/event/cover/${ticketData?._id}.${ext}`;
    if (!includeQuestion) {
      ticketImageUrl += "?";
    }
    await asyncUpdateImageUrl(ticketImageUrl);
    await asyncRefreshAll();
    closeLoading();
  };

  // const source = `
  //   ## MarkdownPreview
  //   > todo: React component preview markdown text.
  // `;

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
                    onClickForDelete={async (e) => {
                      showLoading();
                      await asyncUpdateImageUrl("");
                      await asyncRefreshAll();
                      closeLoading();
                    }}
                  >
                    <InputButton
                      sx={{ top: 16, left: 16, width: 128, height: 128 }}
                      onChanged={async (file: File) => {
                        await asyncUpdateImageUrlByFile(file);
                      }}
                    ></InputButton>
                  </_EventImage>
                </Box>
              </Grid>
              <Grid item>
                <Stack spacing={1} sx={{ marginBottom: 2 }}>
                  <_EventTitle
                    title={ticketData?.title}
                    onClickForEdit={async (e) => {
                      showTextEditDialog(
                        EVENT_COMPONENT_TARGET.TITLE,
                        ticketData?.title
                      );
                    }}
                    onClickForDelete={async (e) => {
                      showLoading();
                      await asyncUpdateTitle("");
                      await asyncRefreshAll();
                      closeLoading();
                    }}
                  ></_EventTitle>
                  <_EventDateRange
                    ticketData={ticketData}
                    onClickForEdit={async (e) => {
                      showDateEditDialog(
                        EVENT_COMPONENT_TARGET.DATE_RANGE_TIME
                      );
                    }}
                  ></_EventDateRange>
                  {/*<MarkdownPreview source={source} />*/}
                </Stack>
              </Grid>
            </Grid>

            {/* isExceededTicketParticipants */}
            {/* hasMetamask */}
            {/* walletConnectedForTicket */}

            <_EventDescription
              ticketData={ticketData}
              onClickForEdit={async (e) => {
                showOpenContentMetaDataEditDialog(
                  EVENT_COMPONENT_TARGET.DESCRIPTION
                );
              }}
            ></_EventDescription>

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
      <TextEditDialog
        open={openTextEditDialog}
        title={dialogTitle}
        defaultText={textEditDefaultText}
        onCloseBtnClicked={(e) => {
          closeTextEditDialog();
        }}
        onConfirmBtnClicked={async (text) => {
          showLoading();
          switch (eventComponentTarget) {
            case EVENT_COMPONENT_TARGET.TITLE:
              await asyncUpdateTitle(text);
              break;
          }
          await asyncRefreshAll();
          closeTextEditDialog();
          closeLoading();
        }}
      ></TextEditDialog>
      <DateEditDialog
        initBeginDate={parseStrToDate(ticketData?.beginTime ?? "")}
        initEndDate={parseStrToDate(ticketData?.untilTime ?? "")}
        open={openDateEditDialog}
        title={dialogTitle}
        onCloseBtnClicked={(e) => {
          closeDateEditDialog();
        }}
        onConfirmBtnClicked={async (beginDate, endDate) => {
          showLoading();
          switch (eventComponentTarget) {
            case EVENT_COMPONENT_TARGET.DATE_RANGE_TIME:
              await asyncUpdateTicketDateRangeTime(beginDate, endDate);
              break;
          }
          await asyncRefreshAll();
          closeDateEditDialog();
          closeLoading();
        }}
      ></DateEditDialog>
      <ContentMetaDataEditDialog
        open={openContentMetaDataEditDialog}
        title={dialogTitle}
        onCloseBtnClicked={(e) => {
          closeOpenContentMetaDataEditDialog();
        }}
      ></ContentMetaDataEditDialog>
    </>
  );
};

Event.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default Event;
