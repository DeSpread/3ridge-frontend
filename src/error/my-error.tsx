import React from "react";

export const APP_ERROR_MESSAGE = {
  UNKNOWN: "UNKNOWN",
  EMAIL_ALREADY_USE: "email is already used",
  EMAIL_PENDING_VERIFY: "email is pending in verifying",
  EMAIL_ALREADY_VERIFIED: "email is already verified",
  GOOGLE_LOGIN_POPUP_CLOSED: "popup_closed",
  WALLET_NOT_INSTALLED: "wallet is not installed",
  WALLET_USER_REJECTED_REQUEST: "user rejected request",
  WALLET_ADDRESS_ALREADY_REGISTERED: "Already registered by wallet address",
  SUI_WALLET_PENDING_REQUEST: "another permission request is pending",
  SUI_WALLET_PERMISSION_REJECTED: "permission rejected",
  WALLET_USER_ACCOUNT_FETCH_FAIL: "fail to get account of wallet",
  FIREBASE_USER_NOT_FOUND: "auth/user-not-found",
  FIREBASE_WRONG_PASSWORD: "auth/wrong-password",
  FIREBASE_TOO_MANY_REQUESTS: "auth/too-many-requests",
  PARAMETER_ERROR: "parameter error",
  EMAIL_NOT_AUTHORIZED: "not yet authorized",
  EMAIL_PASSWORD_NOT_CORRECT: "password is not correct",
  EMAIL_AUTH_CODE_TIMEOUT: "auth code is timeout",
  ALREADY_PARTICIPATED_USER: "user already participated ticket",
  DOES_NOT_TWITTER_FOLLOW: "user does not follow twitter",
  DOES_NOT_TWITTER_RETWEET: "user does not retweet twitter",
  DOES_NOT_TWITTER_LIKING: "user does not like twitter",
  TICKET_ID_NOT_EXIST: "ticket id not exist",
  DOES_NOT_HAVA_APTOS_WALLET: "user does not have aptos wallet",
  DOES_NOT_HAVE_APTOS_NFT: "user does not have aptos nft",
  FAIL_TO_FETCH_KAKAO_INFO: "fail to fetch kakao info",
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

export const getLocaleErrorMessage = (e: any) => {
  const message = getErrorMessage(e);
  if (message === APP_ERROR_MESSAGE.WALLET_ADDRESS_ALREADY_REGISTERED) {
    return "이미 등록된 주소 입니다. 다른 월렛 주소로 연결해 주세요.";
  } else if (message === APP_ERROR_MESSAGE.EMAIL_NOT_AUTHORIZED) {
    return "아직 인증되지 않았습니다. 인증 링크를 확인해주세요.";
  } else if (message === APP_ERROR_MESSAGE.EMAIL_PASSWORD_NOT_CORRECT) {
    return "패스워드가 맞지 않습니다. 패스워드를 확인해주세요.";
  } else if (message === APP_ERROR_MESSAGE.EMAIL_AUTH_CODE_TIMEOUT) {
    return "코드가 만료되었습니다.";
  } else if (message === APP_ERROR_MESSAGE.DOES_NOT_TWITTER_FOLLOW) {
    return "트위터 팔로우를 하지 않았어요.\r\n 팔로우 하였는지 확인 부탁드립니다. 🙂";
  } else if (message === APP_ERROR_MESSAGE.DOES_NOT_TWITTER_RETWEET) {
    return "리트윗 여부를 확인해주세요🙂";
  } else if (message === APP_ERROR_MESSAGE.DOES_NOT_TWITTER_LIKING) {
    return "트위터 좋아요를 하지 않았어요.\r\n 좋아요 하였는지 확인 부탁드립니다. 🙂";
  } else if (message === APP_ERROR_MESSAGE.DOES_NOT_HAVE_APTOS_NFT) {
    return "NFT가 없습니다. 😢";
  }
  return message;
};
