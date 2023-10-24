import { type TypographyProps } from "@mui/material";
import React from "react";

import StringHelper from "../../../helper/string-helper";
import { PartialTicket } from "../../../types";

type TicketInfoViewProps = {
  ticket?: PartialTicket;
  whiteSpaceMode?: boolean;
} & TypographyProps;

const TicketInfoTextSet = ({ ticket, whiteSpaceMode }: TicketInfoViewProps) => {
  const shortDescription = ticket?.shortDescription;
  const rewardName = ticket?.rewardPolicy?.context?.rewardName;
  const rewardPoint = ticket?.rewardPolicy?.rewardPoint;
  const limitNumber = ticket?.rewardPolicy?.context?.limitNumber;

  if (shortDescription) {
    return (
      <div className="text-body2 text-outline text-center whitespace-pre-wrap">
        {shortDescription}
      </div>
    );
  }

  return (
    <div className="text-body2 text-outline text-center">
      <div className="flex items-center justify-center ">
        <span className="break-keep">{`${rewardPoint ?? 0} 포인트`}</span>
        {limitNumber && (
          <div>
            <span className="px-1">/</span>
            {StringHelper.getRewardAmountLabel(limitNumber)}
          </div>
        )}
      </div>
      {rewardName ? (
        <div className="line-clamp-1 text-ellipsis">{rewardName}</div>
      ) : (
        whiteSpaceMode && <br />
      )}
    </div>
  );
};

export default TicketInfoTextSet;
