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
import {
  useAccount as useEvmAccount,
  useConnect as useEvmConnect,
  useDisconnect as useEvmDisconnect,
} from "wagmi";
import { InjectedConnector as EvmInjectedConnector } from "wagmi/connectors/injected";

export function useTotalWallet() {
  const [connectedNetwork, setConnectedNetwork] = useState("");
  const [changedCounter, setChangedCounter] = useState(0);
  const preference = PreferenceHelper.getInstance();

  const {
    address: evmAddress,
    isConnected: evmConnected,
    status: evmStatus,
  } = useEvmAccount();
  const { connect: evmConnect, connectors: evmConnectors } = useEvmConnect({
    connector: new EvmInjectedConnector(),
  });
  const { disconnect: evmDisconnect } = useEvmDisconnect();

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
  }, [aptosConnected, suiConnected, evmConnected]);

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
    } else if (network === SUPPORTED_NETWORKS.EVM) {
      evmConnect();
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
    } else if (network === SUPPORTED_NETWORKS.EVM) {
      const item = evmConnectors.filter((e) => e.name === "MetaMask");
      return item[0].ready;
    }
    return false;
  };

  const getAccountAddress = (network: SupportedNetworks) => {
    if (network === SUPPORTED_NETWORKS.APTOS) {
      return aptosAccount?.address;
    } else if (network === SUPPORTED_NETWORKS.SUI) {
      return suiAccount?.address;
    } else if (network === SUPPORTED_NETWORKS.EVM) {
      return evmAddress;
    }
    return undefined;
  };

  const getConnectedAccount = () => {
    if (
      connectedNetwork === SUPPORTED_NETWORKS.APTOS ||
      connectedNetwork === SUPPORTED_NETWORKS.SUI ||
      connectedNetwork === SUPPORTED_NETWORKS.EVM
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
    } else if (connectedNetwork === SUPPORTED_NETWORKS.EVM) {
      evmDisconnect();
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
