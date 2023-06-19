import {
  AppBar,
  Box,
  LinearProgress,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { PropsWithChildren } from "react";
import React, { MouseEventHandler, ReactNode, useMemo, useState } from "react";
import NavbarAvatar from "../components/molecules/navbar-avatar";
import { useRouter } from "next/router";
import SecondaryButton from "../components/atoms/secondary-button";
import SignInDialog from "./dialog/sign/sign-in-dialog";
import SignInWithDialog from "./dialog/sign/sign-in-with-dialog";
import SignInWithEmailDialog from "./dialog/sign/sign-in-with-email";
import { useLogin } from "../provider/login/login-provider";
import {
  APP_ERROR_MESSAGE,
  AppError,
  getErrorMessage,
  getLocaleErrorMessage,
} from "../error/my-error";
import { useAlert } from "../provider/alert/alert-provider";
import { useSignedUserQuery } from "../page-hook/signed-user-query-hook";
import { useLoading } from "../provider/loading/loading-provider";
import {
  EmailSignUpEventParams,
  MouseEventWithParam,
  SupportedNetwork,
  Z_INDEX_OFFSET,
} from "../type";
import { useSignDialog } from "../page-hook/sign-dialog-hook";
import NavbarButton from "../components/atoms/navbar-button";
import SubMenuButton from "../components/molecules/sub-menu-button";
import Image from "next/image";
import SignInWithNetworkSelectDialog from "./dialog/sign/sign-in-with-network-select-dialog";
import SignInWithSupportedWalletDialog from "./dialog/sign/sign-in-with-supported-wallet-dialog";
import { useWalletAlert } from "../page-hook/wallet-alert-hook";
import {
  convertToSuppoertedNetwork,
  convertToWalletName,
} from "../util/type-util";
import ResourceFactory from "../helper/resource-factory";
import MobileNavigatorBar from "../components/atoms/mobile/mobile-navigator-bar";
import { useMobile } from "../provider/mobile/mobile-context";
import { goToMetaMaskDeppLinkWhenMobile } from "../util/eth-util";

type MainLayoutProps = PropsWithChildren & {
  backgroundComponent?: ReactNode;
  footerComponent?: ReactNode;
  disableNavButtonSet?: boolean;
};

type NavbarButtonSetProps = PropsWithChildren & {
  bountiesBtnOnClick: MouseEventHandler;
  contentsBtnOnClick: MouseEventHandler;
  achievementsBtnOnClick: MouseEventHandler;
  communitiesBtnOnClick: MouseEventHandler;
  leaderBoardBtnOnClick: MouseEventHandler;
};

const NavbarButtonSet = ({
  bountiesBtnOnClick,
  communitiesBtnOnClick,
  leaderBoardBtnOnClick,
}: NavbarButtonSetProps) => {
  return (
    <Stack direction={"row"} sx={{ background: "" }}>
      <Box>
        <NavbarButton onClick={bountiesBtnOnClick}>이벤트</NavbarButton>
      </Box>
      <Box>
        <NavbarButton onClick={communitiesBtnOnClick}>프로젝트</NavbarButton>
      </Box>
      <Box>
        <NavbarButton onClick={leaderBoardBtnOnClick}>유저랭킹</NavbarButton>
      </Box>
    </Stack>
  );
};

const MainLayout = (props: MainLayoutProps) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();
  const {
    isLoggedIn,
    isWalletLoggedIn,
    isGoogleLoggedIn,
    isMailLoggedIn,
    logout,
    googleSignUp,
    walletSignUp,
  } = useLogin();
  const { userData } = useSignedUserQuery();
  const { setShowSignInDialog, isSignDialogOpen } = useSignDialog();
  const [signUpWithVisible, setSignUpWithVisible] = useState(false);
  const [signUpWithEmailVisible, setSignUpWithEmailVisible] = useState(false);
  // const [signInWithNetworkSelectVisible, setSignInWithNetworkSelectVisible] =
  //   useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const { isMobile } = useMobile();

  const { showErrorAlert, showAlert } = useAlert();
  const { showWalletAlert } = useWalletAlert();
  const { emailSignIn } = useLogin();
  const { showLoading, closeLoading } = useLoading();

  const resourceFactory = ResourceFactory.getInstance();

  const signInWithSupportedWalletVisible = useMemo(() => {
    return selectedNetwork ? true : false;
  }, [selectedNetwork]);

  const asyncGoToExplore = async () => {
    showLoading();
    await router.push(`/explore`);
    closeLoading();
  };

  const asyncGoToProjects = async () => {
    showLoading();
    await router.push(`/projects`);
    closeLoading();
  };

  const asyncGoToLeaderBoard = async () => {
    showLoading();
    await router.push(`/leaderboard`);
    closeLoading();
  };

  const asyncShowSignDialog = async () => {
    setShowSignInDialog(true);
  };

  const asyncSignedProfileBtnOnClick = async () => {
    showLoading();
    await router.push(`/profile/${userData.name}`);
    closeLoading();
  };

  const asyncLogoutBtnOnClick = async () => {
    logout({
      onSuccess: () => {
        // showLoading();
        // router.push("/").then((res) => {
        //   closeLoading();
        // });
      },
      onError: (error) => {
        showErrorAlert({ content: error.message });
      },
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/*<div*/}
      {/*  style={{*/}
      {/*    position: "absolute",*/}
      {/*    top: "10%",*/}
      {/*    left: "50%",*/}
      {/*    transform: "translate(0%, -50%)",*/}
      {/*    zIndex: 1300,*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Backdrop*/}
      {/*    sx={{*/}
      {/*      color: "#fff",*/}
      {/*      overflowY: "auto",*/}
      {/*      display: "inline-block",*/}
      {/*      zIndex: (theme) =>*/}
      {/*        theme.zIndex.drawer + Z_INDEX_OFFSET.LOADING_BACKDROP,*/}
      {/*    }}*/}
      {/*    open={true}*/}
      {/*  >*/}
      {/*  </Backdrop>*/}
      {/*</div>*/}
      {/*<LinearProgress*/}
      {/*  color={"info"}*/}
      {/*  sx={{*/}
      {/*    background: (theme) => theme.palette.action.hover,*/}
      {/*    width: "100%",*/}
      {/*    position: "absolute",*/}
      {/*    top: 0,*/}
      {/*    borderRadius: 0,*/}
      {/*    height: "2px",*/}
      {/*  }}*/}
      {/*></LinearProgress>*/}
      {/*<SimpleDialog open={true}>축하합니다.</SimpleDialog>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*--- Navbar ---*/}
      <AppBar
        // className={myFont.className}
        component="nav"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + Z_INDEX_OFFSET.NAV_LAYOUT,
        }}
      >
        <Box
          sx={{
            flexGlow: 1,
            height: "62px",
            borderWidth: 0,
            borderBottomWidth: 1,
            borderStyle: "solid",
            borderBottomColor: theme.palette.divider,
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Stack
            sx={{
              background: "",
              flex: 1,
              height: "100%",
              padding: smUp ? 3 : 2,
            }}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box
              onClick={(e) => {
                e.preventDefault();
                router.push("/").then();
              }}
              sx={{
                cursor: "pointer",
                marginLeft: -1,
              }}
            >
              <Stack direction={"row"} alignItems={"flex-start"}>
                <Image
                  src={
                    "https://3ridge.s3.ap-northeast-2.amazonaws.com/logo/02_svg/3ridge_logo_white.svg"
                  }
                  height={smUp ? 52 : 48}
                  width={smUp ? 132 : 120}
                  alt={""}
                />
                <Image
                  src={
                    "https://3ridge.s3.ap-northeast-2.amazonaws.com/logo/02_svg/beta.svg"
                  }
                  height={smUp ? 30 : 30}
                  width={smUp ? 30 : 30}
                  alt={""}
                />
              </Stack>
            </Box>
            {!props.disableNavButtonSet &&
              (smUp ? (
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Box sx={{ marginRight: 1 }}>
                    <NavbarButtonSet
                      bountiesBtnOnClick={asyncGoToExplore}
                      contentsBtnOnClick={() => {}}
                      achievementsBtnOnClick={() => {}}
                      communitiesBtnOnClick={asyncGoToProjects}
                      leaderBoardBtnOnClick={asyncGoToLeaderBoard}
                    ></NavbarButtonSet>
                  </Box>
                  {isLoggedIn ? (
                    <NavbarAvatar
                      rewardPoint={userData?.rewardPoint}
                      userId={userData?._id}
                      src={userData?.profileImageUrl}
                      walletAddress={userData?.walletAddressInfos?.[0]?.address}
                      onProfileItemClicked={asyncSignedProfileBtnOnClick}
                      onLogoutBtnClicked={asyncLogoutBtnOnClick}
                    ></NavbarAvatar>
                  ) : (
                    <Stack direction={"row"} alignItems={"center"} spacing={2}>
                      <SecondaryButton
                        size={"small"}
                        sx={{
                          width: 100,
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          setShowSignInDialog(true);
                          // open();
                          // setSignInWithNetworkSelectVisible(true);
                          // setShowSignInDialog(true);
                        }}
                      >
                        지갑 연결
                      </SecondaryButton>
                    </Stack>
                  )}
                </Stack>
              ) : isLoggedIn ? (
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  spacing={2}
                >
                  <MobileNavigatorBar
                    isLoggedIn={isLoggedIn}
                    rewardPoint={userData?.rewardPoint}
                    userId={userData?._id}
                    profileImageUrl={userData?.profileImageUrl}
                    walletAddress={userData?.walletAddressInfos?.[0]?.address}
                    onSignInClick={asyncSignedProfileBtnOnClick}
                    onLogoutInClick={asyncLogoutBtnOnClick}
                    onExploreClick={asyncGoToExplore}
                    onProjectsClick={asyncGoToProjects}
                    onLeaderBoardClick={asyncGoToLeaderBoard}
                  />
                </Stack>
              ) : (
                <SubMenuButton
                  isLoggedIn={isLoggedIn}
                  onExploreClick={asyncGoToExplore}
                  onProjectsClick={asyncGoToProjects}
                  onLeaderBoardClick={asyncGoToLeaderBoard}
                  onSignInClick={async (e) => {
                    e.preventDefault();
                    // setSignInWithNetworkSelectVisible(true);
                    setShowSignInDialog(true);
                  }}
                ></SubMenuButton>
              ))}
          </Stack>
        </Box>
      </AppBar>
      {/*--- Body ---*/}
      <Box sx={{ flex: 1, background: "#0f0e15" }}>
        {props.backgroundComponent}
        <Toolbar></Toolbar>
        <div style={{ minHeight: "100vh" }}>
          <main>{props.children}</main>
        </div>
        <footer>{props?.footerComponent}</footer>
      </Box>
      {/*--- Dialog ---*/}
      {/*<SignInDialog*/}
      {/*  title={"안녕하세요 다시 만나서 반가워요!"}*/}
      {/*  open={isSignDialogOpen}*/}
      {/*  onCloseBtnClicked={(e) => {*/}
      {/*    e.preventDefault();*/}
      {/*    setShowSignInDialog(false);*/}
      {/*  }}*/}
      {/*  onSignUpClicked={(e) => {*/}
      {/*    setShowSignInDialog(false);*/}
      {/*  }}*/}
      {/*  onSignInWithClicked={(e) => {*/}
      {/*    setSignUpWithVisible(true);*/}
      {/*    setShowSignInDialog(false);*/}
      {/*  }}*/}
      {/*  onClose={() => {*/}
      {/*    setShowSignInDialog(false);*/}
      {/*  }}*/}
      {/*  onContinueWithWalletClicked={(e) => {*/}
      {/*    e.preventDefault();*/}
      {/*    setShowSignInDialog(false);*/}
      {/*    setSignInWithNetworkSelectVisible(true);*/}
      {/*  }}*/}
      {/*></SignInDialog>*/}
      <SignInWithDialog
        title={"가입하기"}
        open={signUpWithVisible}
        onCloseBtnClicked={(e) => {
          e.preventDefault();
          setSignUpWithVisible(false);
        }}
        onClose={() => {
          setSignUpWithVisible(false);
        }}
        onSignInWithGoogleClicked={(e) => {
          googleSignUp({
            onSuccess: () => {
              router.push("/").then();
              setSignUpWithVisible(false);
            },
            onError: (error) => {
              if (
                getErrorMessage(error).includes(
                  APP_ERROR_MESSAGE.GOOGLE_LOGIN_POPUP_CLOSED
                )
              ) {
                return;
              }
              setSignUpWithVisible(false);
              showErrorAlert({ content: getErrorMessage(e) });
            },
          });
        }}
        onSignInWithEmailClicked={(e) => {
          setSignUpWithEmailVisible(true);
          setSignUpWithVisible(false);
        }}
      ></SignInWithDialog>
      <SignInWithEmailDialog
        title={"이메일로 로그인하기"}
        open={signUpWithEmailVisible}
        onCloseBtnClicked={(e) => {
          e.preventDefault();
          setSignUpWithEmailVisible(false);
        }}
        onClose={() => {
          setSignUpWithEmailVisible(false);
        }}
        onSignInWithEmailClicked={(e) => {
          const myEvent = e as MouseEventWithParam<EmailSignUpEventParams>;
          const { email, password } = myEvent.params;
          showLoading();
          emailSignIn(
            { email, password },
            {
              onSuccess: () => {
                closeLoading();
                setSignUpWithEmailVisible(false);
                router.push("/").then();
              },
              onError: (e) => {
                closeLoading();
                setSignUpWithEmailVisible(false);
                showErrorAlert({ content: getLocaleErrorMessage(e) });
              },
            }
          );
        }}
      ></SignInWithEmailDialog>
      <SignInWithNetworkSelectDialog
        title={"연결하려는 네트워트를 선택하세요"}
        open={isSignDialogOpen}
        onCloseBtnClicked={(e) => {
          e.preventDefault();
          setShowSignInDialog(false);
          // setSignInWithNetworkSelectVisible(false);
        }}
        onClose={() => {
          setShowSignInDialog(false);
          // setSignInWithNetworkSelectVisible(false);
        }}
        onNetworkButtonClicked={(network) => {
          setShowSignInDialog(false);
          // setSignInWithNetworkSelectVisible(false);
          setSelectedNetwork(network); // console.log(network);
        }}
      ></SignInWithNetworkSelectDialog>
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
          return resourceFactory.getWalletInfos(
            convertToSuppoertedNetwork(selectedNetwork),
            isMobile
          );
        })()}
        onWalletSelected={({ name, value }) => {
          const walletName = convertToWalletName(value);

          if (goToMetaMaskDeppLinkWhenMobile(walletName, isMobile)) {
            return;
          }

          walletSignUp(
            { network: selectedNetwork as SupportedNetwork, name: walletName },
            {
              onSuccess: () => {
                if (router.pathname === "/") {
                  router.push("/explore").then();
                }
                setSelectedNetwork("");
              },
              onError: (error: AppError) => {
                if (error.message === APP_ERROR_MESSAGE.WALLET_NOT_INSTALLED) {
                  //@ts-ignore
                  showWalletAlert(convertToSuppoertedNetwork(error.payload));
                } else {
                  showErrorAlert({ content: error.message });
                }
                setSelectedNetwork("");
              },
            }
          );
        }}
      ></SignInWithSupportedWalletDialog>
    </Box>
  );
};

export default MainLayout;
