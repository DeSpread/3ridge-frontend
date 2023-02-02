import { ButtonProps, Stack, Typography } from "@mui/material";
import React, { MouseEventHandler, useEffect, useMemo, useState } from "react";
import { MouseEventWithStateParam, ReversibleSvgIconProps } from "../../type";
import { useTheme } from "@mui/material/styles";
import PrimaryButton from "../atoms/primary-button";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

type ValidatorButton = ButtonProps & {
  value: string | undefined;
  svgIcon: React.ComponentType<ReversibleSvgIconProps> | undefined;
  label: string | undefined;
  onClick?: MouseEventHandler;
};

export const VALIDATOR_BUTTON_STATES = {
  VALID_HOVER: "VALID_HOVER",
  NOT_VALID_HOVER: "NOT_VALID_HOVER",
  VALID_NOT_HOVER: "VALID_NOT_HOVER",
  NOT_VALID_NOT_HOVER: "NOT_VALID_NOT_HOVER",
};

export const ValidatorButton = (props: ValidatorButton) => {
  const theme = useTheme();
  const [mouseOver, setMouseOver] = useState(false);

  const [buttonState, setButtonState] = useState(
    VALIDATOR_BUTTON_STATES.VALID_HOVER
  );

  const updateButtonState = () => {
    if (props.value && mouseOver) {
      setButtonState(VALIDATOR_BUTTON_STATES.VALID_HOVER);
    }
    if (!props.value && mouseOver) {
      setButtonState(VALIDATOR_BUTTON_STATES.NOT_VALID_HOVER);
    }
    if (props.value && !mouseOver) {
      setButtonState(VALIDATOR_BUTTON_STATES.VALID_NOT_HOVER);
    }
    if (!props.value && !mouseOver) {
      setButtonState(VALIDATOR_BUTTON_STATES.NOT_VALID_NOT_HOVER);
    }
  };

  useEffect(() => {
    updateButtonState();
  }, [mouseOver]);

  useEffect(() => {
    updateButtonState();
  });

  return (
    <PrimaryButton
      onMouseEnter={() => {
        setMouseOver(true);
      }}
      onMouseLeave={() => {
        setMouseOver(false);
      }}
      onClick={() => {
        const myEvent = {} as MouseEventWithStateParam;
        myEvent.params = {
          state: buttonState,
        };
        props.onClick?.(myEvent);
      }}
    >
      <Stack
        direction={"row"}
        spacing={1}
        sx={{ paddingLeft: 1, paddingRight: 1 }}
      >
        {props.svgIcon && (
          <props.svgIcon
            reverse={buttonState === VALIDATOR_BUTTON_STATES.VALID_NOT_HOVER}
          ></props.svgIcon>
        )}
        {props.value && (
          <Typography
            variant={"body2"}
            sx={{
              color:
                buttonState === VALIDATOR_BUTTON_STATES.VALID_NOT_HOVER
                  ? theme.palette.neutral["600"]
                  : theme.palette.neutral["100"],
            }}
          >{`${props.label} Connected`}</Typography>
        )}
        {buttonState === VALIDATOR_BUTTON_STATES.VALID_NOT_HOVER && (
          <DoneIcon sx={{ color: theme.palette.neutral["600"] }}></DoneIcon>
        )}
        {buttonState === VALIDATOR_BUTTON_STATES.VALID_HOVER && (
          <CloseIcon></CloseIcon>
        )}
        {!props.value &&
          buttonState === VALIDATOR_BUTTON_STATES.NOT_VALID_NOT_HOVER && (
            <Typography
              variant={"body2"}
              color={"neutral.900"}
            >{`Connect ${props.label}`}</Typography>
          )}
        {!props.value &&
          buttonState === VALIDATOR_BUTTON_STATES.NOT_VALID_HOVER && (
            <Typography
              variant={"body2"}
              color={"neutral.100"}
            >{`Connect ${props.label}`}</Typography>
          )}
      </Stack>
    </PrimaryButton>
  );
};
