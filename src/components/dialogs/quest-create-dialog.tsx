import SimpleDialog, { SimpleDialogProps } from "./simple-dialog";
import React, { useState } from "react";
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
import { QuestPolicyType } from "../../__generated__/graphql";
import { useTicketQuery } from "../../page-hook/ticket-query-hook";
import StyledOutlinedInput from "../atomic/atoms/styled/styled-outlined-input";
import { useTheme } from "@mui/material/styles";
import InputWithLabel from "../atomic/atoms/input-with-label";

const QuestCreateDialog = (
  props: {
    userId?: string;
    ticketId?: string;
    onConfirmBtnClicked?: (text?: string) => void;
    onChanged?: (text: string) => void;
  } & SimpleDialogProps
) => {
  const { ticketId, userId, ...rest } = props;
  const theme = useTheme();

  const {} = useTicketQuery({
    userId,
    id: ticketId,
  });

  const [telegramHandle, setTelegramHandle] = useState<string>();

  const [questPolicyType, setQuestPolicyType] = useState<QuestPolicyType>(
    QuestPolicyType.VerifyTelegram
  );

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
            <Stack spacing={1}>
              <InputWithLabel
                label={"텔레그램 핸들 (@없이 핸들만)"}
                value={telegramHandle}
                onChange={(e) => {
                  setTelegramHandle(e.target.value);
                }}
              ></InputWithLabel>
              <InputWithLabel
                label={"메세지"}
                value={telegramHandle}
                onChange={(e) => {
                  setTelegramHandle(e.target.value);
                }}
              ></InputWithLabel>
            </Stack>
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
