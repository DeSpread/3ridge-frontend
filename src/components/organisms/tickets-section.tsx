import { Box, Divider, Grid, Skeleton } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import StyledTabs from "../atoms/styled/styled-tabs";
import React, {
  MouseEventHandler,
  PropsWithChildren,
  SyntheticEvent,
  useState,
} from "react";
import StyledTab from "../atoms/styled/styled-tab";
import EventCollectionCard from "../molecules/event-collection-card";
import { useLoading } from "../../provider/loading/loading-provider";
import { MouseEventWithParam, Ticket, TicketEventParam } from "../../type";

type TicketSectionProps = PropsWithChildren & {
  tickets?: Ticket[];
  loading?: boolean;
  onTicketClick?: MouseEventHandler;
};

const TicketsSection = (props: TicketSectionProps) => {
  const [tabValue, setTabValue] = useState("1");
  const { showLoading, closeLoading } = useLoading();
  const { tickets, loading, onTicketClick } = props;

  const onEventCardClick = (ticket: Ticket) => {
    const myEvent = {} as MouseEventWithParam<TicketEventParam>;
    myEvent.params = {
      ticket,
    };
    onTicketClick?.(myEvent);
  };

  return (
    <Box sx={{ maxWidth: "1200px", marginTop: 4 }}>
      <Box sx={{}}>
        <TabContext value={tabValue}>
          <Box
            sx={{
              width: "100%",
              background: "",
            }}
          >
            <StyledTabs
              centered
              value={tabValue}
              onChange={(event: SyntheticEvent, newValue: string) => {
                setTabValue(newValue);
              }}
              aria-label="lab API tabs example"
            >
              <StyledTab label="Available" value={"1"}></StyledTab>
              <StyledTab label="Missed" value={"2"}></StyledTab>
            </StyledTabs>
          </Box>
          <Divider
            sx={{ color: "divider", marginRight: 4, marginLeft: 4 }}
          ></Divider>
          <TabPanel value={"1"}>
            <Box>
              {loading && (
                <Grid
                  container
                  sx={{ flex: 1 }}
                  columnSpacing={2}
                  rowSpacing={1}
                >
                  <Grid item sm={12} md={12} lg={6}>
                    <Skeleton
                      width={"552px"}
                      height={"186px"}
                      variant={"rounded"}
                      animation={"wave"}
                    />
                  </Grid>
                  <Grid item sm={12} md={12} lg={6}>
                    <Skeleton
                      width={"552px"}
                      height={"186px"}
                      variant={"rounded"}
                      animation={"wave"}
                    />
                  </Grid>
                </Grid>
              )}
              {tickets && (
                <Grid
                  container
                  sx={{ flex: 1 }}
                  columnSpacing={2}
                  rowSpacing={1}
                >
                  {tickets?.map((x, index) => {
                    return (
                      <Grid key={index} item sm={12} md={12} lg={6}>
                        <EventCollectionCard
                          sx={{ margin: 1 }}
                          title={x.title ?? undefined}
                          questsCount={x.quests?.length}
                          summary={x.description ?? undefined}
                          onClick={async (e) => {
                            onEventCardClick(x);
                          }}
                        ></EventCollectionCard>
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            </Box>
          </TabPanel>
          <TabPanel value={"2"}>
            <Box>
              {loading && (
                <Grid
                  container
                  sx={{ flex: 1 }}
                  columnSpacing={2}
                  rowSpacing={1}
                >
                  <Grid item sm={12} md={12} lg={6}>
                    <Skeleton
                      width={"552px"}
                      height={"186px"}
                      variant={"rounded"}
                      animation={"wave"}
                    />
                  </Grid>
                  <Grid item sm={12} md={12} lg={6}>
                    <Skeleton
                      width={"552px"}
                      height={"186px"}
                      variant={"rounded"}
                      animation={"wave"}
                    />
                  </Grid>
                </Grid>
              )}
              {tickets && (
                <Grid
                  container
                  sx={{ flex: 1 }}
                  columnSpacing={2}
                  rowSpacing={1}
                >
                  {tickets?.map((x, index) => {
                    return (
                      <Grid key={index} item sm={12} md={12} lg={6}>
                        <EventCollectionCard
                          sx={{ margin: 1 }}
                          title={x.title ?? undefined}
                          questsCount={x.quests?.length}
                          summary={x.description ?? undefined}
                          onClick={async (e) => {
                            onEventCardClick(x);
                          }}
                        ></EventCollectionCard>
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default TicketsSection;
