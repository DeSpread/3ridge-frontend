import { SUPPORTED_NETWORKS, SupportedNetwork, WALLET_NAMES } from "../types";
import AptosIcon from "../components/atomic/atoms/svg/aptos-icon";
import EthIcon from "../components/atomic/atoms/svg/eth-icon";
import SuiIcon from "../components/atomic/atoms/svg/sui-icon";
import StacksIcon from "../components/atomic/atoms/svg/stacks-icon";
import { ChainType } from "../__generated__/graphql";

class ResourceHelper {
  public static getExplorerUri = (
    network: SupportedNetwork,
    address: string
  ) => {
    if (network === SUPPORTED_NETWORKS.EVM) {
      return `https://etherscan.io/address/${address}`;
    } else if (network === SUPPORTED_NETWORKS.SUI) {
      return `https://explorer.sui.io/address/${address}`;
    } else if (network === SUPPORTED_NETWORKS.APTOS) {
      return `https://explorer.aptoslabs.com/account/${address}`;
    } else if (network === SUPPORTED_NETWORKS.STACKS) {
      return `https://explorer.hiro.so/address/${address}`;
    }
    return "/";
  };

  public static getExplorerIconUri = (network: SupportedNetwork) => {
    if (network === SUPPORTED_NETWORKS.EVM) {
      return "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/ethereum-eth-logo-diamond-purple.svg";
    } else if (network === SUPPORTED_NETWORKS.SUI) {
      return "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/sui-icon.svg";
    } else if (network === SUPPORTED_NETWORKS.APTOS) {
      return "https://sakura-frontend.s3.ap-northeast-2.amazonaws.com/icon/aptos_icon.svg";
    } else if (network === SUPPORTED_NETWORKS.STACKS) {
      return "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/stacks-icon.svg";
    }
    return undefined;
  };

  public static getIconUri = (chain: ChainType) => {
    console.log(chain);
    if (chain === ChainType.Evm) {
      return "https://3ridge.s3.ap-northeast-2.amazonaws.com/reward_chain/eth.png";
    } else if (chain === ChainType.Sui) {
      return "https://3ridge.s3.ap-northeast-2.amazonaws.com/reward_chain/sui.svg";
    } else if (chain === ChainType.Aptos) {
      return "https://3ridge.s3.ap-northeast-2.amazonaws.com/reward_chain/APTOS.svg";
    } else if (chain === ChainType.Stacks) {
      return "https://3ridge.s3.ap-northeast-2.amazonaws.com/reward_chain/stacks-icon.svg";
    } else if (chain === ChainType.Matic) {
      return "https://3ridge.s3.ap-northeast-2.amazonaws.com/reward_chain/matic-logo.png";
    } else if (chain === ChainType.Arb) {
      return "https://3ridge.s3.ap-northeast-2.amazonaws.com/reward_chain/arbitrum.png";
    } else if (chain === ChainType.Bnb) {
      return "https://3ridge.s3.ap-northeast-2.amazonaws.com/reward_chain/bnb.svg";
    }
    return "";
  };

  public static getValidatorButtonSvg = (network: SupportedNetwork) => {
    if (network === SUPPORTED_NETWORKS.EVM) {
      return EthIcon;
    } else if (network === SUPPORTED_NETWORKS.SUI) {
      return SuiIcon;
    } else if (network === SUPPORTED_NETWORKS.APTOS) {
      return AptosIcon;
    } else if (network === SUPPORTED_NETWORKS.STACKS) {
      return StacksIcon;
    }
    return undefined;
  };

  public static getWalletInfos = (network: SupportedNetwork) => {
    if (network === SUPPORTED_NETWORKS.APTOS) {
      return [
        {
          imageUrl:
            "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/petra-wallet.png",
          name: "Petra",
          value: WALLET_NAMES.PETRA,
          mobile: false,
          // mobile: true,
        },
      ];
    } else if (network === SUPPORTED_NETWORKS.SUI) {
      return [
        {
          imageUrl:
            "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/sui-wallet-icon.jpg",
          name: "Sui wallet",
          value: WALLET_NAMES.SUI_WALLET,
          mobile: false,
        },
      ];
    } else if (network === SUPPORTED_NETWORKS.EVM) {
      return [
        {
          imageUrl:
            "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/metamask-fox.svg",
          name: "MetaMask",
          value: WALLET_NAMES.META_MASK,
          mobile: false,
        },
        {
          imageUrl:
            "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/coinbase.svg",
          name: "Coinbase",
          value: WALLET_NAMES.COINBASE_WALLET,
          mobile: false,
        },
        {
          imageUrl:
            "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/wallet-connect-logo.png",
          name: "Wallet Connect",
          value: WALLET_NAMES.WALLET_CONNECT,
          mobile: true,
        },
      ];
    } else if (network === SUPPORTED_NETWORKS.STACKS) {
      return [
        {
          imageUrl:
            "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/hiro-wallet.jpg",
          name: "Hiro & Xverse",
          value: WALLET_NAMES.HIRO,
          backgroundColor: "white",
          mobile: true,
        },
      ];
    }
    return [];
  };
}

export default ResourceHelper;
