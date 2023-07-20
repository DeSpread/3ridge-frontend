import React, { PropsWithChildren } from "react";
import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { parseStrToDate } from "../../../../util/date-util";
import { Ticket } from "../../../../type";
import StyledChip from "../../styled/styled-chip";
import { format } from "date-fns";

const EventDateRange = (props: { ticketData?: Ticket } & PropsWithChildren) => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  const { ticketData } = props;

  const isEventStarted = () => {
    const diff =
      new Date().getTime() -
      parseStrToDate(ticketData?.beginTime ?? "").getTime();
    return diff > 0;
  };

  const isEventComplete = () => {
    const diff =
      parseStrToDate(ticketData?.untilTime ?? "").getTime() -
      new Date().getTime();
    if (diff < 0) {
      return true;
    }
    return ticketData?.completed;
  };

  return smUp ? (
    <Grid
      container
      alignItems={"left"}
      justifyContent={smUp ? "flex-start" : "center"}
      rowSpacing={1}
    >
      {ticketData?.beginTime && !isEventStarted() && (
        <Grid item>
          <StyledChip
            label={"이벤트 시작전"}
            // color={"success"}
            variant="outlined"
            sx={{
              boxShadow: "inset 0px 0px 0px 2px #61e1ff",
              borderWidth: 0,
              background: "#0f0e14",
            }}
          ></StyledChip>
        </Grid>
      )}
      {ticketData && isEventStarted() && !isEventComplete() && (
        <Grid item>
          <StyledChip
            label={"진행중"}
            variant="outlined"
            sx={{
              boxShadow: "inset 0px 0px 0px 2px #0E8074",
              borderWidth: 0,
              background: "#0f0e14",
            }}
          ></StyledChip>
        </Grid>
      )}
      {ticketData && isEventStarted() && isEventComplete() && (
        <Grid item>
          <StyledChip
            label={"이벤트 종료"}
            variant="outlined"
            sx={{
              boxShadow: "inset 0px 0px 0px 2px #D14343",
              borderWidth: 0,
              background: "#0f0e14",
            }}
          ></StyledChip>
        </Grid>
      )}
      {ticketData?.beginTime && (
        <Grid item sx={{ marginLeft: 1 }}>
          {smUp ? (
            <StyledChip
              label={`${format(
                parseStrToDate(ticketData?.beginTime ?? ""),
                "yyyy/MM/dd"
              )} ~ ${format(
                parseStrToDate(ticketData?.untilTime ?? ""),
                "yyyy/MM/dd"
              )} (UTC+09:00)`}
            ></StyledChip>
          ) : (
            <StyledChip
              sx={{ paddingTop: 4, paddingBottom: 4 }}
              label={
                <Stack sx={{}}>
                  <Typography variant={"body2"}>
                    {`${format(
                      parseStrToDate(ticketData?.beginTime ?? ""),
                      "yyyy/MM/dd"
                    )}
                  ~`}
                  </Typography>
                  <Typography variant={"body2"}>
                    {`${format(
                      parseStrToDate(ticketData?.untilTime ?? ""),
                      "yyyy/MM/dd"
                    )} (UTC+09:00)
                  `}
                  </Typography>
                </Stack>
              }
            ></StyledChip>
          )}
        </Grid>
      )}
    </Grid>
  ) : (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ background: "" }}
    >
      {ticketData?.beginTime && ticketData?.untilTime && (
        <>
          <Typography>{`${format(
            parseStrToDate(ticketData?.beginTime ?? ""),
            "yyyy/MM/dd"
          )}`}</Typography>
          <Typography>
            {`~ ${format(
              parseStrToDate(ticketData?.untilTime ?? ""),
              "yyyy/MM/dd"
            )} (UTC+09:00)`}
          </Typography>
        </>
      )}
      {ticketData?.beginTime && !isEventStarted() && (
        <Box sx={{ marginTop: 2 }}>
          <StyledChip
            label={"이벤트 시작전"}
            // color={"success"}
            variant="outlined"
            sx={{
              boxShadow: "inset 0px 0px 0px 2px #61e1ff",
              borderWidth: 0,
              background: "#0f0e14",
            }}
          ></StyledChip>
        </Box>
      )}
      {ticketData && isEventStarted() && !isEventComplete() && (
        <Box sx={{ marginTop: 2 }}>
          <StyledChip
            label={"진행중"}
            variant="outlined"
            sx={{
              boxShadow: "inset 0px 0px 0px 2px #0E8074",
              borderWidth: 0,
              background: "#0f0e14",
            }}
          ></StyledChip>
        </Box>
      )}
      {ticketData && isEventStarted() && isEventComplete() && (
        <Box sx={{ marginTop: 2 }}>
          <StyledChip
            label={"이벤트 종료"}
            variant="outlined"
            sx={{
              boxShadow: "inset 0px 0px 0px 2px #D14343",
              borderWidth: 0,
              background: "#0f0e14",
            }}
          ></StyledChip>
        </Box>
      )}
    </Stack>
  );
};

export default EventDateRange;
