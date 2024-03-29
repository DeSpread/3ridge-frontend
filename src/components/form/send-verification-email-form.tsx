import { Stack, Typography } from "@mui/material";
import React, { MouseEventHandler, PropsWithChildren, useState } from "react";

import { EmailSignUpEventParams, MouseEventWithParam } from "../../types";
import StringUtil from "../../util/string-util";
import SecondaryButton from "../atomic/atoms/secondary-button";
import MailTextField from "../atomic/molecules/mail-text-field";


type SendVerificationEmailFormProps = PropsWithChildren & {
  onClickSendVerification?: MouseEventHandler;
};

const SendVerificationEmailForm = (props: SendVerificationEmailFormProps) => {
  const [mail, setMail] = useState("");

  return (
    <>
      <Stack
        direction={"column"}
        sx={{
          background: "",
          minWidth: "500px",
          paddingTop: 12,
          marginBottom: 12,
        }}
        spacing={4}
      >
        <Typography textAlign={"left"} variant={"h5"}>
          인증 메일 보내기
        </Typography>
        <Stack spacing={4}>
          <MailTextField
            value={mail}
            onChange={(e) => {
              setMail(e.target.value);
            }}
            placeholder={"Email Address"}
          ></MailTextField>
          <Stack spacing={2}>
            <SecondaryButton
              disabled={!StringUtil.validateMail(mail)}
              onClick={(e) => {
                const myEvent =
                  {} as MouseEventWithParam<EmailSignUpEventParams>;
                myEvent.params = {
                  email: mail,
                  password: "",
                };
                props.onClickSendVerification?.(myEvent);
              }}
            >
              인증 메일 보내기
            </SecondaryButton>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default SendVerificationEmailForm;
