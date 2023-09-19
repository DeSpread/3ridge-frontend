import {
  Box,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { ReactElement, useMemo, useState } from "react";
import MainLayout from "../../../layouts/main-layout";
import Head from "next/head";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import EventImage from "../../../components/pages/event/event-image";
import WithEditorContainer from "../../../hoc/with-editor-container";
import FileUtil from "../../../util/file-util";
import { useLoading } from "../../../provider/loading/loading-provider";
import EventTitle from "../../../components/pages/event/event-title";
import EventEmptyBox from "../../../components/pages/event/event-empty-box";
import InputButton from "../../../components/atomic/molecules/input-button";
import TextEditDialog from "../../../components/dialogs/text-edit-dialog";
import EventDateRange from "../../../components/pages/event/event-date-range";
import TicketDateEditDialog from "../../../components/dialogs/ticket-edit/ticket-date-range-edit-dialog";
import DateUtil from "../../../util/date-util";
import EventDescription from "../../../components/pages/event/event-description";
import ContentMetaDataEditDialog from "../../../components/dialogs/content-meta-data-edit-dialog";
import { ContentMetadata, QuestPolicy } from "../../../__generated__/graphql";
import EventQuests from "../../../components/pages/event/event-quests";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TicketQuestUpsertEditDialog from "../../../components/dialogs/ticket-edit/ticket-quest-upsert-edit-dialog";
import { Quest } from "../../../types";
import EventRewardPolicy from "../../../components/pages/event/reward/event-reward-policy";
import EventTimeBoard from "../../../components/pages/event/event-time-board";
import EventRewardDescription from "../../../components/pages/event/reward/event-reward-description";
import EventRewardImage from "../../../components/pages/event/reward/description/event-reward-image";
import TicketRewardPolicyEditDialog from "../../../components/dialogs/ticket-edit/ticket-reward-policy-edit-dialog";
import TypeHelper from "../../../helper/type-helper";
import NumberEditDialog from "../../../components/dialogs/number-edit-dialog";
import EventRewardPoint from "../../../components/pages/event/reward/description/event-reward-point";
import EventRewardLimitNumber from "../../../components/pages/event/reward/description/event-reward-limit-number";
import EventRewardChainContent from "../../../components/pages/event/reward/description/event-reward-chain-content";
import EventRewardName from "../../../components/pages/event/reward/description/event-reward-name";
import TicketRewardChainContentEditDialog from "../../../components/dialogs/ticket-edit/ticket-reward-chain-content-edit-dialog";
import Draggable from "react-draggable";

import { useSignedUserQuery } from "../../../hooks/signed-user-query-hook";
import { useTicketQuery } from "../../../hooks/ticket-query-hook";
import useSimpleStorage from "../../../hooks/simple-storage-hook";
import TicketEditControllerWidget from "../../../components/widget/ticket-edit-controller-widget";
import EventParticipants from "../../../components/pages/event/event-participants";
import UserInfoDownloadDialog from "../../../components/dialogs/user-info-download-dialog";
import RouterUtil from "../../../util/router-util";
import { useProjectsQuery } from "../../../hooks/projects-query-hook";

const _EventRewardPolicy = WithEditorContainer(EventRewardPolicy);
const _EventDateRange = WithEditorContainer(EventDateRange);
const _EmptyBox = WithEditorContainer(EventEmptyBox);
const _EventImage = WithEditorContainer(EventImage);
const _EventTitle = WithEditorContainer(EventTitle);
const _EventDescription = WithEditorContainer(EventDescription);
const _EventQuests = WithEditorContainer(EventQuests);
const _EventRewardImage = WithEditorContainer(EventRewardImage);
const _EventRewardPoint = WithEditorContainer(EventRewardPoint);
const _EventRewardLimitNumber = WithEditorContainer(EventRewardLimitNumber);
const _EventRewardChainContent = WithEditorContainer(EventRewardChainContent);
const _EventRewardName = WithEditorContainer(EventRewardName);

enum EVENT_COMPONENT_TARGET {
  "TITLE",
  "DATE_RANGE_TIME",
  "DESCRIPTION",
  "POINT",
  "LIMIT_NUMBER",
  "REWARD_NAME",
}

const Event = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  const router = useRouter();

  const { userData } = useSignedUserQuery();
  const { asyncUploadImage } = useSimpleStorage();
  const { showLoading, closeLoading } = useLoading();
  const { projectsData } = useProjectsQuery({});

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
  const [
    openTicketRewardChainContentEditDialog,
    setOpenTicketRewardChainContentEditDialog,
  ] = useState(false);
  const [openUserInfoDownloadDialog, setOpenUserInfoDownloadDialog] =
    useState(false);

  const [eventComponentTarget, setEventComponentTarget] =
    useState<EVENT_COMPONENT_TARGET>();
  const [editedQuest, setEditedQuest] = useState<Quest>();

  const ticketId = RouterUtil.getStringQuery(router, "id");

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
    asyncUpdateTicketProject,
    asyncUpdateTicketRewardPolicy,
    asyncDownloadCompletedUserFile,
    asyncDownloadQuestDataFile,
    asyncUpdateTicketVisibleById,
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
      case EVENT_COMPONENT_TARGET.LIMIT_NUMBER:
        return "이벤트 대상자 수 편집";
      case EVENT_COMPONENT_TARGET.REWARD_NAME:
        return "이벤트 리워드 이름 편집";
    }
  }, [eventComponentTarget]);

  const dialogDefaultText = useMemo(() => {
    switch (eventComponentTarget) {
      case EVENT_COMPONENT_TARGET.TITLE:
        return ticketData?.title;
      case EVENT_COMPONENT_TARGET.REWARD_NAME:
        return ticketData?.rewardPolicy?.context?.rewardName;
    }
  }, [eventComponentTarget]);

  const numberEditDialogDefaultNumber = useMemo(() => {
    if (eventComponentTarget === EVENT_COMPONENT_TARGET.POINT)
      return ticketData?.rewardPolicy?.rewardPoint ?? 0;
    else if (eventComponentTarget === EVENT_COMPONENT_TARGET.LIMIT_NUMBER)
      return ticketData?.rewardPolicy?.context?.limitNumber;
    return 0;
  }, [eventComponentTarget]);

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

  const showTextEditDialog = (target: EVENT_COMPONENT_TARGET) => {
    setOpenTextEditDialog(true);
    setEventComponentTarget(target);
  };

  const showDateEditDialog = (target: EVENT_COMPONENT_TARGET) => {
    setOpenDateEditDialog(true);
    setEventComponentTarget(target);
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

  const showOpenTicketRewardChainContentEditDialog = () => {
    setOpenTicketRewardChainContentEditDialog(true);
  };

  const showOpenUserInfoDownloadDialog = (targetQuest?: Quest) => {
    setEditedQuest(targetQuest);
    setOpenUserInfoDownloadDialog(true);
  };

  const closeOpenUserInfoDownloadDialog = () => {
    setEditedQuest(undefined);
    setOpenUserInfoDownloadDialog(false);
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

  const closeOpenTicketRewardChainContentEditDialog = () => {
    setOpenTicketRewardChainContentEditDialog(false);
  };

  const asyncUpdateRewardImageUrlByFile = async (file: File) => {
    showLoading();
    const includeQuestion =
      ticketData?.rewardPolicy?.context?.nftImageUrl?.includes("?");
    const base64Data = await FileUtil.asyncReadAsBase64Data(file);
    await asyncUploadImage(`reward/${file.name}`, base64Data);
    let nftImageUrl = `https://3ridge.s3.ap-northeast-2.amazonaws.com/reward/${file.name}`;
    if (!includeQuestion) {
      nftImageUrl += "?";
    }
    const rewardPolicy = { ...ticketData?.rewardPolicy };
    if (rewardPolicy?.context) {
      rewardPolicy.context.nftImageUrl = nftImageUrl;
    }
    const newRewardPolicy =
      TypeHelper.convertToServerRewardPolicy(rewardPolicy);
    await asyncUpdateTicketRewardPolicy(newRewardPolicy);
    await asyncRefreshAll();
    closeLoading();
  };

  const asyncUpdateImageUrlByFile = async (file: File) => {
    showLoading();
    const includeQuestion = ticketData?.imageUrl?.includes("?");
    const base64Data = await FileUtil.asyncReadAsBase64Data(file);
    const ext = FileUtil.getFileExtension(file);
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
                      showTextEditDialog(EVENT_COMPONENT_TARGET.TITLE);
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

            <Stack>
              <EventQuests
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
                onExtractDataBtnClicked={async (e, quest, index) => {
                  showOpenUserInfoDownloadDialog(quest);
                }}
              ></EventQuests>
              <Stack sx={{ width: "100%", marginTop: 4 }} alignItems={"center"}>
                <IconButton
                  className={"MuiIconButton"}
                  sx={{
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
                  <AddIcon
                    fontSize={"large"}
                    sx={{
                      borderRadius: 30,
                      "&:hover": {
                        borderColor: theme.palette.secondary.main,
                        background: "#61E1FF55",
                      },
                    }}
                  ></AddIcon>
                </IconButton>
              </Stack>
            </Stack>
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
                eventRewardLimitNumberCompFunc={(ticketData) => {
                  return (
                    <_EventRewardLimitNumber
                      ticketData={ticketData}
                      onClickForEdit={(e) => {
                        showOpenNumberEditDialog(
                          EVENT_COMPONENT_TARGET.LIMIT_NUMBER
                        );
                      }}
                    ></_EventRewardLimitNumber>
                  );
                }}
                eventRewardNameCompFunc={(ticketData) => {
                  return (
                    <_EventRewardName
                      onClickForEdit={async (e) => {
                        showTextEditDialog(EVENT_COMPONENT_TARGET.REWARD_NAME);
                      }}
                      ticketData={ticketData}
                    ></_EventRewardName>
                  );
                }}
                eventRewardChainContentCompFunc={(ticketData) => {
                  return (
                    <_EventRewardChainContent
                      ticketData={ticketData}
                      onClickForEdit={async (e) => {
                        showOpenTicketRewardChainContentEditDialog();
                      }}
                    ></_EventRewardChainContent>
                  );
                }}
              ></EventRewardDescription>
              <EventParticipants ticketData={ticketData}></EventParticipants>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <div style={{ position: "absolute", left: 0, top: 64 + 8 }}>
        <div style={{ position: "absolute", top: 16, left: 32 }}>
          <Stack direction={"row"} alignItems={"center"}>
            <IconButton
              onClick={async (e) => {
                showLoading();
                await router.push("/admin");
                closeLoading();
              }}
              sx={{
                borderRadius: 32,
                width: 36,
                height: 36,
                borderWidth: 2,
                borderStyle: "solid",
                "&:hover": {
                  borderColor: theme.palette.secondary.main,
                  background: "#61E1FF55",
                },
              }}
            >
              <ArrowBackIcon></ArrowBackIcon>
            </IconButton>
            <Typography variant={"h6"} sx={{ marginLeft: 2 }} noWrap>
              ADMIN으로 돌아가기
            </Typography>
          </Stack>
          {/*<PrimaryButton*/}
          {/*  startIcon={ <ArrowBackIcon></ArrowBackIcon>}*/}
          {/*>explore</PrimaryButton>*/}
        </div>
      </div>

      <div style={{ position: "absolute", right: -380, top: 64 + 8 }}>
        <Draggable defaultPosition={{ x: -380, y: 0 }}>
          <div className="box">
            <TicketEditControllerWidget
              targetTicket={ticketData}
              onDownloadButtonClick={async (res) => {
                await asyncDownloadCompletedUserFile(
                  res,
                  `${ticketData?.title}.csv`
                );
              }}
              projects={projectsData}
              onProjectChanged={async (projectId) => {
                try {
                  showLoading();
                  // console.log("projectId", projectId);
                  await asyncUpdateTicketProject(projectId);
                  // console.log("projectId - finish");
                } catch (e) {
                  console.log(e);
                } finally {
                  closeLoading();
                }
              }}
              onVisibilityChanged={async (visible) => {
                showLoading();
                await asyncUpdateTicketVisibleById(visible);
                await asyncRefreshAll();
                closeLoading();
              }}
            ></TicketEditControllerWidget>
          </div>
        </Draggable>
      </div>

      {/* --- Dialogs ---- */}

      <TextEditDialog
        open={openTextEditDialog}
        title={dialogTitle}
        defaultText={dialogDefaultText}
        onCloseBtnClicked={(e) => {
          closeTextEditDialog();
        }}
        onConfirmBtnClicked={async (text) => {
          showLoading();
          switch (eventComponentTarget) {
            case EVENT_COMPONENT_TARGET.TITLE:
              await asyncUpdateTitle(text);
              break;
            case EVENT_COMPONENT_TARGET.REWARD_NAME: {
              const rewardPolicy = { ...ticketData?.rewardPolicy };
              if (rewardPolicy.context) rewardPolicy.context.rewardName = text;
              const newRewardPolicy =
                TypeHelper.convertToServerRewardPolicy(rewardPolicy);
              await asyncUpdateTicketRewardPolicy(newRewardPolicy);
              break;
          }
          await asyncRefreshAll();
          closeTextEditDialog();
          closeLoading();
        }}
      ></TextEditDialog>
      <TicketDateEditDialog
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
      ></TicketDateEditDialog>
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
      <TicketQuestUpsertEditDialog
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
      ></TicketQuestUpsertEditDialog>
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
          const newRewardPolicy =
            TypeHelper.convertToServerRewardPolicy(rewardPolicy);
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
          if (eventComponentTarget === EVENT_COMPONENT_TARGET.POINT) {
            rewardPolicy.rewardPoint = val;
          } else if (
            eventComponentTarget === EVENT_COMPONENT_TARGET.LIMIT_NUMBER &&
            rewardPolicy.context
          ) {
            rewardPolicy.context.limitNumber = val ?? 0;
          }
          const newRewardPolicy =
            TypeHelper.convertToServerRewardPolicy(rewardPolicy);
          await asyncUpdateTicketRewardPolicy(newRewardPolicy);
          await asyncRefreshAll();
          closeOpenNumberEditDialog();
          closeLoading();
        }}
      ></NumberEditDialog>
      <TicketRewardChainContentEditDialog
        open={openTicketRewardChainContentEditDialog}
        title={"이벤트 리워드 체인 편집"}
        defaultTicketData={ticketData}
        onCloseBtnClicked={(e) => {
          closeOpenTicketRewardChainContentEditDialog();
        }}
        onConfirmBtnClicked={async (res) => {
          showLoading();
          const {
            rewardChain,
            rewardClaimable,
            rewardUnit,
            overrideRewardChainContent,
            contractInfo,
          } = res;
          const rewardPolicy = { ...ticketData?.rewardPolicy };
          if (rewardPolicy.context) {
            rewardPolicy.context.rewardChain = rewardChain ?? "";
            rewardPolicy.context.rewardClaimable = rewardClaimable;
            rewardPolicy.context.rewardUnit = rewardUnit ?? "";
            rewardPolicy.context.overrideRewardChainContent =
              overrideRewardChainContent;
            if (contractInfo)
              rewardPolicy.context.contractInfo = { ...contractInfo };
          }
          const newRewardPolicy =
            TypeHelper.convertToServerRewardPolicy(rewardPolicy);
          await asyncUpdateTicketRewardPolicy(newRewardPolicy);
          await asyncRefreshAll();
          closeOpenTicketRewardChainContentEditDialog();
          closeLoading();
        }}
      ></TicketRewardChainContentEditDialog>
      <UserInfoDownloadDialog
        open={openUserInfoDownloadDialog}
        title={"설문 유저 답변 다운로드"}
        onCloseBtnClicked={(e) => {
          closeOpenUserInfoDownloadDialog();
        }}
        onConfirmBtnClicked={async (ticketUserQuery) => {
          if (editedQuest && ticketUserQuery) {
            await asyncDownloadQuestDataFile(
              editedQuest?._id,
              ticketUserQuery,
              `${editedQuest?.title_v2?.content}.csv`
            );
          }
        }}
      ></UserInfoDownloadDialog>
    </>
  );
};

Event.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default Event;
