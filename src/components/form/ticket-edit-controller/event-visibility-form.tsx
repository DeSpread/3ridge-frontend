import { useMutation } from "@apollo/client";
import { Checkbox, FormControlLabel } from "@mui/material";
import React, { PropsWithChildren, useEffect, useState } from "react";

import { EventType } from "../../../__generated__/graphql";
import { Ticket } from "../../../types";
import Container from "../../atomic/atoms/container";

import { gql } from "@/__generated__";

const UPDATE_EVENT_TYPES_MUTATION = gql(`
  mutation UpdateEventTypes($eventId: String!, $eventTypes: [EventType!]!) {
    updateEventTypes(eventId: $eventId, eventTypes: $eventTypes)
  }
`);

const EventVisibilityForm = ({
  targetTicket,
  onChange,
}: PropsWithChildren & {
  targetTicket?: Ticket;
  onChange?: (checked: boolean) => void;
}) => {
  const [updateEventTypes] = useMutation(UPDATE_EVENT_TYPES_MUTATION);
  const [eventTypes, setEventTypes] = useState<EventType[]>(
    targetTicket?.eventTypes ?? [],
  );

  function toggleEventType(eventType: EventType) {
    if (!targetTicket?._id) {
      throw new Error("targetTicket._id is undefined");
    }

    let newEventTypes: EventType[] = [];

    if (eventTypes.includes(eventType)) {
      newEventTypes = eventTypes.filter((v) => v !== eventType);
    } else {
      newEventTypes = [...eventTypes, eventType];
    }

    setEventTypes(newEventTypes);

    updateEventTypes({
      variables: {
        eventId: targetTicket._id,
        eventTypes: newEventTypes,
      },
    });
  }

  useEffect(() => {
    if (targetTicket?.eventTypes) {
      setEventTypes(targetTicket.eventTypes);
    }
  }, [targetTicket?.eventTypes]);

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

      <FormControlLabel
        checked={eventTypes.includes(EventType.Main) ?? false}
        control={
          <Checkbox
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              toggleEventType(EventType.Main);
            }}
          />
        }
        label="메인페이지 추천 이벤트 노출"
      />

      <FormControlLabel
        checked={eventTypes.includes(EventType.Recommended) ?? false}
        label="이벤트페이지 주요 이벤트 노출"
        control={
          <Checkbox
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              toggleEventType(EventType.Recommended);
            }}
          />
        }
      />
    </Container>
  );
};

export default EventVisibilityForm;
