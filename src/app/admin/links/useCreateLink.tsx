"use client";

import { MutationFunction, useMutation } from "@apollo/client";

import { gql } from "@/__generated__";
import {
  CreateLinkMutation,
  CreateLinkMutationVariables,
} from "@/__generated__/graphql";

const CreateLinkMutation = gql(/* GraphQL */ `
  mutation CreateLink($input: LinkInput!) {
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
  const [createLinkMutation] = useMutation(CreateLinkMutation);

  return {
    createLink(input) {
      return createLinkMutation({
        variables: { input },
      });
    },
  };
}
