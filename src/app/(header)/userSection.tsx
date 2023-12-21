"use client";
import { useMediaQuery, useTheme } from "@mui/material";

import LoginButton from "./loginButton";

import NavbarAvatar from "@/components/atomic/molecules/navbar-avatar";
import { useLogin } from "@/provider/login/login-provider";

export default function UserSection() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const { isLoggedIn } = useLogin();

  if (isSmall) {
    return null;
  }

  if (isLoggedIn) {
    return <NavbarAvatar />;
  }

  return <LoginButton />;
}
