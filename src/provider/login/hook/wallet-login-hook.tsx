import { useAccount, useConnect, useDisconnect } from "wagmi";
import { ChainType } from "../../../__generated__/graphql";
import {
  APP_ERROR_MESSAGE,
  AppError,
  getErrorMessage,
} from "../../../error/my-error";
import { useMutation } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { SuccessErrorCallback, WalletLoggedInInfo } from "../../../type";
import { CREATE_USER_BY_WALLET } from "../../../apollo/query";
import PreferenceHelper from "../../../helper/preference-helper";
import addHours from "date-fns/addHours";

export function useWalletLogin() {
  const preference = PreferenceHelper.getInstance();

  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const [createUserByWallet] = useMutation(CREATE_USER_BY_WALLET);
  const { address } = useAccount();
  const [walletInfo, setWalletInfo] = useState<WalletLoggedInInfo>({});

  useEffect(() => {
    if (address && !walletInfo.address) {
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
        return { ...prevState, address };
      });
      preference.updateWalletSignIn(address);
    }
  }, [address]);

  const isWalletConnected = useMemo(() => {
    return walletInfo?.address ? true : false;
  }, [walletInfo]);

  const walletSignUp: SuccessErrorCallback<void> = ({ onSuccess, onError }) => {
    (async () => {
      let newAccount = address;
      try {
        if (!address) {
          const { account } = await connectAsync({ connector: connectors[0] });
          newAccount = account;
        }
        if (!newAccount)
          throw new AppError(APP_ERROR_MESSAGE.WALLET_USER_ACCOUNT_FETCH_FAIL);
        await createUserByWallet({
          variables: {
            address: newAccount,
            chain: ChainType.Evm,
          },
        });
        setWalletInfo((prevState) => {
          return { ...prevState, address: newAccount };
        });
        preference.updateWalletSignIn(newAccount);
        onSuccess?.();
      } catch (e) {
        console.log(e);
        const message = getErrorMessage(e);
        if (message === APP_ERROR_MESSAGE.WALLET_USER_REJECTED_REQUEST) {
          return;
        }
        if (message === APP_ERROR_MESSAGE.WALLET_ADDRESS_ALREADY_REGISTERED) {
          if (newAccount) {
            setWalletInfo((prevState) => {
              return { ...prevState, address: newAccount };
            });
            preference.updateWalletSignIn(newAccount);
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
        await disconnectAsync();
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
    isWalletLoggedIn: isWalletConnected,
    walletLogout,
  };
}
