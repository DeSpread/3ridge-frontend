import { TimerSettings, useTimer } from "react-timer-hook";
import { Box, Stack, Typography } from "@mui/material";
import React, { CSSProperties } from "react";

interface MyTimerSettings extends TimerSettings {
  sx?: CSSProperties;
}

export const DummyTimerBoard = (props: { sx?: CSSProperties }) => {
  const CELL_WIDTH = 40;

  return (
    <Box sx={props.sx}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
      >
        <Stack
          direction={"column"}
          alignItems={"center"}
          sx={{ width: CELL_WIDTH }}
        >
          <Typography variant={"h5"}>{"00"}</Typography>
          <Typography variant={"body2"}>일</Typography>
        </Stack>
        <Stack
          direction={"column"}
          alignItems={"center"}
          sx={{ width: CELL_WIDTH }}
        >
          <Typography variant={"h5"}>{"00"}</Typography>
          <Typography variant={"body2"}>시</Typography>
        </Stack>
        <Stack
          direction={"column"}
          alignItems={"center"}
          sx={{ width: CELL_WIDTH }}
        >
          <Typography variant={"h5"}>{"00"}</Typography>
          <Typography variant={"body2"}>분</Typography>
        </Stack>
        <Stack
          direction={"column"}
          alignItems={"center"}
          sx={{ width: CELL_WIDTH }}
        >
          <Typography variant={"h5"}>{"00"}</Typography>
          <Typography variant={"body2"}>초</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

const TimerBoard = (props: MyTimerSettings) => {
  const { seconds, minutes, hours, days } = useTimer(props);
  const CELL_WIDTH = 40;

  return (
    <Box sx={props.sx}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
        sx={{ background: "" }}
      >
        <Stack
          direction={"column"}
          alignItems={"center"}
          sx={{ width: CELL_WIDTH }}
        >
          <Typography variant={"h5"}>
            {days.toString().padStart(2, "0")}
          </Typography>
          <Typography variant={"body2"}>일</Typography>
        </Stack>
        <Stack
          direction={"column"}
          alignItems={"center"}
          sx={{ width: CELL_WIDTH }}
        >
          <Typography variant={"h5"}>
            {hours.toString().padStart(2, "0")}
          </Typography>
          <Typography variant={"body2"}>시</Typography>
        </Stack>
        <Stack
          direction={"column"}
          alignItems={"center"}
          sx={{ width: CELL_WIDTH }}
        >
          <Typography variant={"h5"}>
            {minutes.toString().padStart(2, "0")}
          </Typography>
          <Typography variant={"body2"}>분</Typography>
        </Stack>
        <Stack
          direction={"column"}
          alignItems={"center"}
          sx={{ width: CELL_WIDTH }}
        >
          <Typography variant={"h5"}>
            {seconds.toString().padStart(2, "0")}
          </Typography>
          <Typography variant={"body2"}>초</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TimerBoard;
