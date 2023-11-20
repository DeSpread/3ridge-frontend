import { useState } from "react";

import CreateAccountFromEmail from "./createAccountFromEmail";
import EmailAuthCodeForm from "./emailAuthCodeForm";
import { EmailWithAuthCode } from "./types";

interface EmailFormProps {
  onSignIn(): void;
}

export default function EmailForm(props: EmailFormProps) {
  const [emailWithAuthCode, setEmailWithAuthCode] =
    useState<EmailWithAuthCode>();

  function handleValidateAuthCode(data: EmailWithAuthCode) {
    setEmailWithAuthCode(data);
  }

  if (emailWithAuthCode) {
    return (
      <CreateAccountFromEmail
        email={emailWithAuthCode.email}
        code={emailWithAuthCode.code}
        onSignIn={props.onSignIn}
      />
    );
  }

  return <EmailAuthCodeForm onValidateAuthCode={handleValidateAuthCode} />;
}
