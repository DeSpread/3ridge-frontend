import { Avatar, Stack, Typography } from "@mui/material";
import PrimaryButton from "../../../atoms/primary-button";
import React from "react";
import LinkTypography from "../../../atoms/link-typography";
import EmailIcon from "../../../atoms/svg/email-icon";
import { useTheme } from "@mui/material/styles";
import ConnectButton from "../../connect-button";
import WithBaseSignInDialog, { SignDialogProps } from "./with-base-sign-dialog";
import { useLogin } from "../../../../provider/login/login-provider";
import { useRouter } from "next/router";

const SignInWithDialogContent = (props: SignDialogProps) => {
  const theme = useTheme();
  const router = useRouter();
  const { googleSignUp } = useLogin();
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
          onClick={(event) => {
            googleSignUp({
              onSuccess: () => {
                router.push("/").then();
                props.onCloseBtnClicked(event);
              },
              onError: (error) => {
                // todo : show error alert
              },
            });
          }}
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
