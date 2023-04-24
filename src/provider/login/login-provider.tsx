import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { AppError, getErrorMessage } from "../../error/my-error";
import { useMyGoogleLogin } from "./hook/my-google-login-hook";
import { useWalletLogin } from "./hook/wallet-login-hook";
import {
  EmailSignUpEventParams,
  GoogleLoggedInInfo,
  EmailLoggedInInfo,
  SuccessErrorCallback,
  SuccessErrorCallbackWithParam,
  PartialWalletInfo,
} from "../../type";
import { useEmailLogin } from "./hook/email-login-hook";

const LoginContext = createContext<{
  isGoogleLoggedIn: boolean;
  isLoggedIn: boolean;
  googleLoggedInInfo: GoogleLoggedInInfo;
  logout: SuccessErrorCallback<void>;
  googleSignUp: SuccessErrorCallback<void>;
  walletSignUp: SuccessErrorCallbackWithParam<PartialWalletInfo, void>;
  isWalletLoggedIn: boolean;
  walletLoggedInInfo: PartialWalletInfo;
  emailVerify: SuccessErrorCallbackWithParam<EmailSignUpEventParams, string>;
  emailSignIn: SuccessErrorCallbackWithParam<EmailSignUpEventParams, void>;
  updateAuthMail: SuccessErrorCallbackWithParam<EmailLoggedInInfo, void>;
  emailSignInWithoutPassword: SuccessErrorCallbackWithParam<
    EmailLoggedInInfo,
    void
  >;
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
  updateAuthMail: () => {},
  emailSignInWithoutPassword: () => {},
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
    isMailLoggedIn,
    emailLoginInfo,
    updateAuthMail,
    emailSignInWithoutPassword,
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
        isMailLoggedIn,
        updateAuthMail,
        emailLoggedInInfo: emailLoginInfo,
        emailSignInWithoutPassword,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
