import { ContentFormatType, ContentMetadata } from "../__generated__/graphql";
import { ComponentRenderFunc } from "../type";
import StringHelper from "./string-helper";
import React from "react";
import { Typography } from "@mui/material";

class ContentComponentBuilder {
  private readonly contentMetaData: ContentMetadata | undefined;
  private htmlComponentFunc: ComponentRenderFunc | undefined;
  private textComponentFunc: ComponentRenderFunc | undefined;
  private readonly content: string | undefined;

  constructor(contentMetadata?: ContentMetadata) {
    this.contentMetaData = contentMetadata;
    if (this.contentMetaData)
      this.content = StringHelper.getInstance().decodeContentMetaData(
        this.contentMetaData
      );
    this.textComponentFunc = (content) => {
      return <Typography>{content}</Typography>;
    };
    this.htmlComponentFunc = (content) => {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: content ?? "<></>",
          }}
        ></div>
      );
    };
  }

  overrideHtmlComponentFunc = (htmlComponentFunc: ComponentRenderFunc) => {
    this.htmlComponentFunc = htmlComponentFunc;
    return this;
  };

  overrideTextComponentFunc = (textComponentFunc: ComponentRenderFunc) => {
    this.textComponentFunc = textComponentFunc;
    return this;
  };

  render = () => {
    switch (this.contentMetaData?.contentFormatType) {
      case ContentFormatType.Html:
        return this.htmlComponentFunc?.(this.content);

      case ContentFormatType.Text:
        return this.textComponentFunc?.(this.content);

      default:
        return <></>;
    }
    return <></>;
  };
}

export default ContentComponentBuilder;
