import { SUPPORTED_NETWORKS, SupportedNetwork, WALLET_NAMES } from "../type";
import AptosIcon from "../components/atoms/svg/aptos-icon";
import EthIcon from "../components/atoms/svg/eth-icon";
import SuiIcon from "../components/atoms/svg/sui-icon";

class ResourceFactory {
  private static instance: ResourceFactory;

  private constructor() {}

  public static getInstance() {
    return this.instance || (this.instance = new this());
  }

  getExplorerUri = (network: SupportedNetwork, address: string) => {
    if (network === SUPPORTED_NETWORKS.EVM) {
      return `https://etherscan.io/address/${address}`;
    } else if (network === SUPPORTED_NETWORKS.SUI) {
      return `https://explorer.sui.io/address/${address}`;
    } else if (network === SUPPORTED_NETWORKS.APTOS) {
      return `https://explorer.aptoslabs.com/account/${address}`;
    }
    return "/";
  };

  getExplorerIconUri = (network: SupportedNetwork) => {
    if (network === SUPPORTED_NETWORKS.EVM) {
      return "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/ethereum-eth-logo-diamond-purple.svg";
    } else if (network === SUPPORTED_NETWORKS.SUI) {
      return "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/sui-icon.svg";
    } else if (network === SUPPORTED_NETWORKS.APTOS) {
      return "https://sakura-frontend.s3.ap-northeast-2.amazonaws.com/icon/aptos_icon.svg";
    }
    return undefined;
  };

  getValidatorButtonSvg = (network: SupportedNetwork) => {
    if (network === SUPPORTED_NETWORKS.EVM) {
      return EthIcon;
    } else if (network === SUPPORTED_NETWORKS.SUI) {
      return SuiIcon;
    } else if (network === SUPPORTED_NETWORKS.APTOS) {
      return AptosIcon;
    }
    return undefined;
  };

  getWalletInfos = (network: SupportedNetwork) => {
    if (network === SUPPORTED_NETWORKS.APTOS) {
      return [
        {
          imageUrl:
            "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/petra-wallet.png",
          name: "Petra",
          value: WALLET_NAMES.PETRA,
        },
      ];
    } else if (network === SUPPORTED_NETWORKS.SUI) {
      return [
        {
          imageUrl:
            "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/sui-wallet-icon.jpg",
          name: "Sui wallet",
          value: WALLET_NAMES.SUI_WALLET,
        },
      ];
    } else if (network === SUPPORTED_NETWORKS.EVM) {
      return [
        {
          imageUrl:
            "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/metamask-fox.svg",
          name: "MetaMask",
          value: WALLET_NAMES.META_MASK,
        },
        {
          imageUrl:
            "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/coinbase.svg",
          name: "Coinbase",
          value: WALLET_NAMES.COINBASE_WALLET,
        },
      ];
    }
    return [];
  };
}

export default ResourceFactory;