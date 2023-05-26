import { Box, Grid, Typography, TypographyProps } from "@mui/material";
import React, { MouseEventHandler, PropsWithChildren, ReactNode } from "react";
import { PartialTicket } from "../../type";

type TicketInfoViewProps = TypographyProps & {
  ticket?: PartialTicket;
};

const TicketInfoTextSet = ({ ticket, sx }: TicketInfoViewProps) => {
  return (
    <Grid
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      // spacing={1}
      container={true}
    >
      <Grid
        // direction={"row"}
        // alignItems={"center"}
        // justifyContent={"center"}
        item
      >
        <Typography variant={"body2"} sx={{ ...sx }}>
          {`${ticket?.rewardPolicy?.context?.point ?? 0} 포인트`}
        </Typography>
      </Grid>
      <Grid item>
        {ticket?.rewardPolicy?.context?.rewardName && (
          <Box sx={{ paddingLeft: "4px" }}>
            <Typography variant={"body2"} sx={{ ...sx }}>
              {`/ ${ticket?.rewardPolicy?.context?.rewardName ?? ""}`}
            </Typography>
          </Box>
        )}
      </Grid>
      <Grid item>
        {ticket?.rewardPolicy?.context?.rewardAmount && (
          <Box sx={{ paddingLeft: "4px" }}>
            <Typography variant={"body2"} sx={{ ...sx }}>
              {` / ${ticket?.rewardPolicy?.context?.rewardAmount ?? ""} 명`}
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default TicketInfoTextSet;
