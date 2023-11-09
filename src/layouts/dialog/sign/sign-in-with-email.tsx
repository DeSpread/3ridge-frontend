import { Stack } from "@mui/material";
import React, { MouseEventHandler, useMemo, useState } from "react";

import SecondaryButton from "../../../components/atomic/atoms/secondary-button";
import MailTextField from "../../../components/atomic/molecules/mail-text-field";
import { DefaultPasswordTextField } from "../../../components/atomic/molecules/password-text-field";
import { EmailSignUpEventParams, MouseEventWithParam } from "../../../types";
import StringUtil from "../../../util/string-util";

import WithBaseSignInDialog, { SignDialogProps } from "./with-base-sign-dialog";

type SignInWithEmailProps = SignDialogProps & {
  onSignInWithEmailClicked: MouseEventHandler;
};

const SignInWithDialogContent = (props: SignInWithEmailProps) => {
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");

  const buttonDisabled = useMemo(() => {
    return (mail ? true : false) && !StringUtil.validateMail(mail);
  }, [mail]);

  return (
    <>
      <Stack sx={{ width: "100%" }} spacing={8}>
        <Stack sx={{ width: "100%" }} spacing={2}>
          <MailTextField
            value={mail}
            onChange={(e) => {
              setMail(e.target.value);
            }}
            placeholder={"Email Address"}
          ></MailTextField>
          <DefaultPasswordTextField
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder={"Password"}
            isValid={true}
          ></DefaultPasswordTextField>
        </Stack>
        <Stack spacing={2}>
          <SecondaryButton
            onClick={(e) => {
              const myEvent = {} as MouseEventWithParam<EmailSignUpEventParams>;
              myEvent.params = {
                email: mail,
                password,
              };
              props.onSignInWithEmailClicked?.(myEvent);
            }}
            disabled={buttonDisabled}
          >
            로그인 하기
          </SecondaryButton>
        </Stack>
      </Stack>
    </>
  );
};

export default WithBaseSignInDialog(SignInWithDialogContent);
