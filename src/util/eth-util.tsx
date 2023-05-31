import { WALLET_NAMES } from "../type";

const DEEP_LINK = process.env["NEXT_PUBLIC_DEEP_LINK"];

const goToMetaMaskDeppLinkWhenMobile = (
  walletName?: string,
  isMobile?: boolean
) => {
  const { ethereum } = window;
  //@ts-ignore
  const isMetaMask = ethereum ? ethereum.isMetaMask : false;
  if (
    isMobile &&
    !isMetaMask &&
    (walletName === WALLET_NAMES.META_MASK ||
      walletName === WALLET_NAMES.COINBASE_WALLET)
  ) {
    if (DEEP_LINK) location.href = DEEP_LINK;
    return true;
  }
  return false;
};

export { goToMetaMaskDeppLinkWhenMobile };
