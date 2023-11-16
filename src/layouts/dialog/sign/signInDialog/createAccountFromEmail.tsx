import { Button, TextField } from "@mui/material";

import { EmailWithAuthCode } from "./types";

interface CreateAccountFromEmailProps extends EmailWithAuthCode {}

export default function CreateAccountFromEmail(
  props: CreateAccountFromEmailProps,
) {
  return (
    <form>
      <input
        type="hidden"
        name="email"
        autoComplete="username"
        value={props.email}
      />
      <TextField
        fullWidth
        autoFocus
        type="password"
        name="new-password"
        autoComplete="new-password"
        label="비밀번호 설정"
        placeholder="새 비밀번호"
      />
      <Button className="mt-5" fullWidth variant="contained" type="submit">
        계속
      </Button>
    </form>
  );
}
