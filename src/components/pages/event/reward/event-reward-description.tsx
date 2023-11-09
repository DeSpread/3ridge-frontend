import { Box, Divider, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { MouseEventHandler, PropsWithChildren } from "react";

import { Ticket } from "../../../../types";
import PrimaryCard from "../../../atomic/atoms/primary-card";


import EventRewardChainContent from "./description/event-reward-chain-content";
import EventRewardImage from "./description/event-reward-image";
import EventRewardLimitNumber from "./description/event-reward-limit-number";
import EventRewardName from "./description/event-reward-name";
import EventRewardPoint from "./description/event-reward-point";

const EventRewardDescription = (
  props: {
    ticketData?: Ticket;
    eventRewardImageCompFunc?: (ticketData?: Ticket) => JSX.Element;
    eventRewardPointCompFunc?: (ticketData?: Ticket) => JSX.Element;
    eventRewardLimitNumberCompFunc?: (ticketData?: Ticket) => JSX.Element;
    eventRewardChainContentCompFunc?: (ticketData?: Ticket) => JSX.Element;
    eventRewardNameCompFunc?: (
      ticketData?: Ticket,
      onClick?: MouseEventHandler
    ) => JSX.Element;
    onClick?: MouseEventHandler;
  } & PropsWithChildren
) => {
  const theme = useTheme();

  const {
    ticketData,
    eventRewardImageCompFunc = (ticketData?: Ticket) => {
      return <EventRewardImage ticketData={ticketData}></EventRewardImage>;
    },
    eventRewardPointCompFunc = (ticketData?: Ticket) => {
      return <EventRewardPoint ticketData={ticketData}></EventRewardPoint>;
    },
    eventRewardLimitNumberCompFunc = (ticketData?: Ticket) => {
      return (
        <EventRewardLimitNumber
          ticketData={ticketData}
        ></EventRewardLimitNumber>
      );
    },
    eventRewardChainContentCompFunc = (
      ticketData?: Ticket,
      onClick?: MouseEventHandler
    ) => {
      return (
        <EventRewardChainContent
          ticketData={ticketData}
          onClick={onClick}
        ></EventRewardChainContent>
      );
    },
    eventRewardNameCompFunc = () => {
      return <EventRewardName ticketData={ticketData}></EventRewardName>;
    },
    onClick,
  } = props;

  return (
    <PrimaryCard>
      <Stack direction={"column"} spacing={2}>
        <Stack
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {eventRewardImageCompFunc?.(ticketData)}
        </Stack>
        <Divider />
        <Box>
          {eventRewardPointCompFunc?.(ticketData)}
          {eventRewardLimitNumberCompFunc?.(ticketData)}
        </Box>
        <Divider />
        <Box display={"flex"} flexDirection={"column"} gap={4}>
          {eventRewardNameCompFunc?.(ticketData)}
          {eventRewardChainContentCompFunc?.(ticketData, onClick)}
        </Box>
      </Stack>
      {/*{ticketData?.rewardPolicy?.context?.rewardChain === ChainType.Aptos &&*/}
      {/*  ticketData?.rewardPolicy?.context?.rewardClaimable &&*/}
      {/*  ticketData?.rewardPolicy?.context?.rewardUnit === "NFT" && (*/}
      {/*    <Stack sx={{ background: "", marginTop: -5 }} alignItems={"center"}>*/}
      {/*      <ClickTypography*/}
      {/*        variant={"caption"}*/}
      {/*        onClick={async () => {*/}
      {/*          // if (ticketData.rewardPolicy?.context?.rewardInfo?.content) {*/}
      {/*          // setOpenContentsRendererDialog(true);*/}
      {/*          // setHtmlContent(*/}
      {/*          //   decodeBase64(*/}
      {/*          //     ticketData.rewardPolicy?.context?.rewardInfo?.content*/}
      {/*          //   )*/}
      {/*          // );*/}
      {/*          // }*/}
      {/*        }}*/}
      {/*        sx={{*/}
      {/*          fontWeight: "bold",*/}
      {/*          "&:hover": {*/}
      {/*            color: "#914e1d",*/}
      {/*            textDecoration: "underline",*/}
      {/*          },*/}
      {/*          color: theme.palette.warning.main,*/}
      {/*          cursor: "pointer",*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        앱토스 NFT 수령 방법*/}
      {/*      </ClickTypography>*/}
      {/*    </Stack>*/}
      {/*  )}*/}
    </PrimaryCard>
  );
};

export default EventRewardDescription;
