import { StandardTextFieldProps, TextField } from "@mui/material";
import { FormEvent, ReactNode, useState } from "react";

interface PasswordInputProps extends StandardTextFieldProps {}

export default function PasswordInput(props: PasswordInputProps) {
  const [errorMessage, setErrorMessage] = useState<ReactNode>();

  function handleInvalid(e: FormEvent<HTMLInputElement>) {
    e.preventDefault();
    setErrorMessage("8자 이상으로 문자, 숫자, 기호를 조합하세요");
  }

  return (
    <TextField
      {...props}
      error={!!errorMessage || props.error}
      helperText={errorMessage || props.helperText}
      onInvalid={handleInvalid}
      inputProps={{
        pattern: "(?=.*\\d)(?=.*[a-z])(?=.*[a-zA-Z])(?=.*[^\\w\\d\\s]).{8,}",
      }}
    />
  );
}
