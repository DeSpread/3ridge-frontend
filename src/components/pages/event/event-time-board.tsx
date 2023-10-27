import { Box, Stack, Typography } from "@mui/material";
import TimerBoard, {
  DummyTimerBoard,
} from "../../atomic/molecules/timer-board";
import DateUtil from "../../../util/date-util";
import PrimaryCard from "../../atomic/atoms/primary-card";
import React, { PropsWithChildren } from "react";
import { Ticket } from "../../../types";
import { RewardPolicyType } from "@/__generated__/graphql";

const EventTimeBoard = (props: { ticketData?: Ticket } & PropsWithChildren) => {
  const { ticketData } = props;

  const isExpired = () => {
    return ticketData?.untilTime
      ? DateUtil.isAfter(new Date(), ticketData?.untilTime)
      : true;
  };

  const isStarted = () => {
    return ticketData?.beginTime
      ? DateUtil.isAfter(new Date(), ticketData?.beginTime)
      : false;
  };

  if (ticketData?.rewardPolicy?.rewardPolicyType === RewardPolicyType.Always) {
    return null;
  }

  return (
    <PrimaryCard hoverEffect={false}>
      <Box>
        <Stack alignItems={"center"}>
          <Typography
            variant={"body1"}
            sx={{
              color: isExpired()
                ? "#D14343"
                : isStarted()
                ? "white"
                : "#61e1ff",
            }}
          >
            {isExpired()
              ? "본 이벤트가 종료되었습니다"
              : isStarted()
              ? "이벤트 종료까지 남은 시간"
              : "이벤트 시작까지 남은 시간"}
          </Typography>
          {ticketData?.untilTime ? (
            isExpired() ? (
              <DummyTimerBoard
                sx={{
                  marginTop: 4,
                  background: "",
                  width: "100%",
                }}
              />
            ) : isStarted() ? (
              <TimerBoard
                sx={{
                  marginTop: 4,
                  background: "",
                  width: "100%",
                }}
                expiryTimestamp={DateUtil.parseStrToDate(
                  ticketData?.untilTime ?? "",
                )}
              />
            ) : (
              <TimerBoard
                sx={{
                  marginTop: 4,
                  background: "",
                  width: "100%",
                }}
                expiryTimestamp={DateUtil.parseStrToDate(
                  ticketData?.beginTime ?? "",
                )}
                onExpire={() => {
                  console.log("refresh all");
                  window.location.reload();
                }}
              />
            )
          ) : (
            <DummyTimerBoard
              sx={{
                marginTop: 4,
                background: "",
                width: "100%",
              }}
            />
          )}
        </Stack>
      </Box>
    </PrimaryCard>
  );
};

export default EventTimeBoard;
