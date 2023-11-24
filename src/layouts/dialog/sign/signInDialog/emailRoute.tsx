import { useLazyQuery, useMutation } from "@apollo/client";
import { useState } from "react";

import CreateAccountFromEmail from "./createAccountFromEmail";
import EmailAuthCodeForm from "./emailAuthCodeForm";
import EmailForm from "./emailForm";
import EmailPasswordForm from "./emailPasswordForm";
import { EmailWithAuthCode } from "./types";
import UpdatePasswordForm from "./updatePasswordForm";

import {
  GetUserByEmailDocument,
  IsNeedEmailAccountMigrationDocument,
  SendAuthCodeDocument,
} from "@/__generated__/graphql";

interface EmailRouteProps {
  onSignIn(): void;
}

export default function EmailRoute(props: EmailRouteProps) {
  const [email, setEmail] = useState("");
  const [emailWithAuthCode, setEmailWithAuthCode] =
    useState<EmailWithAuthCode>();

  const [getUserByEmail, { data: userByEmailData }] = useLazyQuery(
    GetUserByEmailDocument,
    {
      fetchPolicy: "no-cache",
    },
  );
  const [
    getIsNeedEmailAccountMigration,
    { data: isNeedEmailAccountMigrationData },
  ] = useLazyQuery(IsNeedEmailAccountMigrationDocument, {
    fetchPolicy: "no-cache",
  });
  const [sendAuthCode, { reset, called: isSendAuthCode }] =
    useMutation(SendAuthCodeDocument);

  const isNeedEmailAccountMigration =
    isNeedEmailAccountMigrationData?.isNeedEmailAccountMigration;
  const isLoginable =
    !!userByEmailData?.userByEmail && !isNeedEmailAccountMigration;

  function handleEmailAccountMigration(
    email: string,
    isNeedMigration: boolean,
  ) {
    if (isNeedMigration) {
      sendAuthCode({
        variables: { email },
      });
    }
  }

  function handleGetUserByEmail(email: string, isExistsEmail: boolean) {
    if (isExistsEmail) {
      getIsNeedEmailAccountMigration({ variables: { email } }).then((res) =>
        handleEmailAccountMigration(
          email,
          !!res.data?.isNeedEmailAccountMigration,
        ),
      );
    } else {
      sendAuthCode({
        variables: { email },
      });
    }
  }

  function handleValidateAuthCode(data: EmailWithAuthCode) {
    setEmailWithAuthCode(data);
  }

  function handleSubmitEmailForm(email: string) {
    setEmail(email);

    getUserByEmail({ variables: { email } }).then((res) =>
      handleGetUserByEmail(email, !!res.data?.userByEmail),
    );
  }

  if (isLoginable) {
    return <EmailPasswordForm email={email} onSignIn={props.onSignIn} />;
  }

  if (emailWithAuthCode) {
    if (isNeedEmailAccountMigration) {
      return (
        <UpdatePasswordForm
          email={emailWithAuthCode.email}
          code={emailWithAuthCode.code}
          onSignIn={props.onSignIn}
        />
      );
    }

    return (
      <CreateAccountFromEmail
        email={emailWithAuthCode.email}
        code={emailWithAuthCode.code}
        onSignIn={props.onSignIn}
      />
    );
  }

  if (isSendAuthCode) {
    return (
      <EmailAuthCodeForm
        email={email}
        onChangeEmail={() => reset()}
        onValidateAuthCode={handleValidateAuthCode}
      />
    );
  }

  return (
    <EmailForm onChangeEmail={() => reset()} onSubmit={handleSubmitEmailForm} />
  );
}
