import { Box, Divider, Stack } from "@mui/material";
import { MouseEventHandler, PropsWithChildren } from "react";

import EventRewardChainContent from "./description/event-reward-chain-content";
import EventRewardImage from "./description/event-reward-image";
import EventRewardLimitNumber from "./description/event-reward-limit-number";
import EventRewardName from "./description/event-reward-name";
import EventRewardPoint from "./description/event-reward-point";

import PrimaryCard from "@/components/atomic/atoms/primary-card";
import { Ticket } from "@/types";

interface EventRewardDescriptionProps {
  ticketData?: Ticket;
  eventRewardImageCompFunc?: (ticketData?: Ticket) => JSX.Element;
  eventRewardPointCompFunc?: (ticketData?: Ticket) => JSX.Element;
  eventRewardLimitNumberCompFunc?: (ticketData?: Ticket) => JSX.Element;
  eventRewardChainContentCompFunc?: (ticketData?: Ticket) => JSX.Element;
  eventRewardNameCompFunc?: (
    ticketData?: Ticket,
    onClick?: MouseEventHandler,
  ) => JSX.Element;
  onClick?: MouseEventHandler;
}

const defaultEventRewardImageCompFunc = (ticketData?: Ticket) => {
  return <EventRewardImage ticketData={ticketData}></EventRewardImage>;
};

const defaultEventRewardPointCompFunc = (ticketData?: Ticket) => {
  return <EventRewardPoint ticketData={ticketData}></EventRewardPoint>;
};

const defaultEventRewardLimitNumberCompFunc = (ticketData?: Ticket) => {
  return <EventRewardLimitNumber ticketData={ticketData} />;
};

const EventRewardDescription = ({
  eventRewardImageCompFunc = defaultEventRewardImageCompFunc,
  eventRewardPointCompFunc = defaultEventRewardPointCompFunc,
  eventRewardLimitNumberCompFunc = defaultEventRewardLimitNumberCompFunc,
  ...props
}: // FIXME: does not used children props
PropsWithChildren<EventRewardDescriptionProps>) => {
  const {
    ticketData,
    eventRewardChainContentCompFunc = (
      ticketData?: Ticket,
      onClick?: MouseEventHandler,
    ) => <EventRewardChainContent ticketData={ticketData} onClick={onClick} />,
    eventRewardNameCompFunc = () => <EventRewardName ticketData={ticketData} />,
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
        <div className="flex flex-col gap-8">
          <div className="rounded bg-gradient-to-r from-purple-950/40 via-purple-800 to-purple-950/40 py-4 backdrop-blur-lg">
            {eventRewardNameCompFunc?.(ticketData)}
          </div>
          {eventRewardChainContentCompFunc?.(ticketData, onClick)}
        </div>
      </Stack>
    </PrimaryCard>
  );
};

export default EventRewardDescription;
