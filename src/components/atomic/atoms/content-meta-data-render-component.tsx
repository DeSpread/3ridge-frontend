import { ComponentRenderFunc } from "../../../type";
import {
  ContentFormatType,
  ContentMetadata,
} from "../../../__generated__/graphql";
import { useCallback } from "react";
import { Typography } from "@mui/material";
import StringHelper from "../../../helper/string-helper";

const ContentMetaDataRenderComponent = ({
  contentMetaData,
  htmlComponentFunc = (content) => {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: content ?? "<></>",
        }}
      ></div>
    );
  },
  textComponentFunc = (content) => {
    return <Typography>{content}</Typography>;
  },
}: {
  contentMetaData?: ContentMetadata;
  htmlComponentFunc?: ComponentRenderFunc;
  textComponentFunc?: ComponentRenderFunc;
}) => {
  const comp = useCallback(() => {
    if (contentMetaData) {
      const content =
        StringHelper.getInstance().decodeContentMetaData(contentMetaData);
      switch (contentMetaData?.contentFormatType) {
        case ContentFormatType.Html:
          return htmlComponentFunc?.(content);

        case ContentFormatType.Text:
          return textComponentFunc?.(content);

        default:
          return <></>;
      }
    }
    return <></>;
  }, [contentMetaData, htmlComponentFunc, textComponentFunc]);

  return comp();
};

export default ContentMetaDataRenderComponent;
