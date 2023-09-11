import React, { ReactElement } from "react";
import MainLayout from "../../layouts/main-layout";
import Head from "next/head";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import PrimaryButton from "../../components/atomic/atoms/primary-button";
import { useSignedUserQuery } from "../../hooks/signed-user-query-hook";
import { useAdminQuery } from "../../hooks/admin-query-hook";
import { useAlert } from "../../provider/alert/alert-provider";
import { getLocaleErrorMessage } from "../../error/my-error";
import EventsEditSection from "../../components/section/events-edit-section";
import ProjectsEditSection from "../../components/section/projects-edit-section";

const Admin = () => {
  const { asyncClearParticipatedAllEventsByUserId } = useAdminQuery();
  const { userData } = useSignedUserQuery();
  const { showAlert, showErrorAlert } = useAlert();

  return (
    <>
      <Head>
        <title>3ridge : 관리자 페이지</title>
      </Head>
      <Box sx={{ padding: 4, background: "" }}>
        <Stack>
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
                              userData._id
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
                          showErrorAlert({ content: getLocaleErrorMessage(e) });
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
          <EventsEditSection></EventsEditSection>
          <ProjectsEditSection></ProjectsEditSection>
        </Stack>
      </Box>
    </>
  );
};

Admin.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default Admin;
