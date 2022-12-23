import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { APP_ERROR_NAME, AppError } from "../../error/my-error";
import { GoogleUserInfo, useMyGoogleLogin } from "./my-google-login-hook";
import { useWalletLogin } from "./wallet-login-hook";

const LoginContext = createContext<{
  isGoogleLoggedIn: boolean;
  isLoggedIn: boolean;
  googleUserInfo: GoogleUserInfo;
  logout: ({
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
    onError?: (error: AppError) => void;
  }) => void;
  googleSignUp: ({
    onSuccess,
    onError,
  }: {
    onSuccess?: (() => void) | undefined;
    onError?: ((error: AppError) => void) | undefined;
  }) => void;
  walletSignUp: ({
    onSuccess,
    onError,
  }: {
    onSuccess?: (() => void) | undefined;
    onError?: ((error: AppError) => void) | undefined;
  }) => void;
  isWalletConnected: boolean;
}>({
  isGoogleLoggedIn: false,
  isLoggedIn: false,
  googleUserInfo: {},
  logout: ({
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
    onError?: (error: AppError) => void;
  }) => {},
  googleSignUp: ({
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
    onError?: (error: AppError) => void;
  }) => {},
  walletSignUp: ({
    onSuccess,
    onError,
  }: {
    onSuccess?: (() => void) | undefined;
    onError?: ((error: AppError) => void) | undefined;
  }) => {},
  isWalletConnected: false,
});

export const LoginProvider = ({ children }: PropsWithChildren) => {
  const { isGoogleLoggedIn, googleUserInfo, googleSignUp, googleLogout } =
    useMyGoogleLogin();
  const { walletSignUp, isWalletConnected } = useWalletLogin();

  const logout = ({
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
    onError?: (error: AppError) => void;
  }) => {
    try {
      if (isGoogleLoggedIn) {
        googleLogout();
      }
      // asyncWalletLogout();
      onSuccess?.();
    } catch (e) {
      if (e instanceof Error) {
        onError?.(new AppError(e.toString(), APP_ERROR_NAME.LOGOUT));
      } else {
        onError?.(new AppError("unknown", APP_ERROR_NAME.LOGOUT));
      }
    }
  };

  const isLoggedIn = useMemo(() => {
    return isGoogleLoggedIn && isWalletConnected;
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
