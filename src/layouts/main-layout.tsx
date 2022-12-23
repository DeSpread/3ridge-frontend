import { AppBar, Box, Stack, Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { PropsWithChildren } from "react";
import { ReactNode, useState } from "react";
import NavbarButtonSet from "../components/molecules/navbar-button-set";
import NavbarAvatar from "../components/molecules/navbar-avatar";
import { useRouter } from "next/router";
import PrimaryButton from "../components/atoms/primary-button";
import SecondaryButton from "../components/atoms/secondary-button";
import SignInDialog from "../components/molecules/dialog/sign/sign-in-dialog";
import SignInWithDialog from "../components/molecules/dialog/sign/sign-in-with-dialog";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useLogin } from "../provider/login/login-provider";
import { showSignInDialogState } from "../recoil";
import { gql } from "../__generated__";
import { useQuery } from "@apollo/client";
import { AppError } from "../error/my-error";
import { useAlert } from "../provider/alert/alert-provider";

type MainLayoutProps = PropsWithChildren & {
  backgroundComponent?: ReactNode;
  footerComponent?: ReactNode;
  disableNavButtonSet?: boolean;
};

const USER_BY_GMAIL = gql(/* GraphQL */ `
  query userByGmail($gmail: String!) {
    userByGmail(gmail: $gmail) {
      name
      profileImageUrl
    }
  }
`);

const useFindUserQuery = () => {
  const { isGoogleLoggedIn, googleUserInfo } = useLogin();

  const { data, loading } = useQuery(
    USER_BY_GMAIL,
    googleUserInfo.gmail
      ? {
          variables: {
            gmail: googleUserInfo.gmail,
          },
        }
      : undefined
  );

  if (isGoogleLoggedIn) {
    return { data: data?.userByGmail, loading };
  }
  return { data: null, loading: false };
};

const MainLayout = (props: MainLayoutProps) => {
  const theme = useTheme();
  const router = useRouter();
  const [signUpWithVisible, setSignUpWithVisible] = useState(false);
  const { isLoggedIn, logout, googleSignUp, walletSignUp } = useLogin();
  const { data: userData } = useFindUserQuery();
  const showSignInDialog = useRecoilValue(showSignInDialogState);
  const setShowSignInDialog = useSetRecoilState(showSignInDialogState);
  const { showErrorAlert } = useAlert();

  return (
    <Box sx={{ display: "flex" }}>
      {/*--- Navbar ---*/}
      <AppBar component="nav">
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
                          // showAlert({ title: "Contact", content: error.message });
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
                        e.preventDefault();
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
          setShowSignInDialog(false);
          setSignUpWithVisible(true);
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
              // todo : show error alert
            },
          });
        }}
      ></SignInWithDialog>
    </Box>
  );
};

export default MainLayout;
