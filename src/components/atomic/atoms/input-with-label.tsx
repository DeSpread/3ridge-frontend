import { Box, OutlinedInputProps, Stack, Typography } from "@mui/material";
import StyledOutlinedInput from "./styled/styled-outlined-input";
import React from "react";

const InputWithLabel = (
  props: {
    label?: string;
  } & OutlinedInputProps
) => {
  const { label, ...rest } = props;
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Box>
        <Typography variant={"body2"}>{label}</Typography>
      </Box>
      <StyledOutlinedInput fullWidth sx={{ marginLeft: 3 }} {...rest} />
    </Stack>
  );
};

export default InputWithLabel;
