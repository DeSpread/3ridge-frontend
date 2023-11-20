import { createContext, PropsWithChildren, useContext, useMemo } from "react";

import { AppError, getErrorMessage } from "../../error/my-error";
import {
  EmailLoggedInInfo,
  EmailSignUpEventParams,
  GoogleLoggedInInfo,
  PartialWalletInfo,
  SuccessErrorCallback,
  SuccessErrorCallbackWithParam,
} from "../../types";

import { useEmailLogin } from "./hook/email-login-hook";
import { useMyGoogleLogin } from "./hook/my-google-login-hook";
import { useWalletLogin } from "./hook/wallet-login-hook";

import { Kakao } from "@/__generated__/graphql";
import { useSignIn } from "@/hooks/signIn.hook";
import { useKakaoLogin } from "@/provider/login/hook/kakao-login-hook";

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
  isKakaoSignIn: boolean;
  asyncKakoSignIn: (
    addAuthFunc?: (_kakaoInfo: Kakao) => Promise<boolean>,
  ) => Promise<Kakao | undefined>;
  cachedKakaoUserInfo: Kakao | undefined;
  fetchKakaoUserInfo?: () => Promise<Kakao>;
  asyncUpdateCachedKakaoUserInfo: (kakaoUserInfo: Kakao) => void;
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
  isKakaoSignIn: false,
  asyncKakoSignIn: async () => {
    return undefined;
  },
  cachedKakaoUserInfo: undefined,
  fetchKakaoUserInfo: undefined,
  asyncUpdateCachedKakaoUserInfo: () => {},
});

export const LoginProvider = ({ children }: PropsWithChildren) => {
  const { logout: logoutAccessToken } = useSignIn();
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
  const {
    isKakaoSignIn,
    asyncKakoSignIn,
    cachedKakaoUserInfo,
    kakaoLogout,
    asyncUpdateCachedKakaoUserInfo,
    fetchKakaoUserInfo,
  } = useKakaoLogin();

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
      if (isKakaoSignIn) {
        kakaoLogout();
      }
      logoutAccessToken();
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
        isKakaoSignIn,
        asyncKakoSignIn,
        cachedKakaoUserInfo,
        fetchKakaoUserInfo,
        asyncUpdateCachedKakaoUserInfo,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
