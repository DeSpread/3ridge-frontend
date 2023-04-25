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
} from "../../../type";
import { CREATE_USER_BY_WALLET } from "../../../apollo/query";
import PreferenceHelper from "../../../helper/preference-helper";
import addHours from "date-fns/addHours";
import {
  convertToSuppoertedNetwork,
  convertToChainType,
} from "../../../util/type-convert";
import { useTotalWallet } from "./total-wallet-hook";

export function useWalletLogin() {
  const preference = PreferenceHelper.getInstance();

  const [createUserByWallet] = useMutation(CREATE_USER_BY_WALLET);

  const {
    asyncConnectWallet,
    isWalletInstalled,
    getAccountAddress,
    disconnectWallet,
    getConnectedAccount,
    changedCounter,
  } = useTotalWallet();

  const [walletInfo, setWalletInfo] = useState<PartialWalletInfo>({});
  const tryWalletSignUpSuccess = useRef<(msg?: void) => void>();
  const tryWalletSignUpOnError = useRef<(error: AppError) => void>();
  const tryWalletSignUpNetwork = useRef<string>();

  useEffect(() => {
    if (getConnectedAccount().address && !walletInfo?.walletAddress) {
      const { address, network } = getConnectedAccount();
      const { walletAddress, timestamp } = preference.getWalletSignIn();
      if (!walletAddress || !timestamp || !address || !network) {
        return;
      }
      const curDate = new Date();
      const limitDate = addHours(timestamp, 4);
      if (curDate > limitDate) {
        walletLogout({});
        return;
      }
      setWalletInfo((prevState) => {
        return { ...prevState, walletAddress: address, network };
      });
      preference.updateWalletSignIn(address, network);
    }
  }, [getConnectedAccount().address]);

  useEffect(() => {
    if (tryWalletSignUpSuccess.current) {
      const cache = {
        address: "",
        network: "",
      };
      (async () => {
        try {
          console.log("tryWalletSignUpSuccess");
          const address = getAccountAddress(
            convertToSuppoertedNetwork(tryWalletSignUpNetwork.current)
          );
          const network = tryWalletSignUpNetwork.current;
          if (!address || !network) {
            runCachedTryWalletSignUpOnError(
              APP_ERROR_MESSAGE.WALLET_USER_ACCOUNT_FETCH_FAIL
            );
            return;
          }
          cache.address = address;
          cache.network = network;
          await createUserByWallet({
            variables: {
              address: cache.address,
              chain: convertToChainType(network),
            },
          });
          setWalletInfo((prevState) => {
            return {
              ...prevState,
              walletAddress: cache.address,
              network: convertToSuppoertedNetwork(cache.network),
            };
          });
          preference.updateWalletSignIn(
            address,
            convertToSuppoertedNetwork(cache.network)
          );
          runCachedTryWalletSignUpSuccess();
        } catch (e) {
          const message = getErrorMessage(e);
          handleWalletSignUpError(message, cache);
        }
      })();
    }
  }, [changedCounter]);

  const handleWalletSignUpError = (
    errorMsg: string,
    cache: { address: string; network: string }
  ) => {
    if (errorMsg.includes(APP_ERROR_MESSAGE.SUI_WALLET_PERMISSION_REJECTED)) {
      return;
    }
    if (errorMsg.includes(APP_ERROR_MESSAGE.SUI_WALLET_PENDING_REQUEST)) {
      return;
    }
    if (errorMsg === APP_ERROR_MESSAGE.WALLET_USER_REJECTED_REQUEST) {
      return;
    }
    if (errorMsg === APP_ERROR_MESSAGE.WALLET_ADDRESS_ALREADY_REGISTERED) {
      if (cache.address && cache.network) {
        console.log(cache.address);
        setWalletInfo((prevState) => {
          return {
            ...prevState,
            walletAddress: cache.address,
            network: convertToSuppoertedNetwork(cache.network),
          };
        });
        preference.updateWalletSignIn(
          cache.address,
          convertToSuppoertedNetwork(cache.network)
        );
      }
      runCachedTryWalletSignUpSuccess();
      return;
    }
    setWalletInfo({});
    runCachedTryWalletSignUpOnError(errorMsg);
  };

  const runCachedTryWalletSignUpOnError = (msg: string) => {
    tryWalletSignUpOnError.current?.(new AppError(msg));
    tryWalletSignUpSuccess.current = undefined;
    tryWalletSignUpOnError.current = undefined;
    tryWalletSignUpNetwork.current = undefined;
  };

  const runCachedTryWalletSignUpSuccess = () => {
    tryWalletSignUpSuccess.current?.();
    tryWalletSignUpSuccess.current = undefined;
    tryWalletSignUpOnError.current = undefined;
    tryWalletSignUpNetwork.current = undefined;
  };

  const isWalletLoggedIn = useMemo(() => {
    return walletInfo?.walletAddress ? true : false;
  }, [walletInfo]);

  const walletSignUp: SuccessErrorCallbackWithParam<PartialWalletInfo, void> = (
    walletInfo,
    { onSuccess, onError }
  ) => {
    (async () => {
      const cache = {
        address: "",
        network: "",
      };
      try {
        console.log("1. check correct network");
        if (!walletInfo.network) {
          onError?.(new AppError(`network is not supported`));
          return;
        }
        console.log("2. check install wallet");
        if (!isWalletInstalled(walletInfo?.network)) {
          onError?.(new AppError(APP_ERROR_MESSAGE.WALLET_NOT_INSTALLED));
          return;
        }
        console.log(" 3. check wallet address");
        const accountAddress = getAccountAddress(walletInfo.network);
        console.log("3-1. if not wallet address, connect wallet");
        tryWalletSignUpSuccess.current = onSuccess;
        tryWalletSignUpOnError.current = onError;
        if (!accountAddress) {
          // after wallet is connected -> update remained
          const res = await asyncConnectWallet(walletInfo.network);
          tryWalletSignUpNetwork.current = walletInfo.network;
          if (!res.connected) {
            onError?.(new AppError(res.msg));
          }
          return;
        }
        console.log("3-2. if wallet address exist -> update login status");
        cache.address = accountAddress;
        cache.network = walletInfo.network;
        console.log("4. try create user wallet");
        await createUserByWallet({
          variables: {
            address: cache.address,
            chain: convertToChainType(walletInfo.network),
          },
        });
        setWalletInfo((prevState) => {
          return {
            ...prevState,
            walletAddress: cache.address,
            network: walletInfo.network,
          };
        });
        preference.updateWalletSignIn(cache.address, walletInfo.network);
        onSuccess?.();
      } catch (e) {
        const message = getErrorMessage(e);
        handleWalletSignUpError(message, cache);
      }
    })();
  };

  const walletLogout: SuccessErrorCallback<void> = ({ onSuccess, onError }) => {
    (async () => {
      try {
        disconnectWallet();
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
