import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

import SecondaryButton from "../../atomic/atoms/secondary-button";
import StyledOutlinedInput from "../../atomic/atoms/styled/styled-outlined-input";
import SimpleDialog, { SimpleDialogProps } from "../simple-dialog";


const TicketRewardHowToDialog = (props: SimpleDialogProps) => {
  const { ...rest } = props;

  const IMAGE_WIDTH = 380;

  return (
    <SimpleDialog {...rest} maxWidth={"sm"}>
      <Stack sx={{ marginTop: 1 }}>
        <Stack justifyContent={"center"} alignItems={"center"}>
          <Typography variant={"h6"}>🎁 &nbsp; 앱토스 NFT 수령 방법</Typography>
          <Box sx={{ marginTop: 2 }}>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Image
              width={IMAGE_WIDTH}
              height={IMAGE_WIDTH * 1.18} //400 * 1.18}
              src={
                "https://3ridge.s3.ap-northeast-2.amazonaws.com/contents/aptos_nft_how_to_2.png"
              }
              alt={""}
            ></Image>
            <Stack sx={{ marginTop: 1 }} spacing={1}>
              <Typography variant={"body1"}>1. Library 탭 클릭</Typography>
              <Typography variant={"body1"}>2. Pending 탭 클릭</Typography>
              <Typography variant={"body1"}>3. Accept 클릭</Typography>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </SimpleDialog>
  );
};

export default TicketRewardHowToDialog;
