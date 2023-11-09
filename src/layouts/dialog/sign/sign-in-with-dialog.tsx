import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { MouseEventHandler } from "react";

import PrimaryButton from "../../../components/atomic/atoms/primary-button";
import EmailIcon from "../../../components/atomic/atoms/svg/email-icon";


import WithBaseSignInDialog, { SignDialogProps } from "./with-base-sign-dialog";

type SignInWithDialogProps = SignDialogProps & {
  onSignInWithGoogleClicked: MouseEventHandler;
  onSignInWithEmailClicked: MouseEventHandler;
};

const SignInWithDialogContent = (props: SignInWithDialogProps) => {
  const theme = useTheme();

  return (
    <>
      <Stack sx={{ width: "100%" }} spacing={3}>
        <PrimaryButton
          startIcon={
            <Avatar
              src={"https://nftbank.ai/static/images/google-28.svg"}
              sx={{
                width: 24,
                height: 24,
                marginRight: 1,
              }}
            ></Avatar>
          }
          onClick={props.onSignInWithGoogleClicked}
        >
          <Stack sx={{ width: 120 }} alignItems={"center"} direction={"row"}>
            <Typography
              className={"MuiTypography"}
              variant={"body2"}
              sx={{
                color: theme.palette.neutral["600"],
              }}
            >
              구글로 로그인하기
            </Typography>
          </Stack>
        </PrimaryButton>
        <PrimaryButton
          startIcon={
            <Avatar
              sx={{
                width: 24,
                height: 24,
                //@ts-ignore
                background: theme.palette.neutral["400"],
                marginRight: 1,
              }}
            >
              <EmailIcon></EmailIcon>
            </Avatar>
          }
          onClick={props.onSignInWithEmailClicked}
        >
          <Stack sx={{ width: 120 }} alignItems={"center"} direction={"row"}>
            <Typography
              className={"MuiTypography"}
              variant={"body2"}
              sx={{
                color: theme.palette.neutral["600"],
              }}
            >
              이메일로 로그인하기
            </Typography>
          </Stack>
        </PrimaryButton>
      </Stack>
    </>
  );
};

export default WithBaseSignInDialog(SignInWithDialogContent);
