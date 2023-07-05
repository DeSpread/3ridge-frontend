import { Box, Grid, Stack, Typography, TypographyProps } from "@mui/material";
import React, { MouseEventHandler, PropsWithChildren, ReactNode } from "react";
import { PartialTicket } from "../../type";
import StringHelper from "../../helper/string-helper";

type TicketInfoViewProps = TypographyProps & {
  ticket?: PartialTicket;
};

const TicketInfoTextSet = ({ ticket, sx }: TicketInfoViewProps) => {
  return (
    <Stack>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
        <Typography variant={"body2"} sx={{ ...sx }} textAlign={"center"}>
          {`${ticket?.rewardPolicy?.context?.point ?? 0} 포인트`}
        </Typography>
        {ticket?.rewardPolicy?.context?.rewardAmount && (
          <Box sx={{ paddingLeft: "4px" }}>
            <Typography variant={"body2"} textAlign={"center"}>
              {` / ${StringHelper.getInstance().getRewardAmountLabel(
                ticket?.rewardPolicy?.context?.rewardAmount
              )}`}
            </Typography>
          </Box>
        )}
      </Stack>
      {ticket?.rewardPolicy?.context?.rewardName ? (
        <Box sx={{}}>
          <Typography
            variant={"body2"}
            sx={{
              ...sx,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
            }}
            textAlign={"center"}
          >
            {`${ticket?.rewardPolicy?.context?.rewardName ?? ""}`}
          </Typography>
        </Box>
      ) : (
        <Typography>&nbsp;</Typography>
      )}
    </Stack>
  );
};

export default TicketInfoTextSet;
