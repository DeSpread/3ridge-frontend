import { Ticket } from "../../type";
import { useTheme } from "@mui/material/styles";
import { useLoading } from "../../provider/loading/loading-provider";
import { useRouter } from "next/router";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useRef } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Swiper, SwiperSlide } from "swiper/react";
import TicketOverlayStyleCard from "../molecules/ticket-overlay-style-card";
import SwiperCore, { Navigation } from "swiper";

SwiperCore.use([Navigation]);

const RecommendEventSwiperSection = (props: {
  width: number | string;
  ticketsData: Ticket[];
}) => {
  const theme = useTheme();
  const { showLoading, closeLoading } = useLoading();
  const router = useRouter();

  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <Stack
      direction={"column"}
      sx={{
        width: "100%",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
        marginBottom={3}
      >
        <Box>
          <Typography variant={"h5"}>추천 이벤트</Typography>
        </Box>
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
            }}
          >
            <ArrowForwardIosIcon fontSize={smUp ? "medium" : "small"} />
          </IconButton>
        </Box>
      </Stack>
      <Stack
        direction={"column"}
        sx={{
          width: "100%",
        }}
      ></Stack>
      <Stack
        direction={"column"}
        sx={{
          width: "100%",
        }}
      >
        <Box width={props.width}>
          <Swiper
            spaceBetween={lgUp ? 4 : mdUp ? 3 : smUp ? 2 : 1}
            slidesPerView={lgUp ? 4 : mdUp ? 3 : smUp ? 2 : 1}
            scrollbar={{ draggable: true }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
          >
            {props.ticketsData?.map((ticket, index) => {
              return (
                <SwiperSlide key={index}>
                  <TicketOverlayStyleCard
                    ticket={ticket}
                    onClick={async (e) => {
                      showLoading();
                      await router.push(`/event/${ticket._id}`);
                      closeLoading();
                    }}
                  ></TicketOverlayStyleCard>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </Stack>
    </Stack>
  );
};

export default RecommendEventSwiperSection;
