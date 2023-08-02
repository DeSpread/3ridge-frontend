import { Card, CardContent, Stack } from "@mui/material";
import React, { PropsWithChildren } from "react";
import { useTheme } from "@mui/material/styles";
import CompletedUserInfoDownloadForm from "../form/ticket-edit-controller/completed-user-info-download-form";
import LinkToPageForm from "../form/ticket-edit-controller/link-to-page-form";
import { ChainType } from "../../__generated__/graphql";
import { TicketUserQuery } from "../../type";

const TicketEditControllerWidget = (
  props: PropsWithChildren & {
    ticketId: string;
    onDownloadButtonClick?: (res: TicketUserQuery) => void;
  }
) => {
  const theme = useTheme();

  const { ticketId, onDownloadButtonClick } = props;

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
          <LinkToPageForm ticketId={ticketId}></LinkToPageForm>
          <CompletedUserInfoDownloadForm
            onDownloadButtonClick={onDownloadButtonClick}
          ></CompletedUserInfoDownloadForm>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TicketEditControllerWidget;
