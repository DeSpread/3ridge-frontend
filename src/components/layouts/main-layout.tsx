import { AppBar, Box, Stack, Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { PropsWithChildren } from "react";
import { ReactNode, useState } from "react";
import NavbarButtonSet from "../molecules/navbar-button-set";
import NavbarAvatar from "../molecules/navbar-avatar";
import { useRouter } from "next/router";
import PrimaryButton from "../atoms/primary-button";
import SecondaryButton from "../atoms/secondary-button";
import SignInDialog from "../molecules/dialog/sign/sign-in-dialog";
import SignInWithDialog from "../molecules/dialog/sign/sign-in-with-dialog";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useLogin } from "../../provider/login/login-provider";
import { showSignInDialogState } from "../../recoil";

type MainLayoutProps = PropsWithChildren & {
  backgroundComponent?: ReactNode;
  footerComponent?: ReactNode;
  disableNavButtonSet?: boolean;
};

const MainLayout = (props: MainLayoutProps) => {
  const theme = useTheme();
  const router = useRouter();
  const [signUpWithVisible, setSignUpWithVisible] = useState(false);
  const { isGoogleLoggedIn } = useLogin();
  const showSignInDialog = useRecoilValue(showSignInDialogState);
  const setShowSignInDialog = useSetRecoilState(showSignInDialogState);

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
                {isGoogleLoggedIn ? (
                  <NavbarAvatar
                    onProfileItemClick={(e) => {
                      e.preventDefault();
                      router.push(`/profile`).then();
                    }}
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
        onContinueWithWalletClicked={(e) => {}}
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
      ></SignInWithDialog>
    </Box>
  );
};

export default MainLayout;
