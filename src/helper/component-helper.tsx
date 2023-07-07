import { Typography, TypographyProps } from "@mui/material";
import React, { CSSProperties } from "react";
import { ContentFormatType, ContentMetadata } from "../__generated__/graphql";
import StringHelper from "./string-helper";

class ComponentHelper {
  private static instance: ComponentHelper;

  private constructor() {}

  public static getInstance() {
    return this.instance || (this.instance = new this());
  }

  renderMultiLineContentText = (content?: string, props?: TypographyProps) => {
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
