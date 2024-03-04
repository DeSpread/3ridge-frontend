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
      <div className="mb-5">
        <Alert severity="info">
          <strong>신규 이메일 회원가입 불가 안내</strong>
          <p className="text-sm">
            현재 이메일 인증 처리량이 많아 인증 메일이 발송이 되지 않고
            있습니다. 빠르게 정상화 할 수 있도록 하겠습니다.
          </p>
          <p className="text-xs">
            * 아래 지갑 연결하기 버튼을 통해 로그인하실 수 있습니다.
          </p>
        </Alert>
      </div>
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
