import { Chip, ChipProps, styled } from "@mui/material";
import React from "react";

const StyledChip = styled((props: ChipProps) => (
  <Chip
    {...props}
    sx={{
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 1,
      paddingRight: 1,
    }}
  />
))(() => ({}));

export default StyledChip;
