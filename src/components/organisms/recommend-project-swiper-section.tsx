import { Project, Ticket } from "../../type";
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
import SwiperCore, { Navigation } from "swiper";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Swiper, SwiperSlide } from "swiper/react";
import ProjectOverlayStyleCard from "../molecules/project-overlay-style-card";

SwiperCore.use([Navigation]);

const RecommendProjectSwiperSection = (props: {
  width: number | string;
  projectsData: Project[];
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
            variant={"h4"}
            sx={{
              visibility: props.isLoading ? "hidden" : "visible",
              paddingLeft: 1,
            }}
          >
            추천 프로젝트
          </Typography>
        </Box>
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
            spaceBetween={smUp ? 18 : 6}
            slidesPerView={lgUp ? 6 : mdUp ? 4 : smUp ? 3 : 2}
            scrollbar={{ draggable: true }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {props.isLoading &&
              [1, 2, 3, 4].map((e, index) => {
                return (
                  <SwiperSlide key={index}>
                    {/*<SkeletonCard></SkeletonCard>*/}
                  </SwiperSlide>
                );
              })}
            {!props.isLoading &&
              props.projectsData?.map((project, index) => {
                return (
                  <SwiperSlide key={index}>
                    <ProjectOverlayStyleCard
                      project={project}
                      onClick={async (e) => {
                        showLoading();
                        await router.push(`/project/${project._id}`);
                        closeLoading();
                      }}
                    ></ProjectOverlayStyleCard>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </Box>
      </Stack>
    </Stack>
  );
};

export default RecommendProjectSwiperSection;
