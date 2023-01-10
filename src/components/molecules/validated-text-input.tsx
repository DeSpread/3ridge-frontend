import { useTheme } from "@mui/material/styles";
import React, { useMemo } from "react";
import StyledOutlinedInput from "../atoms/styled/styled-outlined-input";
import { OutlinedInputProps } from "@mui/material";

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
  }, [props.isValid]);

  const hoverBorderColor = useMemo(() => {
    return getBorderColor("#787385", theme.palette.error.main);
  }, [props.isValid]);

  return (
    <StyledOutlinedInput
      {...props}
      sx={{
        boxShadow: `0 0 0 1px ${idleBorderColor}`,
        "&:hover .MuiOutlinedInput-notchedOutline": {
          boxShadow: `0 0 0 2px ${hoverBorderColor}`,
        },
      }}
    />
  );
};

export default ValidatedTextInput;
export type { ValidatedTextInputProps };
