import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { PropsWithChildren } from "react";
import NavbarButtonSet from "../molecules/navbar-button-set";
import NavbarAvatar from "../atoms/navbar-avatar";
import ConnectButton from "../atoms/connect-button";
import { useAccount } from "wagmi";
import { ReactNode } from "react";
import SecondaryButton from "../atoms/secondary-button";

type MainLayoutProps = PropsWithChildren & {
  backgroundComponent?: ReactNode;
};

const HomeLayout = (props: MainLayoutProps) => {
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

      <Box component="main" sx={{ flex: 1 }}>
        {props.backgroundComponent}
        <Toolbar></Toolbar>
        <main>{props.children}</main>
        <footer>
          <div
            style={{
              background: theme.palette.background.default,
              width: "100%",
              position: "absolute",
              bottom: 0,
              transform: "translateY(100%)",
              zIndex: 1,
            }}
          >
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              sx={{ padding: 3 }}
            >
              <Stack direction={"column"} spacing={2}>
                <Typography variant={"h5"}>Grow with Layer3</Typography>
                <Box>
                  <Typography
                    variant={"body1"}
                    // @ts-ignore
                    sx={{ color: theme.palette.neutral["400"] }}
                  >
                    Layer3 helps you reach, acquire, and retain users
                  </Typography>
                  <Typography
                    variant={"body1"}
                    // @ts-ignore
                    sx={{ color: theme.palette.neutral["400"] }}
                  >
                    with powerful, interactive experiences.
                  </Typography>
                </Box>
                <SecondaryButton
                  variant={"contained"}
                  color={"secondary"}
                  style={{ width: 180 }}
                >
                  Get Started
                </SecondaryButton>
              </Stack>
            </Stack>
          </div>
        </footer>
      </Box>
    </Box>
  );
};

export default HomeLayout;
