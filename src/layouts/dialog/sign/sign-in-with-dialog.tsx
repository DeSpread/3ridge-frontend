import { Avatar, Stack } from "@mui/material";
import PrimaryButton from "../../../components/atoms/primary-button";
import React, { MouseEventHandler } from "react";
import EmailIcon from "../../../components/atoms/svg/email-icon";
import { useTheme } from "@mui/material/styles";
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
          구글로 로그인하기
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
          이메일로 로그인하기
        </PrimaryButton>
      </Stack>
    </>
  );
};

export default WithBaseSignInDialog(SignInWithDialogContent);
