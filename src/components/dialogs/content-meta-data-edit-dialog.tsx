import React, { useEffect, useState } from "react";
import SimpleDialog, { SimpleDialogProps } from "./simple-dialog";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import SecondaryButton from "../atomic/atoms/secondary-button";
import {
  ContentEncodingType,
  ContentFormatType,
  ContentMetadata,
} from "../../__generated__/graphql";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import { useTheme } from "@mui/material/styles";
import StyledOutlinedInput from "../atomic/atoms/styled/styled-outlined-input";
import { decodeBase64, encodeBase64 } from "../../util/string-util";
require("prismjs/components/prism-jsx");
require("prismjs/components/prism-markdown");
// require("prismjs/components/prism-");
import { highlight, languages } from "prismjs";

const ContentMetaDataEditDialog = (
  props: {
    onConfirmBtnClicked?: (content?: ContentMetadata) => void;
    content?: ContentMetadata;
  } & SimpleDialogProps
) => {
  const { content, ...rest } = props;

  const [contentFormatType, setContentFormatType] = useState<ContentFormatType>(
    ContentFormatType.Text
  );

  const [textValue, setTextValue] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const [markdownValue, setMarkdownValue] = useState("");
  const theme = useTheme();

  useEffect(() => {
    if (content?.contentFormatType) {
      setContentFormatType(content?.contentFormatType);
    }
  }, [content?.contentFormatType]);

  useEffect(() => {
    if (content?.content) {
      let targetValue;
      if (content?.contentEncodingType === ContentEncodingType.Base64) {
        targetValue = decodeBase64(content?.content);
      } else if (content?.contentEncodingType === ContentEncodingType.None) {
        targetValue = content?.content;
      }

      setTextValue("");
      setCodeValue("");
      setMarkdownValue("");
      if (content?.contentFormatType === ContentFormatType.Text) {
        setTextValue(targetValue ?? "");
      } else if (content?.contentFormatType === ContentFormatType.Html) {
        setCodeValue(targetValue ?? "");
      } else if (content?.contentFormatType === ContentFormatType.Markdown) {
        setMarkdownValue(targetValue ?? "");
      }
    }
  }, [content?.content]);

  return (
    <SimpleDialog {...rest} maxWidth={"sm"}>
      <Stack sx={{ marginTop: 1 }}>
        <Stack sx={{ width: "100%", background: "" }} alignItems={"flex-start"}>
          <Box>
            <FormControl>
              <InputLabel>TYPE</InputLabel>
              <Select
                value={contentFormatType}
                label="FormatType"
                onChange={(e) => {
                  const { value } = e.target;
                  if (value === "TEXT") {
                    setContentFormatType(ContentFormatType.Text);
                  } else if (value === "HTML") {
                    setContentFormatType(ContentFormatType.Html);
                  } else if (value === "MARKDOWN") {
                    setContentFormatType(ContentFormatType.Markdown);
                  }
                }}
              >
                <MenuItem value={ContentFormatType.Text}>Text</MenuItem>
                <MenuItem value={ContentFormatType.Html}>Html</MenuItem>
                <MenuItem value={ContentFormatType.Markdown}>Markdown</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
        <Box sx={{ width: "100%", marginTop: 2 }}>
          {contentFormatType === ContentFormatType.Text && (
            <Editor
              value={textValue}
              onValueChange={(code) => setTextValue(code)}
              highlight={(code) =>
                highlight(code, languages.markup!, "markdown")
              }
              padding={15}
              className="container__editor"
            />
          )}
          {contentFormatType === ContentFormatType.Html && (
            <Editor
              value={codeValue}
              onValueChange={(code) => setCodeValue(code)}
              highlight={(code) => highlight(code, languages.jsx!, "jsx")}
              padding={15}
              className="container__editor"
            />
          )}
          {contentFormatType === ContentFormatType.Markdown && (
            <Editor
              value={markdownValue}
              onValueChange={(code) => setMarkdownValue(code)}
              highlight={(code) =>
                highlight(code, languages.markup!, "markdown")
              }
              padding={15}
              className="container__editor"
            />
            // <Editor
            //   value={markdownValue}
            //   onValueChange={(code: React.SetStateAction<string>) =>
            //     setMarkdownValue(code)
            //   }
            //   highlight={(_code: any) =>
            //     Prism.highlight(_code, Prism.languages.markup, "markdown")
            //   }
            //   padding={10}
            //   style={{
            //     width: "100%",
            //     borderColor: theme.palette.neutral[700],
            //     paddingTop: 3,
            //     paddingBottom: 3,
            //   }}
            //   className="container__editor"
            // />
          )}
        </Box>
        <Stack
          direction={"row"}
          justifyContent={"flex-end"}
          sx={{ marginTop: 3 }}
        >
          <SecondaryButton
            fullWidth={true}
            onClick={(e) => {
              e.preventDefault();
              const contentEncodingType =
                contentFormatType === ContentFormatType.Text
                  ? ContentEncodingType.None
                  : ContentEncodingType.Base64;
              let content = textValue;
              if (contentFormatType === ContentFormatType.Html) {
                content = encodeBase64(codeValue);
              } else if (contentFormatType === ContentFormatType.Markdown) {
                content = encodeBase64(markdownValue);
              }
              const newContentMetaData = {
                content,
                contentEncodingType,
                contentFormatType: contentFormatType,
              };
              // console.log(newContentMetaData);
              props.onConfirmBtnClicked?.(newContentMetaData);
            }}
          >
            확인
          </SecondaryButton>
        </Stack>
      </Stack>
    </SimpleDialog>
  );
};

export default ContentMetaDataEditDialog;
