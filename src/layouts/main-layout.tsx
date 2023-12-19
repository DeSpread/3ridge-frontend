import { AppBar, Box, Stack, Toolbar, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import React, {
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
  useMemo,
} from "react";

import MobileNavigatorBar from "../components/atomic/atoms/mobile/mobile-navigator-bar";
import NavbarButton from "../components/atomic/atoms/navbar-button";
import SecondaryButton from "../components/atomic/atoms/secondary-button";
import NavbarAvatar from "../components/atomic/molecules/navbar-avatar";
import SubMenuButton from "../components/atomic/molecules/sub-menu-button";
import { useSignDialog } from "../hooks/sign-dialog-hook";
import { useSignedUserQuery } from "../hooks/signed-user-query-hook";
import { useAlert } from "../provider/alert/alert-provider";
import { useLoading } from "../provider/loading/loading-provider";
import { useLogin } from "../provider/login/login-provider";
import { Z_INDEX_OFFSET } from "../types";

import SignInDialog from "./dialog/sign/signInDialog";

import { useUser } from "@/hooks/user/useUser";

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
  useUser();
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();
  const { isLoggedIn } = useLogin();
  const { userData } = useSignedUserQuery();
  const { setShowSignInDialog, isSignDialogOpen } = useSignDialog();

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
              <div className="flex items-start">
                <div className="relative aspect-[1/0.393] w-28 sm:w-32">
                  <Image
                    src={
                      "https://3ridge.s3.ap-northeast-2.amazonaws.com/logo/02_svg/3ridge_logo_white.svg"
                    }
                    alt={""}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="relative aspect-square w-7">
                  <Image
                    src={
                      "https://3ridge.s3.ap-northeast-2.amazonaws.com/logo/02_svg/beta.svg"
                    }
                    alt={""}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
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
                      userName={userData.name}
                      src={userData?.profileImageUrl}
                      walletAddress={userData?.walletAddressInfos?.[0]?.address}
                    ></NavbarAvatar>
                  ) : (
                    <Stack direction={"row"} alignItems={"center"} spacing={2}>
                      <SecondaryButton
                        size={"small"}
                        onClick={(e) => {
                          e.preventDefault();
                          setShowSignInDialog(true);
                        }}
                      >
                        로그인 / 회원가입
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
                    rewardPoint={userData?.rewardPoint}
                    userId={userData?._id}
                    userName={userData?.name}
                    profileImageUrl={userData?.profileImageUrl}
                    walletAddress={userData?.walletAddressInfos?.[0]?.address}
                  />
                </Stack>
              ) : (
                <SubMenuButton
                  onSignInClick={async (e) => {
                    e.preventDefault();
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
      <SignInDialog
        open={isSignDialogOpen}
        onClose={() => setShowSignInDialog(false)}
      />
    </Box>
  );
};

export default MainLayout;
