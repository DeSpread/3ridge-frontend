import { useRouter } from "next/router";
import { useLoading } from "../../provider/loading/loading-provider";
import React, { useRef, useState } from "react";
import { FILTER_TYPE, FilterType } from "../../type";
import { EventType, TicketSortType } from "../../__generated__/graphql";
import { useTicketsQuery } from "../../page-hook/tickets-query-hook";
import {
  Box,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTheme } from "@mui/material/styles";
import TicketCard from "../molecules/ticket-card";
import "swiper/css";
import useWindowDimensions from "../../page-hook/window-dimensions"; //basic

SwiperCore.use([Navigation]);

const FeaturedEventsSection = () => {
  const router = useRouter();
  const { showLoading, closeLoading } = useLoading();

  const [filterType, setFilterType] = useState<FilterType>(FILTER_TYPE.ALL);

  const [ticketSortType, setTicketSortType] = useState<TicketSortType>(
    TicketSortType.Newest
  );
  const { ticketsData, ticketsDataLoading } = useTicketsQuery({
    filterType,
    sort: ticketSortType,
    eventTypes: [EventType.Main],
  });

  const [width] = useWindowDimensions();

  const swiperRef = useRef<SwiperCore>();

  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Stack
      direction={"column"}
      alignItems={""}
      sx={{ background: "", flex: 1 }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={1}>
          <Typography variant={"h4"}>주요 이벤트</Typography>
        </Stack>
        <Box>
          <IconButton
            sx={{
              borderRadius: 32,
              width: smUp ? 38 : 32,
              height: smUp ? 38 : 32,
              borderWidth: 2,
              borderStyle: "solid",
              marginRight: 1,
              transition: "transform 0.2s ease",
              "&:active": {
                transform: "scale(0.9)",
              },
              "&:inactive": {
                transform: "scale(1)",
              },
              visibility: ticketsDataLoading ? "hidden" : "visible",
            }}
            onClick={(e) => {
              swiperRef.current?.slidePrev();
            }}
          >
            <ArrowBackIosNewIcon fontSize={smUp ? "medium" : "small"} />
          </IconButton>
          <IconButton
            sx={{
              borderRadius: 32,
              width: smUp ? 38 : 32,
              height: smUp ? 38 : 32,
              borderWidth: 2,
              borderStyle: "solid",
              transition: "transform 0.2s ease",
              "&:active": {
                transform: "scale(0.9)",
              },
              "&:inactive": {
                transform: "scale(1)",
              },
              visibility: ticketsDataLoading ? "hidden" : "visible",
            }}
            onClick={(e) => {
              swiperRef.current?.slideNext();
            }}
          >
            <ArrowForwardIosIcon fontSize={smUp ? "medium" : "small"} />
          </IconButton>
        </Box>
      </Stack>
      <Box
        sx={{
          marginTop: 5,
          background: "",
          width: "calc(100vw - 64px)",
        }}
      >
        {ticketsDataLoading && (
          <Grid container spacing={2} columns={30}>
            {[1, 2, 3].map((e) => {
              return (
                <Grid key={e} item xs={30} sm={15} md={10} lg={6}>
                  <Skeleton
                    height={400}
                    variant={"rounded"}
                    animation={"wave"}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
        {!ticketsDataLoading && (
          <Swiper
            spaceBetween={smUp ? 18 : 1}
            slidesPerView={lgUp ? 5 : mdUp ? 3 : smUp ? 2 : 1}
            scrollbar={{ draggable: true }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            direction={"horizontal"}
            style={{ paddingTop: 2 }}
          >
            {ticketsData?.map((ticket, index) => {
              return (
                <SwiperSlide key={index}>
                  <TicketCard
                    ticket={ticket}
                    onClick={async (e) => {
                      showLoading();
                      await router.push(`/event/${ticket._id}`);
                      closeLoading();
                    }}
                  ></TicketCard>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </Box>
    </Stack>
  );
};

export default FeaturedEventsSection;
