import { useSuspenseQuery } from "@apollo/client";

import { gql } from "@/__generated__";

const LinksQueryGql = gql(/* GraphQL */ `
  query Links {
    links {
      _id
      href
      attributes {
        key
        value
      }
      event {
        _id
        title
        imageUrl
      }
    }
  }
`);

export function useLinks() {
  const { data: linksData } = useSuspenseQuery(LinksQueryGql);

  return { links: linksData.links };
}
