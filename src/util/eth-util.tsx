import { WALLET_NAMES } from "../type";

const homeUri = process.env["NEXT_PUBLIC_HOME_URI"];

const goToMetaMaskDeppLinkWhenMobile = (
  walletName?: string,
  isMobile?: boolean
) => {
  const { ethereum } = window;
  //@ts-ignore
  const isMetaMask = ethereum.isMetaMask;
  if (
    isMobile &&
    !isMetaMask &&
    (walletName === WALLET_NAMES.META_MASK ||
      walletName === WALLET_NAMES.COINBASE_WALLET)
  ) {
    location.href = `https://metamask.app.link/dapp/${homeUri}/`;
    return true;
  }
  return false;
};

export { goToMetaMaskDeppLinkWhenMobile };
