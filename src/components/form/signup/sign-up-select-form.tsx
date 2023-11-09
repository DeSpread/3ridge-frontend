import { Avatar, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { MouseEventHandler, PropsWithChildren } from "react";

import LinkTypography from "../../atomic/atoms/link-typography";
import PrimaryButton from "../../atomic/atoms/primary-button";
import SecondaryButton from "../../atomic/atoms/secondary-button";
import EmailIcon from "../../atomic/atoms/svg/email-icon";


type SignUpSelectFormProps = PropsWithChildren & {
  onClickSignUpWith?: MouseEventHandler;
  onClickConnectWallet?: MouseEventHandler;
  onShowSignClicked?: MouseEventHandler;
};

const SignUpSelectForm = (props: SignUpSelectFormProps) => {
  const theme = useTheme();

  return (
    <>
      <Stack
        direction={"column"}
        sx={{
          background: "",
          minWidth: "500px",
          paddingTop: 12,
          height: "500px",
        }}
        spacing={4}
      >
        <Typography textAlign={"left"} variant={"h5"}>
          가입하기
        </Typography>
        <SecondaryButton fullWidth={true} onClick={props.onClickConnectWallet}>
          지갑통해 가입하기
        </SecondaryButton>
        <br />
        <Stack spacing={2}>
          <PrimaryButton fullWidth={true} onClick={props.onClickSignUpWith}>
            <Stack direction={"row"} spacing={1}>
              <Typography
                className={"MuiTypography"}
                color={"neutral.900"}
                variant={"body2"}
              >
                구글 또는 이메일 가입하기
              </Typography>
              <Avatar
                src={"https://nftbank.ai/static/images/google-28.svg"}
                sx={{ width: 24, height: 24 }}
              ></Avatar>
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  background: theme.palette.neutral["400"],
                }}
              >
                <EmailIcon></EmailIcon>
              </Avatar>
            </Stack>
          </PrimaryButton>
          <Stack direction={"row"} justifyContent={"center"} spacing={1}>
            <Typography variant={"body2"}>
              이미 계정이 있으신가요? &nbsp;
            </Typography>
            <LinkTypography variant={"body2"} onClick={props.onShowSignClicked}>
              로그인 하러 가기
            </LinkTypography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default SignUpSelectForm;
