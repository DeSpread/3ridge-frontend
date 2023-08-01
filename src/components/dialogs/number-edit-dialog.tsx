import React, { useEffect, useState } from "react";
import SimpleDialog, { SimpleDialogProps } from "./simple-dialog";
import { Box, Stack, TextField } from "@mui/material";
import SecondaryButton from "../atomic/atoms/secondary-button";
import NumberInput from "../atomic/atoms/number-input";
import MathUtil from "../../util/math-util";
import { transformInputValue } from "@graphql-tools/utils";

const NumberEditDialog = (
  props: {
    onConfirmBtnClicked?: (numberValue?: number) => void;
    onChanged?: (text: string) => void;
    defaultNumber?: number;
    minNumber?: number;
    maxNumber?: number;
  } & SimpleDialogProps
) => {
  const { defaultNumber, minNumber, maxNumber, ...rest } = props;
  const [numberValue, setNumberValue] = useState(defaultNumber);

  useEffect(() => {
    if (defaultNumber) {
      setNumberValue(defaultNumber);
    }
  }, [defaultNumber]);

  return (
    <SimpleDialog {...rest} maxWidth={"sm"}>
      <Stack sx={{ marginTop: 1 }}>
        <Box sx={{ width: "100%", background: "", position: "relative" }}>
          <NumberInput
            value={numberValue}
            onChange={(e) => {
              const value = MathUtil.clamp(
                parseInt(e.target.value),
                minNumber,
                maxNumber
              );
              setNumberValue(value);
            }}
          ></NumberInput>
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
              props.onConfirmBtnClicked?.(numberValue);
            }}
          >
            확인
          </SecondaryButton>
        </Stack>
      </Stack>
    </SimpleDialog>
  );
};

export default NumberEditDialog;
