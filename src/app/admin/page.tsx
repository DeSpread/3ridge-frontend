import { Box, Stack } from "@mui/material";
import { Metadata } from "next";
import React from "react";

import AdminPageProvider from "./providers";
import ResetParticipateEvent from "./ResetParticipateEvent";

import EventsEditSection from "@/components/section/events-edit-section";
import ProjectsEditSection from "@/components/section/projects-edit-section";

export const metadata: Metadata = {
  title: "3ridge : 관리자 페이지",
};

export default function AdminPage() {
  return (
    <AdminPageProvider>
      <Box sx={{ padding: 4, background: "" }}>
        <Stack>
          <ResetParticipateEvent />
          <EventsEditSection />
          <ProjectsEditSection />
        </Stack>
      </Box>
    </AdminPageProvider>
  );
}
