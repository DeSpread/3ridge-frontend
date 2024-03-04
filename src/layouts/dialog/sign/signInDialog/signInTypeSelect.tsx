import { Wallet } from "@mui/icons-material";
import { Alert, Button } from "@mui/material";

import EmailRoute from "./emailRoute";
import { SignInType } from "./types";

interface SignInTypeSelectProps {
  onChangeType?(type: SignInType): void;
  onSignIn(): void;
}

export default function SignInTypeSelect(props: SignInTypeSelectProps) {
  return (
    <>
      <EmailRoute onSignIn={props.onSignIn} />
      <hr className="my-5" />
      <Button
        className="font-normal"
        fullWidth
        variant="text"
        onClick={() => props.onChangeType?.("wallet")}
      >
        지갑 연결하기 &nbsp;
        <Wallet className="text-xl" />
      </Button>
    </>
  );
}
