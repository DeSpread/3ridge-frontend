import TwitterIcon from "@mui/icons-material/Twitter";
import { IconButton, IconButtonProps } from "@mui/material";
import React, { CSSProperties } from "react";

export const LinkIconButton = (
  props: IconButtonProps & {
    linkUrl?: string;
  }
) => {
  return (
    <IconButton
      {...props}
      // sx={{
      //   width: 36,
      //   height: 36,
      //   background: (theme) => theme.palette.neutral["900"],
      //   borderRadius: 16,
      // }}
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
