import { useWallet as useAptosWallet } from "@aptos-labs/wallet-adapter-react";
import { useWallet as useSuiWallet } from "@suiet/wallet-kit";
import {
  ObjectValues,
  SUPPORTED_NETWORKS,
  SupportedNetworks,
} from "../../../type";
import { useEffect, useMemo, useState } from "react";
import PreferenceHelper from "../../../helper/preference-helper";
import addHours from "date-fns/addHours";
import { getErrorMessage } from "../../../error/my-error";
import { convertToSuppoertedNetwork } from "../../../util/type-convert";

export function useTotalWallet() {
  const [connectedNetwork, setConnectedNetwork] = useState("");
  const [changedCounter, setChangedCounter] = useState(0);
  const preference = PreferenceHelper.getInstance();

  const {
    connect: aptosConnect,
    wallets: aptosWallets,
    account: aptosAccount,
    disconnect: aptosDisconnect,
    connected: aptosConnected,
  } = useAptosWallet();

  const {
    select: suiSelect,
    configuredWallets: suiConfiguredWallets,
    detectedWallets: suiDetectedWallets,
    status: suiStatus,
    name: suiName,
    account: suiAccount,
    disconnect: suiDisconnect,
    connected: suiConnected,
  } = useSuiWallet();

  useEffect(() => {
    const { timestamp, network } = preference.getConnectedNetwork();
    if (!timestamp || !network) return;
    const curDate = new Date();
    const limitDate = addHours(timestamp, 4);
    if (curDate > limitDate) {
      return;
    }
    setConnectedNetwork(network);
  }, []);

  useEffect(() => {
    setChangedCounter((prevState) => {
      return prevState + 1;
    });
  }, [aptosConnected, suiConnected]);

  const asyncConnectWallet = async (network: SupportedNetworks) => {
    if (!isWalletInstalled(network)) {
      return {
        connected: false,
        msg: "WalletNotDetected",
      };
    }
    if (network === SUPPORTED_NETWORKS.APTOS) {
      aptosConnect(aptosWallets[0].name);
      setConnectedNetwork(network);
      preference.updateConnectedNetwork(network);
    } else if (network === SUPPORTED_NETWORKS.SUI) {
      const item = [...suiConfiguredWallets, ...suiDetectedWallets].filter(
        (e) => e.name === "Sui Wallet"
      );
      await suiSelect(item[0].name);
      setConnectedNetwork(network);
      preference.updateConnectedNetwork(network);
    }
    return {
      connected: true,
      msg: "success",
    };
  };

  const isWalletInstalled = (network: SupportedNetworks) => {
    if (network === SUPPORTED_NETWORKS.APTOS) {
      if (aptosWallets[0].readyState === "NotDetected") {
        return false;
      }
      return true;
    } else if (network === SUPPORTED_NETWORKS.SUI) {
      const item = [...suiConfiguredWallets, ...suiDetectedWallets].filter(
        (e) => e.name === "Sui Wallet"
      );
      if (item.length === 0) {
        return false;
      }
      return true;
    }
    return false;
  };

  const getAccountAddress = (network: SupportedNetworks) => {
    if (network === SUPPORTED_NETWORKS.APTOS) {
      return aptosAccount?.address;
    } else if (network === SUPPORTED_NETWORKS.SUI) {
      return suiAccount?.address;
    }
    return undefined;
  };

  const getConnectedAccount = () => {
    if (
      connectedNetwork === SUPPORTED_NETWORKS.APTOS ||
      connectedNetwork === SUPPORTED_NETWORKS.SUI
    ) {
      return {
        network: connectedNetwork,
        address: getAccountAddress(connectedNetwork),
      };
    }
    return {
      network: undefined,
      address: undefined,
    };
  };

  const disconnectWallet = () => {
    if (connectedNetwork === SUPPORTED_NETWORKS.APTOS) {
      aptosDisconnect();
    } else if (connectedNetwork === SUPPORTED_NETWORKS.SUI) {
      suiDisconnect();
    }
    setConnectedNetwork("");
    preference.clearConnectedNetwork();
  };

  return {
    asyncConnectWallet,
    getAccountAddress,
    isWalletInstalled,
    getConnectedAccount,
    disconnectWallet,
    changedCounter,
  };
}
