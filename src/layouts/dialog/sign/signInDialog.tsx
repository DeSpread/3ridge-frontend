import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";

import Content from "./signInDialog/content";
import Title from "./signInDialog/title";
import { SignInType } from "./signInDialog/types";

import { APP_ERROR_MESSAGE, AppError } from "@/error/my-error";
import TypeHelper from "@/helper/type-helper";
import { useWalletAlert } from "@/hooks/wallet-alert-hook";
import { useAlert } from "@/provider/alert/alert-provider";
import { useLogin } from "@/provider/login/login-provider";
import { useMobile } from "@/provider/mobile/mobile-context";
import { SupportedNetwork, Z_INDEX_OFFSET } from "@/types";
import EthUtil from "@/util/eth-util";

interface SignInDialogProps {
  open?: boolean;
  onClose?(): void;
}

const signInTypeDefaultValue =
  process.env["NEXT_PUBLIC_ENV_NAME"] === "dev" ? undefined : "wallet";

export default function SignInDialog(props: SignInDialogProps) {
  const { isMobile } = useMobile();
  const { walletSignUp } = useLogin();
  const { showErrorAlert } = useAlert();
  const { showWalletAlert } = useWalletAlert();

  const [signInType, setSignInType] = useState<SignInType | undefined>(
    signInTypeDefaultValue,
  );
  const [network, setNetwork] = useState<SupportedNetwork>();

  function handleClose() {
    setNetwork(undefined);
    setSignInType(signInTypeDefaultValue);
    props.onClose?.();
  }

  function handleClickPrev() {
    if (network) {
      setNetwork(undefined);
      return;
    }

    if (signInType) {
      setSignInType(signInTypeDefaultValue);
      return;
    }
  }

  function handleChangeWallet(value: string) {
    const walletName = TypeHelper.convertToWalletName(value);

    if (EthUtil.goToMetaMaskDeppLinkWhenMobile(walletName, isMobile)) {
      return;
    }

    walletSignUp(
      { network: network, name: walletName },
      {
        onSuccess: () => {
          handleClose();
        },
        onError: (error: AppError) => {
          if (error.message === APP_ERROR_MESSAGE.WALLET_NOT_INSTALLED) {
            showWalletAlert(
              TypeHelper.convertToSuppoertedNetwork(error.payload),
            );
          } else {
            showErrorAlert({ content: error.message });
          }
          handleClose();
        },
      },
    );
  }

  return (
    <Dialog
      open={props.open ?? false}
      onClose={() => handleClose()}
      fullWidth
      maxWidth={"xs"}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + Z_INDEX_OFFSET.DIALOG }}
    >
      <DialogTitle>
        <Title
          signInType={signInType}
          network={network}
          onClickClose={() => handleClose()}
          onClickPrev={handleClickPrev}
        />
      </DialogTitle>
      <DialogContent>
        <div className="pt-4">
          <Content
            signInType={signInType}
            network={network}
            onChangeSignInType={setSignInType}
            onChangeNetwork={setNetwork}
            onChangeWallet={handleChangeWallet}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
