import { useTheme } from "@mui/material/styles";
import WithBaseSignInDialog, { SignDialogProps } from "./with-base-sign-dialog";
import { Stack } from "@mui/material";
import { PasswordTextField } from "../../../components/molecules/password-text-field";
import { useState } from "react";

type SignInWithEmailProps = SignDialogProps & {
  // onSignInWithEmailClicked;
  // onSignInWithGoogleClicked: MouseEventHandler;
};

const SignInWithDialogContent = (props: SignInWithEmailProps) => {
  const theme = useTheme();
  const [password, setPassword] = useState("");

  return (
    <>
      <Stack sx={{ width: "100%" }} spacing={2}>
        {/*<PasswordTextField*/}
        {/*  value={password}*/}
        {/*  onChange={(e) => {*/}
        {/*    setPassword(e.target.value);*/}
        {/*  }}*/}
        {/*  placeholder={"Password"}*/}
        {/*></PasswordTextField>*/}
      </Stack>
    </>
  );
};

export default WithBaseSignInDialog(SignInWithDialogContent);
