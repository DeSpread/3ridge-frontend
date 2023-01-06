import { useTheme } from "@mui/material/styles";
import {
  IconButton,
  InputAdornment,
  OutlinedInputProps,
  Stack,
  Typography,
} from "@mui/material";
import React, {
  MouseEventHandler,
  PropsWithChildren,
  useMemo,
  useState,
} from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SecondaryButton from "../../../components/atoms/secondary-button";
import LinkTypography from "../../../components/atoms/link-typography";
import ValidatedTextInput, {
  ValidatedTextInputProps,
} from "../../../components/molecules/validated-text-input";
import { useAlert } from "../../../provider/alert/alert-provider";
import { MouseEventWithParam } from "../../../type";
import { EmailSignUpParams } from "../../../provider/login/hook/email-login-hook";

type SignUpWithEmailFormProps = PropsWithChildren & {
  onClickSendVerification?: MouseEventHandler;
};

const validatePassword = (val?: string | unknown) => {
  if (typeof val === "string" && val.length > 5) {
    return true;
  }
  return false;
};

const validateMail = (val?: string | unknown) => {
  if (typeof val !== "string") {
    return false;
  }
  const expression: RegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return expression.test(val);
};

const MailTextField = (props: OutlinedInputProps) => {
  const invalid = useMemo(() => {
    const targetVal = props.value;
    if (!targetVal) {
      return true;
    }
    return validateMail(targetVal);
  }, [props.value]);

  return (
    <ValidatedTextInput
      {...props}
      invalid={invalid}
      inputProps={{
        style: {
          height: 10,
        },
      }}
    ></ValidatedTextInput>
  );
};

const BasePasswordTextField = (props: ValidatedTextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const onClickShowPassword = (e: React.MouseEvent<HTMLElement>) => {
    setShowPassword((show) => !show);
  };

  return (
    <ValidatedTextInput
      {...props}
      type={showPassword ? "text" : "password"}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={onClickShowPassword}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
      inputProps={{
        style: {
          height: 10,
        },
      }}
      invalid={props.invalid}
    />
  );
};

const PasswordTextField = (props: OutlinedInputProps) => {
  const invalid = useMemo(() => {
    const targetVal = props.value;
    if (
      !targetVal ||
      (typeof targetVal === "string" && targetVal.length === 0)
    ) {
      return true;
    }
    return validatePassword(targetVal);
  }, [props.value]);
  return (
    <BasePasswordTextField {...props} invalid={invalid}></BasePasswordTextField>
  );
};

type ConfirmPasswordTextFieldProps = OutlinedInputProps & {
  password: string;
};

const ConfirmPasswordTextField = (props: ConfirmPasswordTextFieldProps) => {
  const invalid = useMemo(() => {
    const targetVal = props.value;
    if (
      !targetVal ||
      (typeof targetVal === "string" && targetVal.length === 0)
    ) {
      return true;
    }
    return props.value === props.password;
  }, [props.value, props.password]);
  return (
    <BasePasswordTextField {...props} invalid={invalid}></BasePasswordTextField>
  );
};

const SignUpWithEmailForm = (props: SignUpWithEmailFormProps) => {
  const theme = useTheme();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isValidParams = () => {
    return (
      validateMail(mail) &&
      validatePassword(password) &&
      password === confirmPassword
    );
  };

  return (
    <>
      <Stack
        direction={"column"}
        sx={{
          background: "",
          minWidth: "500px",
          paddingTop: 12,
          marginBottom: 12,
        }}
        spacing={4}
      >
        <Typography textAlign={"left"} variant={"h5"}>
          Sign Up with email
        </Typography>
        <Stack spacing={4}>
          <MailTextField
            value={mail}
            onChange={(e) => {
              setMail(e.target.value);
            }}
            placeholder={"Email Address"}
          ></MailTextField>
          <Stack spacing={2}>
            <PasswordTextField
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder={"Password"}
            ></PasswordTextField>
            {password && !validatePassword(password) && (
              <Typography
                variant={"body2"}
                sx={{ color: theme.palette.error.main }}
              >
                Six or more characters
              </Typography>
            )}
          </Stack>
          <ConfirmPasswordTextField
            value={confirmPassword}
            password={password}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            placeholder={"Confirm Password"}
          ></ConfirmPasswordTextField>
          <Stack spacing={2}>
            <SecondaryButton
              disabled={!isValidParams()}
              onClick={(e) => {
                const myEvent = {} as MouseEventWithParam<EmailSignUpParams>;
                myEvent.params = {
                  email: mail,
                  password,
                };
                props.onClickSendVerification?.(myEvent);
              }}
            >
              Send verification email
            </SecondaryButton>
            <Stack direction={"row"} justifyContent={"center"} spacing={1}>
              <Typography variant={"body2"}>
                Already have an account?
              </Typography>
              <LinkTypography variant={"body2"}>Sign in</LinkTypography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default SignUpWithEmailForm;
