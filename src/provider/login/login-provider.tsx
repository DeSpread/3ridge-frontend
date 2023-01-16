import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { AppError, getErrorMessage } from "../../error/my-error";
import { useMyGoogleLogin } from "./hook/my-google-login-hook";
import { useWalletLogin } from "./hook/wallet-login-hook";
import {
  EmailSignUpParams,
  GoogleLoggedInInfo,
  EmailLoggedInInfo,
  SuccessErrorCallback,
  SuccessErrorCallbackWithParam,
  WalletLoggedInInfo,
} from "../../type";
import { useEmailLogin } from "./hook/email-login-hook";

const LoginContext = createContext<{
  isGoogleLoggedIn: boolean;
  isLoggedIn: boolean;
  googleLoggedInInfo: GoogleLoggedInInfo;
  logout: SuccessErrorCallback<void>;
  googleSignUp: SuccessErrorCallback<void>;
  walletSignUp: SuccessErrorCallback<void>;
  isWalletLoggedIn: boolean;
  walletLoggedInInfo: WalletLoggedInInfo;
  emailVerify: SuccessErrorCallbackWithParam<EmailSignUpParams, void>;
  emailSignIn: SuccessErrorCallbackWithParam<EmailSignUpParams, void>;
  resendEmailVerify: SuccessErrorCallbackWithParam<EmailSignUpParams, void>;
  isMailLoggedIn: boolean;
  emailLoggedInInfo: EmailLoggedInInfo;
}>({
  isGoogleLoggedIn: false,
  isLoggedIn: false,
  googleLoggedInInfo: {},
  logout: () => {},
  googleSignUp: () => {},
  walletSignUp: () => {},
  isWalletLoggedIn: false,
  walletLoggedInInfo: {},
  emailVerify: () => {},
  emailSignIn: () => {},
  resendEmailVerify: () => {},
  isMailLoggedIn: false,
  emailLoggedInInfo: {},
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

  const logout: SuccessErrorCallback<void> = ({ onSuccess, onError }) => {
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
      onError?.(new AppError(getErrorMessage(e)));
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
        googleLoggedInInfo: googleUserInfo,
        walletSignUp,
        walletLoggedInInfo: walletInfo,
        isWalletLoggedIn,
        emailVerify,
        emailSignIn,
        resendEmailVerify,
        isMailLoggedIn,
        emailLoggedInInfo: emailLoginInfo,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
