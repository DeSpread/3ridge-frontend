import { useTheme } from "@mui/material/styles";
import WithBaseSignInDialog, { SignDialogProps } from "./with-base-sign-dialog";
import { Stack } from "@mui/material";
import { DefaultPasswordTextField } from "../../../components/molecules/password-text-field";
import React, { MouseEventHandler, useState } from "react";
import MailTextField from "../../../components/molecules/mail-text-field";
import SecondaryButton from "../../../components/atoms/secondary-button";
import { EmailSignUpParams, MouseEventWithParam } from "../../../type";

type SignInWithEmailProps = SignDialogProps & {
  onSignInWithEmailClicked: MouseEventHandler;
};

const SignInWithDialogContent = (props: SignInWithEmailProps) => {
  const theme = useTheme();
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");

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
              const myEvent = {} as MouseEventWithParam<EmailSignUpParams>;
              // console.log(mail, password);
              myEvent.params = {
                email: mail,
                password,
              };
              props.onSignInWithEmailClicked?.(myEvent);
            }}
          >
            Sign In
          </SecondaryButton>
        </Stack>
      </Stack>
    </>
  );
};

export default WithBaseSignInDialog(SignInWithDialogContent);
