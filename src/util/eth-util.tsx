import { WALLET_NAMES } from "../type";

const DEEP_LINK = process.env["NEXT_PUBLIC_DEEP_LINK"];

const goToMetaMaskDeppLinkWhenMobile = (
  walletName?: string,
  isMobile?: boolean
) => {
  const hasMetamaskFlag = hasMetamask();

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

const hasMetamask = () => {
  if (typeof window !== "undefined") {
    return false;
  }
  const { ethereum } = window;
  //@ts-ignore
  const hasMetamask = ethereum ? ethereum.isMetaMask : false;
  return hasMetamask;
};

export { goToMetaMaskDeppLinkWhenMobile };
