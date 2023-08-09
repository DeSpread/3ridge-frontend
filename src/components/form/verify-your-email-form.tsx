import { Stack, Typography, useMediaQuery } from "@mui/material";
import { MouseEventHandler, PropsWithChildren } from "react";
import { useTheme } from "@mui/material/styles";
import LinkTypography from "../atomic/atoms/link-typography";

type VerifyYourEmailFormProps = PropsWithChildren & {
  email: string;
  onClickSignIn?: MouseEventHandler;
  onClickResendVerification?: MouseEventHandler;
  signInTitle?: string;
};

const VerifyYourEmailForm = ({
  email,
  onClickSignIn,
  onClickResendVerification,
  signInTitle = "Let me sign in!",
}: VerifyYourEmailFormProps) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <Stack
        direction={"column"}
        sx={{
          background: "",
          minWidth: smUp ? "500px" : "80%",
          paddingTop: 12,
          marginBottom: 6,
        }}
        spacing={4}
      >
        <Typography textAlign={smUp ? "left" : "center"} variant={"h5"}>
          메일을 인증해주세요
        </Typography>
        <Stack spacing={5} alignItems={"center"}>
          <Stack spacing={4}>
            <Stack spacing={0} alignItems={"center"}>
              <Typography variant={"body1"}>
                인증메일 링크가 메일로 보내졌습니다.
              </Typography>
              <Typography variant={"body1"}>메일함을 확인해주세요.</Typography>
            </Stack>
            <Typography variant={"h5"}>{email}</Typography>
          </Stack>
          <Stack width={"100%"} alignItems={"center"} spacing={3}>
            {/*<SecondaryButton fullWidth={true} onClick={onClickSignIn}>*/}
            {/*  {signInTitle}*/}
            {/*</SecondaryButton>*/}
            <Stack alignItems={"center"}>
              <Typography variant={"caption"}>
                만약 메일을 받지 못했다면
              </Typography>
              <Typography variant={"caption"}>
                스팸메일 함을 확인해주시거나
              </Typography>
              <LinkTypography
                variant={"caption"}
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.error.main,
                  "&:hover": {
                    color: theme.palette.error.light,
                    textDecoration: "underline",
                  },
                }}
                onClick={onClickResendVerification}
              >
                인증메일을 재전송 해주세요
              </LinkTypography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default VerifyYourEmailForm;
