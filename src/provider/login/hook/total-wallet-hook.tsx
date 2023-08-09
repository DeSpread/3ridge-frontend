import { useWallet as useAptosWallet } from "@aptos-labs/wallet-adapter-react";
import { useWallet as useSuiWallet } from "@suiet/wallet-kit";
import {
  SUPPORTED_NETWORKS,
  SUPPORTED_NETWORKS_VALUES,
  SupportedNetwork,
  WalletName,
} from "../../../types";
import { useEffect, useMemo, useState } from "react";
import PreferenceHelper from "../../../helper/preference-helper";
import addHours from "date-fns/addHours";
import {
  useAccount as useEvmAccount,
  useConnect as useEvmConnect,
  useDisconnect as useEvmDisconnect,
} from "wagmi";
import { InjectedConnector as EvmInjectedConnector } from "wagmi/connectors/injected";
import {
  APP_ERROR_MESSAGE,
  AppError,
  getErrorMessage,
} from "../../../error/my-error";
import { useStacksWallet } from "../../../lib/stacks/stacks-wallet-hook";
import TypeHelper from "../../../helper/type-helper";
import { useWeb3Modal } from "@web3modal/react";

export function useTotalWallet() {
  const [connectedNetwork, setConnectedNetwork] = useState("");
  const [changedCounter, setChangedCounter] = useState(0);

  const {
    address: evmAddress,
    isConnected: evmConnected,
    status: evmStatus,
  } = useEvmAccount();
  const {
    connect: evmConnect,
    connectors: evmConnectors,
    status: evmConnectStatus,
  } = useEvmConnect({
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

  const { isOpen, open, close, setDefaultChain } = useWeb3Modal();

  const {
    connect: stacksConnect,
    ownerStxAddress,
    disconnect: stacksDisconnect,
    isWalletInstalled: isStacksWalletInstalled,
    userSession,
  } = useStacksWallet();

  useEffect(() => {
    const { timestamp, network } = PreferenceHelper.getConnectedNetwork();
    if (!timestamp || !network) return;
    const curDate = new Date();
    const limitDate = addHours(timestamp, 4);
    if (curDate > limitDate) {
      return;
    }
    commitConnectedNetwork(network);
  }, []);

  useEffect(() => {
    setChangedCounter((prevState) => {
      return prevState + 1;
    });
  }, [
    aptosConnected,
    suiConnected,
    evmConnected,
    evmConnectStatus,
    ownerStxAddress,
  ]);

  const asyncConnectWallet = async (
    network: SupportedNetwork,
    walletName: WalletName
  ) => {
    try {
      if (!isWalletInstalled(network, walletName)) {
        return {
          connected: false,
          msg: APP_ERROR_MESSAGE.WALLET_NOT_INSTALLED,
        };
      }
      if (network === SUPPORTED_NETWORKS.APTOS) {
        aptosConnect(aptosWallets[0].name);
      } else if (network === SUPPORTED_NETWORKS.SUI) {
        const item = [...suiConfiguredWallets, ...suiDetectedWallets].filter(
          (e) => e.name === "Sui Wallet"
        );
        await suiSelect(item[0].name);
      } else if (network === SUPPORTED_NETWORKS.EVM) {
        if (walletName === "WalletConnect") {
          open();
        } else {
          const connectors = evmConnectors.filter((e) => e.name === walletName);
          const connector = connectors[0];
          evmConnect({ connector });
        }
      } else if (network === SUPPORTED_NETWORKS.STACKS) {
        stacksConnect();
      }
      return {
        connected: true,
        msg: "success",
      };
    } catch (e) {
      throw new AppError(getErrorMessage(e));
    }
  };

  const isWalletInstalled = (
    network: SupportedNetwork,
    walletName: WalletName
  ) => {
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
      return item[0].installed;
    } else if (network === SUPPORTED_NETWORKS.EVM) {
      const item = evmConnectors.filter((e) => e.name.includes(walletName));
      return item[0].ready;
    } else if (network === SUPPORTED_NETWORKS.STACKS) {
      return isStacksWalletInstalled;
    }
    return false;
  };

  const getAccountAddress = (network: SupportedNetwork) => {
    if (network === SUPPORTED_NETWORKS.APTOS) {
      return aptosAccount?.address;
    } else if (network === SUPPORTED_NETWORKS.SUI) {
      return suiAccount?.address;
    } else if (network === SUPPORTED_NETWORKS.EVM) {
      return evmAddress;
    } else if (network === SUPPORTED_NETWORKS.STACKS) {
      return ownerStxAddress;
    }
    return undefined;
  };

  const getConnectedAccount = () => {
    if (SUPPORTED_NETWORKS_VALUES.includes(connectedNetwork)) {
      return {
        network: connectedNetwork,
        address: getAccountAddress(
          TypeHelper.convertToSuppoertedNetwork(connectedNetwork)
        ),
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
    } else if (connectedNetwork === SUPPORTED_NETWORKS.STACKS) {
      stacksDisconnect();
    }
    commitConnectedNetwork(undefined);
  };

  const disconnectWalletByNetwork = (network: SupportedNetwork) => {
    if (network === SUPPORTED_NETWORKS.APTOS) {
      aptosDisconnect();
    } else if (network === SUPPORTED_NETWORKS.SUI) {
      suiDisconnect();
    } else if (network === SUPPORTED_NETWORKS.EVM) {
      evmDisconnect();
    } else if (network === SUPPORTED_NETWORKS.STACKS) {
      stacksDisconnect();
    }
  };

  const commitConnectedNetwork = (network: SupportedNetwork | undefined) => {
    if (network) {
      setConnectedNetwork(network);
      PreferenceHelper.updateConnectedNetwork(network);
      return;
    }
    setConnectedNetwork("");
    PreferenceHelper.clearConnectedNetwork();
  };

  return {
    asyncConnectWallet,
    getAccountAddress,
    isWalletInstalled,
    getConnectedAccount,
    disconnectWallet,
    changedCounter,
    commitConnectedNetwork,
    disconnectWalletByNetwork,
  };
}
