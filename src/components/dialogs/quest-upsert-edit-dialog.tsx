import SimpleDialog, { SimpleDialogProps } from "./simple-dialog";
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import SecondaryButton from "../atomic/atoms/secondary-button";
import {
  ContentMetadata,
  QuestPolicy,
  QuestPolicyType,
} from "../../__generated__/graphql";
import { useTheme } from "@mui/material/styles";
import { TelegramQuestEditForm } from "../form/quest/quest-edit-from";
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
    QuestPolicyType.VerifyTelegram
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
        return "텔레그램 채널 방문하기";
    }
    return "";
  };

  const dialogTitle = useMemo(() => {
    if (editedQuest && editedQuest?.questPolicy?.questPolicy) {
      return getPolicyLabel(editedQuest?.questPolicy?.questPolicy) + " 편집";
    }
    return "퀘스트 추가하기";
  }, [editedQuest]);

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
                  <MenuItem value={QuestPolicyType.VerifyTelegram}>
                    {getPolicyLabel(QuestPolicyType.VerifyTelegram)}
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
        )}
        {/*{editedQuest && (*/}
        {/*  <Stack*/}
        {/*    sx={{ width: "100%", background: "" }}*/}
        {/*    alignItems={"flex-start"}*/}
        {/*  >*/}
        {/*    <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>*/}
        {/*      <Typography>{dialogTitle}</Typography>*/}
        {/*    </Box>*/}
        {/*  </Stack>*/}
        {/*)}*/}
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
            <TelegramQuestEditForm
              editedQuest={editedQuest}
              onChange={(
                questPolicy?: QuestPolicy,
                title_v2?: ContentMetadata
              ) => {
                setQuestPolicy(questPolicy);
                setTitleV2(title_v2);
              }}
            ></TelegramQuestEditForm>
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
