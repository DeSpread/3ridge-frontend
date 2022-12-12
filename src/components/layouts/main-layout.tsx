import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { PropsWithChildren } from "react";
import NavbarButtonSet from "../molecules/navbar-button-set";
import NavbarAvatar from "../atoms/navbar-avatar";
import ConnectButton from "../atoms/connect-button";
import { useAccount } from "wagmi";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

type MainLayoutProps = PropsWithChildren & {
  backgroundComponent?: ReactNode;
  footerComponent?: ReactNode;
};

const MainLayout = (props: MainLayoutProps) => {
  const theme = useTheme();
  const router = useRouter();
  const { address } = useAccount();
  return (
    <Box sx={{ display: "flex" }}>
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
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <NavbarButtonSet
                bountiesBtnOnClick={(e) => {
                  e.preventDefault();
                  router.push(`/bounties`).then();
                }}
                contentsBtnOnClick={() => {}}
                achievementsBtnOnClick={() => {}}
                communitiesBtnOnClick={() => {}}
                leaderBoardBtnOnClick={() => {}}
              ></NavbarButtonSet>
              {address ? (
                <NavbarAvatar></NavbarAvatar>
              ) : (
                <ConnectButton size={"small"} variant={"outlined"} />
              )}
            </Stack>
          </Stack>
        </Box>
      </AppBar>

      <Box sx={{ flex: 1, background: theme.palette.background.default }}>
        {props.backgroundComponent}
        <Toolbar></Toolbar>
        <main>{props.children}</main>
        <footer>{props.footerComponent}</footer>
      </Box>
    </Box>
  );
};

export default MainLayout;
