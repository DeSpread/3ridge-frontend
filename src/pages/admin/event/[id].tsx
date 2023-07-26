import {
  Box,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { ReactElement, useEffect, useMemo, useState } from "react";
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
import { parseStrToDate } from "../../../util/date-util";
import EventDescription from "../../../components/pages/event/event-description";
import ContentMetaDataEditDialog from "../../../components/dialogs/content-meta-data-edit-dialog";
import ContentMetaDataRenderComponent from "../../../components/atomic/atoms/content-meta-data-render-component";
import {
  ContentEncodingType,
  ContentFormatType,
} from "../../../__generated__/graphql";
import EventQuests from "../../../components/pages/event/event-quests";
import AddIcon from "@mui/icons-material/Add";
import QuestCreateDialog from "../../../components/dialogs/quest-create-dialog";

const _EventDateRange = WithEditorContainer(EventDateRange);
const _EmptyBox = WithEditorContainer(EventEmptyBox);
const _EventImage = WithEditorContainer(EventImage);
const _EventTitle = WithEditorContainer(EventTitle);
const _EventDescription = WithEditorContainer(EventDescription);
const _EventQuests = WithEditorContainer(EventQuests);

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
  const [openQuestCreateDialog, setOpenQuestCreateDialog] = useState(false);
  const [textEditDefaultText, setTextEditDefaultText] = useState<string>();
  const [openDateEditDialog, setOpenDateEditDialog] = useState(false);
  const [eventComponentTarget, setEventComponentTarget] =
    useState<EVENT_COMPONENT_TARGET>();

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
  } = useTicketQuery({
    userId: userData._id,
    id: ticketId,
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
                      sx={{ top: 2, left: 2, width: 126, height: 126 }}
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
              onVerifyBtnClicked={async (e, quest, index) => {
                // await asyncVerifyQuest(e, quest, index);
              }}
              onStartBtnClicked={async (e, quest, index) => {
                // await asyncStartQuest(e, quest, index);
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
                  borderWidth: 1,
                  borderStyle: "solid",
                }}
                onClick={(e) => {
                  setOpenQuestCreateDialog(true);
                }}
              >
                <AddIcon fontSize={"large"}></AddIcon>
              </IconButton>
            </_EventQuests>
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
        content={dialogContent}
        onCloseBtnClicked={(e) => {
          closeOpenContentMetaDataEditDialog();
        }}
        onConfirmBtnClicked={async (data) => {
          showLoading();
          switch (eventComponentTarget) {
            case EVENT_COMPONENT_TARGET.DESCRIPTION:
              // console.log(data);
              await asyncUpdateTicketDescription(data);
              break;
          }
          await asyncRefreshAll();
          closeOpenContentMetaDataEditDialog();
          closeLoading();
        }}
      ></ContentMetaDataEditDialog>
      <QuestCreateDialog
        ticketId={ticketId}
        userId={userData?._id}
        open={openQuestCreateDialog}
        onCloseBtnClicked={(e) => {
          setOpenQuestCreateDialog(false);
        }}
      ></QuestCreateDialog>
    </>
  );
};

Event.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default Event;
