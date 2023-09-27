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
        <div className="text-outline flex flex-col items-center gap-2">
          <div className="text-body1">리워드</div>
          <div>
            {ComponentHelper.renderMultiLineContentText(
              ticketData?.rewardPolicy?.context?.rewardName ?? "",
              { variant: "body1", textAlign: "center" },
            )}
          </div>
        </div>
      )}
      {(!ticketData || !ticketData?.rewardPolicy?.context?.rewardName) && (
        <Box sx={{ width: "100%", height: 30 }}></Box>
      )}
    </>
  );
};

export default EventRewardName;
