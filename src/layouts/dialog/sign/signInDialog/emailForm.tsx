import { Button, FormControl } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";

import EmailInput from "./emailInput";

interface EmailFormProps {
  onChangeEmail?(email: string): void;
  onSubmit?(email: string): void;
}

export default function EmailForm(props: EmailFormProps) {
  const [email, setEmail] = useState("");

  function handleChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    const newEmail = e.target.value;
    setEmail(newEmail);
    props.onChangeEmail?.(newEmail);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    props.onSubmit?.(email);
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl className="flex w-full flex-col gap-2">
        <EmailInput
          required
          autoFocus
          fullWidth
          name="email"
          autoComplete="username"
          label="이메일"
          variant="outlined"
          placeholder="이메일 주소를 입력하세요."
          value={email}
          onChange={handleChangeEmail}
        />
        <Button fullWidth variant="contained" type="submit">
          이메일로 계속하기 / 가입하기
        </Button>
      </FormControl>
    </form>
  );
}
