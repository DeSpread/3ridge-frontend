import { useMutation } from "@apollo/client";

import NewPasswordForm from "./newPasswordForm";
import { EmailWithAuthCode } from "./types";

import { UpdatePasswordByEmailDocument } from "@/__generated__/graphql";
import { useUser } from "@/hooks/user/useUser";

interface UpdatePasswordFormProps extends EmailWithAuthCode {
  onSignIn(): void;
}

export default function UpdatePasswordForm(props: UpdatePasswordFormProps) {
  const [updatePasswordByEmail] = useMutation(UpdatePasswordByEmailDocument);
  const { loginByEmail } = useUser();

  function handleSubmit(password: string) {
    updatePasswordByEmail({
      variables: {
        email: props.email,
        authCode: props.code,
        password: password,
      },
    }).then((res) => {
      if (res.data?.updatePasswordByEmail) {
        loginByEmail(props.email, password).then(props.onSignIn);
      }
    });
  }

  return <NewPasswordForm email={props.email} handleSubmit={handleSubmit} />;
}
