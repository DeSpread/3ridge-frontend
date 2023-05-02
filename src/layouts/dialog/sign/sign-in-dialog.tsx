import { Avatar, Stack, Typography } from "@mui/material";
import PrimaryButton from "../../../components/atoms/primary-button";
import React, { MouseEventHandler } from "react";
import LinkTypography from "../../../components/atoms/link-typography";
import EmailIcon from "../../../components/atoms/svg/email-icon";
import { useTheme } from "@mui/material/styles";
import WithBaseSignInDialog, { SignDialogProps } from "./with-base-sign-dialog";
import SecondaryButton from "../../../components/atoms/secondary-button";
import Image from "next/image";

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
        <Stack direction={"row"} spacing={1}>
          <Typography
            className={"MuiTypography"}
            color={"neutral.100"}
            variant={"body2"}
          >
            메타마스크 지갑 연결하기
          </Typography>
          {/* eslint-disable-next-line react/jsx-no-undef */}
          <Image
            src={
              "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/metamask-fox.svg"
            }
            width={24}
            height={24}
            alt={""}
          ></Image>
          {/*<Avatar*/}
          {/*  src={*/}
          {/*    "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/metamask-fox.svg"*/}
          {/*  }*/}
          {/*  sx={{ width: 24, height: 24 }}*/}
          {/*></Avatar>*/}
        </Stack>
        {/*메타마스크 지갑 연결하기*/}
      </SecondaryButton>
      {/*<Typography variant={"body2"}>Or</Typography>*/}
      <br />
      <Stack sx={{ width: "100%" }}>
        <Stack direction={"column"} spacing={4}>
          <PrimaryButton fullWidth={true} onClick={props.onSignInWithClicked}>
            <Stack direction={"row"} spacing={1}>
              <Typography
                className={"MuiTypography"}
                color={"neutral.900"}
                variant={"body2"}
              >
                구글 또는 이메일 로그인
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
            <Typography variant={"body2"}>
              아직 계정이 없으신가요?&nbsp;
            </Typography>
            <LinkTypography
              variant={"body2"}
              href={"/signup"}
              onClick={props.onSignUpClicked}
            >
              가입하기
            </LinkTypography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default WithBaseSignInDialog(SignInSelectDialogContent);
