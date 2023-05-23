import {
  APP_ERROR_MESSAGE,
  AppError,
  getErrorMessage,
} from "../../../error/my-error";
import { useMutation } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import {
  PartialWalletAddressInfo,
  PartialWalletInfo,
  SuccessErrorCallback,
  SuccessErrorCallbackWithParam,
  SUPPORTED_NETWORKS,
} from "../../../type";
import { CREATE_USER_BY_WALLET } from "../../../lib/apollo/query";
import PreferenceHelper from "../../../helper/preference-helper";
import addHours from "date-fns/addHours";
import addMinutes from "date-fns/addMinutes";

import {
  convertToChainType,
  convertToSuppoertedNetwork,
} from "../../../util/type-util";
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
    commitConnectedNetwork,
  } = useTotalWallet();

  const [walletInfo, setWalletInfo] = useState<PartialWalletAddressInfo>({});
  const [isWalletLoggedIn, setIsWalletLoggedIn] = useState(false);
  const tryWalletSignUpSuccess = useRef<(msg?: void) => void>();
  const tryWalletSignUpOnError = useRef<(error: AppError) => void>();
  const tryWalletSignUpNetwork = useRef<string>();

  useEffect(() => {
    refreshWalletInfo();
  }, []);

  const refreshWalletInfo = () => {
    const { walletAddress, timestamp, walletNetwork } =
      preference.getWalletSignIn();
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
      return { ...prevState, address: walletAddress, network: walletNetwork };
    });
    setIsWalletLoggedIn(true);
    commitConnectedNetwork(convertToSuppoertedNetwork(walletNetwork));
    preference.updateWalletSignIn(walletAddress, walletNetwork);
  };

  useEffect(() => {
    if (tryWalletSignUpSuccess.current) {
      console.log("tryWalletSignUpSuccess - 1");
      const cache = {
        address: "",
        network: "",
      };
      (async () => {
        try {
          const address = getAccountAddress(
            convertToSuppoertedNetwork(tryWalletSignUpNetwork.current)
          );
          console.log(
            "tryWalletSignUpSuccess - 2",
            address,
            convertToSuppoertedNetwork(tryWalletSignUpNetwork.current)
          );
          const network = tryWalletSignUpNetwork.current;
          if (!address) return;
          if (!network) {
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
          console.log(
            "tryWalletSignUpSuccess - 3",
            cache.address,
            cache.network
          );
          setWalletInfo((prevState) => {
            return {
              ...prevState,
              address: cache.address,
              network: convertToSuppoertedNetwork(cache.network),
            };
          });
          setIsWalletLoggedIn(true);
          commitConnectedNetwork(convertToSuppoertedNetwork(cache.network));
          preference.updateWalletSignIn(
            cache.address,
            convertToSuppoertedNetwork(cache.network)
          );
          runCachedTryWalletSignUpSuccess();
        } catch (e) {
          const message = getErrorMessage(e);
          handleWalletSignUpError(message, cache);
        }
      })();
    }
  }, [getConnectedAccount().address]);

  useEffect(() => {
    (async () => {
      let cache = {
        address: "",
        network: "",
      };
      try {
        const { network, timestamp } = preference.getRetryNetwork();
        const address = getAccountAddress(convertToSuppoertedNetwork(network));
        if (network && timestamp) {
          const curDate = new Date();
          const limitDate = addMinutes(timestamp, 1);
          if (curDate > limitDate) {
            return;
          }
          if (!address) return;
          cache = {
            address,
            network,
          };
          await createUserByWallet({
            variables: {
              address,
              chain: convertToChainType(network),
            },
          });
          setWalletInfo((prevState) => {
            return {
              ...prevState,
              address,
              network: convertToSuppoertedNetwork(network),
            };
          });
          setIsWalletLoggedIn(true);
          commitConnectedNetwork(convertToSuppoertedNetwork(cache.network));
          preference.updateWalletSignIn(
            cache.address,
            convertToSuppoertedNetwork(cache.network)
          );
          preference.clearRetryNetwork();
        }
      } catch (e) {
        const message = getErrorMessage(e);
        handleWalletSignUpError2(message, cache);
      }
    })();
  }, [getConnectedAccount().address]);

  const handleWalletSignUpError2 = (
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
        setWalletInfo((prevState) => {
          return {
            ...prevState,
            address: cache.address,
            network: convertToSuppoertedNetwork(cache.network),
          };
        });
        setIsWalletLoggedIn(true);
        commitConnectedNetwork(convertToSuppoertedNetwork(cache.network));
        preference.updateWalletSignIn(
          cache.address,
          convertToSuppoertedNetwork(cache.network)
        );
        preference.clearRetryNetwork();
      }
      return;
    }
    if (errorMsg.includes("duplicate key error collection:")) {
      return;
    }
    setWalletInfo({});
    setIsWalletLoggedIn(false);
  };

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
        setWalletInfo((prevState) => {
          return {
            ...prevState,
            address: cache.address,
            network: convertToSuppoertedNetwork(cache.network),
          };
        });
        setIsWalletLoggedIn(true);
        commitConnectedNetwork(convertToSuppoertedNetwork(cache.network));
        preference.updateWalletSignIn(
          cache.address,
          convertToSuppoertedNetwork(cache.network)
        );
      }
      runCachedTryWalletSignUpSuccess();
      return;
    }
    if (errorMsg.includes("duplicate key error collection:")) {
      return;
    }
    setWalletInfo({});
    setIsWalletLoggedIn(false);
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

  const walletSignUp: SuccessErrorCallbackWithParam<PartialWalletInfo, void> = (
    _walletInfo,
    { onSuccess, onError }
  ) => {
    (async () => {
      const cache = {
        address: "",
        network: "",
      };
      try {
        console.log("1. check correct network");
        if (!_walletInfo.network) {
          onError?.(new AppError(`network is not supported`));
          return;
        }
        if (!_walletInfo.name) {
          onError?.(new AppError(`wallet is not supported`));
          return;
        }
        console.log("2. check install wallet");
        if (!isWalletInstalled(_walletInfo?.network)) {
          onError?.(
            new AppError(
              APP_ERROR_MESSAGE.WALLET_NOT_INSTALLED,
              _walletInfo.network
            )
          );
          return;
        }
        console.log(" 3. check wallet address");
        const accountAddress = getAccountAddress(_walletInfo.network);
        console.log("3-1. if not wallet address, connect wallet");
        tryWalletSignUpSuccess.current = onSuccess;
        tryWalletSignUpOnError.current = onError;
        if (!accountAddress) {
          // after wallet is connected -> update remained
          if (_walletInfo.network === SUPPORTED_NETWORKS.STACKS) {
            preference.updateRetryNetwork(_walletInfo.network);
          }
          await asyncConnectWallet(_walletInfo.network, _walletInfo.name);
          commitConnectedNetwork(_walletInfo.network);
          tryWalletSignUpNetwork.current = _walletInfo.network;
          return;
        }
        console.log("3-2. if wallet address exist -> update login status");
        cache.address = accountAddress;
        cache.network = _walletInfo.network;
        console.log("4. try create user wallet");
        await createUserByWallet({
          variables: {
            address: cache.address,
            chain: convertToChainType(_walletInfo.network),
          },
        });
        console.log("5. Set Wallet Info addr - ", cache.address);
        setWalletInfo((prevState) => {
          return {
            ...prevState,
            address: cache.address,
            network: convertToSuppoertedNetwork(cache.network),
          };
        });
        setIsWalletLoggedIn(true);
        commitConnectedNetwork(convertToSuppoertedNetwork(cache.network));
        preference.updateWalletSignIn(cache.address, _walletInfo.network);
        onSuccess?.();
      } catch (e) {
        console.log(e);
        const message = getErrorMessage(e);
        if (cache.network === SUPPORTED_NETWORKS.STACKS) {
          handleWalletSignUpError2(message, cache);
        } else {
          handleWalletSignUpError(message, cache);
        }
      }
    })();
  };

  const walletLogout: SuccessErrorCallback<void> = ({ onSuccess, onError }) => {
    (async () => {
      try {
        console.log("wallet logout");
        disconnectWallet();
        setWalletInfo({});
        setIsWalletLoggedIn(false);
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
