import { useState } from "react";

import CreateAccountFromEmail from "./createAccountFromEmail";
import EmailAuthCodeForm from "./emailAuthCodeForm";
import EmailPasswordForm from "./emailPasswordForm";
import { EmailWithAuthCode } from "./types";

interface EmailRouteProps {
  onSignIn(): void;
}

export default function EmailRoute(props: EmailRouteProps) {
  const [email, setEmail] = useState("");
  const [emailWithAuthCode, setEmailWithAuthCode] =
    useState<EmailWithAuthCode>();

  function handleValidateAuthCode(data: EmailWithAuthCode) {
    setEmailWithAuthCode(data);
  }

  function handleExistsEmail(email: string) {
    setEmail(email);
  }

  if (email) {
    return <EmailPasswordForm email={email} onSignIn={props.onSignIn} />;
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

  return (
    <EmailAuthCodeForm
      onValidateAuthCode={handleValidateAuthCode}
      onExistsEmail={handleExistsEmail}
    />
  );
}
