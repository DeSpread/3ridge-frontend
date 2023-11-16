import { useLazyQuery, useMutation } from "@apollo/client";
import { Button, FormControl, TextField } from "@mui/material";
import { FormEvent, useRef } from "react";

import EmailInput from "./emailInput";
import { EmailWithAuthCode } from "./types";

import {
  GetUserByEmailDocument,
  SendAuthCodeDocument,
  ValidateAuthCodeDocument,
} from "@/__generated__/graphql";

interface EmailAuthCodeFormProps {
  onValidateAuthCode(data: EmailWithAuthCode): void;
}

export default function EmailAuthCodeForm(props: EmailAuthCodeFormProps) {
  const emailInput = useRef<HTMLInputElement>(null);
  const authCodeInput = useRef<HTMLInputElement>(null);
  const [getUserByEmail] = useLazyQuery(GetUserByEmailDocument);
  const [validateAuthCode] = useLazyQuery(ValidateAuthCodeDocument);
  const [sendAuthCode, { reset, called: isSendAuthCode }] =
    useMutation(SendAuthCodeDocument);

  function handleValidateAuthCode(isValidated: boolean) {
    if (!emailInput.current) {
      throw new Error("input ref is undefined");
    }

    if (!authCodeInput.current) {
      throw new Error("input ref is undefined");
    }

    if (isValidated) {
      props.onValidateAuthCode({
        email: emailInput.current.value,
        code: authCodeInput.current.value,
      });
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (!emailInput.current) {
      throw new Error("input ref is undefined");
    }

    if (isSendAuthCode) {
      if (!authCodeInput.current) {
        throw new Error("input ref is undefined");
      }

      validateAuthCode({
        variables: {
          email: emailInput.current.value,
          code: authCodeInput.current.value,
        },
      }).then(({ data }) => handleValidateAuthCode(!!data?.validateAuthCode));
    } else {
      getUserByEmail({
        variables: {
          email: emailInput.current.value,
        },
      }).then((res) => {
        if (!emailInput.current) {
          throw new Error("input ref is undefined");
        }

        if (res.data?.userByEmail === null) {
          sendAuthCode({
            variables: {
              email: emailInput.current.value,
            },
          });
        }
      });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl className="flex w-full flex-col gap-2">
        <EmailInput
          inputRef={emailInput}
          required
          autoFocus
          fullWidth
          name="email"
          autoComplete="username"
          label="이메일"
          variant="outlined"
          placeholder="이메일 주소를 입력하세요."
          onInput={() => reset()}
        />
        {isSendAuthCode === true ? (
          <>
            <p className="text-center">
              방금 메일 인증 코드를 보냈습니다. <br />
              메일을 확인하세요.
            </p>
            <TextField
              inputRef={authCodeInput}
              required
              autoFocus
              autoComplete="one-time-password"
              label="메일 인증 코드"
            />
            <Button fullWidth variant="contained" type="submit">
              메일 인증 코드로 계속하기
            </Button>
          </>
        ) : (
          <Button fullWidth variant="contained" type="submit">
            이메일로 계속하기
          </Button>
        )}
      </FormControl>
    </form>
  );
}
