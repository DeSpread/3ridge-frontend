import {
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSignedUserQuery } from "../../hooks/signed-user-query-hook";
import { useProfileEditDialog } from "../../hooks/profile-edit-dialog-hook";
import ErrorInfoForm from "../../components/form/error-info-form";
import Container from "../../components/atomic/atoms/container";
import PreferenceHelper from "../../helper/preference-helper";
import { APP_ERROR_MESSAGE, getErrorMessage } from "../../error/my-error";

const Kakao = () => {
  const router = useRouter();
  const { code: authCode, error: kakaoServerError } = router.query;
  const { userData, asyncUpdateKakao } = useSignedUserQuery();
  const { setShowProfileEditDialog } = useProfileEditDialog();
  const [updateLock, setUpdateLock] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const asyncUpdate = async (code: string) => {
    try {
      if (updateLock) {
        return;
      }
      setUpdateLock(true);
      const { request } = PreferenceHelper.getKakaoRequest();
      const redirectUri = `${window.location.origin}/kakao`;
      if (request === "update") {
        const res = await asyncUpdateKakao(code, redirectUri);
        console.log(res);
        setShowProfileEditDialog(true);
        PreferenceHelper.clearKakaoRequest();
        await router.push(`/profile/${userData?.name}`);
      }
    } catch (e) {
      if (getErrorMessage(e) === APP_ERROR_MESSAGE.FAIL_TO_FETCH_KAKAO_INFO) {
        setErrorMessage(APP_ERROR_MESSAGE.FAIL_TO_FETCH_KAKAO_INFO);
      }
      setUpdateLock(false);
    }
  };

  useEffect(() => {
    if (typeof authCode === "string" && authCode && userData?.name) {
      if (userData?.kakao?.id) {
        PreferenceHelper.clearKakaoRequest();
        router.push(`/profile/${userData?.name}`);
        return;
      }
      asyncUpdate(authCode);
    }
  }, [authCode, router, userData]);

  useEffect(() => {
    if (typeof kakaoServerError === "string") setErrorMessage(kakaoServerError);
  }, [kakaoServerError]);

  return (
    <Stack sx={{ padding: 3, paddingTop: 3 }}>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          {errorMessage && (
            <>
              <Typography variant={"h5"} sx={{ marginLeft: 1 }}>
                오류가 발생하였습니다
              </Typography>
              <Container sx={{ marginTop: 3 }}>
                <ErrorInfoForm content={errorMessage}></ErrorInfoForm>
              </Container>
            </>
          )}
          {!errorMessage && (
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={2}
              sx={{ padding: 1 }}
            >
              <Typography variant={"h6"}>
                카카오에서 유저정보를 가져오는 중입니다
              </Typography>
              <CircularProgress size="1rem" />
            </Stack>
          )}
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Kakao;
