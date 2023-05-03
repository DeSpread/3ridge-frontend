import {
  AppBar,
  Box,
  Link as MuiLink,
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
} from "../error/my-error";
import { useAlert } from "../provider/alert/alert-provider";
import { useSignedUserQuery } from "../page-hook/signed-user-query-hook";
import { useLoading } from "../provider/loading/loading-provider";
import {
  EmailSignUpEventParams,
  MAIL_VERIFY,
  MouseEventWithParam,
  SUPPORTED_NETWORKS,
  SupportedNetworks,
  Z_INDEX_OFFSET,
} from "../type";
import { useSignDialog } from "../page-hook/sign-dialog-hook";
import NavbarButton from "../components/atoms/navbar-button";
import Link from "next/link";
import SubMenuButton from "../components/molecules/sub-menu-button";
import Image from "next/image";
import HomeFooter from "./footer/home-footer";
import SignInWithNetworkSelectDialog from "./dialog/sign/sign-in-with-network-select-dialog";
import SignInWithSupportedWalletDialog from "./dialog/sign/sign-in-with-supported-wallet-dialog";
import { useWalletAlert } from "../page-hook/wallet-alert-hook";
import { convertToSuppoertedNetwork } from "../util/type-util";

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
  const { isLoggedIn, logout, googleSignUp, walletSignUp } = useLogin();
  const { userData } = useSignedUserQuery();
  const { setShowSignInDialog, isSignDialogOpen } = useSignDialog();
  const [signUpWithVisible, setSignUpWithVisible] = useState(false);
  const [signUpWithEmailVisible, setSignUpWithEmailVisible] = useState(false);
  const [signInWithNetworkSelectVisible, setSignInWithNetworkSelectVisible] =
    useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("");

  const { showErrorAlert, showAlert } = useAlert();
  const { showWalletAlert } = useWalletAlert();
  const { emailSignIn } = useLogin();
  const { showLoading, closeLoading } = useLoading();

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

  return (
    <Box sx={{ display: "flex" }}>
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
                {/*<Typography sx={{ marginLeft: -1 }} variant={"caption"}>*/}
                {/*  testnet*/}
                {/*</Typography>*/}
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
                      onProfileItemClicked={async (e) => {
                        e.preventDefault();
                        showLoading();
                        await router.push(`/profile/${userData.name}`);
                        closeLoading();
                      }}
                      onLogoutBtnClicked={(e) => {
                        e.preventDefault();
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
                      }}
                      userId={userData?._id}
                      src={userData?.profileImageUrl}
                      walletAddress={userData?.walletAddressInfos?.[0]?.address}
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
                        }}
                      >
                        지갑 연결
                      </SecondaryButton>
                    </Stack>
                  )}
                </Stack>
              ) : (
                <SubMenuButton
                  onExploreClick={asyncGoToExplore}
                  onProjectsClick={asyncGoToProjects}
                  onLeaderBoardClick={asyncGoToLeaderBoard}
                ></SubMenuButton>
              ))}
          </Stack>
        </Box>
      </AppBar>

      {/*--- Body ---*/}
      <Box sx={{ flex: 1, background: "#0f0e15" }}>
        {props.backgroundComponent}
        <Toolbar></Toolbar>
        <main>{props.children}</main>
        <footer>{props?.footerComponent}</footer>
      </Box>

      {/*--- Dialog ---*/}
      <SignInDialog
        title={"안녕하세요 다시 만나서 반가워요!"}
        open={isSignDialogOpen}
        onCloseBtnClicked={(e) => {
          e.preventDefault();
          setShowSignInDialog(false);
        }}
        onSignUpClicked={(e) => {
          setShowSignInDialog(false);
        }}
        onSignInWithClicked={(e) => {
          setSignUpWithVisible(true);
          setShowSignInDialog(false);
        }}
        onClose={() => {
          setShowSignInDialog(false);
        }}
        onContinueWithWalletClicked={(e) => {
          e.preventDefault();
          showLoading();
          walletSignUp(
            { network: SUPPORTED_NETWORKS.EVM, name: "MetaMask" },
            {
              onSuccess: () => {
                if (router.pathname === "/") {
                  router.push("/explore").then();
                }
                setSelectedNetwork("");
                setShowSignInDialog(false);
                closeLoading();
              },
              onError: (error: AppError) => {
                console.log(error);
                if (error.message === APP_ERROR_MESSAGE.WALLET_NOT_INSTALLED) {
                  //@ts-ignore
                  showWalletAlert(convertToSuppoertedNetwork(error.payload));
                } else {
                  showErrorAlert({ content: error.message });
                }
                setSelectedNetwork("");
                setShowSignInDialog(false);
                closeLoading();
              },
            }
          );
          // setSignInWithNetworkSelectVisible(true);
        }}
      ></SignInDialog>
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
                const message = getErrorMessage(e);
                if (message === MAIL_VERIFY.PASSWORD_WRONG) {
                  closeLoading();
                  showAlert({ title: "Info", content: "Check your password" });
                  return;
                } else if (message === MAIL_VERIFY.USER_NOT_FOUND) {
                  closeLoading();
                  showAlert({ title: "Info", content: "User not exist" });
                  return;
                }
                closeLoading();
                setSignUpWithEmailVisible(false);
                showErrorAlert({ content: getErrorMessage(e) });
              },
            }
          );
        }}
      ></SignInWithEmailDialog>
      <SignInWithNetworkSelectDialog
        title={"연결하려는 네트워트를 선택하세요"}
        open={signInWithNetworkSelectVisible}
        onCloseBtnClicked={(e) => {
          e.preventDefault();
          setSignInWithNetworkSelectVisible(false);
        }}
        onClose={() => {
          setSignInWithNetworkSelectVisible(false);
        }}
        onNetworkButtonClicked={(network) => {
          setSignInWithNetworkSelectVisible(false);
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
          if (selectedNetwork === SUPPORTED_NETWORKS.APTOS) {
            return [
              {
                imageUrl:
                  "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/petra-wallet.png",
                name: "Petra",
                value: "petra",
              },
            ];
          } else if (selectedNetwork === SUPPORTED_NETWORKS.SUI) {
            return [
              {
                imageUrl:
                  "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/sui-wallet-icon.jpg",
                name: "Sui wallet",
                value: "sui",
              },
            ];
          } else if (selectedNetwork === SUPPORTED_NETWORKS.EVM) {
            return [
              {
                imageUrl:
                  "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/metamask-fox.svg",
                name: "MetaMask",
                value: "evm",
              },
            ];
          }
          return [];
        })()}
        onWalletSelected={(name) => {
          walletSignUp(
            { network: selectedNetwork as SupportedNetworks, name },
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
      {/*<ContentsRendererDialog open={true}></ContentsRendererDialog>*/}
    </Box>
  );
};

export default MainLayout;
