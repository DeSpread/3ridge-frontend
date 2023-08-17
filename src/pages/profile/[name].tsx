import React, { ReactElement, useEffect, useMemo, useState } from "react";
import MainLayout from "../../layouts/main-layout";
import Head from "next/head";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Theme,
  Typography,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import StringHelper from "../../helper/string-helper";
import GradientTypography from "../../components/atomic/atoms/gradient-typography";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import PrimaryButton from "../../components/atomic/atoms/primary-button";
import ProfileEditDialog from "../../components/dialogs/profile-edit-dialog";
import { useLoading } from "../../provider/loading/loading-provider";
import { useLogin } from "../../provider/login/login-provider";
import {
  MouseEventWithParam,
  MouseEventWithStateParam,
  ObjectValues,
  SUPPORTED_NETWORKS,
  SupportedNetwork,
} from "../../types";
import ConnectEmailDialog from "../../components/dialogs/connect-email-dialog";
import { useFirebaseAuth } from "../../lib/firebase/hook/firebase-hook";
import { useAlert } from "../../provider/alert/alert-provider";
import {
  APP_ERROR_MESSAGE,
  AppError,
  getErrorMessage,
  getLocaleErrorMessage,
} from "../../error/my-error";
import PictureEditDialog from "../../components/dialogs/picture-edit-dialog";
import { VALIDATOR_BUTTON_STATES } from "../../components/atomic/molecules/validator-button";
import StyledChip from "../../components/atomic/atoms/styled/styled-chip";
import { useTheme } from "@mui/material/styles";
import BlockIcon from "../../components/atomic/molecules/block-icon";
import { useRouter } from "next/router";
import TicketCard from "../../components/form/ticket-card";
import Image from "next/image";
import ResourceHelper from "../../helper/resource-helper";
import TypeHelper from "../../helper/type-helper";
import SignInWithSupportedWalletDialog from "../../layouts/dialog/sign/sign-in-with-supported-wallet-dialog";
import { useMobile } from "../../provider/mobile/mobile-context";
import EthUtil from "../../util/eth-util";
import ConnectTwitterDialog from "../../components/dialogs/connect-twitter-dialog";
import ConfirmAlertDialog from "../../components/dialogs/confirm-alert-dialog";
import { backDirectionPathState, kakaoRequestState } from "../../lib/recoil";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useTotalWallet } from "../../provider/login/hook/total-wallet-hook";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useSnackbar } from "../../provider/snackbar/snackbar-provider";

import { useSignedUserQuery } from "../../hooks/signed-user-query-hook";
import useSimpleStorage from "../../hooks/simple-storage-hook";
import { useWalletAlert } from "../../hooks/wallet-alert-hook";
import { useUserQuery } from "../../hooks/user-query-hook";
import { useProfileEditDialog } from "../../hooks/profile-edit-dialog-hook";
import PreferenceHelper from "../../helper/preference-helper";
import KakaoIcon from "../../components/atomic/atoms/svg/kakao-icon";
import RouterUtil from "../../util/router-util";
import DiscordIcon from "../../components/atomic/atoms/svg/discord-icon";

export const DELETE_CONFIRM_STATE = {
  NONE: "",
  WALLET: "WALLET",
  MAIL: "MAIL",
  TWITTER: "TWITTER",
  TELEGRAM: "TELEGRAM",
  KAKAO: "KAKAO",
  DISCORD: "DISCORD",
} as const;

export type DeleteConfirmState = ObjectValues<typeof DELETE_CONFIRM_STATE>;

const Profile = () => {
  const router = useRouter();
  const { userData, loading: userDataLoading } = useUserQuery({
    name: RouterUtil.getStringQuery(router, "name"),
  });
  const {
    userData: signedUserData,
    asyncUpsertWalletAddress,
    asyncDeleteWalletAddress,
    asyncUpdateProfileImageUrl,
    asyncUpdateEmail,
    asyncUpdateSocialTwitter,
    asyncUpdateSocialTelegram,
    asyncRemoveSocialTelegram,
    asyncDeleteKakao,
    asyncDeleteDiscord,
  } = useSignedUserQuery();
  const { isMobile } = useMobile();
  const backDirectionPath = useRecoilValue(backDirectionPathState);
  const setBackDirectionPath = useSetRecoilState(backDirectionPathState);

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
  const { isProfileEditDialogOpen, setShowProfileEditDialog } =
    useProfileEditDialog();
  const [openProfileEditDialog, setOpenProfileEditDialog] = useState(false);
  const [openConnectEmailDialog, setOpenConnectEmailDialog] = useState(false);
  const [openConnectTwitterDialog, setOpenConnectTwitterDialog] =
    useState(false);
  const { showAlert, showErrorAlert, closeAlert } = useAlert();
  const { showWalletAlert } = useWalletAlert();
  const [imageFile, setImageFile] = useState<File>();
  const { disconnectWalletByNetwork } = useTotalWallet();
  const { showSnackbar } = useSnackbar();

  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState(false);
  const [deleteConfirmDialogMessage, setDeleteConfirmDialogMessage] =
    useState("");
  const [deleteConfirmState, setDeleteConfirmState] = useState<{
    state: DeleteConfirmState;
    payload?: string;
  }>({ state: DELETE_CONFIRM_STATE.NONE });

  const theme = useTheme();

  const { asyncUploadImage } = useSimpleStorage();

  useEffect(() => {
    switch (deleteConfirmState.state) {
      case DELETE_CONFIRM_STATE.NONE: {
        setDeleteConfirmDialog(false);
        setDeleteConfirmDialogMessage("");
        break;
      }
      case DELETE_CONFIRM_STATE.MAIL: {
        setDeleteConfirmDialog(true);
        setDeleteConfirmDialogMessage("메일 연동을 해제 하시겠습니까?");
        break;
      }
      case DELETE_CONFIRM_STATE.TWITTER: {
        setDeleteConfirmDialog(true);
        setDeleteConfirmDialogMessage("트위터 연동을 해제 하시겠습니까?");
        break;
      }
      case DELETE_CONFIRM_STATE.TELEGRAM: {
        setDeleteConfirmDialog(true);
        setDeleteConfirmDialogMessage("텔레그램 연동을 해제 하시겠습니까?");
        break;
      }
      case DELETE_CONFIRM_STATE.WALLET: {
        setDeleteConfirmDialog(true);
        setDeleteConfirmDialogMessage(
          `${deleteConfirmState.payload?.toUpperCase()} 지갑 연동을 해제 하시겠습니까?`
        );
        break;
      }
      case DELETE_CONFIRM_STATE.KAKAO: {
        setDeleteConfirmDialog(true);
        setDeleteConfirmDialogMessage(`카카오 연동을 해제 하겠습니까?`);
        break;
      }
      case DELETE_CONFIRM_STATE.DISCORD: {
        setDeleteConfirmDialog(true);
        setDeleteConfirmDialogMessage(`디스코드 연동을 해제 하겠습니까?`);
        break;
      }
      default: {
        setDeleteConfirmDialog(false);
        setDeleteConfirmDialogMessage("");
      }
    }
  }, [deleteConfirmState]);

  const isSingedUserProfile = useMemo(() => {
    return signedUserData._id === userData?._id;
  }, [signedUserData, userData]);

  useEffect(() => {
    if (isProfileEditDialogOpen) {
      setOpenProfileEditDialog(true);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url && typeof url === "string" && !url.includes("profile")) {
        setShowProfileEditDialog(false);
        setBackDirectionPath("");
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const targetUserData = useMemo(() => {
    if (userData?._id === signedUserData._id) {
      return signedUserData;
    }
    return userData;
  }, [signedUserData, userData]);

  const pictureEditDialogOpen = useMemo(() => {
    return imageFile ? true : false;
  }, [imageFile]);

  const connectedWalletNetworks = useMemo(() => {
    return targetUserData?.walletAddressInfos
      ?.filter((e) => e.address)
      .map((e) => e.network);
  }, targetUserData?.walletAddressInfos);

  const levelProgressValue = useMemo(() => {
    if (userData?.rewardPoint === undefined) {
      return 0;
    }
    return (userData?.rewardPoint ?? 0) % 100;
  }, [userData?.rewardPoint]);

  const signInWithSupportedWalletVisible = useMemo(() => {
    return selectedNetwork ? true : false;
  }, [selectedNetwork]);

  return (
    <>
      <Head>
        <title>3ridge : Web3 온보딩 플랫폼</title>
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
            {targetUserData?.profileImageUrl && (
              <Avatar
                sx={{ width: 100, height: 100 }}
                src={targetUserData?.profileImageUrl}
              ></Avatar>
            )}
            {!targetUserData?.profileImageUrl && targetUserData?._id && (
              <div style={{ zIndex: 2 }}>
                <BlockIcon seed={targetUserData?._id} scale={12}></BlockIcon>
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
                  {`${targetUserData?.rewardPoint ?? 0} 포인트`}
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
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                {targetUserData?.walletAddressInfos?.[0]?.address ? (
                  <>
                    <Box sx={{ maxWidth: 260 }}>
                      <GradientTypography variant={"h4"}>
                        {StringHelper.convertAddressToMidEllipsis(
                          targetUserData?.walletAddressInfos?.[0]?.address
                        )}
                      </GradientTypography>
                    </Box>
                    <IconButton
                      onClick={(e) => {
                        if (targetUserData?.walletAddressInfos?.[0]?.address) {
                          navigator.clipboard.writeText(
                            targetUserData?.walletAddressInfos?.[0]?.address
                          );
                          showSnackbar("주소를 복사하였습니다");
                        }
                      }}
                    >
                      <ContentCopyIcon></ContentCopyIcon>
                    </IconButton>
                  </>
                ) : (
                  <Box sx={{ maxWidth: 330, marginBottom: 1 }}>
                    <GradientTypography variant={"h4"}>
                      지갑이 연결되지 않았어요
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
                <Stack
                  alignItems={"center"}
                  justifyContent={"center"}
                  sx={{ background: "" }}
                >
                  <Grid
                    item
                    container={true}
                    sx={{ marginLeft: -1 }}
                    columnSpacing={1}
                    rowSpacing={1}
                  >
                    {Object.values(SUPPORTED_NETWORKS)
                      .filter(
                        (network) =>
                          network === SUPPORTED_NETWORKS.EVM ||
                          (!isMobile && network === SUPPORTED_NETWORKS.APTOS) ||
                          network === SUPPORTED_NETWORKS.STACKS
                      )
                      .filter(
                        (_, index) =>
                          index !== Object.values(SUPPORTED_NETWORKS).length - 1
                      )
                      .map((network, index) => {
                        if (connectedWalletNetworks?.includes(network)) {
                          const addressInfo =
                            targetUserData?.walletAddressInfos?.filter(
                              (w) => w.network === network
                            )?.[0];
                          if (!addressInfo) return <></>;
                          return (
                            <Grid item key={index}>
                              <StyledChip
                                key={index}
                                sx={{
                                  "&:hover": {
                                    background: (theme: Theme) =>
                                      theme.palette.action.hover,
                                  },
                                }}
                                onClick={(e: MouseEvent) => {
                                  e.preventDefault();
                                  const newWindow = window.open(
                                    ResourceHelper.getExplorerUri(
                                      addressInfo.network,
                                      addressInfo.address
                                    ),
                                    "_blank",
                                    "noopener,noreferrer"
                                  );
                                  if (newWindow) newWindow.opener = null;
                                }}
                                icon={
                                  <img
                                    src={ResourceHelper.getExplorerIconUri(
                                      addressInfo.network
                                    )}
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
                                  <Typography
                                    variant={"body2"}
                                    color={"neutral.100"}
                                  >
                                    {StringHelper.convertAddressToMidEllipsis(
                                      addressInfo?.address
                                    )}
                                  </Typography>
                                }
                              ></StyledChip>
                            </Grid>
                          );
                        } else {
                          return (
                            <Grid item key={index}>
                              <StyledChip
                                key={index}
                                sx={{
                                  "&:hover": {
                                    background: (theme: Theme) =>
                                      theme.palette.action.hover,
                                  },
                                }}
                                onClick={(e: MouseEvent) => {
                                  e.preventDefault();
                                  setOpenProfileEditDialog(true);
                                }}
                                icon={
                                  <img
                                    src={ResourceHelper.getExplorerIconUri(
                                      network
                                    )}
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
                                  <Typography
                                    variant={"body2"}
                                    color={"neutral.100"}
                                  >
                                    {`${network?.toUpperCase()}를 연동해주세요`}
                                  </Typography>
                                }
                              ></StyledChip>
                            </Grid>
                          );
                        }
                      })}
                    {TypeHelper.getUserMail(targetUserData) && (
                      <Grid item>
                        <StyledChip
                          icon={<MarkEmailReadIcon></MarkEmailReadIcon>}
                          label={
                            <Typography
                              sx={{ marginLeft: 1 }}
                              variant={"body2"}
                              color={"neutral.100"}
                            >
                              {TypeHelper.getUserMail(targetUserData)}
                            </Typography>
                          }
                        ></StyledChip>
                      </Grid>
                    )}
                    {!TypeHelper.getUserMail(targetUserData) && (
                      <Grid item>
                        <StyledChip
                          sx={{
                            "&:hover": {
                              background: (theme: Theme) =>
                                theme.palette.action.hover,
                            },
                          }}
                          onClick={(e: MouseEvent) => {
                            e.preventDefault();
                            setOpenProfileEditDialog(true);
                          }}
                          icon={<EmailIcon></EmailIcon>}
                          label={
                            <Typography
                              sx={{ marginLeft: 1 }}
                              variant={"body2"}
                              color={"neutral.100"}
                            >
                              이메일을 연동해주세요
                            </Typography>
                          }
                        ></StyledChip>
                      </Grid>
                    )}
                    {targetUserData?.userSocial?.twitterId && (
                      <Grid item>
                        <StyledChip
                          icon={<TwitterIcon></TwitterIcon>}
                          label={
                            <Typography
                              sx={{ marginLeft: 1 }}
                              variant={"body2"}
                              color={"neutral.100"}
                            >
                              {targetUserData?.userSocial?.twitterId}
                            </Typography>
                          }
                        ></StyledChip>
                      </Grid>
                    )}
                    {!targetUserData?.userSocial?.twitterId && (
                      <Grid item>
                        <StyledChip
                          sx={{
                            "&:hover": {
                              background: (theme: Theme) =>
                                theme.palette.action.hover,
                            },
                          }}
                          onClick={(e: MouseEvent) => {
                            e.preventDefault();
                            setOpenProfileEditDialog(true);
                          }}
                          icon={<TwitterIcon></TwitterIcon>}
                          label={
                            <Typography
                              sx={{ marginLeft: 1 }}
                              variant={"body2"}
                              color={"neutral.100"}
                            >
                              트위터를 연동해주세요
                            </Typography>
                          }
                        ></StyledChip>
                      </Grid>
                    )}
                    {targetUserData?.userSocial?.telegramUser?.username && (
                      <Grid item>
                        <StyledChip
                          icon={<TelegramIcon></TelegramIcon>}
                          label={
                            <Typography
                              sx={{ marginLeft: 1 }}
                              variant={"body2"}
                              color={"neutral.100"}
                            >
                              {
                                targetUserData?.userSocial?.telegramUser
                                  ?.username
                              }
                            </Typography>
                          }
                        ></StyledChip>
                      </Grid>
                    )}
                    {!targetUserData?.userSocial?.telegramUser?.username && (
                      <Grid item>
                        <StyledChip
                          sx={{
                            "&:hover": {
                              background: (theme: Theme) =>
                                theme.palette.action.hover,
                            },
                          }}
                          onClick={(e: MouseEvent) => {
                            e.preventDefault();
                            setOpenProfileEditDialog(true);
                          }}
                          icon={<TelegramIcon></TelegramIcon>}
                          label={
                            <Typography
                              sx={{ marginLeft: 1 }}
                              variant={"body2"}
                              color={"neutral.100"}
                            >
                              텔레그램을 연동해주세요
                            </Typography>
                          }
                        ></StyledChip>
                      </Grid>
                    )}
                    {/*{targetUserData?.kakao?.properties?.nickname && (*/}
                    {/*  <Grid item>*/}
                    {/*    <StyledChip*/}
                    {/*      icon={*/}
                    {/*        <KakaoIcon*/}
                    {/*          sx={{ color: "black", fontSize: "1.1rem" }}*/}
                    {/*          color={"inherit"}*/}
                    {/*          fontSize={"inherit"}*/}
                    {/*        ></KakaoIcon>*/}
                    {/*      }*/}
                    {/*      label={*/}
                    {/*        <Typography*/}
                    {/*          sx={{ marginLeft: 1 }}*/}
                    {/*          variant={"body2"}*/}
                    {/*          color={"neutral.100"}*/}
                    {/*        >*/}
                    {/*          {targetUserData?.kakao?.properties?.nickname}*/}
                    {/*        </Typography>*/}
                    {/*      }*/}
                    {/*    ></StyledChip>*/}
                    {/*  </Grid>*/}
                    {/*)}*/}
                    {/*{!targetUserData?.kakao?.properties?.nickname && (*/}
                    {/*  <Grid item>*/}
                    {/*    <StyledChip*/}
                    {/*      sx={{*/}
                    {/*        "&:hover": {*/}
                    {/*          background: (theme: Theme) =>*/}
                    {/*            theme.palette.action.hover,*/}
                    {/*        },*/}
                    {/*      }}*/}
                    {/*      onClick={(e: MouseEvent) => {*/}
                    {/*        e.preventDefault();*/}
                    {/*        setOpenProfileEditDialog(true);*/}
                    {/*      }}*/}
                    {/*      icon={*/}
                    {/*        <KakaoIcon*/}
                    {/*          sx={{ color: "black", fontSize: "1.1rem" }}*/}
                    {/*          color={"inherit"}*/}
                    {/*          fontSize={"inherit"}*/}
                    {/*        ></KakaoIcon>*/}
                    {/*      }*/}
                    {/*      label={*/}
                    {/*        <Typography*/}
                    {/*          sx={{ marginLeft: 1 }}*/}
                    {/*          variant={"body2"}*/}
                    {/*          color={"neutral.100"}*/}
                    {/*        >*/}
                    {/*          카카오톡을 연동해주세요*/}
                    {/*        </Typography>*/}
                    {/*      }*/}
                    {/*    ></StyledChip>*/}
                    {/*  </Grid>*/}
                    {/*)}*/}
                    {targetUserData?.discord?.username && (
                      <Grid item>
                        <StyledChip
                          icon={<DiscordIcon></DiscordIcon>}
                          label={
                            <Typography
                              sx={{ marginLeft: 1 }}
                              variant={"body2"}
                              color={"neutral.100"}
                            >
                              {targetUserData?.discord?.username}
                            </Typography>
                          }
                        ></StyledChip>
                      </Grid>
                    )}
                    {!targetUserData?.discord?.username && (
                      <Grid item>
                        <StyledChip
                          sx={{
                            "&:hover": {
                              background: (theme: Theme) =>
                                theme.palette.action.hover,
                            },
                          }}
                          onClick={(e: MouseEvent) => {
                            e.preventDefault();
                            setOpenProfileEditDialog(true);
                          }}
                          icon={<DiscordIcon></DiscordIcon>}
                          label={
                            <Typography
                              sx={{ marginLeft: 1 }}
                              variant={"body2"}
                              color={"neutral.100"}
                            >
                              디스코드를 연동해주세요
                            </Typography>
                          }
                        ></StyledChip>
                      </Grid>
                    )}
                  </Grid>
                </Stack>
                <Grid
                  item
                  sx={{ background: "" }}
                  // alignItems={"center"}
                  // justifyContent={"center"}
                >
                  {isSingedUserProfile && (
                    <PrimaryButton
                      sx={{ marginBottom: 1, marginLeft: -1 }}
                      onClick={() => {
                        setOpenProfileEditDialog(true);
                        // setShowProfileEditDialog(true);
                      }}
                      disabled={!isSingedUserProfile}
                    >
                      프로필 수정하기
                    </PrimaryButton>
                  )}
                </Grid>
              </Grid>
            </Stack>
            {/*--- Achievements ---*/}
            <Stack sx={{ background: "" }}>
              <Typography variant={"h5"} sx={{ zIndex: 1 }}>
                리워드 받은 이벤트
              </Typography>
              <Divider
                sx={{ borderBottomWidth: 2, paddingTop: 2, marginBottom: 3 }}
              ></Divider>
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
                  ((userData?.participatingTickets?.filter((e) => {
                    return e.winners
                      ?.map((_e) => _e.name)
                      .includes(userData?.name);
                  }).length ?? 0) > 0 ? (
                    userData?.participatingTickets
                      ?.filter((e) => {
                        return e.winners
                          ?.map((_e) => _e.name)
                          .includes(userData?.name);
                      })
                      .map((ticket, index) => {
                        return (
                          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                            <TicketCard
                              ticket={ticket}
                              username={userData?.name}
                              onClick={async (e) => {
                                showLoading();
                                await router.push(`/event/${ticket._id}`);
                                closeLoading();
                              }}
                              isWinner={true}
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
                          marginBottom: 16,
                          width: "100%",
                        }}
                      >
                        <Typography variant={"h6"} color={"neutral.500"}>
                          리워드 받은 이벤트가 없습니다
                        </Typography>
                      </Stack>
                    </Grid>
                  ))}
              </Grid>
            </Stack>
            <Box sx={{ height: 4 }}></Box>
            {/*--- Participating event ---*/}
            <Stack>
              <Typography variant={"h5"} sx={{ zIndex: 1 }}>
                참여 중인 이벤트
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
                            username={userData?.name}
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
                          marginBottom: 16,
                          width: "100%",
                        }}
                      >
                        <Typography variant={"h6"} color={"neutral.500"}>
                          참여한 이벤트가 없어요
                        </Typography>
                      </Stack>
                    </Grid>
                  ))}
              </Grid>
              <Box sx={{ height: 48 }}></Box>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      {/*--- Dialogs ---*/}
      <ProfileEditDialog
        userData={signedUserData}
        backDirectionPath={backDirectionPath}
        title={"프로필 수정하기"}
        onClose={() => {
          setOpenProfileEditDialog(false);
          setShowProfileEditDialog(false);
          setBackDirectionPath("");
        }}
        open={openProfileEditDialog}
        walletValidatorButtonOnClick={async (e) => {
          const myEvent = e as MouseEventWithParam<{
            state?: string;
            payload: string | undefined;
          }>;
          const { params } = myEvent;
          const { state, payload } = params;
          const network = TypeHelper.convertToSuppoertedNetwork(payload);
          showLoading();
          try {
            if (myEvent.params.state === VALIDATOR_BUTTON_STATES.VALID) {
              setDeleteConfirmState({
                state: DELETE_CONFIRM_STATE.WALLET,
                payload: network,
              });
            } else if (
              myEvent.params.state === VALIDATOR_BUTTON_STATES.NOT_VALID
            ) {
              setSelectedNetwork(network);
            }
          } catch (e) {
            if (
              e instanceof AppError &&
              e.message === APP_ERROR_MESSAGE.WALLET_NOT_INSTALLED
            ) {
              //@ts-ignore
              showWalletAlert(convertToSuppoertedNetwork(e.payload));
            } else if (
              e instanceof AppError &&
              e.message === APP_ERROR_MESSAGE.WALLET_ADDRESS_ALREADY_REGISTERED
            ) {
              showErrorAlert({ content: "이미 등록된 주소입니다" });
            } else {
              showErrorAlert({ content: getErrorMessage(e) });
            }
          } finally {
            closeLoading();
          }
        }}
        emailValidatorButtonOnClick={async (e) => {
          const myEvent = e as MouseEventWithStateParam;
          showLoading();
          if (myEvent.params.state === VALIDATOR_BUTTON_STATES.VALID) {
            setDeleteConfirmState({ state: DELETE_CONFIRM_STATE.MAIL });
          } else if (
            myEvent.params.state === VALIDATOR_BUTTON_STATES.NOT_VALID
          ) {
            setOpenConnectEmailDialog(true);
          }
          closeLoading();
        }}
        twitterValidatorButtonOnClick={async (e) => {
          try {
            const myEvent = e as MouseEventWithStateParam;
            showLoading();
            if (myEvent.params.state === VALIDATOR_BUTTON_STATES.VALID) {
              setDeleteConfirmState({ state: DELETE_CONFIRM_STATE.TWITTER });
            } else if (
              myEvent.params.state === VALIDATOR_BUTTON_STATES.NOT_VALID
            ) {
              if (isMobile) {
                setOpenConnectTwitterDialog(true);
              } else {
                const res = await asyncTwitterSignInPopUp();
                await asyncUpdateSocialTwitter(res);
              }
            }
          } catch (e) {
            console.log(e);
          } finally {
            closeLoading();
          }
        }}
        telegramValidatorButtonOnClick={async (e) => {
          try {
            const myEvent = e as MouseEventWithStateParam;
            showLoading();
            if (myEvent.params.state === VALIDATOR_BUTTON_STATES.VALID) {
              setDeleteConfirmState({ state: DELETE_CONFIRM_STATE.TELEGRAM });
            } else if (
              myEvent.params.state === VALIDATOR_BUTTON_STATES.NOT_VALID
            ) {
              await asyncUpdateSocialTelegram();
            }
          } catch (e) {
            console.log(e);
          } finally {
            closeLoading();
          }
        }}
        kakaoValidatorButtonOnClick={async (e) => {
          try {
            const myEvent = e as MouseEventWithStateParam;
            showLoading();
            if (myEvent.params.state === VALIDATOR_BUTTON_STATES.VALID) {
              setDeleteConfirmState({ state: DELETE_CONFIRM_STATE.KAKAO });
            } else if (
              myEvent.params.state === VALIDATOR_BUTTON_STATES.NOT_VALID
            ) {
              const kakaoLogin = () => {
                window.Kakao.Auth.authorize({
                  redirectUri: `${window.location.origin}/kakao`,
                });
              };
              PreferenceHelper.updateKakaoRequest("update");
              kakaoLogin();
            }
          } catch (e) {
            console.log(e);
          } finally {
            closeLoading();
          }
        }}
        discordValidatorButtonOnClick={async (e) => {
          try {
            const myEvent = e as MouseEventWithStateParam;
            showLoading();
            if (myEvent.params.state === VALIDATOR_BUTTON_STATES.VALID) {
              setDeleteConfirmState({ state: DELETE_CONFIRM_STATE.DISCORD });
            } else if (
              myEvent.params.state === VALIDATOR_BUTTON_STATES.NOT_VALID
            ) {
              location.href = process.env["NEXT_PUBLIC_DISCORD_AUTH_URL"] ?? "";
            }
          } catch (e) {
            console.log(e);
          } finally {
            closeLoading();
          }
        }}
        isWalletLoggedIn={isWalletLoggedIn}
        isMailLoggedIn={isMailLoggedIn || isGoogleLoggedIn}
        onCloseBtnClicked={(e) => {
          setOpenProfileEditDialog(false);
          setShowProfileEditDialog(false);
        }}
        onFileImageAdded={(f) => {
          setImageFile(f);
        }}
      ></ProfileEditDialog>
      <ConnectEmailDialog
        open={openConnectEmailDialog}
        onCloseBtnClicked={(e) => {
          e.preventDefault();
          setOpenConnectEmailDialog(false);
        }}
        onClose={() => {
          setOpenConnectEmailDialog(false);
        }}
        onOauthComplete={async (mail) => {
          showLoading();
          await asyncUpdateEmail(mail);
          showAlert({
            title: "알림",
            content: "인증되었습니다",
          });
          setOpenConnectEmailDialog(false);
          closeLoading();
        }}
      ></ConnectEmailDialog>
      <ConnectTwitterDialog
        open={openConnectTwitterDialog}
        onCloseBtnClicked={(e) => {
          e.preventDefault();
          setOpenConnectTwitterDialog(false);
        }}
        onClose={() => {
          setOpenConnectTwitterDialog(false);
        }}
      ></ConnectTwitterDialog>
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
              const res = await asyncUploadImage(
                `profile/${signedUserData?.name}.${ext}`,
                base64Data
              );
              // const data = await res.text();

              let profileImageUrl = `https://3ridge.s3.ap-northeast-2.amazonaws.com/profile/${signedUserData?.name}.${ext}`;
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
      <SignInWithSupportedWalletDialog
        title={"연결하려는 지갑을 선택하세요"}
        open={signInWithSupportedWalletVisible}
        onCloseBtnClicked={(e) => {
          e.preventDefault();
          setSelectedNetwork("");
        }}
        onClose={() => {
          setSelectedNetwork("");
        }}
        walletInfos={(() => {
          return ResourceHelper.getWalletInfos(
            TypeHelper.convertToSuppoertedNetwork(selectedNetwork)
          );
        })()}
        onWalletSelected={({ name, value }) => {
          const walletName = TypeHelper.convertToWalletName(value);
          if (!walletName) return;
          if (EthUtil.goToMetaMaskDeppLinkWhenMobile(walletName, isMobile)) {
            return;
          }
          (async () => {
            try {
              showLoading();
              const res = await asyncUpsertWalletAddress(
                selectedNetwork as SupportedNetwork,
                walletName
              );
              setSelectedNetwork("");
            } catch (e) {
              if (
                e instanceof AppError &&
                e.message === APP_ERROR_MESSAGE.WALLET_NOT_INSTALLED
              ) {
                //@ts-ignore
                showWalletAlert(convertToSuppoertedNetwork(e.payload));
              } else {
                showErrorAlert({ content: getLocaleErrorMessage(e) });
              }
            } finally {
              closeLoading();
            }
          })();
        }}
      ></SignInWithSupportedWalletDialog>
      <ConfirmAlertDialog
        open={deleteConfirmDialog}
        onCloseBtnClicked={(e) => {
          setDeleteConfirmState({ state: DELETE_CONFIRM_STATE.NONE });
        }}
        onConfirmBtnClicked={async (e) => {
          try {
            const state = deleteConfirmState.state;
            if (deleteConfirmState.state === DELETE_CONFIRM_STATE.MAIL) {
              await asyncUpdateEmail("");
            } else if (state === DELETE_CONFIRM_STATE.TELEGRAM) {
              await asyncRemoveSocialTelegram();
            } else if (state === DELETE_CONFIRM_STATE.TWITTER) {
              await asyncUpdateSocialTwitter("");
            } else if (state === DELETE_CONFIRM_STATE.WALLET) {
              const network = TypeHelper.convertToSuppoertedNetwork(
                deleteConfirmState.payload
              );
              await asyncDeleteWalletAddress(network);
            } else if (state === DELETE_CONFIRM_STATE.KAKAO) {
              await asyncDeleteKakao();
            } else if (state === DELETE_CONFIRM_STATE.DISCORD) {
              console.log("try delete discord");
              await asyncDeleteDiscord();
            }
            showAlert({ title: "알림", content: "완료되었습니다" });
          } catch (e) {
            showErrorAlert({ content: getLocaleErrorMessage(e) });
          } finally {
            setDeleteConfirmState({ state: DELETE_CONFIRM_STATE.NONE });
          }
        }}
        onCancelBtnClicked={(e) => {
          setDeleteConfirmState({ state: DELETE_CONFIRM_STATE.NONE });
        }}
        title={"알림"}
        onClose={() => {
          setDeleteConfirmState({ state: DELETE_CONFIRM_STATE.NONE });
        }}
      >
        <Box sx={{ marginTop: 2 }}>{deleteConfirmDialogMessage}</Box>
      </ConfirmAlertDialog>
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
