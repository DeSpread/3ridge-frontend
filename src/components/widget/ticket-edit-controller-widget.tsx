import { Card, CardContent, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { PropsWithChildren } from "react";

import { Project } from "../../__generated__/graphql";
import { Ticket, TicketUserQuery } from "../../types";
import EventVisibilityForm from "../form/ticket-edit-controller/event-visibility-form";
import LinkToPageForm from "../form/ticket-edit-controller/link-to-page-form";
import ProjectUpdateForm from "../form/ticket-edit-controller/project-update-form";
import ShortDescriptionUpdateForm from "../form/ticket-edit-controller/short-description-update-form";
import UpdateEventToHighestPriorityButton from "../form/ticket-edit-controller/UpdateEventToHighestPriorityButton";
import UserInfoDownloadForm from "../form/user-info-download-form";

const TicketEditControllerWidget = (
  props: PropsWithChildren & {
    targetTicket?: Ticket;
    projects?: Project[];
    onProjectChanged?: (projectId: string) => void;
    onVisibilityChanged?: (visible: boolean) => void;
    onDownloadButtonClick?: (res: TicketUserQuery) => void;
  },
) => {
  const theme = useTheme();

  const {
    targetTicket,
    onDownloadButtonClick,
    projects,
    onProjectChanged,
    onVisibilityChanged,
  } = props;

  return (
    <Card
      sx={{
        width: 360,
        borderWidth: 3,
        borderColor: theme.palette.neutral["100"],
        borderStyle: "solid",
        background: "transparent",
        backdropFilter: "blur(8px)",
      }}
    >
      <CardContent>
        <Stack spacing={1}>
          <LinkToPageForm ticketId={targetTicket?._id ?? ""}></LinkToPageForm>
          <UserInfoDownloadForm
            title={"완료 유저 정보 다운로드"}
            onDownloadButtonClick={onDownloadButtonClick}
          />
          <ProjectUpdateForm
            targetTicket={targetTicket}
            projects={projects}
            onChange={onProjectChanged}
          />
          <EventVisibilityForm
            targetTicket={targetTicket}
            onChange={(checked) => {
              onVisibilityChanged?.(!checked);
            }}
          />
          {targetTicket?._id && (
            <UpdateEventToHighestPriorityButton eventId={targetTicket._id} />
          )}
          <ShortDescriptionUpdateForm ticketId={targetTicket?._id} />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TicketEditControllerWidget;
