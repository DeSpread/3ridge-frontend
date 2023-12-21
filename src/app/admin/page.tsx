import { Box, Stack } from "@mui/material";
import React from "react";

import ResetParticipateEvent from "./ResetParticipateEvent";

import EventsEditSection from "@/components/section/events-edit-section";
import ProjectsEditSection from "@/components/section/projects-edit-section";

export default function AdminPage() {
  return (
    <Box sx={{ padding: 4, background: "" }}>
      <Stack>
        <ResetParticipateEvent />
        <EventsEditSection />
        <ProjectsEditSection />
      </Stack>
    </Box>
  );
}
