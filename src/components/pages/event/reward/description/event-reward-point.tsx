import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { PropsWithChildren } from "react";
import { Ticket } from "../../../../../types";

const EventRewardPoint = (
  props: { ticketData?: Ticket } & PropsWithChildren
) => {
  const { ticketData } = props;

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Typography variant={"body1"}>포인트</Typography>
      <Stack direction={"row"} alignItems={"center"}>
        <Image
          src={
            "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/icon_point.svg"
          }
          alt={"StarIcon"}
          width={32}
          height={32}
        ></Image>
        <Typography variant={"body1"}>
          {ticketData?.rewardPolicy?.rewardPoint ?? 0}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default EventRewardPoint;
