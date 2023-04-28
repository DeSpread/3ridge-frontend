import { SUPPORTED_NETWORKS, SupportedNetworks } from "../type";
import AptosIcon, {
  WalletConnectedAptosIcon,
  NotWalletConnectedAptosIcon,
} from "../components/atoms/svg/aptos-icon";
import EthIcon, {
  NotWalletConnectedEthIcon,
  WalletConnectedEthIcon,
} from "../components/atoms/svg/eth-icon";
import SuiIcon, {
  WalletConnectedSuiIcon,
  NotWalletConnectedSuiIcon,
} from "../components/atoms/svg/sui-icon";

class ChainResourceHelper {
  private static instance: ChainResourceHelper;

  private constructor() {}

  public static getInstance() {
    return this.instance || (this.instance = new this());
  }

  getExplorerUri = (network: SupportedNetworks, address: string) => {
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

  getExplorerIconUri = (network: SupportedNetworks) => {
    if (network === SUPPORTED_NETWORKS.EVM) {
      return "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/Ethereum-Icon-Purple-Logo.wine.svg";
    } else if (network === SUPPORTED_NETWORKS.SUI) {
      return "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/sui-wallet-icon.jpg";
    } else if (network === SUPPORTED_NETWORKS.APTOS) {
      return "https://sakura-frontend.s3.ap-northeast-2.amazonaws.com/icon/aptos_icon.svg";
    }
    return undefined;
  };

  getValidatorButtonSvg = (network: SupportedNetworks, inactive: boolean) => {
    if (network === SUPPORTED_NETWORKS.EVM) {
      return inactive ? NotWalletConnectedEthIcon : EthIcon;
    } else if (network === SUPPORTED_NETWORKS.SUI) {
      return inactive ? NotWalletConnectedSuiIcon : WalletConnectedSuiIcon;
    } else if (network === SUPPORTED_NETWORKS.APTOS) {
      return inactive ? NotWalletConnectedAptosIcon : WalletConnectedAptosIcon;
    }
    return undefined;
  };
}

export default ChainResourceHelper;
