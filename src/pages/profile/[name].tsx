import React, { ReactElement, useEffect, useMemo, useState } from "react";
import MainLayout from "../../layouts/main-layout";
import { AppProps } from "next/app";
import Head from "next/head";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Link as MuiLink,
  Skeleton,
  Stack,
  Theme,
  Typography,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import StringHelper from "../../helper/string-helper";
import GradientTypography from "../../components/atoms/gradient-typography";
import { useSignedUserQuery } from "../../page-hook/signed-user-query-hook";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import PrimaryButton from "../../components/atoms/primary-button";
import ProfileEditDialog from "./dialog/profile-edit-dialog";
import { useLoading } from "../../provider/loading/loading-provider";
import { useLogin } from "../../provider/login/login-provider";
import {
  EmailSignUpEventParams,
  MouseEventWithParam,
  MouseEventWithStateParam,
  TicketEventParam,
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
import { VALIDATOR_BUTTON_STATES } from "../../components/molecules/validator-button";
import AwsClient from "../../remote/aws-client";
import StyledChip from "../../components/atoms/styled/styled-chip";
import { useTheme } from "@mui/material/styles";
import { gql, request } from "graphql-request";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import BlockIcon from "../../components/molecules/block-icon";
import { useUserQuery } from "../../page-hook/user-query-hook";
import { useRouter } from "next/router";
import TicketCard from "../../components/molecules/ticket-card";
import LinkTypography from "../../components/atoms/link-typography";
import Image from "next/image";

const Profile = (props: AppProps) => {
  const router = useRouter();
  const { userData, loading: userDataLoading } = useUserQuery({
    name: router.isReady
      ? typeof router.query.name === "string"
        ? router.query.name
        : undefined
      : undefined,
  });
  const {
    userData: signedUserData,
    asyncUpdateWalletAddress,
    asyncUpdateWalletAddressByWallet,
    asyncUpdateProfileImageUrl,
    asyncUpdateEmail,
    asyncUpdateSocialTwitter,
  } = useSignedUserQuery();

  const { asyncTwitterSignInPopUp } = useFirebaseAuth();
  const {
    isWalletLoggedIn,
    isMailLoggedIn,
    isGoogleLoggedIn,
    emailSignIn,
    emailVerify,
    updateAuthMail,
    isLoggedIn,
  } = useLogin();
  const { showLoading, closeLoading } = useLoading();
  const [openProfileEditDialog, setOpenProfileEditDialog] = useState(false);
  const [openConnectEmailDialog, setOpenConnectEmailDialog] = useState(false);
  const [verificationMail, setVerificationMail] = useState("");
  const [dialogFormType, setDialogFormType] =
    useState<ConnectMailDialogFormType>(
      CONNECT_MAIL_DIALOG_FORM_TYPE.SEND_EMAIL
    );
  const { showAlert, showErrorAlert, closeAlert } = useAlert();
  const [imageFile, setImageFile] = useState<File>();
  const [tokensData, setTokensData] = useState<
    {
      name: string;
      metaDataUri: string;
    }[]
  >([]);
  const [achievementsLoading, setAchievementsLoading] = useState(false);

  const theme = useTheme();
  const isSingedUserProfile = useMemo(() => {
    return signedUserData._id === userData?._id;
  }, [signedUserData, userData]);

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

  const levelProgressValue = useMemo(() => {
    if (userData?.rewardPoint === undefined) {
      return 0;
    }
    return (userData?.rewardPoint ?? 0) % 100;
  }, [userData?.rewardPoint]);

  const asyncMailSignInWithVerify = async (email: string) => {
    try {
      showLoading();
      const res = await AwsClient.getInstance().asyncIsAuthMail(email);
      if (res.status === 400 || res.status === 500) {
        closeLoading();
        const data = await res.text();
        const message = JSON.parse(data).message;
        if (
          message === "Mail is not registered" ||
          message === "Not yet authorized"
        ) {
          showAlert({ title: "Info", content: message });
        } else {
          showErrorAlert({ content: message });
        }
        return;
      }
      await asyncUpdateEmail(email);
      setOpenConnectEmailDialog(false);
      closeLoading();
    } catch (e) {
      closeLoading();
      const message = getErrorMessage(e);
      console.log(message);
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
        <title>3ridge : Bridge to Web3</title>
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
            {userData?.profileImageUrl && (
              <Avatar
                sx={{ width: 100, height: 100 }}
                src={userData?.profileImageUrl}
              ></Avatar>
            )}
            {!userData?.profileImageUrl && userData?._id && (
              <div style={{ zIndex: 2 }}>
                <BlockIcon seed={userData?._id} scale={12}></BlockIcon>
              </div>
            )}
            {/*--- profile description ---*/}
            <Stack spacing={1}>
              <Stack direction={"row"} spacing={0} alignItems={"center"}>
                <Image
                  src={
                    "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/icon_point.svg"
                  }
                  alt={"StarIcon"}
                  width={48}
                  height={48}
                  style={{ marginLeft: -12, marginRight: -4 }}
                ></Image>
                <Typography variant={"h5"} sx={{ zIndex: 1 }}>
                  {`Point ${userData?.rewardPoint ?? 0}`}
                </Typography>
              </Stack>
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
                  <Box sx={{ maxWidth: 330 }}>
                    <GradientTypography variant={"h4"}>
                      Wallet not connected
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
                  {isSingedUserProfile && (
                    <PrimaryButton
                      onClick={() => {
                        setOpenProfileEditDialog(true);
                      }}
                      disabled={!isSingedUserProfile}
                    >
                      Edit Profile
                    </PrimaryButton>
                  )}
                </Grid>
              </Grid>
            </Stack>
            {/*--- Achievements ---*/}
            <Stack>
              <Typography variant={"h5"} sx={{ zIndex: 1 }}>
                Achievements
              </Typography>
              <Divider sx={{ borderBottomWidth: 2, paddingTop: 2 }}></Divider>
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
                    sx={{ marginTop: 8, marginBottom: 4 }}
                  >
                    <Typography variant={"h6"} color={"neutral.500"}>
                      ⛔ EMPTY
                    </Typography>
                  </Stack>
                ))}
            </Stack>
            <Box sx={{ height: 4 }}></Box>
            {/*--- Participating event ---*/}
            <Stack>
              <Typography variant={"h5"} sx={{ zIndex: 1 }}>
                Participating event
              </Typography>
              <Divider sx={{ borderBottomWidth: 2, paddingTop: 2 }}></Divider>
              <Box sx={{ height: 24 }}></Box>
              <Grid container rowSpacing={1} columnSpacing={1}>
                {userDataLoading &&
                  [1, 2, 3, 4].map((e) => {
                    return (
                      <Grid key={e} item xs={12} sm={6} md={4} lg={3}>
                        <Skeleton
                          height={380}
                          variant={"rounded"}
                          animation={"wave"}
                        />
                      </Grid>
                    );
                  })}
                {!userDataLoading &&
                  ((userData?.participatingTickets?.length ?? 0) > 0 ? (
                    userData?.participatingTickets?.map((ticket, index) => {
                      return (
                        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                          <TicketCard
                            ticket={ticket}
                            onClick={async (e) => {
                              showLoading();
                              await router.push(`/event/${ticket._id}`);
                              closeLoading();
                            }}
                          ></TicketCard>
                        </Grid>
                      );
                    })
                  ) : (
                    <Grid item sx={{ width: "100%" }}>
                      <Stack
                        direction={"row"}
                        justifyContent={"center"}
                        sx={{
                          marginTop: 8,
                          marginBottom: 4,
                          width: "100%",
                        }}
                      >
                        <Typography variant={"h6"} color={"neutral.500"}>
                          ⛔ EMPTY
                        </Typography>
                      </Stack>
                    </Grid>
                  ))}
              </Grid>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      {/*--- Dialogs ---*/}
      <ProfileEditDialog
        userData={signedUserData}
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
            emailVerify(
              { password: "12345678", email: email },
              {
                onSuccess: (msg) => {
                  closeLoading();
                  if (msg === "mail auth is already done") {
                    asyncMailSignInWithVerify(email);
                    return;
                  }
                  setVerificationMail(email);
                  setDialogFormType(CONNECT_MAIL_DIALOG_FORM_TYPE.VERIFY_EMAIL);
                },
                onError: (error) => {
                  closeLoading();
                  if (error.message === "Password is not correct") {
                    showAlert({
                      title: "Info",
                      content: "This mail is already auth",
                    });
                    return;
                  } else if (
                    error.message === "Not yet authorized" ||
                    error.message === "auth already requested"
                  ) {
                    showAlert({
                      title: "Info",
                      content: (
                        <div>
                          <Stack sx={{ width: "100%" }} spacing={1}>
                            <Typography variant={"body1"}>
                              Validation email Already is sent
                            </Typography>
                            <LinkTypography
                              variant={"body2"}
                              sx={{
                                fontWeight: "bold",
                                color: theme.palette.error.main,
                                "&:hover": {
                                  color: theme.palette.error.light,
                                  textDecoration: "underline",
                                },
                              }}
                              onClick={async (e) => {
                                closeAlert();
                                showLoading();
                                await AwsClient.getInstance().asyncResendAuthMail(
                                  email
                                );
                                closeLoading();
                                showAlert({
                                  title: "Info",
                                  content: "Validation mail is sent",
                                });
                              }}
                            >
                              Resend verification email
                            </LinkTypography>
                          </Stack>
                        </div>
                      ),
                    });
                    return;
                  }
                  closeLoading();
                  showErrorAlert({ content: error.message });
                },
              }
            );
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
            const res = await AwsClient.getInstance().asyncResendAuthMail(
              verificationMail
            );
            if (res.status === 500 || res.status === 400) {
              const data = await res.text();
              const message = JSON.parse(data).message;
              showErrorAlert({ content: message });
            } else {
              showAlert({
                title: "Info",
                content: (
                  <div>
                    <p style={{ marginBottom: -2 }}>Email is resend</p>
                    <p>Please check your email</p>
                  </div>
                ),
              });
            }
          } catch (e) {
            showErrorAlert({ content: "Unknown error occurred" });
          } finally {
            closeLoading();
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
              const includeQuestion =
                signedUserData?.profileImageUrl?.includes("?");
              await AwsClient.getInstance().asyncUploadProfileImage({
                base64Data,
                imageName: `${signedUserData?.name}.${ext}`,
              });

              let profileImageUrl = `https://sakura-frontend.s3.ap-northeast-2.amazonaws.com/profile/${signedUserData?.name}.${ext}`;
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
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          width: "100%",
          height: "180px",
          background:
            "linear-gradient(to bottom, rgb(15, 14, 20, 0), rgba(15, 14, 20, 1)), url('https://3ridge.s3.ap-northeast-2.amazonaws.com/space-detail-bg.569713b.jpg')",
          zIndex: 0,
        }}
      />
    }
  >
    {page}
  </MainLayout>
);

export default Profile;
