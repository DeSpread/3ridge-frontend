import * as amplitude from "@amplitude/analytics-browser";
import { useMutation } from "@apollo/client";
import { getAnalytics, logEvent, setUserId } from "firebase/analytics";

import { gql } from "@/__generated__";
import { firebaseApp } from "@/lib/firebase/firebase-client";

const CreateUserByEmailMutation = gql(/* GraphQL */ `
  mutation CreateUserByEmail(
    $email: String!
    $password: String!
    $authCode: String!
  ) {
    createUserByEmail(email: $email, password: $password, authCode: $authCode) {
      _id
    }
  }
`);

const UpdateUserMutation = gql(/* GraphQL */ `
  mutation UpdateUserMutation($id: String!, $input: UserUpdateInput!) {
    updateUser(id: $id, input: $input) {
      _id
    }
  }
`);

export function useUserMutation() {
  const [createUserByEmailMutation] = useMutation(CreateUserByEmailMutation);
  const [updateUserMutation] = useMutation(UpdateUserMutation);

  return {
    createUserByEmail(
      args: NonNullable<
        NonNullable<
          Parameters<typeof createUserByEmailMutation>[0]
        >["variables"]
      >,
    ) {
      return createUserByEmailMutation({
        variables: args,
      }).then((res) => {
        if (res.data?.createUserByEmail._id) {
          amplitude.setUserId(res.data.createUserByEmail._id);
          amplitude.track("Email Sign Up Submitted");
          const analytics = getAnalytics(firebaseApp);
          setUserId(analytics, res.data.createUserByEmail._id);
          logEvent(analytics, "sign_up", {
            method: "email",
          });
        }
        return res;
      });
    },
    updateUser(
      args: NonNullable<
        NonNullable<Parameters<typeof updateUserMutation>[0]>["variables"]
      >,
    ) {
      return updateUserMutation({
        variables: args,
      });
    },
  };
}
