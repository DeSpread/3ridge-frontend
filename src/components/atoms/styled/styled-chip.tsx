import { Chip, ChipProps, styled } from "@mui/material";
import React from "react";

const StyledChip = styled((props: ChipProps) => (
  <Chip
    {...props}
    sx={{
      boxShadow: "inset 0px 0px 0px 2px #35333a",
      paddingTop: "18px",
      paddingBottom: "20px",
      paddingLeft: "5px",
      paddingRight: "5px",
      borderRadius: 2,
    }}
  />
))(() => ({}));

export default StyledChip;
