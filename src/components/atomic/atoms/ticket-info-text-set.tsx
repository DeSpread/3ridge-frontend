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
    <div className="text-center">
      <div className="flex items-center justify-center">
        <span className="text-body2 text-outline break-keep">
          {`${rewardPoint ?? 0} 포인트`}
        </span>
        {limitNumber && (
          <div>
            <span className="px-1">/</span>
            <span className="text-body2 text-outline">
              {StringHelper.getRewardAmountLabel(limitNumber)}
            </span>
          </div>
        )}
      </div>
      {rewardName ? (
        <div className="text-body2 text-outline line-clamp-1 text-ellipsis">
          {rewardName}
        </div>
      ) : (
        whiteSpaceMode && <br />
      )}
    </div>
  );
};

export default TicketInfoTextSet;
