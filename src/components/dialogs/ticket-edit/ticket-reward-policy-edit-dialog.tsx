import React, { MouseEventHandler, useEffect, useState } from "react";
import SimpleDialog, { SimpleDialogProps } from "../simple-dialog";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import SecondaryButton from "../../atomic/atoms/secondary-button";
import { RewardPolicyType } from "../../../__generated__/graphql";

const TicketRewardPolicyEditDialog = (
  props: {
    onConfirmBtnClicked?: (rewardPolicyType?: RewardPolicyType) => void;
    defaultQuestPolicyType?: RewardPolicyType;
  } & SimpleDialogProps
) => {
  const { defaultQuestPolicyType, ...rest } = props;
  const [rewardPolicyType, setRewardPolicyType] = useState<RewardPolicyType>(
    RewardPolicyType.Fcfs
  );

  useEffect(() => {
    if (defaultQuestPolicyType) {
      setRewardPolicyType(defaultQuestPolicyType);
    }
  }, [defaultQuestPolicyType]);

  return (
    <SimpleDialog {...rest} maxWidth={"sm"}>
      <Stack sx={{ marginTop: 1 }}>
        <Box sx={{ width: "100%", background: "", position: "relative" }}>
          <FormControl>
            <InputLabel>리워드 정책</InputLabel>
            <Select
              value={rewardPolicyType}
              label="리워드 정책"
              onChange={(e) => {
                const { value } = e.target;
                //@ts-ignore
                setRewardPolicyType(value);
              }}
              sx={{ minWidth: 180, background: "" }}
            >
              <MenuItem value={RewardPolicyType.Fcfs}>선착순</MenuItem>
              <MenuItem value={RewardPolicyType.LuckyDraw}>추첨</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Stack
          direction={"row"}
          justifyContent={"flex-end"}
          sx={{ marginTop: 3 }}
        >
          <SecondaryButton
            fullWidth={true}
            onClick={(e) => {
              e.preventDefault();
              props.onConfirmBtnClicked?.(rewardPolicyType);
            }}
          >
            확인
          </SecondaryButton>
        </Stack>
      </Stack>
    </SimpleDialog>
  );
};

export default TicketRewardPolicyEditDialog;
