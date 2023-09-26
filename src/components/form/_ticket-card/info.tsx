import StringHelper from "@/helper/string-helper";

interface TicketCardInfoProps {
  title?: string;
  limitNumber?: number;
  rewardPoint?: number;
  rewardName?: string;
  whiteSpaceMode?: boolean;
}

export const TicketCardInfo = ({
  title,
  limitNumber,
  rewardPoint,
  rewardName,
  whiteSpaceMode,
}: TicketCardInfoProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-12 items-center">
        <div className="text-h6 line-clamp-2 text-ellipsis break-keep text-center font-lineBold">
          {title}
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="text-body2 text-outline text-center">
          <div className="flex justify-center">
            <span className="break-keep">{`${rewardPoint ?? 0} 포인트`}</span>
            {limitNumber && (
              <span>
                &nbsp;/ {StringHelper.getRewardAmountLabel(limitNumber)}
              </span>
            )}
          </div>
          {rewardName ? (
            <div className="line-clamp-1 text-ellipsis">{rewardName}</div>
          ) : (
            whiteSpaceMode && <br />
          )}
        </div>
      </div>
    </div>
  );
};
