import { Box, ButtonProps, Stack, Typography } from "@mui/material";
import React, { MouseEventHandler } from "react";
import { MouseEventWithParam, ReversibleSvgIconProps } from "../../type";
import { useTheme } from "@mui/material/styles";
import PrimaryButton from "../atoms/primary-button";
import CloseIcon from "@mui/icons-material/Close";

type ValidatorButton<T> = ButtonProps & {
  value: string | undefined;
  svgIcon: React.ComponentType<ReversibleSvgIconProps> | undefined;
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
    >
      <Stack
        direction={"row"}
        spacing={1}
        sx={{ paddingLeft: 1, paddingRight: 1 }}
      >
        <Stack
          sx={{ paddingLeft: 2, paddingRight: 2 }}
          direction={"row"}
          spacing={1}
        >
          {props.svgIcon && <props.svgIcon></props.svgIcon>}
          {props.value && (
            <Typography
              className={"MuiTypography"}
              variant={"body2"}
              sx={{
                color: theme.palette.neutral["600"],
              }}
            >{`${props.label}에 연결되었습니다`}</Typography>
          )}
          {!props.value && (
            <Typography
              className={"MuiTypography"}
              variant={"body2"}
              sx={{
                color: theme.palette.neutral["600"],
                paddingRight: 1,
              }}
            >{`${props.label}에 연결해주세요`}</Typography>
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
