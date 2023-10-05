import { Box, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import React, {
  CSSProperties,
  PropsWithChildren,
  useRef,
  useState,
} from "react";

import { TicketSortType } from "../../../__generated__/graphql";
import { useAllTicketsQuery } from "../../../hooks/query/use-all-tickets";
import { useDetectRef } from "../../../hooks/util/use-detect-ref";
import { useLoading } from "../../../provider/loading/loading-provider";
import { Ticket, FILTER_TYPE, FilterType } from "../../../types";
import TicketCard from "../../form/ticket-card";

import {
  LoadMore,
  TicketsSectionNoData,
  TicketsSectionSkeleton,
} from "./components";
import { Tabs1, Tabs2 } from "./tabs";

interface TicketSectionProps {
  tickets?: Ticket[];
  loading?: boolean;
  onListEnd?: () => void;
  sx?: CSSProperties;
}

const TicketsSection = ({ ...props }: TicketSectionProps) => {
  const { push } = useRouter();
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  const { showLoading, closeLoading } = useLoading();
  const loadMoreRef = useRef(null);

  const [filter, setFilter] = useState<FilterType>(FILTER_TYPE.ALL);
  const [sortType, setSortType] = useState<TicketSortType>(
    TicketSortType.Trending,
  );
  const [isLoadMore, setIsLoadMore] = useState<boolean>(true);

  const {
    data: tickets,
    loading,
    fetchMoreTickets,
  } = useAllTicketsQuery({
    filterType: filter,
    sort: sortType,
  });

  const handleTicketClick = async (id: string) => {
    showLoading();
    await push(`/event/${id}`);
    closeLoading();
  };

  const handleFilterTabChange = (tabIndex: number) => {
    const filter =
      {
        0: FILTER_TYPE.ALL,
        1: FILTER_TYPE.AVAILABLE,
        2: FILTER_TYPE.MISSED,
        3: FILTER_TYPE.COMPLETE,
      }[tabIndex] ?? FILTER_TYPE.COMPLETE;

    setFilter(filter);
    setIsLoadMore(true);
  };

  const handleSortTabChange = (tabIndex: number) => {
    const sortType =
      {
        0: TicketSortType.Trending,
        1: TicketSortType.Newest,
      }[tabIndex] ?? TicketSortType.Trending;

    setSortType(sortType);
    setIsLoadMore(true);
  };

  const handleListEnd = async () => {
    if (!isLoadMore) return;
    const result = await fetchMoreTickets();
    const isMoreTickets =
      !!result?.data?.tickets && result.data.tickets.length !== 0;
    setTimeout(() => {
      setIsLoadMore(isMoreTickets);
    }, 700);
  };

  useDetectRef(handleListEnd, loadMoreRef);

  return (
    <Box sx={{ ...props.sx }}>
      <Grid
        container
        direction={smUp ? "row" : "column"}
        justifyContent={"space-between"}
        columnSpacing={1}
        alignItems={smUp ? "center" : "flex-start"}
      >
        <Grid item>
          <Tabs2 onTabChange={handleSortTabChange} />
        </Grid>
        <Grid item>
          <Tabs1 onTabChange={handleFilterTabChange} />
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 6 }}>
        <Grid container spacing={2} columns={30}>
          {loading && <TicketsSectionSkeleton />}
          {!loading &&
            tickets?.map((ticket, index) => {
              return (
                <Grid key={index} item xs={30} sm={15} md={10} lg={6}>
                  <TicketCard
                    ticket={ticket}
                    onClick={() => {
                      if (!ticket || !ticket._id) return;
                      handleTicketClick(ticket._id);
                    }}
                  />
                </Grid>
              );
            })}
          {!loading && (tickets?.length === 0 || !tickets) && (
            <TicketsSectionNoData />
          )}
          <Grid item xs={30}>
            {!loading && tickets?.length !== 0 && isLoadMore ? (
              <LoadMore ref={loadMoreRef} />
            ) : (
              // default load more section height
              <div className="h-32" />
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default TicketsSection;
