import React, { useEffect, useState } from "react";
import SimpleDialog, { SimpleDialogProps } from "./simple-dialog";
import { Box, Stack } from "@mui/material";
import StyledOutlinedInput from "../atomic/atoms/styled/styled-outlined-input";
import SecondaryButton from "../atomic/atoms/secondary-button";

const TextEditDialog = (
  props: {
    onConfirmBtnClicked?: (text?: string) => void;
    onChanged?: (text: string) => void;
    defaultText?: string;
  } & SimpleDialogProps
) => {
  const { defaultText, ...rest } = props;
  const [textValue, setTextValue] = useState(defaultText);

  useEffect(() => {
    setTextValue(defaultText ?? "");
  }, [defaultText]);

  return (
    <SimpleDialog {...rest} maxWidth={"sm"}>
      <Stack sx={{ marginTop: 1 }}>
        <Box sx={{ width: "100%", background: "", position: "relative" }}>
          <StyledOutlinedInput
            sx={{
              width: "100%",
            }}
            value={textValue}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setTextValue(e.target.value);
              props.onChanged?.(e.target.value);
            }}
            multiline
          />
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
              props.onConfirmBtnClicked?.(textValue);
            }}
          >
            확인
          </SecondaryButton>
        </Stack>
      </Stack>
    </SimpleDialog>
  );
};

export default TextEditDialog;
