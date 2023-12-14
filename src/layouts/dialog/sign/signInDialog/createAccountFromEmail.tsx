import NewPasswordForm from "./newPasswordForm";
import { EmailWithAuthCode } from "./types";

import { useUserMutation } from "@/app/admin/useUserMutation";
import { useUser } from "@/hooks/useUser";

interface CreateAccountFromEmailProps extends EmailWithAuthCode {
  onSignIn(): void;
}

export default function CreateAccountFromEmail(
  props: CreateAccountFromEmailProps,
) {
  const { createUserByEmail } = useUserMutation();
  const { loginByEmail } = useUser();

  function handleSubmit(password: string) {
    createUserByEmail({
      email: props.email,
      authCode: props.code,
      password: password,
    }).then((res) => {
      if (res.data?.createUserByEmail._id) {
        loginByEmail(props.email, password).then(props.onSignIn);
      }
    });
  }

  return <NewPasswordForm email={props.email} handleSubmit={handleSubmit} />;
}
