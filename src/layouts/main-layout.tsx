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
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useLogin } from "../provider/login/login-provider";
import { showSignInDialogState } from "../recoil";
import { AppError, getErrorMessage } from "../error/my-error";
import { useAlert } from "../provider/alert/alert-provider";
import { useFindUserQuery } from "./hook/query-hook";
import { useLoading } from "../provider/loading/loading-provider";
import { MouseEventWithParam } from "../type";
import { EmailSignUpParams } from "../provider/login/hook/email-login-hook";

type MainLayoutProps = PropsWithChildren & {
  backgroundComponent?: ReactNode;
  footerComponent?: ReactNode;
  disableNavButtonSet?: boolean;
};

const MainLayout = (props: MainLayoutProps) => {
  const theme = useTheme();
  const router = useRouter();
  const { isLoggedIn, logout, googleSignUp, walletSignUp } = useLogin();
  const { data: userData } = useFindUserQuery();
  const showSignInDialog = useRecoilValue(showSignInDialogState);
  const setShowSignInDialog = useSetRecoilState(showSignInDialogState);
  const [signUpWithVisible, setSignUpWithVisible] = useState(false);
  const [signUpWithEmailVisible, setSignUpWithEmailVisible] = useState(false);
  const { showErrorAlert } = useAlert();
  const { emailSignIn } = useLogin();

  return (
    <Box sx={{ display: "flex" }}>
      {/*--- Navbar ---*/}
      <AppBar
        component="nav"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
                    src={userData?.profileImageUrl ?? undefined}
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
        open={showSignInDialog}
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
          emailSignIn(
            { email, password },
            {
              onSuccess: () => {
                setSignUpWithEmailVisible(false);
                router.push("/").then();
              },
              onError: (e) => {
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
