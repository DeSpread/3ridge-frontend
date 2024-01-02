"use client";

import { MutationFunction, useMutation } from "@apollo/client";

import { gql } from "@/__generated__";
import {
  CreateLinkMutation,
  CreateLinkMutationVariables,
} from "@/__generated__/graphql";

const CreateLinkMutationGQL = gql(/* GraphQL */ `
  mutation CreateLink($input: CreateLinkInput!) {
    createLink(input: $input) {
      _id
    }
  }
`);

interface UseCreateLink {
  createLink(
    input: CreateLinkMutationVariables["input"],
  ): ReturnType<MutationFunction<CreateLinkMutation>>;
}

export function useCreateLink(): UseCreateLink {
  const [createLinkMutation] = useMutation(CreateLinkMutationGQL);

  return {
    createLink(input) {
      return createLinkMutation({
        variables: { input },
      });
    },
  };
}
