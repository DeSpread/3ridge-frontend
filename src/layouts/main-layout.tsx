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
import React, { MouseEventHandler, ReactNode, useState } from "react";
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
  Z_INDEX_OFFSET,
} from "../type";
import { useSignDialog } from "../page-hook/sign-dialog-hook";
import NavbarButton from "../components/atoms/navbar-button";
import Link from "next/link";
import SubMenuButton from "../components/molecules/sub-menu-button";
import Image from "next/image";
import HomeFooter from "./footer/home-footer";
// import ContentsRendererDialog from "../components/dialogs/contents-renderer-dialog";

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

// import { useWallet } from "@suiet/wallet-kit";
//
// function WalletSelector() {
//   const {
//     select, // select
//     configuredWallets, // default wallets
//     detectedWallets, // Sui-standard wallets detected from browser env
//     allAvailableWallets, // all the installed Sui-standard wallets
//   } = useWallet();
//
//   return [...configuredWallets, ...detectedWallets].map((wallet) => (
//     <button
//       key={wallet.name}
//       onClick={() => {
//         // check if user installed the wallet
//         if (!wallet.installed) {
//           // do something like guiding users to install
//           return;
//         }
//         select(wallet.name);
//       }}
//     >
//       Connect to {wallet.name}
//     </button>
//   ));
// }

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
  const { showErrorAlert, showAlert } = useAlert();
  const { emailSignIn } = useLogin();
  const { showLoading, closeLoading } = useLoading();

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
                      walletAddress={userData?.walletAddress}
                    ></NavbarAvatar>
                  ) : (
                    <Stack direction={"row"} alignItems={"center"} spacing={2}>
                      {/*<WalletSelector></WalletSelector>*/}
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
        <footer>{props?.footerComponent? props.footerComponent:<HomeFooter/>}</footer>
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
          walletSignUp({
            onSuccess: () => {
              if (router.pathname === "/") {
                router.push("/explore").then();
              }
              setShowSignInDialog(false);
            },
            onError: (error: AppError) => {
              if (error.message === APP_ERROR_MESSAGE.WALLET_NOT_INSTALLED) {
                showAlert({
                  title: "지갑이 설치되지 않았습니다 😂",
                  content: (
                    <>
                      <Stack spacing={1}>
                        <Typography
                          style={{ color: theme.palette.neutral[100] }}
                        >
                          Petra 지갑을 설치해주세요
                        </Typography>
                        <Link
                          href={
                            "https://medium.com/despread-creative/앱토스-생태계를-위한-관문-페트라-월렛-c2bddb076f7d"
                          }
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
                            Petra 지갑을 설치하는 방법
                          </MuiLink>
                        </Link>
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
                            Petra 지갑 설치 링크
                          </MuiLink>
                        </Link>
                      </Stack>
                    </>
                  ),
                });
                return;
              }
              setShowSignInDialog(false);
              showErrorAlert({ content: error.message });
            },
          });
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
      {/*<ContentsRendererDialog open={true}></ContentsRendererDialog>*/}
    </Box>
  );
};

export default MainLayout;
