import { useSuspenseQuery } from "@apollo/client";

import { gql } from "@/__generated__";

const EventQueryGQL = gql(/* GraphQl */ `
  query events {
    tickets {
      _id
      title
      imageUrl
    }
  }
`);

export default function useEvents() {
  const { data: eventsData } = useSuspenseQuery(EventQueryGQL);

  return { events: eventsData?.tickets };
}
