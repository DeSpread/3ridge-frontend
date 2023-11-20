import { useMutation } from "@apollo/client";
import { Button, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";

import { EmailWithAuthCode } from "./types";

import { CreateUserByEmailDocument } from "@/__generated__/graphql";
import { useSignIn } from "@/hooks/signIn.hook";

interface CreateAccountFromEmailProps extends EmailWithAuthCode {
  onSignIn(): void;
}

export default function CreateAccountFromEmail(
  props: CreateAccountFromEmailProps,
) {
  const [createUserByEmail] = useMutation(CreateUserByEmailDocument);
  const { signInByEmail } = useSignIn();
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    createUserByEmail({
      variables: {
        email: props.email,
        authCode: props.code,
        password: password,
      },
    }).then((res) => {
      if (res.data?.createUserByEmail.name) {
        signInByEmail(props.email, password).then(props.onSignIn);
      }
    });
  }

  function handleChangePassword(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="hidden"
        type="email"
        name="email"
        autoComplete="username"
        defaultValue={props.email}
      />
      <TextField
        fullWidth
        autoFocus
        type="password"
        name="new-password"
        autoComplete="new-password"
        label="비밀번호 설정"
        placeholder="새 비밀번호"
        value={password}
        onChange={handleChangePassword}
      />
      <Button className="mt-5" fullWidth variant="contained" type="submit">
        계속
      </Button>
    </form>
  );
}