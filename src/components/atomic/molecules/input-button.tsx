import { ButtonProps, IconButton } from "@mui/material";
import React from "react";

import { APP_ERROR_MESSAGE, AppError } from "@/error/my-error";

const InputButton = (
  props: {
    onChanged?: (file: File) => void;
    onError?: (error: AppError) => void;
    filterReg?: RegExp;
  } & ButtonProps,
) => {
  const { filterReg = /(gif|jpe?g|tiff?|png|webp|bmp|svg\+xml)$/i } = props;

  return (
    <IconButton component="label" sx={props.sx}>
      <input
        name={"newImage"}
        type="file"
        hidden
        onChange={async (e) => {
          if (e.target.files?.[0]) {
            const file = e.target.files[0];
            if (filterReg.test(file.type)) {
              props.onChanged?.(file);
            } else {
              props.onError?.(
                new AppError(APP_ERROR_MESSAGE.INPUT_FILE_FORMAT_NOT_SUPPORTED),
              );
            }
          }
          e.target.value = "";
        }}
      />
    </IconButton>
  );
};

export default InputButton;
