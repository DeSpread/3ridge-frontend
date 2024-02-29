import { useMutation } from "@apollo/client";
import { Button, CircularProgress } from "@mui/material";

import { gql } from "@/__generated__";

interface UpdateEventToHighestPriorityButtonProps {
  eventId: string;
}

const UPDATE_EVENT_TO_HIGHEST_PRIORITY_MUTATION = gql(`
  mutation UpdateEventToHighestPriority($eventId: String!) {
    updateEventToHighestPriority(eventId: $eventId) {
      _id
      priority
    }
  }
`);

export default function UpdateEventToHighestPriorityButton(
  props: UpdateEventToHighestPriorityButtonProps,
) {
  const [updateEventToHighestPriority, { loading }] = useMutation(
    UPDATE_EVENT_TO_HIGHEST_PRIORITY_MUTATION,
    {
      variables: {
        eventId: props.eventId,
      },
    },
  );

  function onClick() {
    updateEventToHighestPriority();
  }

  return (
    <Button variant="outlined" onClick={onClick}>
      {loading ? <CircularProgress size={14} /> : "이벤트를 최상위 순서로"}
    </Button>
  );
}
