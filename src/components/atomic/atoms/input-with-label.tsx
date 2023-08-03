import { Box, OutlinedInputProps, Stack, Typography } from "@mui/material";
import StyledOutlinedInput from "./styled/styled-outlined-input";
import React from "react";

const InputWithLabel = (
  props: {
    label?: string;
    labelWidth?: string | number;
  } & OutlinedInputProps
) => {
  const { label, labelWidth, ...rest } = props;
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
