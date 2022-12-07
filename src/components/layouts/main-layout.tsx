import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { PropsWithChildren } from "react";
import NavbarButtonSet from "../molecules/navbar-button-set";
import NavbarAvatar from "../atoms/navbar-avatar";
import ConnectButton from "../atoms/connect-button";
import { useAccount } from "wagmi";
import { ReactNode } from "react";
import HomeFooter from "./footer/home-footer";

type MainLayoutProps = PropsWithChildren & {
  backgroundComponent?: ReactNode;
  footerComponent?: ReactNode;
};

const MainLayout = (props: MainLayoutProps) => {
  const theme = useTheme();
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
            ></img>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <NavbarButtonSet
                bountiesBtnOnClick={() => {}}
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

      <Box sx={{ flex: 1, background: "" }}>
        {props.backgroundComponent}
        <Toolbar></Toolbar>
        <main>{props.children}</main>
        <footer>{props.footerComponent}</footer>
      </Box>
    </Box>
  );
};

export default MainLayout;
