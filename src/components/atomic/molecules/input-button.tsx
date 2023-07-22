import { ButtonProps, IconButton } from "@mui/material";
import React from "react";

const InputButton = (
  props: { onChanged?: (file: File) => void } & ButtonProps
) => {
  return (
    <IconButton component="label" sx={props.sx}>
      <input
        name={"newImage"}
        type="file"
        hidden
        onChange={async (e) => {
          if (e.target.files?.[0]) {
            const file = e.target.files[0];
            if (/\/(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file.type)) {
              props.onChanged?.(file);
            }
          }
          e.target.value = "";
        }}
      />
    </IconButton>
  );
};

export default InputButton;
