import { Stack, Typography } from "@mui/material";
import { MouseEventHandler, PropsWithChildren } from "react";
import SecondaryButton from "../atoms/secondary-button";
import { useTheme } from "@mui/material/styles";
import LinkTypography from "../atoms/link-typography";

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
  return (
    <>
      <Stack
        direction={"column"}
        sx={{
          background: "",
          minWidth: "500px",
          paddingTop: 12,
          marginBottom: 6,
        }}
        spacing={4}
      >
        <Typography textAlign={"left"} variant={"h5"}>
          Verify your email
        </Typography>
        <Stack spacing={5} alignItems={"center"}>
          <Stack spacing={4}>
            <Stack spacing={0} alignItems={"center"}>
              <Typography variant={"body1"}>
                A verification link was just sent to your
              </Typography>
              <Typography variant={"body1"}>
                email address. Please check your inbox
              </Typography>
            </Stack>
            <Typography variant={"h5"}>{email}</Typography>
          </Stack>
          <Stack width={"100%"} alignItems={"center"} spacing={3}>
            <SecondaryButton fullWidth={true} onClick={onClickSignIn}>
              {signInTitle}
            </SecondaryButton>
            <Stack alignItems={"center"}>
              <Typography variant={"caption"}>
                If you have not received the email,
              </Typography>
              <Typography variant={"caption"}>
                please check your spam inbox or
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
                resend verification email
              </LinkTypography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default VerifyYourEmailForm;
