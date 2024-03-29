import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Avatar,
  Box,
  LinearProgress,
  Menu,
  MenuItem,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { MouseEvent, PropsWithChildren, useMemo, useState } from "react";

import StringHelper from "../../../helper/string-helper";
import GradientTypography from "../atoms/gradient-typography";

import BlockIcon from "./block-icon";

import { useSignedUserQuery } from "@/hooks/signed-user-query-hook";
import { useAlert } from "@/provider/alert/alert-provider";
import { useLogin } from "@/provider/login/login-provider";

type StyledMenuProps = PropsWithChildren & {
  open: boolean;
  anchorEl?: Element;
};

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  ":focus": {
    backgroundColor: "transparent",
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
})) as typeof MenuItem;

const StyledMenu = ({ open, anchorEl, children }: StyledMenuProps) => {
  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{
        "& .MuiPaper-root": {
          marginTop: 2,
          minWidth: 280,
          borderWidth: 1,
          // background: "#19151e",
          "& .MuiMenu-list": {
            padding: "8px 8px",
          },
        },
      }}
    >
      {children}
    </Menu>
  );
};

const NavbarAvatar = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element>();
  const { logout } = useLogin();
  const { userData } = useSignedUserQuery();

  const { showErrorAlert } = useAlert();

  const levelProgressValue = useMemo(() => {
    if (userData.rewardPoint === undefined) {
      return 0;
    }
    return (userData.rewardPoint ?? 0) % 100;
  }, [userData.rewardPoint]);

  function handleLogoutButtonClick() {
    logout({
      onError: (error) => {
        showErrorAlert({ content: error.message });
      },
    });
  }

  return (
    <Box
      sx={{
        height: "max-content",
        marginLeft: 2,
        cursor: "pointer",
        "&:hover": {
          color: "white",
          "& .curtain": {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }}
      onClick={(event: MouseEvent) => {
        setAnchorEl(event.currentTarget);
        setOpen(!open);
      }}
    >
      {userData?.profileImageUrl && (
        <Avatar
          sx={{ width: 32, height: 32 }}
          src={userData?.profileImageUrl}
        ></Avatar>
      )}
      {!userData?.profileImageUrl && userData._id && (
        <BlockIcon seed={userData._id}></BlockIcon>
      )}
      <StyledMenu open={open} anchorEl={anchorEl}>
        <Link href={`/profile/${userData.name}`}>
          <StyledMenuItem
            sx={{
              borderRadius: 1,
            }}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={2}
              sx={{ flex: 1, marginBottom: 1 }}
            >
              {userData?.profileImageUrl && (
                <Avatar
                  sx={{ width: 32, height: 32 }}
                  src={userData?.profileImageUrl}
                ></Avatar>
              )}
              {!userData?.profileImageUrl && (
                <BlockIcon seed={userData._id || "jake"}></BlockIcon>
              )}
              <Stack direction={"column"}>
                {userData.walletAddressInfos?.[0]?.address && (
                  <GradientTypography>
                    {StringHelper.convertAddressToMidEllipsis(
                      `${userData.walletAddressInfos?.[0].address}`,
                    )}
                  </GradientTypography>
                )}
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Typography variant={"caption"}>
                    {`Level ${Math.floor((userData.rewardPoint ?? 0) / 100)}`}
                  </Typography>
                  <Box sx={{ width: "100%" }}>
                    <LinearProgress
                      variant="determinate"
                      value={levelProgressValue}
                      color={"info"}
                      sx={{
                        background: theme.palette.action.hover,
                        minWidth: 80,
                      }}
                    ></LinearProgress>
                  </Box>
                </Stack>
              </Stack>
              <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
            </Stack>
          </StyledMenuItem>
        </Link>
        <StyledMenuItem
          sx={{
            borderRadius: 1,
          }}
          onClick={handleLogoutButtonClick}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Stack
              sx={{ width: 38 }}
              alignItems={"flex-start"}
              justifyContent={"center"}
            >
              <LogoutIcon
                fontSize={"medium"}
                sx={{ color: theme.palette.warning.main }}
              ></LogoutIcon>
            </Stack>
            <Typography>로그아웃</Typography>
          </Stack>
        </StyledMenuItem>
      </StyledMenu>
      <div
        className={"curtain"}
        style={{
          position: "absolute",
          marginTop: userData?.profileImageUrl ? -32 : -35,
          width: 32,
          height: 32,
          borderRadius: 32,
        }}
      ></div>
    </Box>
  );
};

export default NavbarAvatar;
