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
    const OFFSET_SIZE = 2;
    const ICON_SIZE = 8;

    return (
      <div style={{ position: "relative" }}>
        <WrappedComponent {...(props as T)} />
        <Box
          sx={{
            position: "absolute",
            left: -OFFSET_SIZE,
            top: -OFFSET_SIZE,
            width: `calc(100% + ${OFFSET_SIZE * 2}px);`,
            height: `calc(100% + ${OFFSET_SIZE * 2}px);`,
            background: "",
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "white",
            borderRadius: 1,
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
        >
          {props.children}
        </Box>
        {props.onClickForDelete && (
          <Stack
            sx={{
              position: "absolute",
              left: -ICON_SIZE * 2,
              top: -ICON_SIZE * 2,
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
              sx={{ borderRadius: 16, width: ICON_SIZE, height: ICON_SIZE }}
              onClick={props.onClickForDelete}
            >
              <CloseIcon></CloseIcon>
            </IconButton>
          </Stack>
        )}
      </div>
    );
  };
  return ComponentWith;
}
