import SimpleDialog, { SimpleDialogProps } from "./simple-dialog";
import React, { useState } from "react";
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
import { TelegramQuestEditForm } from "../form/quest/quest-edit-from";

const QuestCreateDialog = (
  props: {
    onConfirmBtnClicked?: (
      questPolicy?: QuestPolicy,
      title_v2?: ContentMetadata
    ) => void;
  } & SimpleDialogProps
) => {
  const { onConfirmBtnClicked, ...rest } = props;
  const theme = useTheme();

  const [questPolicyType, setQuestPolicyType] = useState<QuestPolicyType>(
    QuestPolicyType.VerifyTelegram
  );
  const [questPolicy, setQuestPolicy] = useState<QuestPolicy>();
  const [titleV2, setTitleV2] = useState<ContentMetadata>();

  return (
    <SimpleDialog {...rest} maxWidth={"sm"}>
      <Stack sx={{ marginTop: 1 }}>
        <Stack sx={{ width: "100%", background: "" }} alignItems={"flex-start"}>
          <Box>
            <FormControl>
              <InputLabel>QuestType</InputLabel>
              <Select
                value={questPolicyType}
                label="QuestType"
                onChange={(e) => {
                  const { value } = e.target;
                  //@ts-ignore
                  setQuestPolicyType(value);
                }}
              >
                <MenuItem value={QuestPolicyType.VerifyTelegram}>
                  텔레그램 채널 방문하기
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
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
              onConfirmBtnClicked?.(questPolicy, titleV2);
            }}
          >
            확인
          </SecondaryButton>
        </Stack>
      </Stack>
    </SimpleDialog>
  );
};

export default QuestCreateDialog;
