import { useEffect, useMemo, useRef, useState } from "react";
import { AppError, getErrorMessage } from "../../../error/my-error";
import { useMutation } from "@apollo/client";
import GoogleLoginHelper from "../../../helper/google-login-helper";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLoggedInInfo, SuccessErrorCallback } from "../../../types";
import { CREATE_USER_BY_GMAIL } from "../../../lib/apollo/query";

export function useMyGoogleLogin() {
  const onGoogleLoginOnSuccessCallback =
    useRef<({ email, picture }: { email: string; picture: string }) => void>();
  const onGoogleLoginOnErrorCallback = useRef<(error: AppError) => void>();
  const [createUserByGmail] = useMutation(CREATE_USER_BY_GMAIL);
  const [googleUserInfo, setGoogleUserInfo] = useState<GoogleLoggedInInfo>({});

  useEffect(() => {
    (async () => {
      if (isGoogleLoggedIn) return;
      const _isGoogleLoggedIn = await GoogleLoginHelper.asyncIsLoggedInGoogle();
      if (_isGoogleLoggedIn && !googleUserInfo.gmail) {
        await asyncUpdateGoogleUserInfo();
      }
    })();
  }, []);

  const isGoogleLoggedIn = useMemo(() => {
    return googleUserInfo?.gmail !== undefined ? true : false;
  }, [googleUserInfo]);

  const googleLogout: SuccessErrorCallback<void> = ({ onSuccess, onError }) => {
    try {
      GoogleLoginHelper.googleLogout();
      setGoogleUserInfo({});
      onSuccess?.();
    } catch (e) {
      onError?.(new AppError(getErrorMessage(e)));
    }
  };

  const asyncUpdateGoogleUserInfo = async () => {
    const _userInfo = await GoogleLoginHelper.asyncFetchUserInfo();
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
          GoogleLoginHelper.googleLogout();
          setGoogleUserInfo({});
          GoogleLoginHelper.storeTokenResponse(tokenResponse);
          const { email, picture } = await asyncUpdateGoogleUserInfo();
          onGoogleLoginOnSuccessCallback.current?.({ email, picture });
          onGoogleLoginOnSuccessCallback.current = undefined;
        } catch (e) {
          onGoogleLoginOnErrorCallback.current?.(
            new AppError(getErrorMessage(e))
          );
          onGoogleLoginOnErrorCallback.current = undefined;
        }
      })();
    },
    onError: (errorResponse) => {
      onGoogleLoginOnErrorCallback.current?.(
        new AppError(errorResponse.error ?? "unknown")
      );
      onGoogleLoginOnErrorCallback.current = undefined;
    },
    onNonOAuthError: ({
      type,
    }: {
      type: "popup_failed_to_open" | "popup_closed" | "unknown";
    }) => {
      onGoogleLoginOnErrorCallback.current?.(new AppError(type));
      onGoogleLoginOnErrorCallback.current = undefined;
    },
  });

  const googleSignUp: SuccessErrorCallback<void> = ({ onSuccess, onError }) => {
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
            onError?.(new AppError(message));
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
