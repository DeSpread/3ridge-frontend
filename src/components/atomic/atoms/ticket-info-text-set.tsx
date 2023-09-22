import { type TypographyProps } from "@mui/material";
import React from "react";

import StringHelper from "../../../helper/string-helper";
import { PartialTicket } from "../../../types";

type TicketInfoViewProps = {
  ticket?: PartialTicket;
  whiteSpaceMode?: boolean;
} & TypographyProps;

const TicketInfoTextSet = ({ ticket, whiteSpaceMode }: TicketInfoViewProps) => {
  const rewardName = ticket?.rewardPolicy?.context?.rewardName;
  const rewardPoint = ticket?.rewardPolicy?.rewardPoint;
  const limitNumber = ticket?.rewardPolicy?.context?.limitNumber;

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="text-body2-outline break-keep text-center">
          {`${rewardPoint ?? 0} 포인트`}
        </div>
        {limitNumber && (
          <div className="text-body2-outline pl-1 text-center">
            {` / ${StringHelper.getRewardAmountLabel(limitNumber)}`}
          </div>
        )}
      </div>
      {rewardName ? (
        <div className="text-body2-outline line-clamp-1 text-ellipsis">
          {rewardName}
        </div>
      ) : (
        whiteSpaceMode && <br />
      )}
    </div>
  );
};

export default TicketInfoTextSet;
