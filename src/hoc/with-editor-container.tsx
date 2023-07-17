import React, { PropsWithChildren } from "react";
import { Box, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

export default function WithEditorContainer<T extends PropsWithChildren>(
  WrappedComponent: React.ComponentType<T>
) {
  const ComponentWith = (
    props: T & {
      onClickForEdit?: React.MouseEventHandler<HTMLDivElement>;
      onClickForDelete?: React.MouseEventHandler<HTMLButtonElement>;
    }
  ) => {
    const theme = useTheme();

    return (
      <div style={{ position: "relative" }}>
        <WrappedComponent {...(props as T)} />
        <Box
          sx={{
            position: "absolute",
            left: -16,
            top: -16,
            width: `calc(100% + 32px);`,
            height: `calc(100% + 32px);`,
            background: "",
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "white",
            borderRadius: 2,
            cursor: "pointer",
            transition: "all 0.2s ease-out 0s",
            transitionDuration: "0.2s",
            transitionDelay: "0s",
            transitionTimingFunction: "ease-out",
            "&:hover": {
              borderColor: theme.palette.secondary.main,
            },
          }}
          onClick={props.onClickForEdit}
        ></Box>
        <Stack
          sx={{
            position: "absolute",
            left: -32,
            top: -32,
            background: "",
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "white",
            borderRadius: 16,
            backgroundColor: "black",
            width: 32,
            height: 32,
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
            sx={{ borderRadius: 16, width: 16, height: 16 }}
            onClick={props.onClickForDelete}
          >
            <CloseIcon></CloseIcon>
          </IconButton>
        </Stack>
        {props.children}
      </div>
    );
  };
  return ComponentWith;
}
