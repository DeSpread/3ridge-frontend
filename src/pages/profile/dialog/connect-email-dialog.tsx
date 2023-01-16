import {
  Box,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { MouseEventHandler, useState } from "react";
import SignUpWithEmailForm from "../../signup/components/sign-up-with-email-form";
import VerifyYourEmailForm from "../../../components/organisms/verify-your-email-form";
import SendVerificationEmailForm from "../../../components/organisms/send-verification-email-form";
import {
  EmailSignUpParams,
  MAIL_VERIFY,
  MouseEventWithParam,
  ObjectValues,
  SuccessErrorCallback,
  Z_INDEX_OFFSET,
} from "../../../type";
import { useLogin } from "../../../provider/login/login-provider";
import { APP_ERROR_MESSAGE, getErrorMessage } from "../../../error/my-error";
import { useLoading } from "../../../provider/loading/loading-provider";

export const CONNECT_MAIL_DIALOG_FORM_TYPE = {
  SEND_EMAIL: "SEND_EMAIL",
  VERIFY_EMAIL: "VERIFY_EMAIL",
} as const;

export type ConnectMailDialogFormType = ObjectValues<
  typeof CONNECT_MAIL_DIALOG_FORM_TYPE
>;

type ConnectEmailDialogProps = DialogProps & {
  onClickSendVerification: MouseEventHandler;
  formType: ConnectMailDialogFormType;
  email: string;
  onClickResendVerification: MouseEventHandler;
  onClickSignIn: MouseEventHandler;
};

const ConnectEmailDialog = (props: ConnectEmailDialogProps) => {
  return (
    <Dialog {...props} sx={{ zIndex: Z_INDEX_OFFSET.DIALOG }}>
      <DialogTitle>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography textAlign={"left"} variant={"h6"}>
            {props.title}
          </Typography>
          <IconButton
            sx={{ borderRadius: 32, marginRight: -1 }}
            // onClick={props.onCloseBtnClicked}
          >
            <CloseIcon></CloseIcon>
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ marginTop: -4, marginBottom: 0 }}>
          {props.formType === CONNECT_MAIL_DIALOG_FORM_TYPE.SEND_EMAIL && (
            <SendVerificationEmailForm
              onClickSendVerification={(e) => {
                props.onClickSendVerification(e);
              }}
            ></SendVerificationEmailForm>
          )}
          {props.formType === CONNECT_MAIL_DIALOG_FORM_TYPE.VERIFY_EMAIL && (
            <VerifyYourEmailForm
              email={props.email}
              onClickResendVerification={(e) => {}}
              onClickSignIn={(e) => {}}
            ></VerifyYourEmailForm>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectEmailDialog;
