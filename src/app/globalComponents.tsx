"use client";

import { useTheme } from "@mui/material";
import { Web3Modal } from "@web3modal/react";

import SignInDialog from "@/layouts/dialog/sign/signInDialog";
import { ethereumClient, projectId } from "@/lib/wagmi/client";
import { Z_INDEX_OFFSET } from "@/types";

export default function GlobalComponents() {
  const theme = useTheme();

  return (
    <>
      <SignInDialog />
      <Web3Modal
        themeVariables={{
          "--w3m-z-index": String(theme.zIndex.modal + Z_INDEX_OFFSET.DIALOG),
        }}
        projectId={projectId}
        ethereumClient={ethereumClient}
      />
    </>
  );
}
