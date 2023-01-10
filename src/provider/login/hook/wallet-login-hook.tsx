import { useAccount, useConnect, useDisconnect } from "wagmi";
import { ChainType } from "../../../__generated__/graphql";
import {
  APP_ERROR_NAME,
  AppError,
  getErrorMessage,
} from "../../../error/my-error";
import { useMutation } from "@apollo/client";
import { gql } from "../../../__generated__";
import { useEffect, useMemo, useState } from "react";
import { SuccessErrorCallback, WalletInfo } from "../../../type";

const CREATE_USER_BY_WALLET = gql(/* GraphQL */ `
  mutation CreateUserByWallet($address: String!, $chainType: ChainType!) {
    createUserByWallet(address: $address, chainType: $chainType) {
      name
    }
  }
`);

export function useWalletLogin() {
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const [createUserByWallet] = useMutation(CREATE_USER_BY_WALLET);
  const { address } = useAccount();
  const [walletInfo, setWalletInfo] = useState<WalletInfo>({});

  useEffect(() => {
    if (address && !walletInfo.address) {
      setWalletInfo((prevState) => {
        return { ...prevState, address };
      });
    }
  }, [address]);

  const isWalletConnected = useMemo(() => {
    return walletInfo?.address ? true : false;
  }, [walletInfo]);

  const walletSignUp: SuccessErrorCallback = ({ onSuccess, onError }) => {
    (async () => {
      try {
        const { account } = await connectAsync({ connector: connectors[0] });
        setWalletInfo((prevState) => {
          return { ...prevState, address: account };
        });
        await createUserByWallet({
          variables: {
            address: account,
            chainType: ChainType.Evm,
          },
        });
        onSuccess?.();
      } catch (e) {
        const message = getErrorMessage(e);
        if (message === "User rejected request") {
          return;
        }
        if (message === "Already registered by wallet address") {
          onSuccess?.();
          return;
        }
        setWalletInfo({});
        onError?.(new AppError(message, APP_ERROR_NAME.WALLET_SIGN_UP));
      }
    })();
  };

  const walletLogout: SuccessErrorCallback = ({ onSuccess, onError }) => {
    (async () => {
      try {
        await disconnectAsync();
        setWalletInfo({});
        onSuccess?.();
      } catch (e) {
        const message = getErrorMessage(e);
        onError?.(new AppError(message, APP_ERROR_NAME.WALLET_LOGOUT));
      }
    })();
  };

  return {
    walletSignUp,
    walletInfo,
    isWalletLoggedIn: isWalletConnected,
    walletLogout,
  };
}
