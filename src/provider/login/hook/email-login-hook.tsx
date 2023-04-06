import {
  EmailSignUpEventParams,
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
import AwsClient from "../../../remote/aws-client";

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

  const emailVerify: SuccessErrorCallbackWithParam<
    EmailSignUpEventParams,
    void
  > = (params, { onSuccess, onError }) => {
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

  const emailSignIn: SuccessErrorCallbackWithParam<
    EmailSignUpEventParams,
    void
  > = (params, { onSuccess, onError }) => {
    (async () => {
      const { email, password } = params;
      try {
        const res = await AwsClient.getInstance().asyncLoginWithMail(
          email,
          password
        );
        if (res.status === 400) {
          const data = await res.text();
          const message = JSON.parse(data).message;
          onError?.(new AppError(message));
          return;
        }
        // const res = await asyncSignInEmailWithVerify(email, password);
        // if (res === MAIL_VERIFY.VERIFIED) {
        //   const { data } = await client.query({
        //     query: GET_USER_BY_EMAIL,
        //     variables: {
        //       email,
        //     },
        //   });
        setEmailLoginInfo((prevState) => {
          return { ...prevState, mail: email };
        });
        preference.updateEmailSignIn(email);
        onSuccess?.();
        return;
      } catch (e) {
        onError?.(new AppError(getErrorMessage(e)));
      }
    })();
  };

  const resendEmailVerify: SuccessErrorCallbackWithParam<
    EmailSignUpEventParams,
    void
  > = (params, { onSuccess, onError }) => {
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

  const emailLogout: SuccessErrorCallback<void> = ({ onSuccess, onError }) => {
    try {
      setEmailLoginInfo((prevState) => {
        return { ...prevState, mail: undefined };
      });
      preference.clearEmailSignIn();
      onSuccess?.();
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
