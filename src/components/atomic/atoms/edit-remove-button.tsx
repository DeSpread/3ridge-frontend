import CloseIcon from "@mui/icons-material/Close";
import { ButtonProps, IconButton, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

const EditRemoveButton = (props: ButtonProps) => {
  const ICON_SIZE = 32;

  const theme = useTheme();

  return (
    <>
      <Stack
        sx={{
          position: "absolute",
          left: `calc(100% - ${ICON_SIZE / 2 + 8}px)`,
          top: `${-(ICON_SIZE / 2 - 8)}px`,
          background: "",
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: "white",
          borderRadius: 16,
          backgroundColor: "black",
          transition: "all 0.2s ease-out 0s",
          transitionDuration: "0.2s",
          transitionDelay: "0s",
          transitionTimingFunction: "ease-out",
          "&:hover": {
            borderColor: theme.palette.error.main,
            "& .MuiIconButton": {
              color: theme.palette.error.main,
            },
          },
        }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <IconButton
          className={"MuiIconButton"}
          sx={{
            borderRadius: 16,
            width: ICON_SIZE,
            height: ICON_SIZE,
            ...props.sx,
          }}
          {...props}
        >
          <CloseIcon></CloseIcon>
        </IconButton>
      </Stack>
    </>
  );
};

export default EditRemoveButton;
