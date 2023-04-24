import { useWallet as useAptosWallet } from "@aptos-labs/wallet-adapter-react";
import { useWallet as useSuiWallet } from "@suiet/wallet-kit";
import {
  ObjectValues,
  SUPPORTED_NETWORKS,
  SupportedNetworks,
} from "../../../type";
import { useState } from "react";

export function useTotalWallet() {
  const [connectedNetwork, setConnectedNetwork] = useState("");

  const {
    connect: aptosConnect,
    wallets: aptosWallets,
    account: aptosAccount,
  } = useAptosWallet();

  const {
    select: suiSelect,
    configuredWallets: suiConfiguredWallets,
    detectedWallets: suiDetectedWallets,
    status: suiStatus,
    name: suiName,
    account: suiAccount,
  } = useSuiWallet();

  const connectWallet = (network: SupportedNetworks) => {
    if (network === SUPPORTED_NETWORKS.APTOS) {
      if (aptosWallets[0].readyState === "NotDetected") {
        return {
          connected: false,
          msg: "WalletNotDetected",
        };
      }
      aptosConnect(aptosWallets[0].name);
      setConnectedNetwork(network);
    } else if (network === SUPPORTED_NETWORKS.SUI) {
      const item = [...suiConfiguredWallets, ...suiDetectedWallets].filter(
        (e) => e.name === "Sui Wallet"
      );
      if (item.length === 0) {
        return {
          connected: false,
          msg: "WalletNotDetected",
        };
      }
      suiSelect(item[0].name);
      setConnectedNetwork(network);
    }
    return {
      connected: true,
      msg: "success",
    };
  };

  const connectedAccount = () => {
    if (!connectedNetwork)
      return {
        network: undefined,
        address: undefined,
      };
    if (connectedNetwork === SUPPORTED_NETWORKS.APTOS) {
      return {
        network: SUPPORTED_NETWORKS.APTOS,
        address: aptosAccount?.address,
      };
    }
    if (connectedNetwork === SUPPORTED_NETWORKS.SUI) {
      return {
        network: SUPPORTED_NETWORKS.SUI,
        address: suiAccount?.address,
      };
    }
  };

  return { connectWallet, connectedAccount };
}
