import { useLazyQuery, useMutation } from "@apollo/client";
import { Button, FormControl, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

import EmailInput from "./emailInput";
import { EmailWithAuthCode } from "./types";

import { ValidateAuthCodeDocument } from "@/__generated__/graphql";

interface EmailAuthCodeFormProps {
  email: string;
  onChangeEmail?(email: string): void;
  onValidateAuthCode(data: EmailWithAuthCode): void;
}

export default function EmailAuthCodeForm(props: EmailAuthCodeFormProps) {
  const authCodeInput = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>();

  const [validateAuthCode] = useLazyQuery(ValidateAuthCodeDocument);

  function handleValidateAuthCode(isValidated: boolean) {
    if (!authCodeInput.current) {
      throw new Error("input ref is undefined");
    }

    if (isValidated) {
      props.onValidateAuthCode({
        email: props.email,
        code: authCodeInput.current.value,
      });
    } else {
      setErrorMessage("잘못된 인증 번호입니다.");
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (!authCodeInput.current) {
      throw new Error("input ref is undefined");
    }

    validateAuthCode({
      variables: {
        email: props.email,
        code: authCodeInput.current.value,
      },
    }).then(({ data }) => handleValidateAuthCode(!!data?.validateAuthCode));
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
          defaultValue={props.email}
          onInput={(e: ChangeEvent<HTMLInputElement>) =>
            props.onChangeEmail?.(e.target.value)
          }
        />
        <p className="text-center">
          방금 메일 인증 코드를 보냈습니다. <br />
          메일을 확인하세요.
        </p>
        <TextField
          error={!!errorMessage}
          inputRef={authCodeInput}
          required
          autoFocus
          autoComplete="one-time-password"
          label="메일 인증 코드"
          helperText={errorMessage}
        />
        <Button fullWidth variant="contained" type="submit">
          메일 인증 코드로 계속하기
        </Button>
      </FormControl>
    </form>
  );
}
