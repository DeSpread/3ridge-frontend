export const APP_ERROR_MESSAGE = {
  UNKNOWN: "UNKNOWN",
  EMAIL_ALREADY_USE: "EMAIL_ALREADY_USE",
  EMAIL_PENDING_VERIFY: "EMAIL_PENDING_VERIFY",
  EMAIL_ALREADY_VERIFIED: "EMAIL_ALREADY_VERIFIED",
  GOOGLE_LOGIN_POPUP_CLOSED: "popup_closed",
  WALLET_NOT_INSTALLED: "First install APTOS wallet",
  WALLET_USER_REJECTED_REQUEST: "User rejected request",
  WALLET_ADDRESS_ALREADY_REGISTERED: "Already registered by wallet address",
  SUI_WALLET_PENDING_REQUEST: "Another permission request is pending",
  WALLET_USER_ACCOUNT_FETCH_FAIL: "Fail to get account of wallet",
  FIREBASE_USER_NOT_FOUND: "auth/user-not-found",
  FIREBASE_WRONG_PASSWORD: "auth/wrong-password",
  FIREBASE_TOO_MANY_REQUESTS: "auth/too-many-requests",
  PARAMETER_ERROR: "parameter error",
} as const;

export class AppError extends Error {
  payload: any;

  constructor(message: string, payload?: any) {
    super(message);
    this.name = "bridge";
    this.payload = payload;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const getErrorMessage = (e: any) => {
  if (e instanceof Error) {
    return e.message;
  }
  return "unknown";
};
