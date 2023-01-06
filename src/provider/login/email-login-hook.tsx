import {
  MAIL_VERIFY,
  ObjectValues,
  SuccessErrorCallbackWithParam,
} from "../../type";
import {
  APP_ERROR_MESSAGE,
  APP_ERROR_NAME,
  AppError,
  getErrorMessage,
} from "../../error/my-error";
import { useFirebaseAuth } from "../../firebase/firebase-hook";

export type EmailSignUpParams = {
  email: string;
  password: string;
};

export function useEmailLogin() {
  const {
    asyncVerifyUserWithEmailAndPassword,
    asyncSignInEmailWithVerify,
    asyncResendEmailVerify,
  } = useFirebaseAuth();

  const emailVerify: SuccessErrorCallbackWithParam<EmailSignUpParams> = (
    params,
    { onSuccess, onError }
  ) => {
    (async () => {
      try {
        const { email, password } = params;
        const res = await asyncVerifyUserWithEmailAndPassword(email, password);
        if (res === MAIL_VERIFY.SEND_VERIFICATION) {
          onSuccess?.();
          return;
        }
        onError?.(new AppError(res, APP_ERROR_NAME.EMAIL_SIGN_UP));
      } catch (e) {
        onError?.(
          new AppError(getErrorMessage(e), APP_ERROR_NAME.EMAIL_SIGN_UP)
        );
      }
    })();
  };

  const emailSignIn: SuccessErrorCallbackWithParam<EmailSignUpParams> = (
    params,
    { onSuccess, onError }
  ) => {
    (async () => {
      try {
        const { email, password } = params;
        const res = await asyncSignInEmailWithVerify(email, password);
        if (res === MAIL_VERIFY.VERIFIED) {
          onSuccess?.();
          return;
        }
        onError?.(new AppError(res, APP_ERROR_NAME.EMAIL_SIGN_IN));
      } catch (e) {
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

  return { emailVerify, emailSignIn, resendEmailVerify };
}
