import { SUPPORTED_NETWORKS, SupportedNetwork } from "../type";
import AptosIcon from "../components/atoms/svg/aptos-icon";
import EthIcon from "../components/atoms/svg/eth-icon";
import SuiIcon from "../components/atoms/svg/sui-icon";

class ChainResourceHelper {
  private static instance: ChainResourceHelper;

  private constructor() {}

  public static getInstance() {
    return this.instance || (this.instance = new this());
  }

  getExplorerUri = (network: SupportedNetwork, address: string) => {
    console.log(network);
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
}

export default ChainResourceHelper;
