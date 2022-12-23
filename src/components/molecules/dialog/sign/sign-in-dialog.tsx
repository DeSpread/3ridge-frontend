import { Avatar, Stack, Typography } from "@mui/material";
import PrimaryButton from "../../../atoms/primary-button";
import React, { MouseEventHandler } from "react";
import LinkTypography from "../../../atoms/link-typography";
import EmailIcon from "../../../atoms/svg/email-icon";
import { useTheme } from "@mui/material/styles";
import WithBaseSignInDialog, { SignDialogProps } from "./with-base-sign-dialog";
import SecondaryButton from "../../../atoms/secondary-button";

type SignInSelectDialogProps = SignDialogProps & {
  onContinueWithWalletClicked: MouseEventHandler;
  onSignUpClicked: MouseEventHandler;
  onSignInWithClicked: MouseEventHandler;
};

const SignInSelectDialogContent = (props: SignInSelectDialogProps) => {
  const theme = useTheme();
  return (
    <>
      <SecondaryButton
        fullWidth={true}
        onClick={props.onContinueWithWalletClicked}
      >
        Continue with wallet
      </SecondaryButton>
      <Typography variant={"body2"}>Or</Typography>
      <Stack sx={{ width: "100%" }}>
        <Stack direction={"column"} spacing={2}>
          <PrimaryButton fullWidth={true} onClick={props.onSignInWithClicked}>
            <Stack direction={"row"} spacing={1}>
              <Typography color={"neutral.100"} variant={"body2"}>
                Sign In with
              </Typography>
              <Avatar
                src={"https://nftbank.ai/static/images/google-28.svg"}
                sx={{ width: 24, height: 24 }}
              ></Avatar>
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  //@ts-ignore
                  background: theme.palette.neutral["400"],
                }}
              >
                <EmailIcon></EmailIcon>
              </Avatar>
            </Stack>
          </PrimaryButton>
          <Stack direction={"row"} justifyContent={"center"}>
            <Typography variant={"body2"}>Don`t have an account?</Typography>
            <LinkTypography
              variant={"body2"}
              href={"/signup"}
              onClick={props.onSignUpClicked}
            >
              &nbsp;SignUp
            </LinkTypography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default WithBaseSignInDialog(SignInSelectDialogContent);
