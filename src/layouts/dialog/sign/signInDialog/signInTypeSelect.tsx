import { Wallet } from "@mui/icons-material";
import { Button } from "@mui/material";

import EmailForm from "./emailForm";
import { SignInType } from "./types";

interface SignInTypeSelectProps {
  onChangeType?(type: SignInType): void;
  onSignIn(): void;
}

export default function SignInTypeSelect(props: SignInTypeSelectProps) {
  return (
    <>
      <EmailForm onSignIn={props.onSignIn} />
      <hr className="my-5" />
      <Button
        fullWidth
        variant="text"
        onClick={() => props.onChangeType?.("wallet")}
      >
        지갑 연결하기 &nbsp;
        <Wallet />
      </Button>
    </>
  );
}
