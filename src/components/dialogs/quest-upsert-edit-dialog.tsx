import SimpleDialog, { SimpleDialogProps } from "./simple-dialog";
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import SecondaryButton from "../atomic/atoms/secondary-button";
import {
  ContentMetadata,
  QuestPolicy,
  QuestPolicyType,
} from "../../__generated__/graphql";
import { useTheme } from "@mui/material/styles";
import {
  Verify3ridgePointEditForm,
  VerifyEmailEditForm,
  VerifyHasWalletAddressEditForm,
  VerifyTelegramOrDiscordQuestEditForm,
  VerifyTwitterFollowEditForm,
  VerifyTwitterRetweetOrLinkingEditForm,
  VerifyVisitWebsiteEditForm,
} from "../form/quest/quest-edit-from";
import { Quest } from "../../type";

const QuestUpsertEditDialog = (
  props: {
    editedQuest?: Quest;
    onConfirmBtnClicked?: (
      questPolicy?: QuestPolicy,
      title_v2?: ContentMetadata,
      editedQuestId?: string
    ) => void;
  } & SimpleDialogProps
) => {
  const { editedQuest, onConfirmBtnClicked, ...rest } = props;
  const theme = useTheme();

  const [questPolicyType, setQuestPolicyType] = useState<QuestPolicyType>(
    QuestPolicyType.VerifyVisitWebsite
  );
  const [questPolicy, setQuestPolicy] = useState<QuestPolicy>();
  const [titleV2, setTitleV2] = useState<ContentMetadata>();

  useEffect(() => {
    if (editedQuest && editedQuest?.questPolicy?.questPolicy) {
      setQuestPolicyType(editedQuest?.questPolicy?.questPolicy);
    }
  }, [editedQuest]);

  const getPolicyLabel = (questPolicy: QuestPolicyType) => {
    switch (questPolicy) {
      case QuestPolicyType.VerifyTelegram:
        return "텔레그램 채널 가입하기";
      case QuestPolicyType.VerifyTwitterFollow:
        return "트위터 팔로우하기";
      case QuestPolicyType.VerifyTwitterRetweet:
        return "트위터 리트윗하기";
      case QuestPolicyType.VerifyTwitterLiking:
        return "트위터 좋아요하기";
      case QuestPolicyType.Verify_3RidgePoint:
        return "3ridge 포인트 보유하기";
      case QuestPolicyType.VerifyDiscord:
        return "디스코드 방문하기";
      case QuestPolicyType.VerifyEmail:
        return "이메일 연동 인증하기";
      case QuestPolicyType.VerifyHasWalletAddress:
        return "월렛 연동 인증하기";
      case QuestPolicyType.VerifyVisitWebsite:
        return "웹사이트 방문하기";
    }
    return "";
  };

  const dialogTitle = useMemo(() => {
    if (editedQuest && editedQuest?.questPolicy?.questPolicy) {
      return getPolicyLabel(editedQuest?.questPolicy?.questPolicy) + " 편집";
    }
    return "퀘스트 추가하기";
  }, [editedQuest]);

  const onChange = (questPolicy?: QuestPolicy, title_v2?: ContentMetadata) => {
    setQuestPolicy(questPolicy);
    setTitleV2(title_v2);
  };

  return (
    <SimpleDialog {...rest} title={dialogTitle} maxWidth={"sm"}>
      <Stack sx={{ marginTop: 1 }}>
        {!editedQuest && (
          <Stack
            sx={{ width: "100%", background: "" }}
            alignItems={"flex-start"}
          >
            <Box>
              <FormControl>
                <InputLabel>퀘스트 타입</InputLabel>
                <Select
                  value={questPolicyType}
                  label="퀘스트 타입"
                  onChange={(e) => {
                    const { value } = e.target;
                    //@ts-ignore
                    setQuestPolicyType(value);
                  }}
                  sx={{ minWidth: 180, background: "" }}
                >
                  <MenuItem value={QuestPolicyType.VerifyTwitterLiking}>
                    {getPolicyLabel(QuestPolicyType.VerifyTwitterLiking)}
                  </MenuItem>
                  <MenuItem value={QuestPolicyType.VerifyTwitterRetweet}>
                    {getPolicyLabel(QuestPolicyType.VerifyTwitterRetweet)}
                  </MenuItem>
                  <MenuItem value={QuestPolicyType.VerifyTwitterFollow}>
                    {getPolicyLabel(QuestPolicyType.VerifyTwitterFollow)}
                  </MenuItem>
                  <MenuItem value={QuestPolicyType.VerifyTelegram}>
                    {getPolicyLabel(QuestPolicyType.VerifyTelegram)}
                  </MenuItem>
                  <MenuItem value={QuestPolicyType.VerifyDiscord}>
                    {getPolicyLabel(QuestPolicyType.VerifyDiscord)}
                  </MenuItem>
                  <MenuItem value={QuestPolicyType.VerifyEmail}>
                    {getPolicyLabel(QuestPolicyType.VerifyEmail)}
                  </MenuItem>
                  <MenuItem value={QuestPolicyType.Verify_3RidgePoint}>
                    {getPolicyLabel(QuestPolicyType.Verify_3RidgePoint)}
                  </MenuItem>
                  <MenuItem value={QuestPolicyType.VerifyHasWalletAddress}>
                    {getPolicyLabel(QuestPolicyType.VerifyHasWalletAddress)}
                  </MenuItem>
                  <MenuItem value={QuestPolicyType.VerifyVisitWebsite}>
                    {getPolicyLabel(QuestPolicyType.VerifyVisitWebsite)}
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
        )}
        <Box
          sx={{
            width: "100%",
            marginTop: 2,
            borderWidth: 1,
            borderStyle: "solid",
            padding: 2,
            borderColor: theme.palette.neutral[700],
            borderRadius: 1,
          }}
        >
          {questPolicyType === QuestPolicyType.VerifyTelegram && (
            <VerifyTelegramOrDiscordQuestEditForm
              editedQuest={editedQuest}
              onChange={onChange}
              questPolicy={QuestPolicyType.VerifyTelegram}
            ></VerifyTelegramOrDiscordQuestEditForm>
          )}
          {questPolicyType === QuestPolicyType.VerifyTwitterFollow && (
            <VerifyTwitterFollowEditForm
              editedQuest={editedQuest}
              onChange={onChange}
            ></VerifyTwitterFollowEditForm>
          )}
          {questPolicyType === QuestPolicyType.VerifyTwitterRetweet && (
            <VerifyTwitterRetweetOrLinkingEditForm
              editedQuest={editedQuest}
              onChange={onChange}
              questPolicy={QuestPolicyType.VerifyTwitterRetweet}
            ></VerifyTwitterRetweetOrLinkingEditForm>
          )}
          {questPolicyType === QuestPolicyType.VerifyTwitterLiking && (
            <VerifyTwitterRetweetOrLinkingEditForm
              editedQuest={editedQuest}
              onChange={onChange}
              questPolicy={QuestPolicyType.VerifyTwitterLiking}
            ></VerifyTwitterRetweetOrLinkingEditForm>
          )}
          {questPolicyType === QuestPolicyType.Verify_3RidgePoint && (
            <Verify3ridgePointEditForm
              editedQuest={editedQuest}
              onChange={onChange}
            ></Verify3ridgePointEditForm>
          )}
          {questPolicyType === QuestPolicyType.VerifyDiscord && (
            <VerifyTelegramOrDiscordQuestEditForm
              editedQuest={editedQuest}
              onChange={onChange}
              questPolicy={QuestPolicyType.VerifyDiscord}
            ></VerifyTelegramOrDiscordQuestEditForm>
          )}
          {questPolicyType === QuestPolicyType.VerifyEmail && (
            <VerifyEmailEditForm
              editedQuest={editedQuest}
              onChange={onChange}
            ></VerifyEmailEditForm>
          )}
          {questPolicyType === QuestPolicyType.VerifyHasWalletAddress && (
            <VerifyHasWalletAddressEditForm
              editedQuest={editedQuest}
              onChange={onChange}
            ></VerifyHasWalletAddressEditForm>
          )}
          {questPolicyType === QuestPolicyType.VerifyVisitWebsite && (
            <VerifyVisitWebsiteEditForm
              editedQuest={editedQuest}
              onChange={onChange}
            ></VerifyVisitWebsiteEditForm>
          )}
        </Box>
        <Stack
          direction={"row"}
          justifyContent={"flex-end"}
          sx={{ marginTop: 3 }}
        >
          <SecondaryButton
            fullWidth={true}
            onClick={(e) => {
              e.preventDefault();
              onConfirmBtnClicked?.(questPolicy, titleV2, editedQuest?._id);
            }}
          >
            확인
          </SecondaryButton>
        </Stack>
      </Stack>
    </SimpleDialog>
  );
};

export default QuestUpsertEditDialog;
