import { Stack } from "@mui/material";
import React from "react";

import { TicketUserQuery } from "../../types";
import SecondaryButton from "../atomic/atoms/secondary-button";
import UserInfoDownloadForm from "../form/user-info-download-form";

import SimpleDialog, { SimpleDialogProps } from "./simple-dialog";

const UserInfoDownloadDialog = (
  props: {
    onConfirmBtnClicked?: (ticketUserQuery?: TicketUserQuery) => void;
    onChanged?: (text: string) => void;
    defaultText?: string;
  } & SimpleDialogProps
) => {
  const { defaultText, onConfirmBtnClicked, ...rest } = props;

  return (
    <SimpleDialog {...rest} maxWidth={"sm"}>
      <Stack sx={{ marginTop: 1 }}>
        <UserInfoDownloadForm
          title={"유저 정보 선택"}
          onDownloadButtonClick={(res) => {
            onConfirmBtnClicked?.(res);
          }}
        ></UserInfoDownloadForm>
      </Stack>
    </SimpleDialog>
  );
};

export default UserInfoDownloadDialog;
