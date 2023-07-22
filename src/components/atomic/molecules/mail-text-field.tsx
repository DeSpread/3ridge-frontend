import { OutlinedInputProps } from "@mui/material";
import React, { useMemo } from "react";
import ValidatedTextInput from "./validated-text-input";
import { validateMail } from "../../../util/string-util";

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
      isValid={invalid}
      inputProps={{
        style: {
          height: 10,
        },
      }}
    ></ValidatedTextInput>
  );
};

export default MailTextField;
