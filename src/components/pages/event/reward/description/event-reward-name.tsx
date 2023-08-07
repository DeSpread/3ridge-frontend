import { Ticket } from "../../../../../types";
import React, { PropsWithChildren } from "react";
import { Skeleton, Stack, Typography, Box } from "@mui/material";
import ComponentHelper from "../../../../../helper/component-helper";

const EventRewardName = (
  props: { ticketData?: Ticket } & PropsWithChildren
) => {
  const { ticketData } = props;
  return (
    <>
      {ticketData?.rewardPolicy?.context?.rewardName && (
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ paddingTop: 1 }}
        >
          <Typography variant={"body1"}>리워드</Typography>
          <Stack direction={"column"} alignItems={"flex-end"}>
            {ComponentHelper.renderMultiLineContentText(
              ticketData?.rewardPolicy?.context?.rewardName ?? "",
              { variant: "body1", textAlign: "right" }
            )}
          </Stack>
        </Stack>
      )}
      {(!ticketData || !ticketData?.rewardPolicy?.context?.rewardName) && (
        <Box sx={{ width: "100%", height: 30 }}></Box>
      )}
    </>
  );
};

export default EventRewardName;
