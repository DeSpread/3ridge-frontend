import { Typography, TypographyProps } from "@mui/material";
import React from "react";

class ComponentHelper {
  public static renderMultiLineContentText = (
    content?: string,
    props?: TypographyProps
  ) => {
    if (!content) return <></>;
    return content.split("\n").map((e, index) => {
      return (
        <Typography {...props} key={index}>
          {e}
        </Typography>
      );
    });
  };
}

export default ComponentHelper;
