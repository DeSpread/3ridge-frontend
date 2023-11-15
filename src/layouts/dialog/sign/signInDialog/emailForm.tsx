import { useLazyQuery, useMutation } from "@apollo/client";
import { Button, FormControl } from "@mui/material";
import { FormEvent, useRef, useState } from "react";

import EmailInput from "./emailInput";

import {
  GetUserByEmailDocument,
  SendAuthCodeDocument,
} from "@/__generated__/graphql";

export default function EmailForm() {
  const input = useRef<HTMLInputElement>(null);
  const [getUserByEmail] = useLazyQuery(GetUserByEmailDocument);
  const [sendAuthCode, { reset, called: isSendAuthCode }] =
    useMutation(SendAuthCodeDocument);

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (!input.current) {
      throw new Error("input ref is undefined");
    }

    getUserByEmail({
      variables: {
        email: input.current.value,
      },
    }).then((res) => {
      if (!input.current) {
        throw new Error("input ref is undefined");
      }

      if (res.data?.userByEmail === null) {
        sendAuthCode({
          variables: {
            email: input.current.value,
          },
        });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl className="flex flex-col gap-2">
        <EmailInput
          inputRef={input}
          required
          autoFocus
          fullWidth
          label="이메일"
          variant="outlined"
          placeholder="이메일 주소를 입력하세요."
          onInput={() => reset()}
        />
        {isSendAuthCode === true ? (
          <Button fullWidth variant="contained" type="submit">
            메일 인증 코드로 계속하기
          </Button>
        ) : (
          <Button fullWidth variant="contained" type="submit">
            이메일로 계속하기
          </Button>
        )}
      </FormControl>
    </form>
  );
}
