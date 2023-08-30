import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import useDiscordAuth from "../../hooks/discord-auth-hook";
import RouterUtil from "../../util/router-util";
import {
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import Container from "../../components/atomic/atoms/container";
import ErrorInfoForm from "../../components/form/error-info-form";
import { useSignedUserQuery } from "../../hooks/signed-user-query-hook";
import { useProfileEditDialog } from "../../hooks/profile-edit-dialog-hook";
import { getErrorMessage } from "../../error/my-error";

const Discord = () => {
  const router = useRouter();
  const { userData, asyncUpdateDiscord } = useSignedUserQuery();
  const [isLoading, setLoading] = useState(true);
  const { setShowProfileEditDialog } = useProfileEditDialog();
  const [updateLock, setUpdateLock] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    userInfo,
    error,
    isLoading: isDiscordLoading,
  } = useDiscordAuth({
    code: !updateLock ? RouterUtil.getStringQuery(router, "code") : undefined,
  });

  console.log("userInfo", userInfo);

  const loading = useMemo(() => {
    return isLoading || isDiscordLoading;
  }, [isDiscordLoading]);

  useEffect(() => {
    try {
      if (userInfo?.id) {
        if (updateLock) {
          return;
        }
        setUpdateLock(true);
        (async () => {
          // await asyncUpdateDiscord({
          //   accent_color: userInfo.accent_color,
          //   avatar: userInfo.avatar,
          //   avatar_decoration: userInfo.avatar_decoration,
          //   banner: userInfo.banner,
          //   discriminator: userInfo.discriminator,
          //   flags: userInfo.flags,
          //   global_name: userInfo.global_name,
          //   id: userInfo.id,
          //   locale: userInfo.locale,
          //   mfa_enabled: userInfo.mfa_enabled,
          //   premium_type: userInfo.premium_type,
          //   public_flags: userInfo.public_flags,
          //   username: userInfo.username,
          // });
          setLoading(false);
          // console.log("finish");
          // setShowProfileEditDialog(true);
          window.opener.postMessage({ type: "discordAuth", userInfo }, "*");
          window.close();
        })();
      }
    } catch (e) {
      setErrorMessage(getErrorMessage(e));
      setUpdateLock(false);
    }
  }, [userInfo]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error.toString());
    }
  }, [error]);

  return (
    <Stack sx={{ padding: 3, paddingTop: 3 }}>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <>
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
            {!errorMessage && loading && (
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={2}
                sx={{ padding: 1 }}
              >
                <Typography variant={"h6"}>
                  디스코드에서 유저정보를 가져오는 중입니다
                </Typography>
                <CircularProgress size="1rem" />
              </Stack>
            )}
            {!loading && (
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={2}
                sx={{ padding: 1 }}
              >
                <Typography variant={"h6"}>업데이트 완료하였습니다</Typography>
                <CircularProgress size="1rem" />
              </Stack>
            )}
          </>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Discord;
