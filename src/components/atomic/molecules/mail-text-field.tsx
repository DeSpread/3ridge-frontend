import { OutlinedInputProps } from "@mui/material";
import React, { useMemo } from "react";

import StringUtil from "../../../util/string-util";

import ValidatedTextInput from "./validated-text-input";

const MailTextField = (props: OutlinedInputProps) => {
  const invalid = useMemo(() => {
    const targetVal = props.value;
    if (!targetVal) {
      return true;
    }
    return StringUtil.validateMail(targetVal);
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
