import { Avatar, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import React, { MouseEventHandler } from "react";

import LinkTypography from "../../../components/atomic/atoms/link-typography";
import PrimaryButton from "../../../components/atomic/atoms/primary-button";
import SecondaryButton from "../../../components/atomic/atoms/secondary-button";
import EmailIcon from "../../../components/atomic/atoms/svg/email-icon";

import WithBaseSignInDialog, { SignDialogProps } from "./with-base-sign-dialog";

import KakaoIcon from "@/components/atomic/atoms/svg/kakao-icon";

type SignInSelectDialogProps = SignDialogProps & {
  onContinueWithWalletClicked: MouseEventHandler;
  onSignUpClicked: MouseEventHandler;
  onSignInWithSocialClicked?: MouseEventHandler;
};

const SignInSelectDialogContent = (props: SignInSelectDialogProps) => {
  const theme = useTheme();
  return (
    <>
      <SecondaryButton
        fullWidth={true}
        onClick={props.onContinueWithWalletClicked}
      >
        <Stack direction={"row"} spacing={1}>
          <Typography
            className={"MuiTypography"}
            color={"neutral.100"}
            variant={"body2"}
          >
            지갑 연결하기
          </Typography>
        </Stack>
      </SecondaryButton>
      <br />
      <Stack sx={{ width: "100%" }}>
        <Stack direction={"column"} spacing={4}>
          {/* <PrimaryButton
            fullWidth={true}
            onClick={props.onSignInWithSocialClicked}
          >
            <Stack direction={"row"} spacing={1}>
              <Typography
                className={"MuiTypography"}
                color={"neutral.900"}
                variant={"body2"}
              >
                카카오 로그인
              </Typography>
              <KakaoIcon
                sx={{ color: "black", fontSize: "1.3rem" }}
                color={"inherit"}
                fontSize={"inherit"}
              />
            </Stack>
          </PrimaryButton> */}
        </Stack>
      </Stack>
    </>
  );
};

export default WithBaseSignInDialog(SignInSelectDialogContent);
