import React, { ReactElement, useEffect, useMemo, useState } from "react";
import MainLayout from "../../layouts/main-layout";
import { AppProps } from "next/app";
import Head from "next/head";
import {
  Avatar,
  Box,
  Grid,
  Link as MuiLink,
  Stack,
  Theme,
  Typography,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import StringHelper from "../../helper/string-helper";
import GradientTypography from "../../components/atoms/gradient-typography";
import { useSignedUserQuery } from "../../page-hook/user-query-hook";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import PrimaryButton from "../../components/atoms/primary-button";
import ProfileEditDialog from "./dialog/profile-edit-dialog";
import { useLoading } from "../../provider/loading/loading-provider";
import { useLogin } from "../../provider/login/login-provider";
import {
  EmailSignUpEventParams,
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
import {
  APP_ERROR_MESSAGE,
  AppError,
  getErrorMessage,
} from "../../error/my-error";
import PictureEditDialog from "./dialog/picture-edit-dialog";
import { DEFAULT_PROFILE_IMAGE_DATA_SRC } from "../../const";
import { VALIDATOR_BUTTON_STATES } from "../../components/molecules/validator-button";
import AwsClient from "../../remote/aws-client";
import StyledChip from "../../components/atoms/styled/styled-chip";
import { useTheme } from "@mui/material/styles";
import { gql, request } from "graphql-request";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import BlockIcon from "../../components/molecules/block-icon";

const Profile = (props: AppProps) => {
  const {
    userData,
    asyncUpdateWalletAddress,
    asyncUpdateWalletAddressByWallet,
    asyncUpdateProfileImageUrl,
    asyncUpdateEmail,
    asyncUpdateSocialTwitter,
  } = useSignedUserQuery();
  const {
    asyncVerifyUserWithEmailAndPassword,
    asyncResendEmailVerify,
    asyncSignInEmailWithVerify,
    asyncTwitterSignInPopUp,
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
  const [tokensData, setTokensData] = useState<
    {
      name: string;
      metaDataUri: string;
    }[]
  >([]);
  const [achievementsLoading, setAchievementsLoading] = useState(false);

  const theme = useTheme();

  const pictureEditDialogOpen = useMemo(() => {
    return imageFile ? true : false;
  }, [imageFile]);

  useEffect(() => {
    (async () => {
      setAchievementsLoading(true);
      const tokenNames1 = await asyncQueryTokenByUserName();
      const tokenNames2 = await asyncQueryPendingTokenByUserName();
      let tokenNames = tokenNames1.concat(tokenNames2);
      tokenNames = tokenNames.filter((item, index) => {
        return tokenNames.indexOf(item) == index;
      });
      const tokensData = await asyncQueryTokenData(tokenNames);
      if (tokensData.length > 0) {
        setTokensData(tokensData);
      }
      setAchievementsLoading(false);
    })();
  }, [userData]);

  const asyncQueryPendingTokenByUserName = async () => {
    if (userData?.walletAddress === undefined) {
      return [];
    }
    try {
      const query = gql`
        {
          current_token_pending_claims(
            where: {
              to_address: {_eq: "${userData?.walletAddress}"}
              amount: {_gt: "0"}
            }
          ) {
            amount
            collection_name
            name
            from_address
            to_address
          }
        }
      `;
      const res = await request(
        "https://indexer-testnet.staging.gcp.aptosdev.com/v1/graphql/",
        query
      );
      if (res.current_token_pending_claims?.length > 0) {
        const names: string[] = [];
        res.current_token_pending_claims?.forEach((e: any) => {
          if (!names.includes(e.name)) names.push(e.name);
        });
        return names;
      }
      return [];
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  const asyncQueryTokenData = async (tokenNames: string[] | undefined) => {
    try {
      if (tokenNames === undefined || tokenNames.length === 0) {
        return [];
      }
      let param = "";
      tokenNames.forEach((e) => {
        param += `"${e}", `;
      });
      param = param.slice(0, -2);
      const query = gql`
        {
          token_datas(
            where: { name: { _in: [ ${param} ] } }
          ) {
            collection_name
            metadata_uri
            name
          }
        }
      `;
      const res = await request(
        "https://indexer-testnet.staging.gcp.aptosdev.com/v1/graphql/",
        query
      );
      const metadataUriArray: string[] = [];
      const tokensData: {
        name: string;
        metaDataUri: string;
      }[] = [];
      if (res.token_datas?.length > 0) {
        res.token_datas?.forEach((e: any) => {
          if (!metadataUriArray.includes(e.metadata_uri)) {
            metadataUriArray.push(e.metadata_uri);
            tokensData.push({
              name: e.name,
              metaDataUri: e.metadata_uri,
            });
          }
        });
        return tokensData;
      }
      return [];
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  const asyncQueryTokenByUserName = async () => {
    if (userData?.walletAddress === undefined) {
      return [];
    }
    try {
      const query = gql`
        {
          token_ownerships(
            where: {
                owner_address: {
                    _eq: "${userData?.walletAddress}"
                }
            }
            ) {
              name
              owner_address
              collection_name
            }
        }
      `;
      const res = await request(
        "https://indexer-testnet.staging.gcp.aptosdev.com/v1/graphql/",
        query
      );
      if (res.token_ownerships?.length > 0) {
        const names: string[] = [];
        res.token_ownerships?.forEach((e: any) => {
          if (!names.includes(e.name)) names.push(e.name);
        });
        return names;
      }
      return [];
    } catch (e) {
      console.log(e);
      return [];
    }
  };

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

  const levelProgressValue = useMemo(() => {
    if (userData?.rewardPoint === undefined) {
      return 0;
    }
    return (userData?.rewardPoint ?? 0) % 100;
  }, [userData?.rewardPoint]);

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
            {userData.profileImageUrl && (
              <Avatar
                sx={{ width: 100, height: 100 }}
                src={userData.profileImageUrl}
              ></Avatar>
            )}
            {!userData.profileImageUrl && userData._id && (
              <div style={{ zIndex: 2 }}>
                <BlockIcon seed={userData._id} scale={12}></BlockIcon>
              </div>
            )}
            {/*--- profile description ---*/}
            <Stack spacing={1}>
              <Typography variant={"h5"} sx={{ zIndex: 1 }}>
                {`Level ${Math.floor((userData?.rewardPoint ?? 0) / 100)}`}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={levelProgressValue}
                color={"warning"}
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
                  <Box sx={{ maxWidth: 320 }}>
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
                            `https://explorer.aptoslabs.com/account/${userData?.walletAddress}`,
                            "_blank",
                            "noopener,noreferrer"
                          );
                          if (newWindow) newWindow.opener = null;
                        }}
                        icon={
                          <img
                            src={
                              "https://sakura-frontend.s3.ap-northeast-2.amazonaws.com/icon/aptos_icon.svg"
                            }
                            width={16}
                            height={16}
                            style={{
                              background: theme.palette.neutral[100],
                              borderRadius: 16,
                              padding: 1,
                              marginRight: "2px",
                            }}
                          />
                        }
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
            <Stack>
              <Typography variant={"h5"} sx={{ zIndex: 1 }}>
                Achievements
              </Typography>
              {achievementsLoading && (
                <Stack
                  direction={"column"}
                  alignItems={"center"}
                  sx={{ marginTop: 4 }}
                >
                  <Stack
                    direction={"row"}
                    spacing={2}
                    alignItems={"center"}
                    sx={{ height: 128 }}
                  >
                    <CircularProgress
                      size="1rem"
                      sx={{
                        color: theme.palette.warning.main,
                      }}
                    />
                    <Typography
                      variant={"h6"}
                      sx={{ color: theme.palette.warning.main }}
                    >
                      Loading ...{" "}
                    </Typography>
                  </Stack>
                </Stack>
              )}
              {!achievementsLoading &&
                (tokensData?.length > 0 ? (
                  <Grid container={true} spacing={2} sx={{ marginTop: 2 }}>
                    {tokensData.map((e, index) => {
                      return (
                        <Grid item key={index}>
                          <img
                            src={e?.metaDataUri}
                            style={{
                              objectFit: "cover",
                              width: 128,
                              borderRadius: 128,
                              borderColor: theme.palette.neutral[100],
                              borderStyle: "solid",
                              borderWidth: 2,
                            }}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                ) : (
                  <Stack
                    direction={"column"}
                    alignItems={"center"}
                    sx={{ marginTop: 4 }}
                  >
                    <Typography variant={"h6"} color={"neutral.500"}>
                      ⛔ EMPTY
                    </Typography>
                  </Stack>
                ))}
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
          try {
            if (myEvent.params.state === VALIDATOR_BUTTON_STATES.VALID_HOVER) {
              await asyncUpdateWalletAddress("");
            } else if (
              myEvent.params.state === VALIDATOR_BUTTON_STATES.NOT_VALID_HOVER
            ) {
              await asyncUpdateWalletAddressByWallet();
            }
          } catch (e) {
            if (
              e instanceof AppError &&
              e.message === APP_ERROR_MESSAGE.WALLET_NOT_INSTALLED
            ) {
              showAlert({
                title: "Info",
                content: (
                  <>
                    <Stack spacing={1}>
                      <Typography style={{ color: theme.palette.neutral[100] }}>
                        Please Install PetraWallet
                      </Typography>
                      <Link
                        href={"https://petra.app/"}
                        rel={"noopener noreferrer"}
                        target={"_blank"}
                      >
                        <MuiLink
                          sx={{
                            "&:hover": {
                              color: "#bdbdbd",
                            },
                          }}
                          color={"warning.main"}
                          underline="hover"
                        >
                          Install Link
                        </MuiLink>
                      </Link>
                    </Stack>
                  </>
                ),
              });
            }
          } finally {
            closeLoading();
          }
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
        twitterValidatorButtonOnClick={async (e) => {
          try {
            const myEvent = e as MouseEventWithStateParam;
            showLoading();
            if (myEvent.params.state === VALIDATOR_BUTTON_STATES.VALID_HOVER) {
              await asyncUpdateSocialTwitter("");
            } else if (
              myEvent.params.state === VALIDATOR_BUTTON_STATES.NOT_VALID_HOVER
            ) {
              const res = await asyncTwitterSignInPopUp();
              await asyncUpdateSocialTwitter(res);
            }
          } catch (e) {
          } finally {
            closeLoading();
          }
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
          const myEvent = e as MouseEventWithParam<EmailSignUpEventParams>;
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
            "linear-gradient(to bottom, rgb(15, 14, 20, 0), rgba(15, 14, 20, 1)), url('https://galxe.com/_nuxt/img/space-detail-bg.569713b.jpg')",
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
