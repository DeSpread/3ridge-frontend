import { Button, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";

import { useSignIn } from "@/hooks/signIn.hook";

interface EmailPasswordFormProps {
  email: string;
  onSignIn(): void;
}

export default function EmailPasswordForm(props: EmailPasswordFormProps) {
  const { signInByEmail } = useSignIn();
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    signInByEmail(props.email, password).then(props.onSignIn);
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
        name="current-password"
        autoComplete="current-password"
        label="비밀번호"
        placeholder="비밀번호"
        value={password}
        onChange={handleChangePassword}
      />
      <Button className="mt-5" fullWidth variant="contained" type="submit">
        계속
      </Button>
    </form>
  );
}
