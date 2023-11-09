import { Box, Skeleton, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import React, { PropsWithChildren } from "react";

import { Ticket } from "../../../../../types";

const EventRewardImage = (
  props: { ticketData?: Ticket } & PropsWithChildren
) => {
  const { ticketData } = props;

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      sx={{
        width: smUp ? 300 : 260,
        height: smUp ? 300 : 260,
        borderRadius: 2,
        marginBottom: 2,
        margin: 0,
      }}
    >
      {ticketData?.rewardPolicy?.context?.nftImageUrl ? (
        <Box sx={{}}>
          <Image
            width={smUp ? 300 : 260}
            height={smUp ? 300 : 260}
            src={ticketData?.rewardPolicy?.context?.nftImageUrl}
            style={{
              borderWidth: 3,
              borderRadius: 16,
              borderColor: "",
              borderStyle: "solid",
              background: "",
              margin: 0,
            }}
            alt={""}
          ></Image>
        </Box>
      ) : (
        <Skeleton
          width={smUp ? 300 : 260}
          height={smUp ? 300 : 260}
          animation={"wave"}
          variant={"rounded"}
        ></Skeleton>
      )}
    </Box>
  );
};

export default EventRewardImage;
