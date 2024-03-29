import CloseIcon from "@mui/icons-material/Close";
import { Box, ButtonProps, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { MouseEventHandler } from "react";

import { MouseEventWithParam, ReversibleSvgIconProps } from "../../../types";
import PrimaryButton from "../atoms/primary-button";

type ValidatorButton<T> = ButtonProps & {
  value: string | undefined;
  icon?: React.ReactNode; //React.ComponentType<ReversibleSvgIconProps> | undefined;
  label: string | undefined;
  onClick?: MouseEventHandler;
  payload: T | undefined;
};

export const VALIDATOR_BUTTON_STATES = {
  VALID: "VALID",
  NOT_VALID: "NOT_VALID",
};

export function ValidatorButton<T>(props: ValidatorButton<T>) {
  const theme = useTheme();

  return (
    <PrimaryButton
      onClick={() => {
        const myEvent = {} as MouseEventWithParam<{
          state?: string;
          payload: T | undefined;
        }>;
        myEvent.params = {
          state: props.value
            ? VALIDATOR_BUTTON_STATES.VALID
            : VALIDATOR_BUTTON_STATES.NOT_VALID,
          payload: props.payload,
        };
        props.onClick?.(myEvent);
      }}
      sx={props.sx}
      fullWidth={props.fullWidth}
      disabled={props.disabled}
    >
      <Stack
        direction={"row"}
        spacing={1}
        sx={{
          paddingLeft: 1,
          paddingRight: 1,
          background: "",
          width: "100%",
        }}
        alignItems={"center"}
        // justifyContent={"center"}
      >
        <Stack
          sx={{ background: "", paddingRight: 2 }}
          direction={"row"}
          spacing={2}
          alignItems={"center"}
        >
          {props.icon}
          {/*{props.svgIcon && <props.svgIcon></props.svgIcon>}*/}
          {props.value && (
            <Typography
              className={"MuiTypography"}
              variant={"body2"}
              sx={{
                color: props.disabled ? "white" : theme.palette.neutral["600"],
              }}
            >{`${props.label}에 연동되었습니다`}</Typography>
          )}
          {!props.value && (
            <Typography
              className={"MuiTypography"}
              variant={"body2"}
              sx={{
                color: props.disabled ? "white" : theme.palette.neutral["600"],
              }}
            >{`${props.label}에 연동해주세요`}</Typography>
          )}
        </Stack>
        {props.value && (
          <div
            style={{
              position: "absolute",
              background: "",
              width: "92%",
              height: "100%",
              left: 0,
              top: 0,
              padding: 0,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <CloseIcon></CloseIcon>
          </div>
        )}
      </Stack>
    </PrimaryButton>
  );
}
