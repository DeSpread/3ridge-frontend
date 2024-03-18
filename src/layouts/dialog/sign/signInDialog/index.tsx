"use client";

import { useMutation } from "@apollo/client";
import { useWallet as useAptosWallet } from "@aptos-labs/wallet-adapter-react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { getAccount } from "@wagmi/core";
import { useState } from "react";
import { useConnect } from "wagmi";

import Content from "./content";
import Title from "./title";
import { SignInType } from "./types";

import { gql } from "@/__generated__";
import { AuthResponse } from "@/__generated__/graphql";
import { APP_ERROR_MESSAGE, AppError } from "@/error/my-error";
import TypeHelper from "@/helper/type-helper";
import { useSignDialog } from "@/hooks/sign-dialog-hook";
import { useUser } from "@/hooks/user/useUser";
import { useSignMessage } from "@/hooks/useSignMessage";
import { useWalletAlert } from "@/hooks/wallet-alert-hook";
import { useAlert } from "@/provider/alert/alert-provider";
import { useTotalWallet } from "@/provider/login/hook/total-wallet-hook";
import { useLogin } from "@/provider/login/login-provider";
import { useMobile } from "@/provider/mobile/mobile-context";
import {
  SupportedNetwork,
  SUPPORTED_NETWORKS,
  WalletName,
  Z_INDEX_OFFSET,
} from "@/types";
import EthUtil from "@/util/eth-util";

const GET_NONCE_MUTATION = gql(`
  mutation GetNonce($walletAddress: String!) {
    getNonce(walletAddress: $walletAddress)
  }
`);

const SIGN_IN_BY_SIGNATURE = gql(`
  mutation SignInBySignature($wallet: UserWalletInputType!, $signature: String!) {
    signInBySignature(wallet: $wallet, signature: $signature) {
      _id
      accessToken
    }
  }
`);

const SIGN_IN_BY_APTOS_SIGNATURE = gql(`
  mutation SignInByAptosSignature($wallet: UserWalletInputType!, $publicKey: String!, $signature: String!) {
    signInByAptosSignature(wallet: $wallet, publicKey: $publicKey, signature: $signature) {
      _id
      accessToken
    }
  }
`);

const SIGN_IN_BY_STACKS_SIGNATURE = gql(`
  mutation SignInByStacksSignature($wallet: UserWalletInputType!, $publicKey: String!, $signature: String!) {
    signInByStacksSignature(wallet: $wallet, publicKey: $publicKey, signature: $signature) {
      _id
      accessToken
    }
  }
`);

export default function SignInDialog() {
  const { setShowSignInDialog, isSignDialogOpen } = useSignDialog();
  const { isMobile } = useMobile();
  const { walletSignUp } = useLogin();
  const { showErrorAlert } = useAlert();
  const { showWalletAlert } = useWalletAlert();
  const { connectAsync, connectors } = useConnect();
  const { loginByWallet } = useUser();
  const { signMessage } = useSignMessage();
  const [getNonce] = useMutation(GET_NONCE_MUTATION);
  const [signInBySignature] = useMutation(SIGN_IN_BY_SIGNATURE);
  const [signInByAptosSignature] = useMutation(SIGN_IN_BY_APTOS_SIGNATURE);
  const [signInByStacksSignature] = useMutation(SIGN_IN_BY_STACKS_SIGNATURE);
  const { commitConnectedNetwork, asyncConnectWallet, getAccountAddress } =
    useTotalWallet();

  const { account: aptosAccount } = useAptosWallet();

  const [signInType, setSignInType] = useState<SignInType>();
  const [network, setNetwork] = useState<SupportedNetwork>();

  function handleClose() {
    setNetwork(undefined);
    setSignInType(undefined);
    setShowSignInDialog(false);
  }

  function handleClickPrev() {
    if (network) {
      setNetwork(undefined);
      return;
    }

    if (signInType) {
      setSignInType(undefined);
      return;
    }
  }

  async function handleChangeWallet(value: WalletName) {
    if (network === undefined) {
      throw new Error("network is undefined");
    }

    const connectResult = await asyncConnectWallet(network, value);
    commitConnectedNetwork(network);

    if (connectResult.msg === APP_ERROR_MESSAGE.WALLET_NOT_INSTALLED) {
      showWalletAlert(network);
      return;
    }

    const walletAddress =
      getAccountAddress(network) ?? connectResult.account?.address;

    if (!walletAddress) {
      throw new Error("cannot get wallet address");
    }

    const nonceResult = await getNonce({
      variables: {
        walletAddress: walletAddress,
      },
    });
    const nonce = nonceResult.data?.getNonce;

    if (!nonce) {
      throw new Error("cannot get nonce");
    }
    const signature = await signMessage(
      network === SUPPORTED_NETWORKS.STACKS ? "STACKS" : network,
      `Sign in with wallet\n\nAddress: ${walletAddress}\n\nNonce: ${nonce}\n\nThis authorization is valid for 1 minute.`,
      nonce,
    );

    let token: string | undefined;

    if (network === "APTOS" && typeof signature === "string") {
      const res = await signInByAptosSignature({
        variables: {
          wallet: {
            address: walletAddress,
            chain: TypeHelper.convertToChainType(network),
          },
          publicKey: connectResult.account!.publicKey.toString(),
          signature,
        },
      });

      token = res.data?.signInByAptosSignature.accessToken;
    } else if (network === "STACKS" && typeof signature === "object") {
      const res = await signInByStacksSignature({
        variables: {
          wallet: {
            address: walletAddress,
            chain: TypeHelper.convertToChainType(network),
          },
          publicKey: signature.publicKey,
          signature: signature.signature,
        },
      });

      token = res.data?.signInByStacksSignature.accessToken;
    } else if (typeof signature === "string") {
      const res = await signInBySignature({
        variables: {
          wallet: {
            address: walletAddress,
            chain: TypeHelper.convertToChainType(network),
          },
          signature,
        },
      });

      token = res.data?.signInBySignature.accessToken;
    }

    if (!token) {
      showErrorAlert({
        content: "로그인 실패 했습니다",
      });
      return;
    }

    loginByWallet(token);
    handleClose();

    return;

    // if (EthUtil.goToMetaMaskDeppLinkWhenMobile(walletName, isMobile)) {
    //   return;
    // }

    // walletSignUp(
    //   { network: network, name: walletName },
    //   {
    //     onSuccess: () => {
    //       handleClose();
    //     },
    //     onError: (error: AppError) => {
    //       if (error.message === APP_ERROR_MESSAGE.WALLET_NOT_INSTALLED) {
    //         showWalletAlert(
    //           TypeHelper.convertToSuppoertedNetwork(error.payload),
    //         );
    //       } else {
    //         showErrorAlert({ content: error.message });
    //       }
    //       handleClose();
    //     },
    //   },
    // );
  }

  function handleSignIn() {
    handleClose();
  }

  return (
    <Dialog
      open={isSignDialogOpen ?? false}
      onClose={() => handleClose()}
      disableRestoreFocus
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
            onSignIn={handleSignIn}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
