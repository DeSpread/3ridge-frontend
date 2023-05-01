import { IconButton, InputAdornment, OutlinedInputProps } from "@mui/material";
import React, { useMemo, useState } from "react";
import { validatePassword } from "../../util/validate-string-util";
import ValidatedTextInput, {
  ValidatedTextInputProps,
} from "./validated-text-input";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const DefaultPasswordTextField = (props: ValidatedTextInputProps) => {
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
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }
      inputProps={{
        style: {
          height: 10,
        },
      }}
      isValid={props.isValid}
    />
  );
};

export { DefaultPasswordTextField };

const ValidatedPasswordTextField = (props: OutlinedInputProps) => {
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
    <DefaultPasswordTextField
      {...props}
      isValid={invalid}
    ></DefaultPasswordTextField>
  );
};

export { ValidatedPasswordTextField };

type ConfirmPasswordTextFieldProps = OutlinedInputProps & {
  password: string;
};

const ConfirmPasswordTextField = (props: ConfirmPasswordTextFieldProps) => {
  const isValid = useMemo(() => {
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
    <DefaultPasswordTextField
      {...props}
      isValid={isValid}
    ></DefaultPasswordTextField>
  );
};

export { ConfirmPasswordTextField };
