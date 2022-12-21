import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import GoogleLoginHelper from "../../helper/google-login-helper";
import { useGoogleLogin } from "@react-oauth/google";
import {
  APP_ERROR_NAME,
  AppError,
  getErrorMessage,
} from "../../error/my-error";
import { gql } from "../../__generated__";
import { useMutation, useQuery } from "@apollo/client";

type UserInfo = {
  gmail?: string;
};

const LoginContext = createContext<{
  isGoogleLoggedIn: boolean;
  isLoggedIn: boolean;
  userInfo: UserInfo;
  googleLogin: ({
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
    onError?: (error: AppError) => void;
  }) => void;
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
}>({
  isGoogleLoggedIn: false,
  isLoggedIn: false,
  userInfo: {},
  googleLogin: ({
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
    onError?: (error: AppError) => void;
  }) => {},
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
});

const CREATE_USER_BY_GMAIL = gql(/* GraphQL */ `
  mutation CreateUserByGmail($gmail: String!) {
    createUserByGmail(gmail: $gmail) {
      name
    }
  }
`);

export const LoginProvider = ({ children }: PropsWithChildren) => {
  const [isGoogleLoggedIn, setIsGoogleLoggedIn] = useState(false);

  const onGoogleLoginOnSuccessCallback =
    useRef<({ email, picture }: { email: string; picture: string }) => void>();
  const onGoogleLoginOnErrorCallback = useRef<(error: AppError) => void>();
  const [createUserByGmail] = useMutation(CREATE_USER_BY_GMAIL);

  const [userInfo, setUserInfo] = useState<UserInfo>({});

  useEffect(() => {
    (async () => {
      const _isGoogleLoggedIn =
        await GoogleLoginHelper.getInstance().asyncIsLoggedInGoogle();
      setIsGoogleLoggedIn(_isGoogleLoggedIn);
      if (_isGoogleLoggedIn && !userInfo.gmail) {
        await asyncUpdateUserInfo();
      }
    })();
  });

  const isLoggedIn = useMemo(() => {
    return isGoogleLoggedIn;
  }, [isGoogleLoggedIn]);

  const logout = ({
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
    onError?: (error: AppError) => void;
  }) => {
    try {
      if (isGoogleLoggedIn) {
        GoogleLoginHelper.getInstance().googleLogout();
      }
      onSuccess?.();
    } catch (e) {
      if (e instanceof Error) {
        onError?.(new AppError(e.toString(), APP_ERROR_NAME.LOGOUT_ERROR));
      } else {
        onError?.(new AppError("unknown", APP_ERROR_NAME.LOGOUT_ERROR));
      }
    }
  };

  const asyncUpdateUserInfo = async () => {
    const _userInfo =
      await GoogleLoginHelper.getInstance().asyncFetchUserInfo();
    if (!_userInfo) {
      return { email: null, picture: null };
    }
    const { email, picture } = _userInfo;
    setUserInfo((prevState) => {
      return { ...prevState, gmail: email };
    });
    return { email, picture };
  };

  const _googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      (async () => {
        try {
          GoogleLoginHelper.getInstance().storeTokenResponse(tokenResponse);
          const { email, picture } = await asyncUpdateUserInfo();
          onGoogleLoginOnSuccessCallback.current?.({ email, picture });
          onGoogleLoginOnSuccessCallback.current = undefined;
        } catch (e) {
          onGoogleLoginOnErrorCallback.current?.(
            new AppError(getErrorMessage(e), APP_ERROR_NAME.GOOGLE_LOGIN)
          );
          onGoogleLoginOnErrorCallback.current = undefined;
        }
      })();
    },
    onError: (errorResponse) => {
      onGoogleLoginOnErrorCallback.current?.(
        new AppError(
          errorResponse.error ?? "unknown",
          APP_ERROR_NAME.GOOGLE_LOGIN
        )
      );
      onGoogleLoginOnErrorCallback.current = undefined;
    },
    onNonOAuthError: ({
      type,
    }: {
      type: "popup_failed_to_open" | "popup_closed" | "unknown";
    }) => {
      onGoogleLoginOnErrorCallback.current?.(
        new AppError(type, APP_ERROR_NAME.GOOGLE_LOGIN_AUTH)
      );
      onGoogleLoginOnErrorCallback.current = undefined;
    },
  });

  const googleLogin = ({
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
    onError?: (error: AppError) => void;
  }) => {
    onGoogleLoginOnSuccessCallback.current = onSuccess;
    onGoogleLoginOnErrorCallback.current = onError;
    _googleLogin();
  };

  const googleSignUp = ({
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
    onError?: (error: AppError) => void;
  }) => {
    onGoogleLoginOnSuccessCallback.current = ({
      email,
      picture,
    }: {
      email: string;
      picture: string;
    }) => {
      (async () => {
        try {
          if (userInfo.gmail === email) {
            onSuccess?.();
            return;
          }
          await createUserByGmail({
            variables: {
              gmail: email,
            },
          });
          onSuccess?.();
        } catch (e) {
          const message = getErrorMessage(e);
          if (message === "Already exist gmail") {
            onSuccess?.();
          } else {
            onError?.(new AppError(message, APP_ERROR_NAME.GOOGLE_SIGN_UP));
          }
        }
      })();
    };
    onGoogleLoginOnErrorCallback.current = (error) => {
      onError?.(error);
    };
    _googleLogin();
  };

  return (
    <LoginContext.Provider
      value={{
        isGoogleLoggedIn,
        googleLogin,
        logout,
        isLoggedIn,
        googleSignUp,
        userInfo,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
