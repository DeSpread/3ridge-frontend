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
  ContentFormatType,
  ContentMetadata,
} from "../../__generated__/graphql";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import { useTheme } from "@mui/material/styles";
import StyledOutlinedInput from "../atomic/atoms/styled/styled-outlined-input";

const ContentMetaDataEditDialog = (
  props: {
    onConfirmBtnClicked?: (text?: string) => void;
    content?: ContentMetadata;
  } & SimpleDialogProps
) => {
  const { content, ...rest } = props;

  const [contentFormatType, setContentFormatType] = useState<ContentFormatType>(
    ContentFormatType.Text
  );

  const [code, setCode] = useState("<html></html>");
  const [textValue, setTextValue] = useState("");
  const theme = useTheme();

  useEffect(() => {
    if (content?.contentFormatType) {
      setContentFormatType(content?.contentFormatType);
    }
  }, [content?.contentFormatType]);

  return (
    <SimpleDialog {...rest} maxWidth={"sm"}>
      <Stack sx={{ marginTop: 1 }}>
        <Stack sx={{ width: "100%", background: "" }} alignItems={"flex-end"}>
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
                  }
                }}
              >
                <MenuItem value={ContentFormatType.Text}>Text</MenuItem>
                <MenuItem value={ContentFormatType.Html}>Html</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
        {contentFormatType === ContentFormatType.Text && (
          <Box sx={{ width: "100%", marginTop: 1 }}>
            <StyledOutlinedInput
              sx={{
                width: "100%",
              }}
              value={textValue}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setTextValue(e.target.value);
              }}
              multiline
            />
          </Box>
        )}
        {contentFormatType === ContentFormatType.Html && (
          <Box sx={{ width: "100%", marginTop: 1 }}>
            <Editor
              value={code}
              onValueChange={(code: React.SetStateAction<string>) =>
                setCode(code)
              }
              highlight={(_code: any) =>
                Prism.highlight(_code, Prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                width: "100%",
                borderColor: theme.palette.neutral[700],
              }}
              className="container__editor"
            />
          </Box>
        )}
        <Stack
          direction={"row"}
          justifyContent={"flex-end"}
          sx={{ marginTop: 3 }}
        >
          <SecondaryButton
            fullWidth={true}
            onClick={(e) => {
              e.preventDefault();
              const newContentMetaData = {};
              // props.onConfirmBtnClicked?.(textValue);
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
