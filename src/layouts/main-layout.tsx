import { AppBar, Box, Stack, Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { PropsWithChildren } from "react";
import { ReactNode, useState } from "react";
import NavbarButtonSet from "../components/molecules/navbar-button-set";
import NavbarAvatar from "../components/molecules/navbar-avatar";
import { useRouter } from "next/router";
import PrimaryButton from "../components/atoms/primary-button";
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
import { useSignedUserQuery } from "../hook/user-query-hook";
import { useLoading } from "../provider/loading/loading-provider";
import {
  EmailSignUpParams,
  MAIL_VERIFY,
  MouseEventWithParam,
  Z_INDEX_OFFSET,
} from "../type";
import { useSignDialog } from "../hook/sign-dialog-hook";
import { DEFAULT_PROFILE_IMAGE_DATA_SRC } from "../const";

type MainLayoutProps = PropsWithChildren & {
  backgroundComponent?: ReactNode;
  footerComponent?: ReactNode;
  disableNavButtonSet?: boolean;
};

const MainLayout = (props: MainLayoutProps) => {
  const theme = useTheme();
  const router = useRouter();
  const { isLoggedIn, logout, googleSignUp, walletSignUp } = useLogin();
  const { userData } = useSignedUserQuery();
  const { setShowSignInDialog, isSignDialogOpen } = useSignDialog();
  const [signUpWithVisible, setSignUpWithVisible] = useState(false);
  const [signUpWithEmailVisible, setSignUpWithEmailVisible] = useState(false);
  const { showErrorAlert, showAlert } = useAlert();
  const { emailSignIn } = useLogin();
  const { showLoading, closeLoading } = useLoading();

  console.log(userData.profileImageUrl);

  return (
    <Box sx={{ display: "flex" }}>
      {/*--- Navbar ---*/}
      <AppBar
        component="nav"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + Z_INDEX_OFFSET.NAV_LAYOUT,
        }}
      >
        <Box
          sx={{
            flexGlow: 1,
            height: "56px",
            borderWidth: 0,
            borderBottomWidth: 1,
            borderStyle: "solid",
            borderBottomColor: theme.palette.divider,
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Stack
            sx={{ background: "", flex: 1, height: "100%", padding: 3 }}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <img
              width={160}
              src={
                "https://despread.s3.ap-northeast-2.amazonaws.com/logo/despread_studio_white_logo.png"
              }
              alt={"DeSpread"}
              style={{
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.preventDefault();
                router.push("/").then();
              }}
            ></img>
            {!props.disableNavButtonSet && (
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <NavbarButtonSet
                  bountiesBtnOnClick={(e) => {
                    e.preventDefault();
                    router.push(`/explore`).then();
                  }}
                  contentsBtnOnClick={() => {}}
                  achievementsBtnOnClick={() => {}}
                  communitiesBtnOnClick={() => {}}
                  leaderBoardBtnOnClick={() => {}}
                ></NavbarButtonSet>
                {isLoggedIn ? (
                  <NavbarAvatar
                    onProfileItemClicked={(e) => {
                      e.preventDefault();
                      router.push(`/profile`).then();
                    }}
                    onLogoutBtnClicked={(e) => {
                      e.preventDefault();
                      logout({
                        onSuccess: () => {
                          router.push("/").then();
                        },
                        onError: (error) => {
                          showErrorAlert({ content: error.message });
                        },
                      });
                    }}
                    src={userData?.profileImageUrl}
                    walletAddress={userData?.walletAddress}
                  ></NavbarAvatar>
                ) : (
                  <Stack direction={"row"} alignItems={"center"} spacing={2}>
                    <PrimaryButton
                      size={"small"}
                      sx={{ width: 100 }}
                      onClick={(e) => {
                        e.preventDefault();
                        setShowSignInDialog(true);
                      }}
                    >
                      Sign In
                    </PrimaryButton>
                    <SecondaryButton
                      size={"small"}
                      sx={{ width: 100 }}
                      onClick={(e) => {
                        router.push("/signup").then();
                      }}
                    >
                      Sign Up
                    </SecondaryButton>
                  </Stack>
                )}
              </Stack>
            )}
          </Stack>
        </Box>
      </AppBar>

      {/*--- Body ---*/}
      <Box sx={{ flex: 1, background: theme.palette.background.default }}>
        {props.backgroundComponent}
        <Toolbar></Toolbar>
        <main>{props.children}</main>
        <footer>{props.footerComponent}</footer>
      </Box>

      {/*--- Dialog ---*/}
      <SignInDialog
        title={"Good to see you again!"}
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
              router.push("/").then();
              setShowSignInDialog(false);
            },
            onError: (error: AppError) => {
              setShowSignInDialog(false);
              showErrorAlert({ content: error.message });
            },
          });
        }}
      ></SignInDialog>
      <SignInWithDialog
        title={"Sign In with others"}
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
        title={"Sign In with email"}
        open={signUpWithEmailVisible}
        onCloseBtnClicked={(e) => {
          e.preventDefault();
          setSignUpWithEmailVisible(false);
        }}
        onClose={() => {
          setSignUpWithEmailVisible(false);
        }}
        onSignInWithEmailClicked={(e) => {
          const myEvent = e as MouseEventWithParam<EmailSignUpParams>;
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
    </Box>
  );
};

export default MainLayout;
