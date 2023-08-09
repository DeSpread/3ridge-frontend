import { WALLET_NAMES } from "../types";

const DEEP_LINK = process.env["NEXT_PUBLIC_DEEP_LINK"];

class EthUtil {
  public static goToMetaMaskDeppLinkWhenMobile = (
    walletName?: string,
    isMobile?: boolean
  ) => {
    const hasMetamaskFlag = this.hasMetamask();

    if (
      isMobile &&
      !hasMetamaskFlag &&
      (walletName === WALLET_NAMES.META_MASK ||
        walletName === WALLET_NAMES.COINBASE_WALLET)
    ) {
      if (DEEP_LINK) location.href = DEEP_LINK;
      return true;
    }
    return false;
  };

  public static hasMetamask = () => {
    const { ethereum } = window;
    //@ts-ignore
    const hasMetamask = ethereum ? ethereum.isMetaMask : false;
    return hasMetamask;
  };
}

export default EthUtil;
