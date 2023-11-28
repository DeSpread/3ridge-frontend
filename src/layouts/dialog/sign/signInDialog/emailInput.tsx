import { TextField, TextFieldProps } from "@mui/material";
import { FormEvent, useState } from "react";

export default function EmailInput(props: TextFieldProps) {
  const [isError, setIsError] = useState(false);

  function handleInvalid(e: FormEvent<HTMLInputElement>) {
    e.preventDefault();
    setIsError(true);
  }

  return (
    <TextField
      {...props}
      type="email"
      inputMode="email"
      helperText={isError && "유효하지 않은 이메일입니다."}
      onInvalid={handleInvalid}
      error={isError}
    />
  );
}
