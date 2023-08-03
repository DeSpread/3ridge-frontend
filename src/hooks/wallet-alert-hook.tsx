import { useAlert } from "../provider/alert/alert-provider";
import { Box, Link as MuiLink, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { SupportedNetwork } from "../type";

export function useWalletAlert() {
  const { showAlert } = useAlert();
  const theme = useTheme();

  const showWalletAlert = (chainName: SupportedNetwork) => {
    const data = {
      APTOS: {
        howToInstallUrl:
          "https://medium.com/despread-creative/앱토스-생태계를-위한-관문-페트라-월렛-c2bddb076f7d",
        installUrl: "https://petra.app",
        walletName: "Petra",
      },
      SUI: {
        howToInstallUrl: "",
        installUrl:
          "https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil",
        walletName: "Sui Wallet",
      },
      EVM: {
        howToInstallUrl: "",
        installUrl: "https://metamask.io/download/",
        walletName: "Metamask",
      },
      STACKS: {
        howToInstallUrl: "",
        installUrl: "",
        walletName: "",
      },
      UNKNOWN: {
        howToInstallUrl: "",
        installUrl: "",
        walletName: "",
      },
    };

    const { howToInstallUrl, installUrl, walletName } = data[chainName];

    showAlert({
      title: "지갑이 설치되지 않았습니다 😂",
      content: (
        <>
          <Stack spacing={1}>
            <Stack sx={{ paddingBottom: 1 }} spacing={1}>
              <Typography style={{ color: theme.palette.neutral[100] }}>
                {walletName} 지갑을 설치해주세요
              </Typography>
              <Typography style={{ color: theme.palette.neutral[100] }}>
                설치 후 브라우저를 새로고침 후 다시 지갑연결을 시도해 보세요
              </Typography>
            </Stack>
            {howToInstallUrl && (
              <Link
                href={howToInstallUrl}
                rel={"noopener noreferrer"}
                target={"_blank"}
              >
                <MuiLink
                  sx={{
                    "&:hover": {
                      color: "#bdbdbd",
                    },
                  }}
                  color={"warning.main"}
                  underline="hover"
                  variant={"body2"}
                >
                  {chainName.toUpperCase()} 지갑을 설치하는 방법
                </MuiLink>
              </Link>
            )}
            {installUrl && (
              <Link
                href={installUrl}
                rel={"noopener noreferrer"}
                target={"_blank"}
              >
                <MuiLink
                  sx={{
                    "&:hover": {
                      color: "#bdbdbd",
                    },
                  }}
                  color={"warning.main"}
                  underline="hover"
                  variant={"body2"}
                >
                  {walletName} 지갑 설치 링크
                </MuiLink>
              </Link>
            )}
          </Stack>
        </>
      ),
    });
  };

  return {
    showWalletAlert,
  };
}
