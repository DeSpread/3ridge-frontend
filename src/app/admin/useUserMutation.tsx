import { useMutation } from "@apollo/client";

import { gql } from "@/__generated__";

const UpdateUserMutation = gql(/* GraphQL */ `
  mutation UpdateUserMutation($id: String!, $input: UserUpdateInput!) {
    updateUser(id: $id, input: $input) {
      _id
    }
  }
`);

export function useUserMutation() {
  const [updateUserMutation] = useMutation(UpdateUserMutation);

  return {
    updateUser(
      args: NonNullable<
        NonNullable<Parameters<typeof updateUserMutation>[0]>["variables"]
      >,
    ) {
      updateUserMutation({
        variables: args,
      });
    },
  };
}
