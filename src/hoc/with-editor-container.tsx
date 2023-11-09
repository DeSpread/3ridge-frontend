import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { PropsWithChildren } from "react";

export default function WithEditorContainer<T extends PropsWithChildren>(
  WrappedComponent: React.ComponentType<T>,
) {
  const ComponentWith = (
    props: T & {
      featureFlagChangeOrder?: boolean;
      onClickOrderToPrev?: React.MouseEventHandler;
      onClickOrderToNext?: React.MouseEventHandler;
      onClickForEdit?: React.MouseEventHandler<HTMLDivElement>;
      onClickForDelete?: React.MouseEventHandler<HTMLButtonElement>;
      disableHoverEffect?: boolean;
    },
  ) => {
    const theme = useTheme();
    const OFFSET_SIZE = 2;
    const ICON_SIZE = 32;

    return (
      <div style={{ position: "relative", background: "" }}>
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
              borderColor: props?.disableHoverEffect
                ? "white"
                : theme.palette.secondary.main,
              background: props?.disableHoverEffect ? "" : "#61E1FF55",
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
              sx={{ borderRadius: 16, width: ICON_SIZE, height: ICON_SIZE }}
              onClick={props.onClickForDelete}
            >
              <CloseIcon></CloseIcon>
            </IconButton>
          </Stack>
        )}
        {props.featureFlagChangeOrder && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-between">
            <IconButton
              className="pointer-events-auto m-2 border p-2 hover:bg-white/50"
              title={`순서변경:앞으로\nshift 누를 시 맨 앞으로`}
              onClick={props.onClickOrderToPrev}
            >
              <ArrowBackIosNew />
            </IconButton>
            <IconButton
              className="pointer-events-auto m-2 border p-2 hover:bg-white/50"
              title={`순서변경:뒤로\nshift 누를 시 맨 뒤로`}
              onClick={props.onClickOrderToNext}
            >
              <ArrowForwardIos />
            </IconButton>
          </div>
        )}
      </div>
    );
  };
  return ComponentWith;
}
