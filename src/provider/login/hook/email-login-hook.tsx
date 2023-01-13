import {
  EmailSignUpParams,
  MAIL_VERIFY,
  EmailLoggedInInfo,
  SuccessErrorCallback,
  SuccessErrorCallbackWithParam,
} from "../../../type";
import { AppError, getErrorMessage } from "../../../error/my-error";
import { useFirebaseAuth } from "../../../firebase/hook/firebase-hook";
import { useMutation } from "@apollo/client";
import { client } from "../../../apollo/client";
import { useEffect, useMemo, useState } from "react";
import { CREATE_USER_BY_EMAIL, GET_USER_BY_EMAIL } from "../../../apollo/query";
import PreferenceHelper from "../../../helper/preference-helper";
import addHours from "date-fns/addHours";

export function useEmailLogin() {
  const preference = PreferenceHelper.getInstance();
  const {
    asyncVerifyUserWithEmailAndPassword,
    asyncSignInEmailWithVerify,
    asyncResendEmailVerify,
  } = useFirebaseAuth();
  const [emailLoginInfo, setEmailLoginInfo] = useState<EmailLoggedInInfo>({});

  const [createUserByEmail] = useMutation(CREATE_USER_BY_EMAIL);

  useEffect(() => {
    if (!isMailLoggedIn) {
      const { email, timestamp } = preference.getEmailSignIn();
      if (!email || !timestamp) {
        return;
      }
      const curDate = new Date();
      const limitDate = addHours(timestamp, 4);
      if (curDate > limitDate) {
        emailLogout({});
        return;
      }
      setEmailLoginInfo((prevState) => {
        return { ...prevState, mail: email };
      });
      preference.updateEmailSignIn(email);
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
        onError?.(new AppError(res, { email, password }));
      } catch (e) {
        onError?.(
          new AppError(getErrorMessage(e), {
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
          preference.updateEmailSignIn(email);
          onSuccess?.();
          return;
        }
        onError?.(new AppError(res));
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
              throw new AppError(getErrorMessage(e));
            });
          return;
        }
        onError?.(new AppError(getErrorMessage(e)));
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
        onError?.(new AppError(getErrorMessage(e)));
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
      preference.clearEmailSignIn();
    } catch (e) {
      onError?.(new AppError(getErrorMessage(e)));
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
