import { Avatar, Stack } from "@mui/material";
import PrimaryButton from "../../../atoms/primary-button";
import React, { MouseEventHandler } from "react";
import EmailIcon from "../../../atoms/svg/email-icon";
import { useTheme } from "@mui/material/styles";
import WithBaseSignInDialog, { SignDialogProps } from "./with-base-sign-dialog";

type SignInWithDialogProps = SignDialogProps & {
  onSignInWithGoogleClicked: MouseEventHandler;
};

const SignInWithDialogContent = (props: SignInWithDialogProps) => {
  const theme = useTheme();

  return (
    <>
      <Stack sx={{ width: "100%" }} spacing={2}>
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
          Sign In with Google
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
        >
          Sign In with email
        </PrimaryButton>
      </Stack>
    </>
  );
};

export default WithBaseSignInDialog(SignInWithDialogContent);
