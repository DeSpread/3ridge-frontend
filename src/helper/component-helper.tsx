import { Typography, TypographyProps } from "@mui/material";
import React from "react";

class ComponentHelper {
  private static instance: ComponentHelper;

  private constructor() {}

  public static getInstance() {
    return this.instance || (this.instance = new this());
  }

  multiLineContentText = (content?: string, props?: TypographyProps) => {
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
