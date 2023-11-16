import { useState } from "react";

import CreateAccountFromEmail from "./createAccountFromEmail";
import EmailAuthCodeForm from "./emailAuthCodeForm";
import { EmailWithAuthCode } from "./types";

export default function EmailForm() {
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
      />
    );
  }

  return <EmailAuthCodeForm onValidateAuthCode={handleValidateAuthCode} />;
}
