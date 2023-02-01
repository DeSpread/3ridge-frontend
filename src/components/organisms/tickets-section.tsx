import {
  Box,
  ButtonProps,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import StyledTabs from "../atoms/styled/styled-tabs";
import React, {
  CSSProperties,
  MouseEventHandler,
  PropsWithChildren,
  SyntheticEvent,
  useState,
} from "react";
import StyledTab from "../atoms/styled/styled-tab";
import EventCollectionCard from "../molecules/event-collection-card";
import { useLoading } from "../../provider/loading/loading-provider";
import { MouseEventWithParam, Ticket, TicketEventParam } from "../../type";
import PrimaryButton from "../atoms/primary-button";
import { useTheme } from "@mui/material/styles";
import TicketCard from "../molecules/ticket-card";

type TicketSectionProps = PropsWithChildren & {
  tickets?: Ticket[];
  loading?: boolean;
  onTicketClick?: MouseEventHandler;
  sx?: CSSProperties;
};

type TabButtonProps = ButtonProps & {
  index: number;
  onChange?: MouseEventHandler;
};

const TabButton = (props: TabButtonProps) => {
  const theme = useTheme();
  return (
    <PrimaryButton
      {...props}
      sx={{
        ":disabled": {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.neutral[900],
        },
        ...props.sx,
      }}
      onClick={(e) => {
        const myEvent = {} as MouseEventWithParam<{ index: number }>;
        myEvent.params = {
          index: props.index,
        };
        props.onChange?.(myEvent);
      }}
      size={props.size}
    ></PrimaryButton>
  );
};

type TabButtonGroupProps = PropsWithChildren & {
  onChange?: MouseEventHandler;
};

const TabButtonGroup = (props: TabButtonGroupProps) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const TITLES = ["Available", "Complete", "Missed"];
  return (
    <Stack direction={"row"} spacing={2}>
      {TITLES.map((e, index) => {
        return (
          <TabButton
            key={index}
            sx={{
              paddingLeft: 3,
              paddingRight: 3,
              width: 128,
            }}
            index={index}
            onChange={(e) => {
              const myEvent = e as MouseEventWithParam<{ index: number }>;
              setSelectedIdx(myEvent.params.index);
              props?.onChange?.(myEvent);
            }}
            disabled={selectedIdx === index}
            size={"small"}
          >
            {e}
          </TabButton>
        );
      })}
    </Stack>
  );
};

const TicketsSection = (props: TicketSectionProps) => {
  const [tabValue, setTabValue] = useState(0);
  const { showLoading, closeLoading } = useLoading();
  const { tickets, loading, onTicketClick } = props;

  const onTicketCardClick = (ticket: Ticket) => {
    const myEvent = {} as MouseEventWithParam<TicketEventParam>;
    myEvent.params = {
      ticket,
    };
    onTicketClick?.(myEvent);
  };

  return (
    <Box
      sx={{
        ...props.sx,
      }}
    >
      <TabButtonGroup
        onChange={(e) => {
          const myEvent = e as MouseEventWithParam<{ index: number }>;
          setTabValue(myEvent.params.index);
        }}
      ></TabButtonGroup>
      <Box sx={{ marginTop: 6 }}>
        <Grid container spacing={2}>
          {loading &&
            [1, 2, 3, 4].map((e) => {
              return (
                <Grid key={e} item xs={12} sm={6} md={4} lg={3}>
                  <Skeleton
                    // width={"552px"}
                    height={"480px"}
                    variant={"rounded"}
                    animation={"wave"}
                  />
                </Grid>
              );
            })}
          {!loading &&
            tickets?.map((ticket, index) => {
              return (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                  <TicketCard
                    ticket={ticket}
                    onClick={(e) => {
                      onTicketCardClick(ticket);
                    }}
                  ></TicketCard>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Box>
  );
};

export default TicketsSection;
