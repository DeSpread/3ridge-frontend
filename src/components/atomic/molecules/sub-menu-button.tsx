"use client";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, IconButton, Menu, MenuItem, Stack, styled } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import {
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  useState,
} from "react";

import NavbarButton from "../atoms/navbar-button";

type StyledMenuProps = PropsWithChildren & {
  open: boolean;
  anchorEl?: Element;
};

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  height: 10,
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
          minWidth: 180,
          borderWidth: 1,
          // background: "#19151e",
          "& .MuiMenu-list": {
            padding: "8px 4px",
          },
        },
      }}
    >
      {children}
    </Menu>
  );
};

const SubMenuButton = (
  props: PropsWithChildren & {
    isLoggedIn?: boolean;
    onSignInClick?: MouseEventHandler;
  },
) => {
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
        },
      }}
      onClick={(event: MouseEvent) => {
        setAnchorEl(event.currentTarget);
        setOpen(!open);
      }}
    >
      <IconButton
        sx={{
          borderColor: theme.palette.neutral["100"],
          borderWidth: 1,
          borderStyle: "solid",
          borderRadius: 2,
          padding: 1,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        <MoreHorizIcon
          sx={{
            color: "white",
            "*:hover > &": {
              color: theme.palette.neutral["900"],
            },
          }}
        ></MoreHorizIcon>
      </IconButton>
      <StyledMenu open={open} anchorEl={anchorEl}>
        {!props.isLoggedIn && (
          <StyledMenuItem
            sx={{
              borderRadius: 1,
            }}
            onClick={props.onSignInClick}
          >
            <Stack>
              <NavbarButton>지갑연결</NavbarButton>
            </Stack>
          </StyledMenuItem>
        )}
        <Link href={"/explore"}>
          <StyledMenuItem
            sx={{
              borderRadius: 1,
            }}
          >
            <Stack>
              <NavbarButton>이벤트</NavbarButton>
            </Stack>
          </StyledMenuItem>
        </Link>
        <Link href={"/projects"}>
          <StyledMenuItem
            sx={{
              borderRadius: 1,
            }}
          >
            <Stack>
              <NavbarButton>프로젝트</NavbarButton>
            </Stack>
          </StyledMenuItem>
        </Link>
        <Link href={"/leaderboard"}>
          <StyledMenuItem
            sx={{
              borderRadius: 1,
            }}
          >
            <Stack>
              <NavbarButton>유저랭킹</NavbarButton>
            </Stack>
          </StyledMenuItem>
        </Link>
      </StyledMenu>
    </Box>
  );
};

export default SubMenuButton;
