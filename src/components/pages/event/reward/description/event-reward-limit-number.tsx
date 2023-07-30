import { Ticket } from "../../../../../type";
import { PropsWithChildren } from "react";
import { Stack, Typography } from "@mui/material";
import StringHelper from "../../../../../helper/string-helper";

const EventRewardLimitNumber = (
  props: { ticketData?: Ticket } & PropsWithChildren
) => {
  const { ticketData } = props;

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      sx={{ paddingTop: 1 }}
    >
      <Typography variant={"body1"}>대상자 수</Typography>
      <Stack direction={"row"} alignItems={"center"}>
        <Typography variant={"body1"}>
          {StringHelper.getRewardAmountLabel(
            ticketData?.rewardPolicy?.context?.limitNumber
          )}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default EventRewardLimitNumber;
