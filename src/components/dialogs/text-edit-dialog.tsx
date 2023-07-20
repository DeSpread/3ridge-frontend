import React, { MouseEventHandler, useState } from "react";
import SimpleDialog, { QuestSimpleDialogProps } from "./simple-dialog";
import { Box, Stack } from "@mui/material";
import StyledOutlinedInput from "../atoms/styled/styled-outlined-input";
import SecondaryButton from "../atoms/secondary-button";

const TextEditDialog = (
  props: {
    onCloseBtnClicked?: MouseEventHandler;
    onConfirmBtnClicked?: (text: string) => void;
    placeholder?: string;
    onChanged?: (text: string) => void;
  } & QuestSimpleDialogProps
) => {
  const { ...rest } = props;
  const [textValue, setTextValue] = useState("");

  return (
    <SimpleDialog
      {...rest}
      maxWidth={"sm"}
      onClose={() => {
        setTextValue("");
        // @ts-ignore
        props.onCloseBtnClicked?.(undefined);
      }}
      onCloseBtnClicked={(e) => {
        setTextValue("");
        props.onCloseBtnClicked?.(e);
      }}
    >
      <Stack sx={{ marginTop: 1 }}>
        <Box sx={{ width: "100%", background: "", position: "relative" }}>
          <StyledOutlinedInput
            placeholder={props.placeholder}
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
              setTextValue("");
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
