import { Avatar, Stack, Typography } from "@mui/material";
import PrimaryButton from "../../atomic/atoms/primary-button";
import EmailIcon from "../../atomic/atoms/svg/email-icon";
import LinkTypography from "../../atomic/atoms/link-typography";
import { useTheme } from "@mui/material/styles";
import { MouseEventHandler, PropsWithChildren } from "react";

type SignUpOtherFormProps = PropsWithChildren & {
  onSignUpWithGoogleClicked?: MouseEventHandler;
  onSignUpWithEmailClicked?: MouseEventHandler;
};

const SignUpOthersForm = (props: SignUpOtherFormProps) => {
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
          가입 하기
        </Typography>
        <Stack spacing={4}>
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
            onClick={props.onSignUpWithGoogleClicked}
          >
            구글로 가입하기
          </PrimaryButton>
          <Typography textAlign={"center"} variant={"h6"}>
            &nbsp;
          </Typography>
          <Stack spacing={2}>
            <PrimaryButton
              startIcon={
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    background: theme.palette.neutral["400"],
                    marginRight: 1,
                  }}
                >
                  <EmailIcon></EmailIcon>
                </Avatar>
              }
              onClick={props.onSignUpWithEmailClicked}
            >
              이메일로 가입하기
            </PrimaryButton>
            <Stack direction={"row"} justifyContent={"center"}>
              <Typography textAlign={"left"} variant={"body2"}>
                이미 가입했나요?
              </Typography>
              <LinkTypography variant={"body2"} href={"/"}>
                &nbsp;로그인 하기
              </LinkTypography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default SignUpOthersForm;
