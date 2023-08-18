import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

const NumberInput = (props: TextFieldProps) => {
  return (
    <TextField
      {...props}
      type={"number"}
      sx={{
        borderWidth: 0,
        borderColor: "transparent",
        color: "transparent",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "transparent",
            boxShadow: "0 0 0 2px #35333a",
          },
          "&.Mui-focused fieldset": {
            borderWidth: 0,
            borderColor: "transparent",
            boxShadow: "0 0 0 2px #787385",
          },
          "&:hover fieldset": {
            borderWidth: 0,
            borderColor: "transparent",
            backgroundColor: "transparent",
            transition: "box-shadow 0.1s ease-out 0s",
            boxShadow: "0 0 0 2px #787385",
            transitionDuration: "0.1s",
            transitionDelay: "0s",
            transitionTimingFunction: "ease-out",
            transitionProperty: "box-shadow",
          },
        },
        ...props.sx,
      }}
    ></TextField>
  );
};

export default NumberInput;
