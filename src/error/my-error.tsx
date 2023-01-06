import { ObjectValues } from "../type";

export const APP_ERROR_NAME = {
  GOOGLE_LOGIN: "GOOGLE_LOGIN",
  GOOGLE_SIGN_UP: "GOOGLE_SIGN_UP",
  GOOGLE_LOGOUT: "GOOGLE_LOGOUT",
  GOOGLE_LOGIN_AUTH: "GOOGLE_LOGIN_AUTH",
  LOGOUT: "LOGOUT",
  WALLET_SIGN_UP: "WALLET_SIGN_UP",
  WALLET_LOGOUT: "WALLET_LOGOUT",
  EMAIL_SIGN_UP: "EMAIL_SIGN_UP",
  EMAIL_SIGN_IN: "EMAIL_SIGN_IN",
  FIREBASE_AUTH: "FIREBASE_AUTH",
  UNKNOWN: "UNKNOWN",
} as const;

export const APP_ERROR_MESSAGE = {
  UNKNOWN: "UNKNOWN",
  EMAIL_ALREADY_USE: "EMAIL_ALREADY_USE",
  EMAIL_PENDING_VERIFY: "EMAIL_PENDING_VERIFY",
  EMAIL_ALREADY_VERIFIED: "EMAIL_ALREADY_VERIFIED",
} as const;

type AppErrorName = ObjectValues<typeof APP_ERROR_NAME>;

export class AppError extends Error {
  constructor(message: string, name?: AppErrorName) {
    super(message);
    this.name = name ?? "";
    Error.captureStackTrace(this, this.constructor);
  }
}

export const getErrorMessage = (e: any) => {
  if (e instanceof Error) {
    return e.message;
  }
  return "unknown";
};
