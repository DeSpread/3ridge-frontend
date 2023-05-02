import { useAlert } from "../provider/alert/alert-provider";
import { Box, Link as MuiLink, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { SupportedNetworks } from "../type";

export function useWalletAlert() {
  const { showAlert } = useAlert();
  const theme = useTheme();

  const showWalletAlert = (chainName: SupportedNetworks) => {
    const data = {
      aptos: {
        howToInstallUrl:
          "https://medium.com/despread-creative/앱토스-생태계를-위한-관문-페트라-월렛-c2bddb076f7d",
        installUrl: "https://petra.app",
        walletName: "Petra",
      },
      sui: {
        howToInstallUrl: "",
        installUrl:
          "https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil",
        walletName: "Sui Wallet",
      },
      evm: {
        howToInstallUrl: "",
        installUrl: "https://metamask.io/download/",
        walletName: "Metamask",
      },
      unknown: {
        howToInstallUrl: "",
        installUrl: "",
        walletName: "",
      },
    };
    const { howToInstallUrl, installUrl, walletName } = data[chainName];

    console.log(howToInstallUrl, installUrl);
    showAlert({
      title: "지갑이 설치되지 않았습니다 😂",
      content: (
        <>
          <Stack spacing={1}>
            <Box sx={{ paddingBottom: 1 }}>
              <Typography style={{ color: theme.palette.neutral[100] }}>
                {walletName} 지갑을 설치해주세요
              </Typography>
            </Box>
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
                  {chainName.toUpperCase()} 지갑 설치 링크
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
