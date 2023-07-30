import { Stack, Typography } from "@mui/material";
import StyledChip from "../../../atomic/atoms/styled/styled-chip";
import { REWARD_POLICY_TYPE, Ticket } from "../../../../type";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import RedeemIcon from "@mui/icons-material/Redeem";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import React, { PropsWithChildren } from "react";

const EventRewardPolicy = (
  props: { ticketData?: Ticket } & PropsWithChildren
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
          ticketData?.rewardPolicy?.rewardPolicyType === REWARD_POLICY_TYPE.FCFS
            ? "선착순"
            : ticketData?.rewardPolicy?.rewardPolicyType ===
              REWARD_POLICY_TYPE.LUCKY_DRAW
            ? "추첨"
            : "전원"
        }
        icon={
          ticketData?.rewardPolicy?.rewardPolicyType ===
          REWARD_POLICY_TYPE.FCFS ? (
            <DirectionsRunIcon />
          ) : ticketData?.rewardPolicy?.rewardPolicyType ===
            REWARD_POLICY_TYPE.LUCKY_DRAW ? (
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
