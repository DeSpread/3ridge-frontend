import { AppError } from "../error/my-error";
import React from "react";
import { SvgIconProps } from "@mui/material";

export type SuccessErrorCallback<T> = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (msg?: T) => void;
  onError?: (error: AppError) => void;
}) => void;

export type SuccessErrorCallbackWithParam<T, K> = (
  t: T,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (msg?: K) => void;
    onError?: (error: AppError) => void;
  }
) => void;

export interface MouseEventWithParam<T> extends React.MouseEvent<HTMLElement> {
  params: T;
}

export const MAIL_VERIFY = {
  USER_NOT_FOUND: "USER_NOT_FOUND",
  NOT_VERIFIED: "NOT_VERIFIED",
  VERIFIED: "VERIFIED",
  SEND_VERIFICATION: "SEND_VERIFICATION",
  PASSWORD_WRONG: "PASSWORD_WRONG",
} as const;

export type MailVerified = ObjectValues<typeof MAIL_VERIFY>;

export type ObjectValues<T> = T[keyof T];

export const Z_INDEX_OFFSET = {
  NAV_LAYOUT: 1,
  DIALOG: 2,
  LOADING_BACKDROP: 3,
};

export type SignedUser = {
  _id?: string;
  walletAddress?: string;
  name?: string;
  email?: string;
  profileImageUrl?: string;
};

export type GoogleLoggedInInfo = {
  gmail?: string;
};

export type EmailLoggedInInfo = {
  mail?: string;
};

export type EmailSignUpParams = {
  email: string;
  password: string;
};

export type WalletLoggedInInfo = {
  address?: string;
};

export type ReversibleSvgIconProps = SvgIconProps & {
  reverse?: boolean;
};

export type MouseEventWithStateParam = MouseEventWithParam<{ state?: string }>;
