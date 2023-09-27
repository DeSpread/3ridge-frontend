import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

import ComponentHelper from "@/helper/component-helper";
import { Ticket } from "@/types";

interface EventRewardNameProps {
  ticketData?: Ticket;
}

const EventRewardName = ({
  ticketData,
}: PropsWithChildren<EventRewardNameProps>) => {
  return (
    <>
      {ticketData?.rewardPolicy?.context?.rewardName && (
        <Stack
          direction={"column"}
          alignItems={"center"}
          gap={1}
          justifyContent={"space-between"}
        >
          <Typography variant={"body1"}>리워드</Typography>
          <Stack>
            {ComponentHelper.renderMultiLineContentText(
              ticketData?.rewardPolicy?.context?.rewardName ?? "",
              { variant: "body1", textAlign: "center" }
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
