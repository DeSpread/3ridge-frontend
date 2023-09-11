import React, { PropsWithChildren, useEffect } from "react";
import { Ticket } from "../../../types";
import { Project } from "../../../__generated__/graphql";
import Container from "../../atomic/atoms/container";
import LinkTypography from "../../atomic/atoms/link-typography";
import { Checkbox, FormControlLabel } from "@mui/material";

const EventVisibilityForm = ({
  targetTicket,
  onChange,
}: PropsWithChildren & {
  targetTicket?: Ticket;
  onChange?: (checked: boolean) => void;
}) => {
  return (
    <Container>
      <FormControlLabel
        checked={!targetTicket?.visible ?? false}
        control={
          <Checkbox
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onChange?.(event.target.checked);
            }}
          />
        }
        label="이벤트 감추기"
      />
    </Container>
  );
};

export default EventVisibilityForm;
