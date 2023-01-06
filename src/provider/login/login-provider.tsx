import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { APP_ERROR_NAME, AppError } from "../../error/my-error";
import { GoogleUserInfo, useMyGoogleLogin } from "./hook/my-google-login-hook";
import { useWalletLogin } from "./hook/wallet-login-hook";
import {
  SuccessErrorCallback,
  SuccessErrorCallbackWithParam,
} from "../../type";
import { EmailSignUpParams, useEmailLogin } from "./hook/email-login-hook";

const LoginContext = createContext<{
  isGoogleLoggedIn: boolean;
  isLoggedIn: boolean;
  googleUserInfo: GoogleUserInfo;
  logout: SuccessErrorCallback;
  googleSignUp: SuccessErrorCallback;
  walletSignUp: SuccessErrorCallback;
  isWalletConnected: boolean;
  emailVerify: SuccessErrorCallbackWithParam<EmailSignUpParams>;
  emailSignIn: SuccessErrorCallbackWithParam<EmailSignUpParams>;
  resendEmailVerify: SuccessErrorCallbackWithParam<EmailSignUpParams>;
  isMailLoggedIn: boolean;
}>({
  isGoogleLoggedIn: false,
  isLoggedIn: false,
  googleUserInfo: {},
  logout: () => {},
  googleSignUp: () => {},
  walletSignUp: () => {},
  isWalletConnected: false,
  emailVerify: () => {},
  emailSignIn: () => {},
  resendEmailVerify: () => {},
  isMailLoggedIn: false,
});

export const LoginProvider = ({ children }: PropsWithChildren) => {
  const { isGoogleLoggedIn, googleUserInfo, googleSignUp, googleLogout } =
    useMyGoogleLogin();
  const { walletSignUp, isWalletConnected, walletLogout } = useWalletLogin();
  const { emailVerify, emailSignIn, resendEmailVerify, isMailLoggedIn } =
    useEmailLogin();

  const logout: SuccessErrorCallback = ({ onSuccess, onError }) => {
    try {
      if (isGoogleLoggedIn) {
        googleLogout({ onSuccess, onError });
      }
      if (isWalletConnected) {
        walletLogout({ onSuccess, onError });
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
    return isGoogleLoggedIn || isWalletConnected || isMailLoggedIn;
  }, [isGoogleLoggedIn, isWalletConnected, isMailLoggedIn]);

  return (
    <LoginContext.Provider
      value={{
        isGoogleLoggedIn,
        isLoggedIn,
        googleSignUp,
        logout,
        googleUserInfo,
        walletSignUp,
        isWalletConnected,
        emailVerify,
        emailSignIn,
        resendEmailVerify,
        isMailLoggedIn,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
