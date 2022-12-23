import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { APP_ERROR_NAME, AppError } from "../../error/my-error";
import { GoogleUserInfo, useMyGoogleLogin } from "./my-google-login-hook";
import { useWalletLogin } from "./wallet-login-hook";
import { SuccessErrorCallback } from "../../type";

const LoginContext = createContext<{
  isGoogleLoggedIn: boolean;
  isLoggedIn: boolean;
  googleUserInfo: GoogleUserInfo;
  logout: SuccessErrorCallback;
  googleSignUp: SuccessErrorCallback;
  walletSignUp: SuccessErrorCallback;
  isWalletConnected: boolean;
}>({
  isGoogleLoggedIn: false,
  isLoggedIn: false,
  googleUserInfo: {},
  logout: ({ onSuccess, onError }) => {},
  googleSignUp: ({ onSuccess, onError }) => {},
  walletSignUp: ({ onSuccess, onError }) => {},
  isWalletConnected: false,
});

export const LoginProvider = ({ children }: PropsWithChildren) => {
  const { isGoogleLoggedIn, googleUserInfo, googleSignUp, googleLogout } =
    useMyGoogleLogin();
  const { walletSignUp, isWalletConnected, walletLogout } = useWalletLogin();

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
    return isGoogleLoggedIn || isWalletConnected;
  }, [isGoogleLoggedIn, isWalletConnected]);

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
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
