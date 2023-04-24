// import moment from "moment/moment";

import { SupportedNetworks } from "../type";

class PreferenceHelper {
  private static instance: PreferenceHelper;
  private static KEY_EMAIL_SIGN_IN_CACHE = "KEY_EMAIL_SIGN_IN_CACHE";
  private static KEY_WALLET_ADDRESS_SIGN_IN_CACHE =
    "KEY_WALLET_ADDRESS_SIGN_IN_CACHE";

  private constructor() {}

  public static getInstance() {
    return this.instance || (this.instance = new this());
  }

  private updateCacheByKey = (key: string, value: string) => {
    localStorage.setItem(
      key,
      JSON.stringify({
        value,
        timestamp: new Date().toISOString(),
      })
    );
  };

  private getCacheByKey = (key: string) => {
    const cacheStr = localStorage.getItem(key);
    if (!cacheStr) return { value: undefined, timestamp: undefined };
    const cache = JSON.parse(cacheStr);
    return {
      value: cache.value,
      timestamp: new Date(cache.timestamp),
    };
  };

  updateEmailSignIn = (email: string) => {
    this.updateCacheByKey(PreferenceHelper.KEY_EMAIL_SIGN_IN_CACHE, email);
  };

  getEmailSignIn = () => {
    const { value, timestamp } = this.getCacheByKey(
      PreferenceHelper.KEY_EMAIL_SIGN_IN_CACHE
    );
    if (!value || !timestamp) {
      return { email: undefined, timestamp: undefined };
    }
    return { email: value, timestamp };
  };

  clearEmailSignIn = () => {
    localStorage.removeItem(PreferenceHelper.KEY_EMAIL_SIGN_IN_CACHE);
  };

  updateWalletSignIn = (
    walletAddress: string,
    walletNetwork: SupportedNetworks
  ) => {
    this.updateCacheByKey(
      PreferenceHelper.KEY_WALLET_ADDRESS_SIGN_IN_CACHE,
      JSON.stringify({ walletAddress, walletNetwork })
    );
  };

  getWalletSignIn = () => {
    const { value, timestamp } = this.getCacheByKey(
      PreferenceHelper.KEY_WALLET_ADDRESS_SIGN_IN_CACHE
    );
    if (!value || !timestamp) {
      return {
        walletAddress: undefined,
        walletNetwork: undefined,
        timestamp: undefined,
      };
    }
    const { walletAddress, walletNetwork } = JSON.parse(value);
    return { walletAddress, walletNetwork, timestamp };
  };

  clearWalletSignIn = () => {
    localStorage.removeItem(PreferenceHelper.KEY_WALLET_ADDRESS_SIGN_IN_CACHE);
  };
}

export default PreferenceHelper;
