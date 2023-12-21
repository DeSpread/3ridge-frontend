"use client";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import PrimaryButton from "@/components/atomic/atoms/primary-button";
import { getLocaleErrorMessage } from "@/error/my-error";
import { useAdminQuery } from "@/hooks/admin-query-hook";
import { useSignedUserQuery } from "@/hooks/signed-user-query-hook";
import { useAlert } from "@/provider/alert/alert-provider";

export default function ResetParticipateEvent() {
  const { asyncClearParticipatedAllEventsByUserId } = useAdminQuery();
  const { userData } = useSignedUserQuery();
  const { showAlert, showErrorAlert } = useAlert();

  return (
    <Card sx={{ maxWidth: 800 }}>
      <CardContent>
        <Stack direction={"column"} spacing={2}>
          <Stack spacing={1}>
            <Typography variant={"h6"}>계정 관리</Typography>
            <Divider></Divider>
          </Stack>
          <Box>
            {!userData?._id && (
              <Typography>로그인 해주시기 바랍니다</Typography>
            )}
            {userData?._id && (
              <PrimaryButton
                onClick={async (e) => {
                  try {
                    if (userData?._id) {
                      await asyncClearParticipatedAllEventsByUserId(
                        userData._id,
                      );
                      showAlert({
                        content: "초기화 되었습니다",
                        title: "알림",
                      });
                    } else {
                      showAlert({
                        content: "로그인 되어있지 않습니다.",
                        title: "알림",
                      });
                    }
                  } catch (e) {
                    showErrorAlert({
                      content: getLocaleErrorMessage(e),
                    });
                  }
                }}
              >
                계정 초기화
              </PrimaryButton>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
