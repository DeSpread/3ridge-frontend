import { IconButton, IconButtonProps } from "@mui/material";
import React from "react";

export const LinkIconButton = (
  props: IconButtonProps & {
    linkUrl?: string;
  }
) => {
  return (
    <IconButton
      {...props}
      onClick={() => {
        if (props.linkUrl) {
          const newWindow = window.open(
            props.linkUrl,
            "_blank",
            "noopener,noreferrer"
          );
          if (newWindow) newWindow.opener = null;
        }
      }}
    >
      {props.children}
    </IconButton>
  );
};
