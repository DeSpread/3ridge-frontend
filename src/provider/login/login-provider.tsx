import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { APP_ERROR_NAME, AppError } from "../../error/my-error";
import { useMyGoogleLogin } from "./hook/my-google-login-hook";
import { useWalletLogin } from "./hook/wallet-login-hook";
import {
  EmailSignUpParams,
  GoogleUserInfo,
  MailLoginInfo,
  SuccessErrorCallback,
  SuccessErrorCallbackWithParam,
  WalletInfo,
} from "../../type";
import { useEmailLogin } from "./hook/email-login-hook";

const LoginContext = createContext<{
  isGoogleLoggedIn: boolean;
  isLoggedIn: boolean;
  googleUserInfo: GoogleUserInfo;
  logout: SuccessErrorCallback;
  googleSignUp: SuccessErrorCallback;
  walletSignUp: SuccessErrorCallback;
  isWalletLoggedIn: boolean;
  walletInfo: WalletInfo;
  emailVerify: SuccessErrorCallbackWithParam<EmailSignUpParams>;
  emailSignIn: SuccessErrorCallbackWithParam<EmailSignUpParams>;
  resendEmailVerify: SuccessErrorCallbackWithParam<EmailSignUpParams>;
  isMailLoggedIn: boolean;
  emailLoginInfo: MailLoginInfo;
}>({
  isGoogleLoggedIn: false,
  isLoggedIn: false,
  googleUserInfo: {},
  logout: () => {},
  googleSignUp: () => {},
  walletSignUp: () => {},
  isWalletLoggedIn: false,
  walletInfo: {},
  emailVerify: () => {},
  emailSignIn: () => {},
  resendEmailVerify: () => {},
  isMailLoggedIn: false,
  emailLoginInfo: {},
});

export const LoginProvider = ({ children }: PropsWithChildren) => {
  const { isGoogleLoggedIn, googleUserInfo, googleSignUp, googleLogout } =
    useMyGoogleLogin();
  const { walletSignUp, isWalletLoggedIn, walletLogout, walletInfo } =
    useWalletLogin();
  const {
    emailVerify,
    emailSignIn,
    emailLogout,
    resendEmailVerify,
    isMailLoggedIn,
    emailLoginInfo,
  } = useEmailLogin();

  const logout: SuccessErrorCallback = ({ onSuccess, onError }) => {
    try {
      if (isGoogleLoggedIn) {
        googleLogout({ onSuccess, onError });
      }
      if (isWalletLoggedIn) {
        walletLogout({ onSuccess, onError });
      }
      if (isMailLoggedIn) {
        emailLogout({ onSuccess, onError });
      }
    } catch (e) {
      if (e instanceof Error) {
        onError?.(new AppError(e.toString(), APP_ERROR_NAME.LOGOUT));
      } else {
        onError?.(new AppError("unknown", APP_ERROR_NAME.LOGOUT));
      }
    }
  };

  const isLoggedIn = useMemo(() => {
    return isGoogleLoggedIn || isWalletLoggedIn || isMailLoggedIn;
  }, [isGoogleLoggedIn, isWalletLoggedIn, isMailLoggedIn]);

  return (
    <LoginContext.Provider
      value={{
        isGoogleLoggedIn,
        isLoggedIn,
        googleSignUp,
        logout,
        googleUserInfo,
        walletSignUp,
        walletInfo,
        isWalletLoggedIn,
        emailVerify,
        emailSignIn,
        resendEmailVerify,
        isMailLoggedIn,
        emailLoginInfo,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
