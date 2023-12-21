"use client";

import { Box, AppBar, Stack, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { MouseEventHandler, PropsWithChildren } from "react";
import { ReactNode } from "react";

type NavBarButtonProps = PropsWithChildren & {
  height?: number;
  icon?: ReactNode;
  onClick?: MouseEventHandler;
};

const NavbarButton = ({
  height = 56,
  icon = null,
  children,
  onClick,
}: NavBarButtonProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        "&:hover": {
          "& .buttonText": {
            color: theme.palette.neutral["400"],
            transition: "all 0.1s ease-out 0s",
            borderColor: "transparent",
            transitionDuration: "0.2s",
            transitionDelay: "0s",
            transitionTimingFunction: "ease-out",
            transitionProperty: "all",
          },
        },
        height: { height },
        // width: 100,
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        padding: 2,
        paddingLeft: "10px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {icon}
      <Typography
        className={"buttonText"}
        sx={{
          marginLeft: "8px",
          color: theme.palette.neutral[100],
          cursor: "pointer",
        }}
        variant={"h6"}
        fontFamily={"LINESeedKR-Bd"}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default NavbarButton;
