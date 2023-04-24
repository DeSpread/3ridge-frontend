import { ChainType } from "../../../__generated__/graphql";
import {
  APP_ERROR_MESSAGE,
  AppError,
  getErrorMessage,
} from "../../../error/my-error";
import { useMutation } from "@apollo/client";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  PartialWalletInfo,
  SuccessErrorCallback,
  SuccessErrorCallbackWithParam,
  SUPPORTED_NETWORKS,
  SupportedNetworks,
  WalletInfo,
} from "../../../type";
import { CREATE_USER_BY_WALLET } from "../../../apollo/query";
import PreferenceHelper from "../../../helper/preference-helper";
import addHours from "date-fns/addHours";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useTotalWallet } from "./total-wallet-hook";

export function useWalletLogin() {
  const preference = PreferenceHelper.getInstance();

  const [createUserByWallet] = useMutation(CREATE_USER_BY_WALLET);
  const { account, network, connected, disconnect, wallet, wallets } =
    useWallet();
  const { connectWallet } = useTotalWallet();
  const [walletInfo, setWalletInfo] = useState<PartialWalletInfo>({});
  const tryWalletSignUpSuccess = useRef<(msg?: void) => void>();
  const tryWalletSignUpOnError = useRef<(error: AppError) => void>();

  useEffect(() => {
    if (account && !walletInfo?.walletAddress) {
      const { walletAddress, timestamp } = preference.getWalletSignIn();
      if (!walletAddress || !timestamp) {
        return;
      }
      const curDate = new Date();
      const limitDate = addHours(timestamp, 4);
      if (curDate > limitDate) {
        walletLogout({});
        return;
      }
      setWalletInfo((prevState) => {
        return { ...prevState, walletAddress: account.address };
      });
      // preference.updateWalletSignIn(account.address, );
    }
  }, [account]);

  useEffect(() => {
    if (tryWalletSignUpSuccess.current && connected) {
      let newAccount: string | undefined = undefined;
      (async () => {
        try {
          console.log("tryWalletSignUpSuccess");
          if (!account) {
            tryWalletSignUpOnError.current?.(
              new AppError(APP_ERROR_MESSAGE.WALLET_USER_ACCOUNT_FETCH_FAIL)
            );
            return;
          }
          newAccount = account.address;
          await createUserByWallet({
            variables: {
              address: newAccount,
              chain: ChainType.Aptos,
            },
          });
          setWalletInfo((prevState) => {
            return { ...prevState, walletAddress: newAccount };
          });
          // preference.updateWalletSignIn(newAccount);
          tryWalletSignUpSuccess.current?.();
        } catch (e) {
          const message = getErrorMessage(e);
          console.log(e);
          if (message === APP_ERROR_MESSAGE.WALLET_USER_REJECTED_REQUEST) {
            return;
          }
          if (message === APP_ERROR_MESSAGE.WALLET_ADDRESS_ALREADY_REGISTERED) {
            if (newAccount) {
              console.log(newAccount);
              setWalletInfo((prevState) => {
                return { ...prevState, walletAddress: newAccount };
              });
              // preference.updateWalletSignIn(newAccount);
            }
            tryWalletSignUpSuccess.current?.();
            return;
          }
          setWalletInfo({});
          tryWalletSignUpOnError.current?.(new AppError(message));
          tryWalletSignUpSuccess.current = undefined;
          tryWalletSignUpOnError.current = undefined;
        }
      })();
    }
  }, [connected]);

  const isWalletLoggedIn = useMemo(() => {
    return walletInfo?.walletAddress ? true : false;
  }, [walletInfo]);

  const walletSignUp: SuccessErrorCallbackWithParam<PartialWalletInfo, void> = (
    walletInfo,
    { onSuccess, onError }
  ) => {
    (async () => {
      let newAccount: string | undefined = undefined;
      try {
        if (!walletInfo.network) {
          onError?.(new AppError(`network is not supported`));
          return;
        }
        connectWallet(walletInfo.network);
        // if (wallets[0].readyState === "NotDetected") {
        //   onError?.(new AppError(APP_ERROR_MESSAGE.WALLET_NOT_INSTALLED));
        //   return;
        // }
        // if (!connected) {
        //   connectWallet(SUPPORTED_NETWORKS.APTOS);
        //   tryWalletSignUpSuccess.current = onSuccess;
        //   tryWalletSignUpOnError.current = onError;
        //   return;
        // }
        // if (!account) {
        //   onError?.(
        //     new AppError(APP_ERROR_MESSAGE.WALLET_USER_ACCOUNT_FETCH_FAIL)
        //   );
        //   return;
        // }
        // newAccount = account.address;
        // await createUserByWallet({
        //   variables: {
        //     address: newAccount,
        //     chain: ChainType.Aptos,
        //   },
        // });
        // setWalletInfo((prevState) => {
        //   return { ...prevState, walletAddress: newAccount };
        // });
        // if (walletInfo.network)
        //   preference.updateWalletSignIn(newAccount, walletInfo.network);
        onSuccess?.();
      } catch (e) {
        const message = getErrorMessage(e);
        if (message === APP_ERROR_MESSAGE.WALLET_USER_REJECTED_REQUEST) {
          return;
        }
        if (message === APP_ERROR_MESSAGE.WALLET_ADDRESS_ALREADY_REGISTERED) {
          if (newAccount) {
            setWalletInfo((prevState) => {
              return { ...prevState, walletAddress: newAccount };
            });
            if (walletInfo.network)
              preference.updateWalletSignIn(newAccount, walletInfo.network);
          }
          onSuccess?.();
          return;
        }
        setWalletInfo({});
        onError?.(new AppError(message));
      }
    })();
  };

  const walletLogout: SuccessErrorCallback<void> = ({ onSuccess, onError }) => {
    (async () => {
      try {
        await disconnect();
        setWalletInfo({});
        preference.clearWalletSignIn();
        onSuccess?.();
      } catch (e) {
        const message = getErrorMessage(e);
        onError?.(new AppError(message));
      }
    })();
  };

  return {
    walletSignUp,
    walletInfo,
    isWalletLoggedIn,
    walletLogout,
  };
}
