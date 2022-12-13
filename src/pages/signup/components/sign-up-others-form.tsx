import { Avatar, Stack, Typography } from "@mui/material";
import SecondaryButton from "../../../components/atoms/secondary-button";
import PrimaryButton from "../../../components/atoms/primary-button";
import EmailIcon from "../../../components/atoms/svg/email-icon";
import LinkTypography from "../../../components/atoms/link-typography";
import { useTheme } from "@mui/material/styles";

const SignUpOthersForm = () => {
  const theme = useTheme();
  return (
    <>
      <Stack
        direction={"column"}
        sx={{ background: "", minWidth: "500px", paddingTop: 16 }}
        spacing={4}
      >
        <Typography textAlign={"left"} variant={"h5"}>
          Sign Up with others
        </Typography>
        <Stack spacing={2}>
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
          >
            Sign Up with Google
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
            Sign Up with email
          </PrimaryButton>
          <Stack direction={"row"} justifyContent={"center"}>
            <Typography textAlign={"left"} variant={"body2"}>
              Already have an account?
            </Typography>
            <LinkTypography variant={"body2"} href={"/"}>
              &nbsp;Sign in
            </LinkTypography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default SignUpOthersForm;
