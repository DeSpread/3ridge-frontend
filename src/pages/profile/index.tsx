import React, { MouseEventHandler, ReactElement, useState } from "react";
import MainLayout from "../../layouts/main-layout";
import { AppProps } from "next/app";
import Head from "next/head";
import {
  Avatar,
  Box,
  Chip,
  ChipProps,
  Grid,
  Stack,
  styled,
  Theme,
  Typography,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import StringHelper from "../../helper/string-helper";
import GradientTypography from "../../components/atoms/gradient-typography";
import { useSignedUserQuery } from "../../hook/user-query-hook";
import EthIcon from "../../components/atoms/svg/eth-icon";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import PrimaryButton from "../../components/atoms/primary-button";
import ProfileEditDialog, {
  VALIDATOR_BUTTON_STATES,
} from "./dialog/profile-edit-dialog";
import { useLoading } from "../../provider/loading/loading-provider";
import { useLogin } from "../../provider/login/login-provider";
import {
  EmailSignUpParams,
  MouseEventWithParam,
  MouseEventWithStateParam,
} from "../../type";
import ConnectEmailDialog, {
  CONNECT_MAIL_DIALOG_FORM_TYPE,
  ConnectMailDialogFormType,
} from "./dialog/connect-email-dialog";

const StyledChip = styled((props: ChipProps) => (
  <Chip
    {...props}
    sx={{
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 1,
      paddingRight: 1,
    }}
  />
))(() => ({}));

const Profile = (props: AppProps) => {
  const {
    userData,
    asyncUpdateWalletAddress,
    asyncUpdateWalletAddressByWallet,
  } = useSignedUserQuery();
  const { isWalletLoggedIn, isMailLoggedIn } = useLogin();
  const { showLoading, closeLoading } = useLoading();
  const [openProfileEditDialog, setOpenProfileEditDialog] = useState(false);
  const [openConnectEmailDialog, setOpenConnectEmailDialog] = useState(false);
  const [verificationMail, setVerificationMail] = useState("");
  const [dialogFormType, setDialogFormType] =
    useState<ConnectMailDialogFormType>(
      CONNECT_MAIL_DIALOG_FORM_TYPE.SEND_EMAIL
    );

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Grid
        flex={1}
        container
        direction={"row"}
        justifyContent={"center"}
        sx={{ background: "", marginTop: 12 }}
      >
        <Grid
          item
          xs={9}
          sx={{
            background: "",
            padding: 2,
          }}
        >
          <Stack
            direction={"column"}
            alignItems={"left"}
            sx={{ background: "" }}
            spacing={4}
          >
            <Avatar
              alt=""
              src={
                userData.profileImageUrl ??
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAAAXNSR0IArs4c6QAABSdJREFUeF7tnbFtVmEQBP+fyJELQK6AGgipAUISCqEJREJCCBk9GQpw5AjIIZy1vPp2yO/8bm5ueUg8+fr6x6s/l+I/N/cP0ad7vLuN9ks3W5v3qoBphVg/BWT84tVrC1mb1wSMnwxrqICMX7x6bSFr85qA8ZNhDRWQ8YtXry1kbV4TMH4yrKECMn7x6rWFrM1rAsZPhjVUQMYvXr22kLV5TcD4ybCGCsj4xavXFrI2rwkYPxnWUAEZv3j12kLW5jUB4yfDGiog4xevXlvI2rwmYPxkWEMFZPzi1WsLWZvXBIyfDGuogIxfvHptIWvzmoDxk2ENFZDxi1evLWRtXhMwfjKsoQIyfvHqtYWszWsCxk+GNVRAxi9evbaQtXlNwPjJsIYKyPjFq9cWsjavCRg/GdZQARm/ePXaQtbmNQHjJ8MaKiDjF69eW8javCZg/GRYQwVk/OLVawtZm9cEjJ8Ma6iAjF+8em0ha/OagPGTYQ0VkPGLV68tZG1eEzB+MqzhnIA/P3+s/j0h715+Zxsdr/726201gasCVu8HP5wCQoQmIAOogIzfRQEZQAVk/BQQ8lNACNAEZAAVkPEzASE/BYQATUAGUAEZPxMQ8lNACNAEZAAVkPEzASE/BYQATUAGUAEZPxMQ8lNACNAEZAAVkPEzASE/BYQATUAGUAEZPxMQ8lNACNAEZAAVkPEzASE/BYQATUAGsF7AN5/uqr8JYfitbidwVcD2FZ39fAp49n7rp1PA+hWd/YAKePZ+66dTwPoVnf2ACnj2fuunU8D6FZ39gAp49n7rp1PA+hWd/YAKePZ+66dTwPoVnf2ACnj2fuunU8D6FZ39gAp49n7rp1PA+hWd/YAKePZ+66dTwPoVnf2ACnj2fuunU8D6FZ39gPW/qCaNv/0jnbWPsBQwbTjsp4AQYHu5Cdi1IROwax9zH+IroAI+KwEFfFb8//9w3wHLFpJ+HN8B00RZPxOQ8YtXm4BxpF0NTcCufZiAXfvwX8Fl+4g/jgkYR4oamoAIX77Yd8A806qOJmDVOi4mYNc+fAcs20f8cUzAOFLU0ARE+PLFvgPmmVZ1NAGr1uE7YNc6Lr4Dti0k/TwmYJoo6+c7IOMXr/YdMI6UNby5f2AN/ql+vLuN9ks3W5u3PgHXFrI2rwKmIwz2U0AIMF2+tpC1eU3A9MXAfgoIAabL1xayNq8JmL4Y2E8BIcB0+dpC1uY1AdMXA/spIASYLl9byNq8JmD6YmA/BYQA0+VrC1mb1wRMXwzsp4AQYLp8bSFr85qA6YuB/RQQAkyXry1kbV4TMH0xsJ8CQoDp8rWFrM1rAqYvBvZTQAgwXb62kLV54wmY/uos/ZFOesHpg0t/s9K+DwVMGwT7KSAE2H5xJiBbcPpvJBOQ7SNebQJCpCYgA6iAjN9FARlABWT8FBDyU0AI0ARkABWQ8TMBIT8FhABNQAZQARk/ExDyU0AI0ARkABWQ8TMBIT8FhABNQAZQARk/ExDyU0AI0ARkABWQ8TMBIT8FhABNQAZQARk/ExDyU0AI0ARkABWQ8bu0/4/jry8+wAmftvz97y9P+wNg9/SBxP9HtAKyDSsg42cCQn4KCAGagAygAjJ+JiDkp4AQoAnIACog42cCQn4KCAGagAygAjJ+JiDkp4AQoAnIACog42cCQn4KCAGagAygAjJ+JiDkp4AQoAnIACog42cCQn4KCAGagAygAjJ+JiDkp4AQoAnIACog42cCQn4KCAGagAzgmoB/AUkZadkjtJSBAAAAAElFTkSuQmCC"
              }
              sx={{
                width: 100,
                height: 100,
              }}
            />
            {/*--- profile description ---*/}
            <Stack spacing={1}>
              <Typography variant={"h5"} sx={{ zIndex: 1 }}>
                Level 1
              </Typography>
              <LinearProgress
                variant="determinate"
                value={1}
                color={"secondary"}
                sx={{
                  background: (theme) => theme.palette.action.hover,
                  height: 2,
                  maxWidth: 230,
                }}
              ></LinearProgress>
              <Stack direction={"row"} alignItems={"center"}>
                {userData?.walletAddress ? (
                  <Box sx={{ maxWidth: 260 }}>
                    <GradientTypography variant={"h4"}>
                      {StringHelper.getInstance().getMidEllipsisString(
                        userData?.walletAddress
                      )}
                    </GradientTypography>
                  </Box>
                ) : (
                  <Box sx={{ maxWidth: 300 }}>
                    <GradientTypography variant={"h4"}>
                      Connect your wallet
                    </GradientTypography>
                  </Box>
                )}
              </Stack>
              <Grid
                container
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                sx={{ background: "" }}
              >
                <Grid item>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    {userData?.walletAddress && (
                      <StyledChip
                        sx={{
                          "&:hover": {
                            background: (theme: Theme) =>
                              theme.palette.action.hover,
                          },
                        }}
                        onClick={(e: MouseEvent) => {
                          e.preventDefault();
                          const newWindow = window.open(
                            `https://etherscan.io/address/${userData?.walletAddress}`,
                            "_blank",
                            "noopener,noreferrer"
                          );
                          if (newWindow) newWindow.opener = null;
                        }}
                        icon={<EthIcon />}
                        label={
                          <Typography variant={"body2"} color={"neutral.100"}>
                            {StringHelper.getInstance().getMidEllipsisString(
                              userData?.walletAddress
                            )}
                          </Typography>
                        }
                      ></StyledChip>
                    )}
                    {userData?.email && (
                      <StyledChip
                        icon={<MarkEmailReadIcon></MarkEmailReadIcon>}
                        label={
                          <Typography
                            sx={{ marginLeft: 1 }}
                            variant={"body2"}
                            color={"neutral.100"}
                          >
                            {userData?.email}
                          </Typography>
                        }
                      ></StyledChip>
                    )}
                  </Stack>
                </Grid>
                <Grid item>
                  <PrimaryButton
                    onClick={() => {
                      setOpenProfileEditDialog(true);
                    }}
                  >
                    Edit Profile
                  </PrimaryButton>
                </Grid>
              </Grid>
            </Stack>
            {/*--- Achievements ---*/}
            <Stack spacing={2}>
              <Typography variant={"h5"} sx={{ zIndex: 1 }}>
                Achievements
              </Typography>
            </Stack>
            {/*--- additional area ---*/}
          </Stack>
        </Grid>
      </Grid>
      <ProfileEditDialog
        userData={userData}
        title={"Edit profile"}
        onClose={() => {
          setOpenProfileEditDialog(false);
        }}
        open={openProfileEditDialog}
        walletValidatorButtonOnClick={async (e) => {
          const myEvent = e as MouseEventWithStateParam;
          showLoading();
          if (myEvent.params.state === VALIDATOR_BUTTON_STATES.VALID_HOVER) {
            await asyncUpdateWalletAddress("");
          } else if (
            myEvent.params.state === VALIDATOR_BUTTON_STATES.NOT_VALID_HOVER
          ) {
            await asyncUpdateWalletAddressByWallet();
          }
          closeLoading();
        }}
        emailValidatorButtonOnClick={async (e) => {
          const myEvent = e as MouseEventWithStateParam;
          showLoading();

          closeLoading();
        }}
        isWalletLoggedIn={isWalletLoggedIn}
        isMailLoggedIn={isMailLoggedIn}
        onCloseBtnClicked={(e) => {
          setOpenProfileEditDialog(false);
        }}
      ></ProfileEditDialog>
      <ConnectEmailDialog
        open={openConnectEmailDialog}
        onClickSendVerification={(e) => {
          const myEvent = e as MouseEventWithParam<EmailSignUpParams>;
          const { email } = myEvent.params;
          setVerificationMail(verificationMail);
          setDialogFormType(CONNECT_MAIL_DIALOG_FORM_TYPE.VERIFY_EMAIL);
        }}
        email={verificationMail}
        formType={dialogFormType}
        onClickResendVerification={(e) => {}}
        onClickSignIn={(e) => {}}
        onClose={() => {
          setOpenConnectEmailDialog(false);
        }}
      ></ConnectEmailDialog>
    </>
  );
};

Profile.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout
    backgroundComponent={
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "180px",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          background:
            "linear-gradient(to bottom, rgb(15, 14, 20, 0), rgba(15, 14, 20, 1)), url('https://sakura-frontend.s3.ap-northeast-2.amazonaws.com/background/header.png')",
          zIndex: 0,
          left: 0,
          top: 56,
        }}
      />
    }
  >
    {page}
  </MainLayout>
);

export default Profile;
