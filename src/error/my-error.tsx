export const APP_ERROR_NAME = {
  GOOGLE_LOGIN: "GOOGLE_LOGIN",
  GOOGLE_SIGN_UP: "GOOGLE_SIGN_UP",
  GOOGLE_LOGIN_AUTH: "GOOGLE_LOGIN_AUTH",
  LOGOUT: "LOGOUT",
  WALLET_SIGN_UP: "WALLET_SIGN_UP",
} as const;

type ObjectValues<T> = T[keyof T];

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
