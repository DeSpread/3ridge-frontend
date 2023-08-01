import {
  Box,
  OutlinedInputProps,
  Stack,
  TextFieldProps,
  Typography,
} from "@mui/material";
import StyledOutlinedInput from "./styled/styled-outlined-input";
import React from "react";
import NumberInput from "./number-input";

const NumberWithLabel = (
  props: {
    label?: string;
    labelWidth?: string | number;
  } & TextFieldProps
) => {
  const { label, labelWidth, ...rest } = props;
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"flex-start"}
    >
      <Box sx={{ width: labelWidth }}>
        <Typography
          variant={"body2"}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
          }}
        >
          {label}
        </Typography>
      </Box>
      <NumberInput fullWidth sx={{ marginLeft: 3 }} {...rest}></NumberInput>
    </Stack>
  );
};

export default NumberWithLabel;
