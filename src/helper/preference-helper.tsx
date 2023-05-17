// import moment from "moment/moment";

import { SupportedNetwork } from "../type";

class PreferenceHelper {
  private static instance: PreferenceHelper;
  private static KEY_EMAIL_SIGN_IN_CACHE = "KEY_EMAIL_SIGN_IN_CACHE";
  private static KEY_WALLET_ADDRESS_SIGN_IN_CACHE =
    "KEY_WALLET_ADDRESS_SIGN_IN_CACHE";
  private static KEY_CONNECTED_NETWORK_CACHE = "KEY_CONNECTED_NETWORK_CACHE";

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

  updateConnectedNetwork = (network: string) => {
    this.updateCacheByKey(
      PreferenceHelper.KEY_CONNECTED_NETWORK_CACHE,
      network
    );
  };

  getConnectedNetwork = () => {
    const { value, timestamp } = this.getCacheByKey(
      PreferenceHelper.KEY_CONNECTED_NETWORK_CACHE
    );
    if (!value || !timestamp) {
      return { network: undefined, timestamp: undefined };
    }
    return { network: value, timestamp };
  };

  clearConnectedNetwork = () => {
    localStorage.removeItem(PreferenceHelper.KEY_CONNECTED_NETWORK_CACHE);
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
    walletNetwork: SupportedNetwork
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
