import { Ticket } from "../../../../types";
import React, { MouseEventHandler, PropsWithChildren } from "react";
import { Box, Divider, Stack } from "@mui/material";
import PrimaryCard from "../../../atomic/atoms/primary-card";
import { useTheme } from "@mui/material/styles";
import EventRewardImage from "./description/event-reward-image";
import EventRewardPoint from "./description/event-reward-point";
import EventRewardLimitNumber from "./description/event-reward-limit-number";
import EventRewardChainContent from "./description/event-reward-chain-content";
import EventRewardName from "./description/event-reward-name";

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
    </PrimaryCard>
  );
};

export default EventRewardDescription;
