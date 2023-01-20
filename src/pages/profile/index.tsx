import React, {
  MouseEventHandler,
  ReactElement,
  useMemo,
  useState,
} from "react";
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
import ProfileEditDialog from "./dialog/profile-edit-dialog";
import { useLoading } from "../../provider/loading/loading-provider";
import { useLogin } from "../../provider/login/login-provider";
import {
  EmailSignUpParams,
  MAIL_VERIFY,
  MouseEventWithParam,
  MouseEventWithStateParam,
} from "../../type";
import ConnectEmailDialog, {
  CONNECT_MAIL_DIALOG_FORM_TYPE,
  ConnectMailDialogFormType,
} from "./dialog/connect-email-dialog";
import { useFirebaseAuth } from "../../firebase/hook/firebase-hook";
import { useAlert } from "../../provider/alert/alert-provider";
import { APP_ERROR_MESSAGE, getErrorMessage } from "../../error/my-error";
import PictureEditDialog from "./dialog/picture-edit-dialog";
import { DEFAULT_PROFILE_IMAGE_DATA_SRC } from "../../const";
import { VALIDATOR_BUTTON_STATES } from "../../components/molecules/validator-button";
import AwsClient from "../../remote/aws-client";
import StyledChip from "../../components/atoms/styled/styled-chip";
import BoltIcon from "@mui/icons-material/Bolt";

const Profile = (props: AppProps) => {
  const {
    userData,
    asyncUpdateWalletAddress,
    asyncUpdateWalletAddressByWallet,
    asyncUpdateProfileImageUrl,
    asyncUpdateEmail,
  } = useSignedUserQuery();
  const {
    asyncVerifyUserWithEmailAndPassword,
    asyncResendEmailVerify,
    asyncSignInEmailWithVerify,
  } = useFirebaseAuth();
  const { isWalletLoggedIn, isMailLoggedIn, isGoogleLoggedIn, emailSignIn } =
    useLogin();
  const { showLoading, closeLoading } = useLoading();
  const [openProfileEditDialog, setOpenProfileEditDialog] = useState(false);
  const [openConnectEmailDialog, setOpenConnectEmailDialog] = useState(false);
  const [verificationMail, setVerificationMail] = useState("");
  const [dialogFormType, setDialogFormType] =
    useState<ConnectMailDialogFormType>(
      CONNECT_MAIL_DIALOG_FORM_TYPE.SEND_EMAIL
    );
  const { showAlert, showErrorAlert } = useAlert();
  const [imageFile, setImageFile] = useState<File>();

  const pictureEditDialogOpen = useMemo(() => {
    return imageFile ? true : false;
  }, [imageFile]);

  const asyncMailSignInWithVerify = async (
    email: string,
    verified: boolean = false
  ) => {
    try {
      showLoading();
      if (!verified) {
        const res = await asyncSignInEmailWithVerify(
          verificationMail,
          "123456"
        );
        if (res === MAIL_VERIFY.NOT_VERIFIED) {
          showAlert({
            title: "Info",
            content: "Check your verification mail",
          });
          return;
        }
      }
      await asyncUpdateEmail(email);
      setOpenConnectEmailDialog(false);
      closeLoading();
    } catch (e) {
      closeLoading();
      const message = getErrorMessage(e);
      if (message.includes(APP_ERROR_MESSAGE.FIREBASE_TOO_MANY_REQUESTS)) {
        showErrorAlert({
          content: "Resend email exceed limit please 1hour later",
        });
      }
      showErrorAlert({ content: message });
    }
  };

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
                userData.profileImageUrl
                  ? userData.profileImageUrl
                  : DEFAULT_PROFILE_IMAGE_DATA_SRC
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
                spacing={1}
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
                    disabled={!userData?.name}
                  >
                    Edit Profile
                  </PrimaryButton>
                </Grid>
              </Grid>
            </Stack>
            {/*--- Achievements ---*/}
            <Stack spacing={4}>
              <Typography variant={"h5"} sx={{ zIndex: 1 }}>
                Achievements
              </Typography>
              <Stack direction={"column"} alignItems={"center"}>
                <Typography variant={"h6"} color={"neutral.500"}>
                  ⛔ EMPTY
                </Typography>
              </Stack>
            </Stack>
            {/*--- additional area ---*/}
          </Stack>
        </Grid>
      </Grid>
      {/*--- Dialogs ---*/}
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
          if (myEvent.params.state === VALIDATOR_BUTTON_STATES.VALID_HOVER) {
            await asyncUpdateEmail("");
          } else if (
            myEvent.params.state === VALIDATOR_BUTTON_STATES.NOT_VALID_HOVER
          ) {
            setOpenConnectEmailDialog(true);
          }
          closeLoading();
        }}
        isWalletLoggedIn={isWalletLoggedIn}
        isMailLoggedIn={isMailLoggedIn || isGoogleLoggedIn}
        onCloseBtnClicked={(e) => {
          setOpenProfileEditDialog(false);
        }}
        onFileImageAdded={(f) => {
          setImageFile(f);
        }}
      ></ProfileEditDialog>
      <ConnectEmailDialog
        open={openConnectEmailDialog}
        onClickSendVerification={async (e) => {
          const myEvent = e as MouseEventWithParam<EmailSignUpParams>;
          const { email } = myEvent.params;
          try {
            showLoading();
            const res = await asyncVerifyUserWithEmailAndPassword(
              email,
              "123456"
            );
            console.log(res);
            if (res === MAIL_VERIFY.PASSWORD_WRONG) {
              showAlert({ title: "Info", content: "This is mail in use" });
              return;
            }
            if (res === MAIL_VERIFY.VERIFIED) {
              await asyncMailSignInWithVerify(email, true);
              showAlert({
                title: "Info",
                content: (
                  <Stack direction={"column"} sx={{ flex: 1, background: "" }}>
                    <div>Your mail already is verified</div>
                    <div>Update completed</div>
                  </Stack>
                ),
              });
              return;
            }
            if (res === MAIL_VERIFY.NOT_VERIFIED) {
              await asyncResendEmailVerify(verificationMail, "123456");
            }
            closeLoading();
            setVerificationMail(email);
            setDialogFormType(CONNECT_MAIL_DIALOG_FORM_TYPE.VERIFY_EMAIL);
          } catch (e) {
            console.log(e);
            closeLoading();
            const message = getErrorMessage(e);
            if (
              message.includes(APP_ERROR_MESSAGE.FIREBASE_TOO_MANY_REQUESTS)
            ) {
              showErrorAlert({
                content: "Resend email exceed limit please 1hour later",
              });
            } else {
              showErrorAlert({ content: message });
            }
          }
        }}
        email={verificationMail}
        formType={dialogFormType}
        onClickResendVerification={async (e) => {
          try {
            showLoading();
            if (!verificationMail) return;
            await asyncResendEmailVerify(verificationMail, "123456");
            showAlert({ title: "Info", content: "Verify mail sended" });
            closeLoading();
          } catch (e) {
            closeLoading();
            const message = getErrorMessage(e);
            showErrorAlert({ content: message });
          }
        }}
        onClickSignIn={async (e) => {
          await asyncMailSignInWithVerify(verificationMail);
        }}
        onClose={() => {
          setDialogFormType(CONNECT_MAIL_DIALOG_FORM_TYPE.SEND_EMAIL);
          setVerificationMail("");
          setOpenConnectEmailDialog(false);
        }}
        onCloseBtnClicked={(e) => {
          e.preventDefault();
          setDialogFormType(CONNECT_MAIL_DIALOG_FORM_TYPE.SEND_EMAIL);
          setVerificationMail("");
          setOpenConnectEmailDialog(false);
        }}
      ></ConnectEmailDialog>
      <PictureEditDialog
        imageFile={imageFile}
        title={"Edit Image"}
        open={pictureEditDialogOpen}
        onImageFileSaved={({ base64Data, ext }) => {
          showLoading();
          try {
            (async () => {
              const includeQuestion = userData.profileImageUrl?.includes("?");
              await AwsClient.getInstance().asyncUploadProfileImage({
                base64Data,
                imageName: `${userData.name}.${ext}`,
              });

              let profileImageUrl = `https://sakura-frontend.s3.ap-northeast-2.amazonaws.com/profile/${userData.name}.${ext}`;
              if (!includeQuestion) {
                profileImageUrl += "?";
              }
              await asyncUpdateProfileImageUrl(profileImageUrl);
            })();
          } catch (e) {
            showErrorAlert({ content: getErrorMessage(e) });
          } finally {
            closeLoading();
            setImageFile(undefined);
          }
        }}
        onClose={() => {
          setImageFile(undefined);
        }}
        onBackBtnClicked={() => {
          setImageFile(undefined);
        }}
      ></PictureEditDialog>
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
