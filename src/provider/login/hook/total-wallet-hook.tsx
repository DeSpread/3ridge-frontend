import { useWallet as useAptosWallet } from "@aptos-labs/wallet-adapter-react";
import { useWallet as useSuiWallet } from "@suiet/wallet-kit";
import {
  ObjectValues,
  SUPPORTED_NETWORKS,
  SupportedNetworks,
} from "../../../type";

export function useTotalWallet() {
  const { connect: aptosConnect, wallets: aptosWallets } = useAptosWallet();
  const {
    select: suiSelect,
    configuredWallets: suiConfiguredWallets,
    detectedWallets: suiDetectedWallets,
  } = useSuiWallet();

  const connectWallet = async (network: SupportedNetworks) => {
    if (network === SUPPORTED_NETWORKS.APTOS) {
      if (aptosWallets[0].readyState === "NotDetected") {
        return {
          connected: false,
          msg: "WalletNotDetected",
        };
      }
      aptosConnect(aptosWallets[0].name);
    } else if (network === SUPPORTED_NETWORKS.SUI) {
      [...suiConfiguredWallets, ...suiDetectedWallets].filter(
        (e) => e.name === "Sui Wallet"
      ); //.map((e) => {e.name });
      return;
    }
  };

  return { connectWallet };
}
