import { useSuspenseQuery } from "@apollo/client";

import { gql } from "@/__generated__";

const GET_QUESTS_BY_EVENT_ID = gql(`
  query GetQuestsByEventId($eventId: String!) {
    quests(eventId: $eventId) {
      _id
      title_v2 {
        content
        contentEncodingType
        contentFormatType
      }
      completedUsers {
        _id
      }
    }
  }
`);

export function useQuests(eventId: string) {
  const queryResult = useSuspenseQuery(GET_QUESTS_BY_EVENT_ID, {
    variables: { eventId },
  });

  return { ...queryResult, quests: queryResult.data?.quests };
}
