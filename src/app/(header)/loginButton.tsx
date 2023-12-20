"use client";
import { Stack } from "@mui/material";

import SecondaryButton from "@/components/atomic/atoms/secondary-button";
import { useSignDialog } from "@/hooks/sign-dialog-hook";

export default function LoginButton() {
  const { setShowSignInDialog } = useSignDialog();

  function handleClickButton() {
    setShowSignInDialog(true);
  }

  return (
    <Stack direction={"row"} alignItems={"center"} spacing={2}>
      <SecondaryButton size={"small"} onClick={handleClickButton}>
        로그인 / 회원가입
      </SecondaryButton>
    </Stack>
  );
}
