import { OutlinedInputProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useMemo } from "react";

import StyledOutlinedInput from "../atoms/styled/styled-outlined-input";

type ValidatedTextInputProps = OutlinedInputProps & {
  isValid: boolean;
};

const ValidatedTextInput = (props: ValidatedTextInputProps) => {
  const theme = useTheme();

  const getBorderColor = (correctColor: string, errorColor: string) => {
    return props.isValid ? correctColor : errorColor;
  };

  const idleBorderColor = useMemo(() => {
    return getBorderColor("#35333a", theme.palette.error.main);
  }, [props.isValid, theme.palette.error.main]);

  const hoverBorderColor = useMemo(() => {
    return getBorderColor("#787385", theme.palette.error.main);
  }, [props.isValid, theme.palette.error.main]);

  return (
    <StyledOutlinedInput
      {...props}
      sx={{
        boxShadow: `0 0 0 1px ${idleBorderColor}`,
        "&:hover .MuiOutlinedInput-notchedOutline": {
          boxShadow: `0 0 0 2px ${hoverBorderColor}`,
        },
        ...props.sx,
      }}
    />
  );
};

export default ValidatedTextInput;
export type { ValidatedTextInputProps };
