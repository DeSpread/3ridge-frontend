"use client";
import { useQuery } from "@apollo/client";

import { gql, useFragment } from "@/__generated__";

const Fragment = gql(/* GraphQL */ `
  fragment UserItem on User {
    _id
    name
    profileImageUrl
    email
    type
    rewardPoint
  }
`);

const Query = gql(/* GraphQL */ `
  query users {
    users {
      ...UserItem
    }
  }
`);

export function useUsers() {
  const { data: usersData } = useQuery(Query);
  const users = useFragment(Fragment, usersData?.users) ?? [];

  return {
    users: users,
  };
}
