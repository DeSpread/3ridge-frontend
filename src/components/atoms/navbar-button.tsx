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
          backgroundColor: theme.palette.action.hover,
          "& .buttonText": {
            color: theme.palette.primary.main,
          },
        },
        height: { height },
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
          color: theme.palette.primary.contrastText,
          cursor: "pointer",
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default NavbarButton;
