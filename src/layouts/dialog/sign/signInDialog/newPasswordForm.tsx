import { Button } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";

import PasswordInput from "./passwordInput";

interface NewPasswordFormProps {
  email: string;
  handleSubmit?(password: string): void;
}

export default function NewPasswordForm(props: NewPasswordFormProps) {
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    props.handleSubmit?.(password);
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
