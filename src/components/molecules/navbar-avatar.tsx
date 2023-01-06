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
  useState,
} from "react";
import { useTheme } from "@mui/material/styles";
import StringHelper from "../../helper/string-helper";
import GradientTypography from "../atoms/gradient-typography";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

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
  src?: string;
  walletAddress?: string;
  onProfileItemClicked?: MouseEventHandler;
  onLogoutBtnClicked?: MouseEventHandler;
};

const NavbarAvatar = ({
  src,
  walletAddress,
  onProfileItemClicked,
  onLogoutBtnClicked,
}: NavBarAvatarProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element>();

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
      <Avatar sx={{ width: 32, height: 32 }} src={src}></Avatar>
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
            <Avatar sx={{ width: 32, height: 32 }} src={src}></Avatar>
            <Stack direction={"column"}>
              {walletAddress && (
                <GradientTypography>
                  {StringHelper.getInstance().getMidEllipsisString(
                    `${walletAddress}`
                  )}
                </GradientTypography>
              )}
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Typography variant={"caption"}>LEVEL 1</Typography>
                <Box sx={{ width: "100%" }}>
                  <LinearProgress
                    variant="determinate"
                    value={1}
                    color={"secondary"}
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
            <PowerSettingsNewIcon
              fontSize={"medium"}
              sx={{ color: "yellow" }}
            ></PowerSettingsNewIcon>
            <Typography>Log out</Typography>
          </Stack>
        </StyledMenuItem>
      </StyledMenu>
      <div
        className={"curtain"}
        style={{
          position: "absolute",
          marginTop: -32,
          width: 32,
          height: 32,
          borderRadius: 32,
        }}
      ></div>
    </Box>
  );
};

export default NavbarAvatar;
