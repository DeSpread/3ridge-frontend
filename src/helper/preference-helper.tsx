import { SupportedNetwork } from "../type";
import TypeHelper from "./type-helper";

class PreferenceHelper {
  private static KEY_EMAIL_SIGN_IN_CACHE = "KEY_EMAIL_SIGN_IN_CACHE";
  private static KEY_WALLET_ADDRESS_SIGN_IN_CACHE =
    "KEY_WALLET_ADDRESS_SIGN_IN_CACHE";
  private static KEY_CONNECTED_NETWORK_CACHE = "KEY_CONNECTED_NETWORK_CACHE";
  private static KEY_RETRY_NETWORK_CACHE = "KEY_RETRY_NETWORK_CACHE";
  private static KEY_TRY_CONNECT_WALLET_CACHE = "KEY_TRY_CONNECT_WALLET_CACHE";

  private static updateCacheByKey = (key: string, value: string) => {
    localStorage.setItem(
      key,
      JSON.stringify({
        value,
        timestamp: new Date().toISOString(),
      })
    );
  };

  private static getCacheByKey = (key: string) => {
    const cacheStr = localStorage.getItem(key);
    if (!cacheStr) return { value: undefined, timestamp: undefined };
    const cache = JSON.parse(cacheStr);
    return {
      value: cache.value,
      timestamp: new Date(cache.timestamp),
    };
  };

  public static updateEmailSignIn = (email: string) => {
    this.updateCacheByKey(PreferenceHelper.KEY_EMAIL_SIGN_IN_CACHE, email);
  };

  public static updateConnectedNetwork = (network: string) => {
    this.updateCacheByKey(
      PreferenceHelper.KEY_CONNECTED_NETWORK_CACHE,
      network
    );
  };

  public static getConnectedNetwork = () => {
    const { value, timestamp } = this.getCacheByKey(
      PreferenceHelper.KEY_CONNECTED_NETWORK_CACHE
    );
    if (!value || !timestamp) {
      return { network: undefined, timestamp: undefined };
    }
    return { network: value, timestamp };
  };

  public static clearConnectedNetwork = () => {
    localStorage.removeItem(PreferenceHelper.KEY_CONNECTED_NETWORK_CACHE);
  };

  public static getEmailSignIn = () => {
    const { value, timestamp } = this.getCacheByKey(
      PreferenceHelper.KEY_EMAIL_SIGN_IN_CACHE
    );
    if (!value || !timestamp) {
      return { email: undefined, timestamp: undefined };
    }
    return { email: value, timestamp };
  };

  public static clearEmailSignIn = () => {
    localStorage.removeItem(PreferenceHelper.KEY_EMAIL_SIGN_IN_CACHE);
  };

  public static updateWalletSignIn = (
    walletAddress: string,
    walletNetwork: SupportedNetwork
  ) => {
    this.updateCacheByKey(
      PreferenceHelper.KEY_WALLET_ADDRESS_SIGN_IN_CACHE,
      JSON.stringify({ walletAddress, walletNetwork })
    );
  };

  public static getWalletSignIn = () => {
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

  public static clearWalletSignIn = () => {
    localStorage.removeItem(PreferenceHelper.KEY_WALLET_ADDRESS_SIGN_IN_CACHE);
  };

  public static updateRetryNetwork = (walletNetwork: SupportedNetwork) => {
    this.updateCacheByKey(
      PreferenceHelper.KEY_RETRY_NETWORK_CACHE,
      walletNetwork
    );
  };

  public static getRetryNetwork = () => {
    const { value, timestamp } = this.getCacheByKey(
      PreferenceHelper.KEY_RETRY_NETWORK_CACHE
    );
    if (!value || !timestamp) {
      return { network: undefined, timestamp: undefined };
    }
    return { network: TypeHelper.convertToSuppoertedNetwork(value), timestamp };
  };

  public static clearRetryNetwork = () => {
    localStorage.removeItem(PreferenceHelper.KEY_RETRY_NETWORK_CACHE);
  };

  public static updateTryConnectWallet = (walletNetwork: SupportedNetwork) => {
    this.updateCacheByKey(
      PreferenceHelper.KEY_TRY_CONNECT_WALLET_CACHE,
      walletNetwork
    );
  };

  public static getTryConnectWallet = () => {
    const { value, timestamp } = this.getCacheByKey(
      PreferenceHelper.KEY_TRY_CONNECT_WALLET_CACHE
    );
    if (!value || !timestamp) {
      return { network: undefined, timestamp: undefined };
    }
    return { network: TypeHelper.convertToSuppoertedNetwork(value), timestamp };
  };

  public static clearTryConnectWallet = () => {
    localStorage.removeItem(PreferenceHelper.KEY_TRY_CONNECT_WALLET_CACHE);
  };
}

export default PreferenceHelper;
