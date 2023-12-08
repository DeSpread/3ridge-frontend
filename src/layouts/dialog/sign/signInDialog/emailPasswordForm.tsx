import { Button, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";

import PasswordInput from "./passwordInput";

import { useUser } from "@/hooks/useUser";

interface EmailPasswordFormProps {
  email: string;
  onSignIn(): void;
}

export default function EmailPasswordForm(props: EmailPasswordFormProps) {
  const { loginByEmail } = useUser();

  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    loginByEmail(props.email, password)
      .then(props.onSignIn)
      .catch(() => setError(true));
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
      <PasswordInput
        error={error}
        fullWidth
        autoFocus
        type="password"
        name="current-password"
        autoComplete="current-password"
        label="비밀번호"
        placeholder="비밀번호"
        helperText={error && "잘못된 비밀번호입니다."}
        value={password}
        onChange={handleChangePassword}
      />
      <Button className="mt-5" fullWidth variant="contained" type="submit">
        계속
      </Button>
    </form>
  );
}
