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

  const walletSignUp: SuccessErrorCallback = ({ onSuccess, onError }) => {
    (async () => {
      try {
        const { account } = await connectAsync({ connector: connectors[0] });
        await createUserByWallet({
          variables: {
            address: account,
            chain: ChainType.Evm,
          },
        });
        setWalletInfo((prevState) => {
          return { ...prevState, address: account };
        });
        preference.updateWalletSignIn(account);
        onSuccess?.();
      } catch (e) {
        const message = getErrorMessage(e);
        if (message === APP_ERROR_MESSAGE.WALLET_USER_REJECTED_REQUEST) {
          return;
        }
        if (message === APP_ERROR_MESSAGE.WALLET_ADDRESS_ALREADY_REGISTERED) {
          onSuccess?.();
          return;
        }
        setWalletInfo({});
        onError?.(new AppError(message));
      }
    })();
  };

  const walletLogout: SuccessErrorCallback = ({ onSuccess, onError }) => {
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
