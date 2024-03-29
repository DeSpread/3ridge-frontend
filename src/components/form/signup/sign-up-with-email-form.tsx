import { Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { MouseEventHandler, PropsWithChildren, useState } from "react";

import { EmailSignUpEventParams, MouseEventWithParam } from "../../../types";
import StringUtil from "../../../util/string-util";
import LinkTypography from "../../atomic/atoms/link-typography";
import SecondaryButton from "../../atomic/atoms/secondary-button";
import MailTextField from "../../atomic/molecules/mail-text-field";
import {
  ConfirmPasswordTextField,
  ValidatedPasswordTextField,
} from "../../atomic/molecules/password-text-field";

type SignUpWithEmailFormProps = PropsWithChildren & {
  onClickSendVerification?: MouseEventHandler;
  onClickSignIn?: MouseEventHandler;
};

const SignUpWithEmailForm = (props: SignUpWithEmailFormProps) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isValidParams = () => {
    return (
      StringUtil.validateMail(mail) &&
      StringUtil.validatePassword(password) &&
      password === confirmPassword
    );
  };

  return (
    <>
      <Stack
        direction={"column"}
        sx={{
          background: "",
          minWidth: smUp ? "500px" : "80%",
          paddingTop: 12,
          marginBottom: 12,
        }}
        spacing={4}
      >
        <Typography textAlign={"left"} variant={"h5"}>
          이메일로 가입하기
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
            <ValidatedPasswordTextField
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder={"Password"}
            ></ValidatedPasswordTextField>
            {password && !StringUtil.validatePassword(password) && (
              <Typography
                variant={"body2"}
                sx={{ color: theme.palette.error.main }}
              >
                6글자 이상을 입력해 주세요
              </Typography>
            )}
          </Stack>
          <ConfirmPasswordTextField
            value={confirmPassword}
            password={password}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            placeholder={"Confirm Password"}
          ></ConfirmPasswordTextField>
          <Stack spacing={2}>
            <SecondaryButton
              disabled={!isValidParams()}
              onClick={(e) => {
                const myEvent =
                  {} as MouseEventWithParam<EmailSignUpEventParams>;
                myEvent.params = {
                  email: mail,
                  password,
                };
                props.onClickSendVerification?.(myEvent);
              }}
            >
              인증 메일 보내기
            </SecondaryButton>
            <Stack direction={"row"} justifyContent={"center"} spacing={1}>
              <Typography variant={"body2"}>이미 가입했나요?</Typography>
              <LinkTypography variant={"body2"} onClick={props.onClickSignIn}>
                로그인 하기
              </LinkTypography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default SignUpWithEmailForm;
