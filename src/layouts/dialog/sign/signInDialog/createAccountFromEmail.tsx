import { useMutation } from "@apollo/client";

import NewPasswordForm from "./newPasswordForm";
import { EmailWithAuthCode } from "./types";

import { CreateUserByEmailDocument } from "@/__generated__/graphql";
import { useUser } from "@/hooks/useUser";

interface CreateAccountFromEmailProps extends EmailWithAuthCode {
  onSignIn(): void;
}

export default function CreateAccountFromEmail(
  props: CreateAccountFromEmailProps,
) {
  const [createUserByEmail] = useMutation(CreateUserByEmailDocument);
  const { loginByEmail } = useUser();

  function handleSubmit(password: string) {
    createUserByEmail({
      variables: {
        email: props.email,
        authCode: props.code,
        password: password,
      },
    }).then((res) => {
      if (res.data?.createUserByEmail.name) {
        loginByEmail(props.email, password).then(props.onSignIn);
      }
    });
  }

  return <NewPasswordForm email={props.email} handleSubmit={handleSubmit} />;
}
