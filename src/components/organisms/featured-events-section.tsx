import { useRouter } from "next/router";
import { useLoading } from "../../provider/loading/loading-provider";
import React, { useRef, useState } from "react";
import {
  FILTER_TYPE,
  FilterType,
  MouseEventWithParam,
  TicketEventParam,
} from "../../type";
import { TicketSortType } from "../../__generated__/graphql";
import { useTicketsQuery } from "../../page-hook/tickets-query-hook";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import TicketsSection from "./tickets-section";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import TicketOverlayStyleCard from "../molecules/ticket-overlay-style-card";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTheme } from "@mui/material/styles";
import TicketCard from "../molecules/ticket-card";
import "swiper/css";
import useWindowDimensions from "../../page-hook/window-dimensions"; //basic
import { filterFeatureEventTickets } from "../../util/type-util";

SwiperCore.use([Navigation]);

const FeaturedEventsSection = () => {
  const router = useRouter();
  const { showLoading, closeLoading } = useLoading();

  const [filterType, setFilterType] = useState<FilterType>(
    FILTER_TYPE.AVAILABLE
  );
  const [ticketSortType, setTicketSortType] = useState<TicketSortType>(
    TicketSortType.Trending
  );
  const { ticketsData, ticketsDataLoading } = useTicketsQuery({
    filterType,
    sort: ticketSortType,
  });

  const [width] = useWindowDimensions();

  const prevRef = useRef(null);
  const nextRef = useRef(null);

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
        sx={{ marginTop: "32px" }}
      >
        <Stack direction={"row"} spacing={1}>
          <Typography variant={"h4"}>주요 이벤트</Typography>
        </Stack>
        <Box>
          <IconButton
            ref={prevRef}
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
          >
            <ArrowBackIosNewIcon fontSize={smUp ? "medium" : "small"} />
          </IconButton>
          <IconButton
            ref={nextRef}
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
          >
            <ArrowForwardIosIcon fontSize={smUp ? "medium" : "small"} />
          </IconButton>
        </Box>
      </Stack>
      <Box sx={{ marginTop: 5, background: "", width: width - 48 }}>
        <Swiper
          spaceBetween={smUp ? 18 : 1}
          slidesPerView={lgUp ? 5 : mdUp ? 3 : smUp ? 2 : 1}
          scrollbar={{ draggable: true }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          direction={"horizontal"}
          style={{ paddingTop: 2 }}
        >
          {!ticketsDataLoading &&
            filterFeatureEventTickets(ticketsData)?.map((ticket, index) => {
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
      </Box>
    </Stack>
  );
};

export default FeaturedEventsSection;
