import { Box, Grid, IconButton, Stack, useMediaQuery } from "@mui/material";
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
import { useLoading } from "../../../provider/loading/loading-provider";
import EventTitle from "../../../components/pages/event/event-title";
import EventEmptyBox from "../../../components/pages/event/event-empty-box";
import InputButton from "../../../components/atomic/molecules/input-button";
import TextEditDialog from "../../../components/dialogs/text-edit-dialog";
import EventDateRange from "../../../components/pages/event/event-date-range";
import DateEditDialog from "../../../components/dialogs/date-range-edit-dialog";
import DateUtil from "../../../util/date-util";
import EventDescription from "../../../components/pages/event/event-description";
import ContentMetaDataEditDialog from "../../../components/dialogs/content-meta-data-edit-dialog";
import { ContentMetadata, QuestPolicy } from "../../../__generated__/graphql";
import EventQuests from "../../../components/pages/event/event-quests";
import AddIcon from "@mui/icons-material/Add";
import QuestUpsertEditDialog from "../../../components/dialogs/quest-upsert-edit-dialog";
import { Quest } from "../../../type";
import EventRewardPolicy from "../../../components/pages/event/reward/event-reward-policy";
import EventTimeBoard from "../../../components/pages/event/event-time-board";
import EventRewardDescription from "../../../components/pages/event/reward/event-reward-description";
import EventRewardImage from "../../../components/pages/event/reward/description/event-reward-image";
import TicketRewardPolicyEditDialog from "../../../components/dialogs/ticket-reward-policy-edit-dialog";
import { convertToServerRewardPolicy } from "../../../helper/type-helper";
import NumberEditDialog from "../../../components/dialogs/number-edit-dialog";
import EventRewardPoint from "../../../components/pages/event/reward/description/event-reward-point";

const _EventRewardPolicy = WithEditorContainer(EventRewardPolicy);
const _EventDateRange = WithEditorContainer(EventDateRange);
const _EmptyBox = WithEditorContainer(EventEmptyBox);
const _EventImage = WithEditorContainer(EventImage);
const _EventTitle = WithEditorContainer(EventTitle);
const _EventDescription = WithEditorContainer(EventDescription);
const _EventQuests = WithEditorContainer(EventQuests);
const _EventRewardImage = WithEditorContainer(EventRewardImage);
const _EventRewardPoint = WithEditorContainer(EventRewardPoint);

enum EVENT_COMPONENT_TARGET {
  "TITLE",
  "DATE_RANGE_TIME",
  "DESCRIPTION",
  "POINT",
  "TARGET_NUMBER",
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
  const [openQuestUpsertDialog, setOpenQuestUpsertDialog] = useState(false);
  const [openDateEditDialog, setOpenDateEditDialog] = useState(false);
  const [
    openTicketRewardPolicyEditDialog,
    setOpenTicketRewardPolicyEditDialog,
  ] = useState(false);
  const [openNumberEditDialog, setOpenNumberEditDialog] = useState(false);

  const [textEditDefaultText, setTextEditDefaultText] = useState<string>();
  const [eventComponentTarget, setEventComponentTarget] =
    useState<EVENT_COMPONENT_TARGET>();
  const [editedQuest, setEditedQuest] = useState<Quest>();

  const ticketId = router.isReady
    ? typeof router.query.id === "string"
      ? router.query.id
      : undefined
    : undefined;

  const {
    ticketData,
    asyncUpdateImageUrl,
    asyncUpdateTitle,
    asyncRefreshTicketData,
    asyncUpdateTicketDateRangeTime,
    asyncUpdateTicketDescription,
    asyncCreateQuest,
    asyncDeleteQuest,
    asyncUpdateQuest,
    asyncUpdateTicketRewardPolicy,
  } = useTicketQuery({
    userId: userData._id,
    id: ticketId,
  });

  const dialogTitle = useMemo(() => {
    switch (eventComponentTarget) {
      case EVENT_COMPONENT_TARGET.TITLE:
        return "제목 편집";
      case EVENT_COMPONENT_TARGET.DATE_RANGE_TIME:
        return "일정 설정";
      case EVENT_COMPONENT_TARGET.DESCRIPTION:
        return "이벤트 설명 편집";
      case EVENT_COMPONENT_TARGET.POINT:
        return "이벤트 포인트 편집";
      case EVENT_COMPONENT_TARGET.TARGET_NUMBER:
        return "이벤트 대상자 수 편집";
    }
  }, [eventComponentTarget]);

  const numberEditDialogDefaultNumber = useMemo(() => {
    if (EVENT_COMPONENT_TARGET.POINT)
      return ticketData?.rewardPolicy?.rewardPoint ?? 0;
    return 0;
  }, [ticketData?.rewardPolicy]);

  const dialogContent = useMemo(() => {
    switch (eventComponentTarget) {
      case EVENT_COMPONENT_TARGET.DESCRIPTION:
        return ticketData?.description_v2;
    }
  }, [eventComponentTarget]);

  const verifiedList = useMemo(() => {
    return new Array(ticketData?.quests?.length ?? 0).fill(true);
  }, [ticketData?.quests]);

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

  const showOpenQuestUpsertDialog = (targetQuest?: Quest) => {
    setEditedQuest(targetQuest);
    setOpenQuestUpsertDialog(true);
  };

  const showOpenNumberEditDialog = (target: EVENT_COMPONENT_TARGET) => {
    setOpenNumberEditDialog(true);
    setEventComponentTarget(target);
  };

  const closeQuestUpsertDialog = () => {
    setEditedQuest(undefined);
    setOpenQuestUpsertDialog(false);
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

  const closeOpenNumberEditDialog = () => {
    setOpenNumberEditDialog(false);
    setEventComponentTarget(undefined);
  };

  const asyncUpdateRewardImageUrlByFile = async (file: File) => {
    showLoading();
    const includeQuestion =
      ticketData?.rewardPolicy?.context?.nftImageUrl?.includes("?");
    const base64Data = await asyncReadAsBase64Data(file);
    await asyncUploadImage(`reward/${file.name}`, base64Data);
    let nftImageUrl = `https://3ridge.s3.ap-northeast-2.amazonaws.com/reward/${file.name}`;
    if (!includeQuestion) {
      nftImageUrl += "?";
    }
    const rewardPolicy = { ...ticketData?.rewardPolicy };
    if (rewardPolicy?.context) {
      rewardPolicy.context.nftImageUrl = nftImageUrl;
    }
    const newRewardPolicy = convertToServerRewardPolicy(rewardPolicy);
    await asyncUpdateTicketRewardPolicy(newRewardPolicy);
    await asyncRefreshAll();
    closeLoading();
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
                  <_EventImage imageUrl={ticketData?.imageUrl}>
                    <InputButton
                      sx={{ top: -2, left: -2, width: 126, height: 126 }}
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
                  ></_EventTitle>
                  <_EventDateRange
                    ticketData={ticketData}
                    onClickForEdit={async (e) => {
                      showDateEditDialog(
                        EVENT_COMPONENT_TARGET.DATE_RANGE_TIME
                      );
                    }}
                  ></_EventDateRange>
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

            <_EventQuests
              ticketData={ticketData}
              userData={userData}
              verifiedList={verifiedList}
              onEditBtnClicked={(e, quest, index) => {
                showOpenQuestUpsertDialog(quest);
              }}
              onDeleteBtnClicked={async (e, quest, index) => {
                showLoading();
                if (quest?._id) await asyncDeleteQuest(quest?._id);
                await asyncRefreshAll();
                closeLoading();
              }}
            >
              <IconButton
                className={"MuiIconButton"}
                sx={{
                  position: "absolute",
                  top: `calc(100% + 32px)`,
                  left: `calc(50% - 16px)`,
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  borderWidth: 2,
                  borderStyle: "solid",
                }}
                onClick={(e) => {
                  showOpenQuestUpsertDialog(undefined);
                }}
              >
                <AddIcon fontSize={"large"}></AddIcon>
              </IconButton>
            </_EventQuests>
            <Box sx={{ padding: 1 }}></Box>
          </Stack>
        </Grid>
        <Grid item>
          <Stack
            direction={"column"}
            spacing={10}
            sx={{ minWidth: 260, padding: smUp ? 0 : 4 }}
          >
            <Stack direction={"column"} spacing={5}>
              <_EventRewardPolicy
                ticketData={ticketData}
                onClickForEdit={(e) => {
                  setOpenTicketRewardPolicyEditDialog(true);
                }}
              ></_EventRewardPolicy>
              <EventTimeBoard ticketData={ticketData}></EventTimeBoard>
              <EventRewardDescription
                ticketData={ticketData}
                eventRewardImageCompFunc={(ticketData) => {
                  return (
                    <_EventRewardImage ticketData={ticketData}>
                      <InputButton
                        sx={{
                          top: -2,
                          left: -2,
                          width: smUp ? 300 + 4 : 260 + 4,
                          height: smUp ? 300 + 4 : 260 + 4,
                          zIndex: theme.zIndex.drawer,
                        }}
                        onChanged={async (file: File) => {
                          await asyncUpdateRewardImageUrlByFile(file);
                        }}
                      ></InputButton>
                    </_EventRewardImage>
                  );
                }}
                eventRewardPointCompFunc={(ticketData) => {
                  return (
                    <_EventRewardPoint
                      ticketData={ticketData}
                      onClickForEdit={(e) => {
                        showOpenNumberEditDialog(EVENT_COMPONENT_TARGET.POINT);
                      }}
                    ></_EventRewardPoint>
                  );
                }}
              ></EventRewardDescription>
            </Stack>
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
        initBeginDate={DateUtil.parseStrToDate(ticketData?.beginTime ?? "")}
        initEndDate={DateUtil.parseStrToDate(ticketData?.untilTime ?? "")}
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
        content={dialogContent}
        onCloseBtnClicked={(e) => {
          closeOpenContentMetaDataEditDialog();
        }}
        onConfirmBtnClicked={async (data) => {
          showLoading();
          switch (eventComponentTarget) {
            case EVENT_COMPONENT_TARGET.DESCRIPTION:
              await asyncUpdateTicketDescription(data);
              break;
          }
          await asyncRefreshAll();
          closeOpenContentMetaDataEditDialog();
          closeLoading();
        }}
      ></ContentMetaDataEditDialog>
      <QuestUpsertEditDialog
        open={openQuestUpsertDialog}
        onCloseBtnClicked={(e) => {
          setOpenQuestUpsertDialog(false);
        }}
        editedQuest={editedQuest}
        onConfirmBtnClicked={async (
          questPolicy?: QuestPolicy,
          title_v2?: ContentMetadata,
          editedQuestId?: string
        ) => {
          showLoading();
          if (!editedQuestId) await asyncCreateQuest(title_v2, questPolicy);
          else await asyncUpdateQuest(editedQuestId, questPolicy, title_v2);
          await asyncRefreshAll();
          closeQuestUpsertDialog();
          closeLoading();
        }}
      ></QuestUpsertEditDialog>
      <TicketRewardPolicyEditDialog
        open={openTicketRewardPolicyEditDialog}
        title={"리워드 정책 편집"}
        defaultQuestPolicyType={ticketData?.rewardPolicy?.rewardPolicyType}
        onCloseBtnClicked={(e) => {
          setOpenTicketRewardPolicyEditDialog(false);
        }}
        onConfirmBtnClicked={async (_rewardPolicyType) => {
          showLoading();
          const rewardPolicy = { ...ticketData?.rewardPolicy };
          rewardPolicy.rewardPolicyType = _rewardPolicyType;
          const newRewardPolicy = convertToServerRewardPolicy(rewardPolicy);
          await asyncUpdateTicketRewardPolicy(newRewardPolicy);
          await asyncRefreshAll();
          setOpenTicketRewardPolicyEditDialog(false);
          closeLoading();
        }}
      ></TicketRewardPolicyEditDialog>
      <NumberEditDialog
        open={openNumberEditDialog}
        title={dialogTitle}
        onCloseBtnClicked={(e) => {
          closeOpenNumberEditDialog();
        }}
        minNumber={0}
        defaultNumber={numberEditDialogDefaultNumber}
        onConfirmBtnClicked={async (val) => {
          showLoading();
          const rewardPolicy = { ...ticketData?.rewardPolicy };
          rewardPolicy.rewardPoint = val;
          const newRewardPolicy = convertToServerRewardPolicy(rewardPolicy);
          await asyncUpdateTicketRewardPolicy(newRewardPolicy);
          await asyncRefreshAll();
          closeOpenNumberEditDialog();
          closeLoading();
        }}
      ></NumberEditDialog>
    </>
  );
};

Event.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default Event;
