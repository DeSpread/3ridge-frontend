import { AppError } from "../error/my-error";
import React from "react";

export type SuccessErrorCallback = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: AppError) => void;
}) => void;

export type SuccessErrorCallbackWithParam<T> = (
  t: T,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
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
