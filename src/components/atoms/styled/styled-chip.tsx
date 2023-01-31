import { Chip, ChipProps, styled } from "@mui/material";
import React from "react";

const StyledChip = styled((props: ChipProps) => (
  <Chip
    {...props}
    sx={{
      // boxShadow: "inset 2px 4px 4px #35333a, inset -2px -4px 4px #35333a",
      boxShadow:
        "inset 0px 1px 2px 1px #35333a, inset -1px 0px 2px 1px #35333a, inset 1px 0px 2px 1px #35333a, inset 0px -1px 2px 1px #35333a",
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 1,
      paddingRight: 1,
    }}
  />
))(() => ({}));

export default StyledChip;
