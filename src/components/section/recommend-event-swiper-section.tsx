import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useRef } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { useLoading } from "../../provider/loading/loading-provider";
import { Ticket } from "../../types";
import SkeletonOverlayCard from "../atomic/molecules/skelton-overlay-card";
import TicketOverlayStyleCard from "../form/ticket-overlay-style-card";

SwiperCore.use([Navigation]);

const RecommendEventSwiperSection = (props: {
  width: number | string;
  ticketsData: Ticket[];
  isLoading: boolean;
}) => {
  const theme = useTheme();
  const { showLoading, closeLoading } = useLoading();
  const router = useRouter();

  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  const swiperRef = useRef<SwiperCore>();

  return (
    <Stack
      direction={"column"}
      sx={{
        width: "100%",
        background: "",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={3}
      >
        <Box>
          <Typography
            variant={smUp ? "h5" : "h4"}
            sx={{
              visibility: props.isLoading ? "hidden" : "visible",
              paddingLeft: 1,
            }}
          >
            추천 이벤트
          </Typography>
        </Box>
        <Box>
          <IconButton
            sx={{
              borderRadius: 32,
              width: smUp ? 38 : 38,
              height: smUp ? 38 : 38,
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
              visibility: props.isLoading ? "hidden" : "visible",
            }}
            onClick={(e) => {
              swiperRef.current?.slidePrev();
            }}
          >
            <ArrowBackIosNewIcon fontSize={smUp ? "medium" : "small"} />
          </IconButton>
          <IconButton
            // ref={nextRef}
            sx={{
              borderRadius: 32,
              width: smUp ? 38 : 38,
              height: smUp ? 38 : 38,
              borderWidth: 2,
              borderStyle: "solid",
              transition: "transform 0.2s ease",
              "&:active": {
                transform: "scale(0.9)",
              },
              "&:inactive": {
                transform: "scale(1)",
              },
              visibility: props.isLoading ? "hidden" : "visible",
            }}
            onClick={(e) => {
              swiperRef.current?.slideNext();
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
            spaceBetween={smUp ? 18 : 1}
            slidesPerView={lgUp ? 4 : mdUp ? 3 : smUp ? 2 : 1}
            scrollbar={{ draggable: true }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {props.isLoading &&
              [1, 2, 3, 4].map((e, index) => {
                return (
                  <SwiperSlide key={index}>
                    <SkeletonOverlayCard></SkeletonOverlayCard>
                  </SwiperSlide>
                );
              })}
            {!props.isLoading &&
              props.ticketsData?.map((ticket, index) => {
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
