import { MAIL_VERIFY, SuccessErrorCallbackWithParam } from "../../../type";
import {
  APP_ERROR_NAME,
  AppError,
  getErrorMessage,
} from "../../../error/my-error";
import { useFirebaseAuth } from "../../../firebase/hook/firebase-hook";
import { gql } from "../../../__generated__";
import { useMutation } from "@apollo/client";
import { client } from "../../../apollo/client";
import { useMemo, useState } from "react";
import { GoogleUserInfo } from "./my-google-login-hook";

export type EmailSignUpParams = {
  email: string;
  password: string;
};

const CREATE_USER_BY_EMAIL = gql(/* GraphQL */ `
  mutation CreateUserByEmail($email: String!) {
    createUserByEmail(email: $email) {
      name
    }
  }
`);

const GET_USER_BY_EMAIL = gql(/* GraphQL */ `
  query GetUserByEmail($email: String!) {
    userByEmail(email: $email) {
      name
    }
  }
`);

export type MailLoginInfo = {
  mail?: string;
};

export function useEmailLogin() {
  const {
    asyncVerifyUserWithEmailAndPassword,
    asyncSignInEmailWithVerify,
    asyncResendEmailVerify,
  } = useFirebaseAuth();
  const [mailLoginInfo, setMailLoginInfo] = useState<MailLoginInfo>({});

  const [createUserByEmail] = useMutation(CREATE_USER_BY_EMAIL);

  const emailVerify: SuccessErrorCallbackWithParam<EmailSignUpParams> = (
    params,
    { onSuccess, onError }
  ) => {
    (async () => {
      const { email, password } = params;
      try {
        const res = await asyncVerifyUserWithEmailAndPassword(email, password);
        if (res === MAIL_VERIFY.SEND_VERIFICATION) {
          onSuccess?.();
          return;
        }
        onError?.(
          new AppError(res, APP_ERROR_NAME.EMAIL_SIGN_UP, { email, password })
        );
      } catch (e) {
        onError?.(
          new AppError(getErrorMessage(e), APP_ERROR_NAME.EMAIL_SIGN_UP, {
            email,
            password,
          })
        );
      }
    })();
  };

  const emailSignIn: SuccessErrorCallbackWithParam<EmailSignUpParams> = (
    params,
    { onSuccess, onError }
  ) => {
    (async () => {
      const { email, password } = params;
      try {
        const res = await asyncSignInEmailWithVerify(email, password);
        if (res === MAIL_VERIFY.VERIFIED) {
          const { data } = await client.query({
            query: GET_USER_BY_EMAIL,
            variables: {
              email,
            },
          });
          setMailLoginInfo((prevState) => {
            return { ...prevState, email };
          });
          onSuccess?.();
          return;
        }
        onError?.(new AppError(res, APP_ERROR_NAME.EMAIL_SIGN_IN));
      } catch (e) {
        if (getErrorMessage(e) === "Does not exist user") {
          createUserByEmail({
            variables: {
              email,
            },
          })
            .then((res) => {
              setMailLoginInfo((prevState) => {
                return { ...prevState, email };
              });
              onSuccess?.();
            })
            .catch((e) => {
              new AppError(getErrorMessage(e), APP_ERROR_NAME.EMAIL_SIGN_IN);
            });
          return;
        }
        onError?.(
          new AppError(getErrorMessage(e), APP_ERROR_NAME.EMAIL_SIGN_IN)
        );
      }
    })();
  };

  const resendEmailVerify: SuccessErrorCallbackWithParam<EmailSignUpParams> = (
    params,
    { onSuccess, onError }
  ) => {
    (async () => {
      try {
        const { email, password } = params;
        await asyncResendEmailVerify(email, password);
        onSuccess?.();
      } catch (e) {
        onError?.(
          new AppError(getErrorMessage(e), APP_ERROR_NAME.EMAIL_SIGN_IN)
        );
      }
    })();
  };

  const isMailLoggedIn = useMemo(() => {
    return mailLoginInfo?.mail !== undefined ? true : false;
  }, [mailLoginInfo]);

  return { emailVerify, emailSignIn, resendEmailVerify, isMailLoggedIn };
}
