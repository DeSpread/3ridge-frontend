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
import {
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  useMemo,
  useState,
} from "react";
import { useTheme } from "@mui/material/styles";
import StringHelper from "../../../helper/string-helper";
import GradientTypography from "../atoms/gradient-typography";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LogoutIcon from "@mui/icons-material/Logout";
import { DEFAULT_PROFILE_IMAGE_DATA_SRC } from "../../../const";
import BlockIcon from "./block-icon";

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

type NavBarAvatarProps = PropsWithChildren & {
  userId?: string;
  src?: string;
  walletAddress?: string;
  onProfileItemClicked?: MouseEventHandler;
  onLogoutBtnClicked?: MouseEventHandler;
  rewardPoint?: number;
};

const NavbarAvatar = ({
  userId,
  src,
  walletAddress,
  onProfileItemClicked,
  onLogoutBtnClicked,
  rewardPoint,
}: NavBarAvatarProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element>();

  const levelProgressValue = useMemo(() => {
    if (rewardPoint === undefined) {
      return 0;
    }
    return (rewardPoint ?? 0) % 100;
  }, [rewardPoint]);

  return (
    <Box
      sx={{
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
      {src && <Avatar sx={{ width: 32, height: 32 }} src={src}></Avatar>}
      {!src && userId && <BlockIcon seed={userId}></BlockIcon>}
      <StyledMenu open={open} anchorEl={anchorEl}>
        <StyledMenuItem
          sx={{
            borderRadius: 1,
          }}
          onClick={onProfileItemClicked}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            sx={{ flex: 1, marginBottom: 1 }}
          >
            {src && <Avatar sx={{ width: 32, height: 32 }} src={src}></Avatar>}
            {!src && <BlockIcon seed={userId || "jake"}></BlockIcon>}
            <Stack direction={"column"}>
              {walletAddress && (
                <GradientTypography>
                  {StringHelper.getMidEllipsisString(`${walletAddress}`)}
                </GradientTypography>
              )}
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Typography variant={"caption"}>
                  {`Level ${Math.floor((rewardPoint ?? 0) / 100)}`}
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
        <StyledMenuItem
          sx={{
            borderRadius: 1,
          }}
          onClick={onLogoutBtnClicked}
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
          marginTop: src ? -32 : -35,
          width: 32,
          height: 32,
          borderRadius: 32,
        }}
      ></div>
    </Box>
  );
};

export default NavbarAvatar;
