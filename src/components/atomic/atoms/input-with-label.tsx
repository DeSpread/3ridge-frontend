import { Box, OutlinedInputProps, Stack, Typography } from "@mui/material";
import React from "react";

import StyledOutlinedInput from "./styled/styled-outlined-input";

const InputWithLabel = (
  props: {
    label?: string;
    labelWidth?: string | number;
  } & OutlinedInputProps,
) => {
  const { label, labelWidth, ...rest } = props;
  console.log(label, rest);
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      sx={{ width: "100%" }}
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
      <StyledOutlinedInput fullWidth sx={{ marginLeft: 3 }} {...rest} />
    </Stack>
  );
};

export default InputWithLabel;
