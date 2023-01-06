import { MAIL_VERIFY, SuccessErrorCallbackWithParam } from "../../../type";
import {
  APP_ERROR_NAME,
  AppError,
  getErrorMessage,
} from "../../../error/my-error";
import { useFirebaseAuth } from "../../../firebase/hook/firebase-hook";

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
