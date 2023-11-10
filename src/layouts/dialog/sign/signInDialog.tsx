import { Wallet } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

import EmailForm from "./signInDialog/emailForm";

interface SignInDialogProps {
  open?: boolean;
}

export default function SignInDialog(props: SignInDialogProps) {
  return (
    <Dialog open={props.open ?? false} fullWidth maxWidth={"xs"}>
      <DialogTitle>안녕하세요! 3ridge입니다 😄</DialogTitle>
      <DialogContent>
        <div className="pt-4">
          <EmailForm />
          <hr className="my-5" />
          <Button fullWidth variant="text">
            지갑 연결하기 &nbsp;
            <Wallet />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
