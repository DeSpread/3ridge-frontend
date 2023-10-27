import { Stack, Typography } from "@mui/material";
import StyledChip from "../../../atomic/atoms/styled/styled-chip";
import { Ticket } from "../../../../types";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import RedeemIcon from "@mui/icons-material/Redeem";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import React, { PropsWithChildren } from "react";
import { RewardPolicyType } from "@/__generated__/graphql";

const EventRewardPolicy = (
  props: { ticketData?: Ticket } & PropsWithChildren,
) => {
  const { ticketData } = props;
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      sx={{ background: "" }}
    >
      <Typography variant="h5">리워드</Typography>
      <StyledChip
        label={
          ticketData?.rewardPolicy?.rewardPolicyType === RewardPolicyType.Fcfs
            ? "선착순"
            : ticketData?.rewardPolicy?.rewardPolicyType ===
              RewardPolicyType.LuckyDraw
            ? "추첨"
            : "전원"
        }
        icon={
          ticketData?.rewardPolicy?.rewardPolicyType ===
          RewardPolicyType.Fcfs ? (
            <DirectionsRunIcon />
          ) : ticketData?.rewardPolicy?.rewardPolicyType ===
            RewardPolicyType.LuckyDraw ? (
            <RedeemIcon sx={{ paddingRight: "3px" }} />
          ) : (
            <AllInclusiveIcon
              sx={{
                paddingLeft: "2px",
                paddingRight: "3px",
                paddingTop: "2px",
              }}
            />
          )
        }
      ></StyledChip>
    </Stack>
  );
};

export default EventRewardPolicy;
