// import moment from "moment/moment";

class PreferenceHelper {
  private static instance: PreferenceHelper;
  private static KEY_EMAIL_SIGN_IN_CACHE = "emailSignInCache";
  private static KEY_WALLET_SIGN_IN_CACHE = "walletSignInCache";

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

  updateWalletSignIn = (walletAddress: string) => {
    this.updateCacheByKey(
      PreferenceHelper.KEY_WALLET_SIGN_IN_CACHE,
      walletAddress
    );
  };

  getWalletSignIn = () => {
    const { value, timestamp } = this.getCacheByKey(
      PreferenceHelper.KEY_WALLET_SIGN_IN_CACHE
    );
    if (!value || !timestamp) {
      return { walletAddress: undefined, timestamp: undefined };
    }
    return { walletAddress: value, timestamp };
  };

  clearWalletSignIn = () => {
    localStorage.removeItem(PreferenceHelper.KEY_WALLET_SIGN_IN_CACHE);
  };
}

export default PreferenceHelper;
