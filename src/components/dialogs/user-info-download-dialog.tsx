import { Stack } from "@mui/material";
import React from "react";
import SecondaryButton from "../atomic/atoms/secondary-button";
import SimpleDialog, { SimpleDialogProps } from "./simple-dialog";
import UserInfoDownloadForm from "../form/user-info-download-form";
import { TicketUserQuery } from "../../type";

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
