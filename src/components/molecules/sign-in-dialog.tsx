import { Dialog, DialogContent, DialogProps, DialogTitle } from "@mui/material";

type SignInDialogProps = DialogProps & {};

const SignInDialog = (props: SignInDialogProps) => {
  return (
    <>
      <Dialog {...props}>
        <DialogTitle>Good to see you again</DialogTitle>
        <DialogContent></DialogContent>
      </Dialog>
    </>
  );
};

export default SignInDialog;
