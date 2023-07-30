import { ComponentRenderFunc } from "../../../type";
import {
  ContentFormatType,
  ContentMetadata,
} from "../../../__generated__/graphql";
import {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Box, Stack, Typography } from "@mui/material";
import StringHelper from "../../../helper/string-helper";
import { marked } from "marked";
import LinkTypography from "./link-typography";

marked.use({
  gfm: true,
  breaks: true,
});

const MarkDownRenderer = ({
  content,
}: { content?: string } & PropsWithChildren) => {
  const html = useMemo(() => {
    if (!content) {
      return "";
    }
    const html = marked.parse(content);
    return html;
  }, [content]);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html ?? "<></>",
      }}
    ></div>
  );
};

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
  markComponentFunc = (content) => {
    return <MarkDownRenderer content={content}></MarkDownRenderer>;
  },
}: {
  contentMetaData?: ContentMetadata;
  htmlComponentFunc?: ComponentRenderFunc;
  textComponentFunc?: ComponentRenderFunc;
  markComponentFunc?: ComponentRenderFunc;
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

        case ContentFormatType.Markdown:
          return markComponentFunc?.(content);

        default:
          return <></>;
      }
    }
    return <></>;
  }, [
    contentMetaData,
    htmlComponentFunc,
    textComponentFunc,
    markComponentFunc,
  ]);

  return comp();
};

export default ContentMetaDataRenderComponent;
