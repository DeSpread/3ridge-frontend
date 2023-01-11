import {
  EmailSignUpParams,
  MAIL_VERIFY,
  MailLoginInfo,
  SuccessErrorCallback,
  SuccessErrorCallbackWithParam,
} from "../../../type";
import {
  APP_ERROR_NAME,
  AppError,
  getErrorMessage,
} from "../../../error/my-error";
import { useFirebaseAuth } from "../../../firebase/hook/firebase-hook";
import { useMutation } from "@apollo/client";
import { client } from "../../../apollo/client";
import { useEffect, useMemo, useState } from "react";
import { CREATE_USER_BY_EMAIL, GET_USER_BY_EMAIL } from "../../../apollo/query";
import moment from "moment";

export function useEmailLogin() {
  const {
    asyncVerifyUserWithEmailAndPassword,
    asyncSignInEmailWithVerify,
    asyncResendEmailVerify,
  } = useFirebaseAuth();
  const [emailLoginInfo, setEmailLoginInfo] = useState<MailLoginInfo>({});

  const [createUserByEmail] = useMutation(CREATE_USER_BY_EMAIL);

  useEffect(() => {
    if (!isMailLoggedIn) {
      const cacheStr = localStorage.getItem("emailSignInCache");
      if (!cacheStr) return;
      const cache = JSON.parse(cacheStr);
      const curDate = new Date();
      const limitDate = moment(cache.timestamp).add(4, "hours").toDate();
      console.log(curDate, limitDate);
      if (curDate > limitDate) {
        emailLogout({});
        return;
      }
      setEmailLoginInfo((prevState) => {
        return { ...prevState, mail: cache.email };
      });
    }
  }, []);

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
          setEmailLoginInfo((prevState) => {
            return { ...prevState, mail: email };
          });
          localStorage.setItem(
            "emailSignInCache",
            JSON.stringify({
              email,
              timestamp: new Date().toISOString(),
            })
          );
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
              setEmailLoginInfo((prevState) => {
                return { ...prevState, mail: email };
              });
              localStorage.setItem(
                "emailSignInCache",
                JSON.stringify({
                  email,
                  timestamp: new Date().toISOString(),
                })
              );
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
    return emailLoginInfo?.mail !== undefined ? true : false;
  }, [emailLoginInfo]);

  const emailLogout: SuccessErrorCallback = ({ onSuccess, onError }) => {
    try {
      setEmailLoginInfo((prevState) => {
        return { ...prevState, mail: undefined };
      });
      localStorage.removeItem("emailSignInCache");
    } catch (e) {
      onError?.(new AppError(getErrorMessage(e), APP_ERROR_NAME.EMAIL_LOGOUT));
    }
  };

  return {
    emailVerify,
    emailSignIn,
    resendEmailVerify,
    isMailLoggedIn,
    emailLoginInfo,
    emailLogout,
  };
}
