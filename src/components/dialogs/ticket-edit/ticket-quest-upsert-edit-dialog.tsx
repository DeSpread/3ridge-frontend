import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useMemo, useState } from "react";

import {
  ContentMetadata,
  QuestPolicy,
  QuestPolicyType,
} from "../../../__generated__/graphql";
import { Quest } from "../../../types";
import SecondaryButton from "../../atomic/atoms/secondary-button";
import SimpleDialog, { SimpleDialogProps } from "../simple-dialog";

import {
  Verify3ridgePointEditForm,
  VerifyAgreement,
  VerifyDiscordQuestEditForm,
  VerifyEmailEditForm,
  VerifyHasDiscordOrTelegramOrTwitter,
  VerifyHasWalletAddressEditForm,
  VerifyOnChainEditForm,
  VerifyQuiz,
  VerifyScreenShotForm,
  VerifySurveyEditForm,
  VerifyTelegramQuestEditForm,
  VerifyTwitterFollowEditForm,
  VerifyTwitterRetweetOrLinkingEditForm,
  VerifyVisitWebsiteEditForm,
} from "@/components/form/quest/quest-edit-from";

const TicketQuestUpsertEditDialog = (
  props: {
    editedQuest?: Quest;
    onConfirmBtnClicked?: (
      questPolicy?: QuestPolicy,
      title_v2?: ContentMetadata,
      editedQuestId?: string,
    ) => void;
  } & SimpleDialogProps,
) => {
  const { editedQuest, onConfirmBtnClicked, ...rest } = props;
  const theme = useTheme();

  const [questPolicyType, setQuestPolicyType] = useState<QuestPolicyType>(
    // QuestPolicyType.
    QuestPolicyType.Quiz,
  );
  const [questPolicy, setQuestPolicy] = useState<QuestPolicy>();
  const [titleV2, setTitleV2] = useState<ContentMetadata>();

  useEffect(() => {
    console.log("editedQuest", editedQuest);
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
      case QuestPolicyType.VerifyTwitterLinkingRetweet:
        return "트위터 좋아요 & 리트윗하기";
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
      case QuestPolicyType.VerifySurvey:
        return "설문";
      case QuestPolicyType.VerifyHasDiscord:
        return "디스코드 연동하기";
      case QuestPolicyType.VerifyHasTelegram:
        return "텔레그램 연동하기";
      case QuestPolicyType.VerifyHasTwitter:
        return "트위터 연동하기";
      case QuestPolicyType.Quiz:
        return "퀴즈";
      case QuestPolicyType.VerifyOnChain:
        return "온체인 활동";
      case QuestPolicyType.VerifyScreenshot:
        return "스크릿샷";
      case QuestPolicyType.VerifyAgreement:
        return "동의하기";
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
                  <MenuItem value={QuestPolicyType.VerifyTwitterFollow}>
                    {getPolicyLabel(QuestPolicyType.VerifyTwitterFollow)}
                  </MenuItem>
                  <MenuItem value={QuestPolicyType.VerifyTwitterLiking}>
                    {getPolicyLabel(QuestPolicyType.VerifyTwitterLiking)}
                  </MenuItem>
                  <MenuItem value={QuestPolicyType.VerifyTwitterRetweet}>
                    {getPolicyLabel(QuestPolicyType.VerifyTwitterRetweet)}
                  </MenuItem>
                  <MenuItem value={QuestPolicyType.VerifyTwitterLinkingRetweet}>
                    {getPolicyLabel(
                      QuestPolicyType.VerifyTwitterLinkingRetweet,
                    )}
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
                  <MenuItem value={QuestPolicyType.VerifySurvey}>
                    {getPolicyLabel(QuestPolicyType.VerifySurvey)}
                  </MenuItem>
                  <MenuItem value={QuestPolicyType.VerifyHasDiscord}>
                    {getPolicyLabel(QuestPolicyType.VerifyHasDiscord)}
                  </MenuItem>
                  <MenuItem value={QuestPolicyType.VerifyHasTelegram}>
                    {getPolicyLabel(QuestPolicyType.VerifyHasTelegram)}
                  </MenuItem>
                  <MenuItem value={QuestPolicyType.VerifyHasTwitter}>
                    {getPolicyLabel(QuestPolicyType.VerifyHasTwitter)}
                  </MenuItem>
                  <MenuItem value={QuestPolicyType.Quiz}>
                    {getPolicyLabel(QuestPolicyType.Quiz)}
                  </MenuItem>
                  <MenuItem value={QuestPolicyType.VerifyOnChain}>
                    {getPolicyLabel(QuestPolicyType.VerifyOnChain)}
                  </MenuItem>
                  <MenuItem value={QuestPolicyType.VerifyScreenshot}>
                    {getPolicyLabel(QuestPolicyType.VerifyScreenshot)}
                  </MenuItem>
                  <MenuItem value={QuestPolicyType.VerifyAgreement}>
                    {getPolicyLabel(QuestPolicyType.VerifyAgreement)}
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
            <VerifyTelegramQuestEditForm
              editedQuest={editedQuest}
              onChange={onChange}
            ></VerifyTelegramQuestEditForm>
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
          {questPolicyType === QuestPolicyType.VerifyTwitterLinkingRetweet && (
            <VerifyTwitterRetweetOrLinkingEditForm
              editedQuest={editedQuest}
              onChange={onChange}
              questPolicy={QuestPolicyType.VerifyTwitterLinkingRetweet}
            ></VerifyTwitterRetweetOrLinkingEditForm>
          )}
          {questPolicyType === QuestPolicyType.Verify_3RidgePoint && (
            <Verify3ridgePointEditForm
              editedQuest={editedQuest}
              onChange={onChange}
            ></Verify3ridgePointEditForm>
          )}
          {questPolicyType === QuestPolicyType.VerifyDiscord && (
            <VerifyDiscordQuestEditForm
              editedQuest={editedQuest}
              onChange={onChange}
            ></VerifyDiscordQuestEditForm>
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
          {questPolicyType === QuestPolicyType.VerifySurvey && (
            <VerifySurveyEditForm
              editedQuest={editedQuest}
              onChange={onChange}
            ></VerifySurveyEditForm>
          )}
          {questPolicyType === QuestPolicyType.VerifyHasDiscord && (
            <VerifyHasDiscordOrTelegramOrTwitter
              editedQuest={editedQuest}
              onChange={onChange}
              questPolicy={QuestPolicyType.VerifyHasDiscord}
            ></VerifyHasDiscordOrTelegramOrTwitter>
          )}
          {questPolicyType === QuestPolicyType.VerifyHasTelegram && (
            <VerifyHasDiscordOrTelegramOrTwitter
              editedQuest={editedQuest}
              onChange={onChange}
              questPolicy={QuestPolicyType.VerifyHasTelegram}
            ></VerifyHasDiscordOrTelegramOrTwitter>
          )}
          {questPolicyType === QuestPolicyType.VerifyHasTwitter && (
            <VerifyHasDiscordOrTelegramOrTwitter
              editedQuest={editedQuest}
              onChange={onChange}
              questPolicy={QuestPolicyType.VerifyHasTwitter}
            ></VerifyHasDiscordOrTelegramOrTwitter>
          )}
          {questPolicyType === QuestPolicyType.Quiz && (
            <VerifyQuiz
              editedQuest={editedQuest}
              onChange={onChange}
            ></VerifyQuiz>
          )}
          {questPolicyType === QuestPolicyType.VerifyOnChain && (
            <VerifyOnChainEditForm
              editedQuest={editedQuest}
              onChange={onChange}
            ></VerifyOnChainEditForm>
          )}
          {questPolicyType === QuestPolicyType.VerifyScreenshot && (
            <VerifyScreenShotForm
              editedQuest={editedQuest}
              onChange={onChange}
            ></VerifyScreenShotForm>
          )}
          {questPolicyType === QuestPolicyType.VerifyAgreement && (
            <VerifyAgreement
              editedQuest={editedQuest}
              onChange={onChange}
            ></VerifyAgreement>
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

export default TicketQuestUpsertEditDialog;
