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
  const rewardName = ticketData?.rewardPolicy?.context?.rewardName;

  if (!ticketData || !rewardName) {
    return <Box sx={{ width: "100%", height: 30 }} />;
  }

  return (
    <div className="border-3 rounded border-solid border-neutral-700 py-4">
      <div className="flex flex-col items-center gap-2">
        <div className="text-body1">리워드</div>
        <p>
          {ComponentHelper.renderMultiLineContentText(rewardName ?? "", {
            variant: "body1",
            textAlign: "center",
          })}
        </p>
      </div>
    </div>
  );
};

export default EventRewardName;
