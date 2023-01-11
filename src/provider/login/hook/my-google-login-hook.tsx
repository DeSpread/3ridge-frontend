import { useEffect, useMemo, useRef, useState } from "react";
import {
  APP_ERROR_NAME,
  AppError,
  getErrorMessage,
} from "../../../error/my-error";
import { useMutation } from "@apollo/client";
import { gql } from "../../../__generated__";
import GoogleLoginHelper from "../../../helper/google-login-helper";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleUserInfo, SuccessErrorCallback } from "../../../type";

const CREATE_USER_BY_GMAIL = gql(/* GraphQL */ `
  mutation CreateUserByGmail($gmail: String!, $profileImageUrl: String!) {
    createUserByGmail(gmail: $gmail, profileImageUrl: $profileImageUrl) {
      name
    }
  }
`);

export function useMyGoogleLogin() {
  const onGoogleLoginOnSuccessCallback =
    useRef<({ email, picture }: { email: string; picture: string }) => void>();
  const onGoogleLoginOnErrorCallback = useRef<(error: AppError) => void>();
  const [createUserByGmail] = useMutation(CREATE_USER_BY_GMAIL);
  const [googleUserInfo, setGoogleUserInfo] = useState<GoogleUserInfo>({});

  useEffect(() => {
    (async () => {
      if (isGoogleLoggedIn) return;
      const _isGoogleLoggedIn =
        await GoogleLoginHelper.getInstance().asyncIsLoggedInGoogle();
      if (_isGoogleLoggedIn && !googleUserInfo.gmail) {
        await asyncUpdateGoogleUserInfo();
      }
    })();
  });

  const isGoogleLoggedIn = useMemo(() => {
    return googleUserInfo?.gmail !== undefined ? true : false;
  }, [googleUserInfo]);

  const googleLogout: SuccessErrorCallback = ({ onSuccess, onError }) => {
    try {
      GoogleLoginHelper.getInstance().googleLogout();
      setGoogleUserInfo({});
    } catch (e) {
      onError?.(new AppError(getErrorMessage(e), APP_ERROR_NAME.GOOGLE_LOGOUT));
    }
  };

  const asyncUpdateGoogleUserInfo = async () => {
    const _userInfo =
      await GoogleLoginHelper.getInstance().asyncFetchUserInfo();
    if (!_userInfo) {
      return { email: null, picture: null };
    }
    const { email, picture } = _userInfo;
    setGoogleUserInfo((prevState) => {
      return { ...prevState, gmail: email };
    });
    return { email, picture };
  };

  const _googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      (async () => {
        try {
          GoogleLoginHelper.getInstance().googleLogout();
          setGoogleUserInfo({});
          GoogleLoginHelper.getInstance().storeTokenResponse(tokenResponse);
          const { email, picture } = await asyncUpdateGoogleUserInfo();
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

  const googleSignUp: SuccessErrorCallback = ({ onSuccess, onError }) => {
    onGoogleLoginOnSuccessCallback.current = ({
      email,
      picture,
    }: {
      email: string;
      picture: string;
    }) => {
      (async () => {
        try {
          await createUserByGmail({
            variables: {
              gmail: email,
              profileImageUrl: picture,
            },
          });
          onSuccess?.();
        } catch (e) {
          const message = getErrorMessage(e);
          if (message === "Already registered by gmail") {
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

  return { isGoogleLoggedIn, googleUserInfo, googleSignUp, googleLogout };
}
