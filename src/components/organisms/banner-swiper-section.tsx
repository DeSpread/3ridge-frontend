import { Ticket } from "../../type";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Swiper, SwiperSlide } from "swiper/react";
import TicketOverlayStyleCard from "../molecules/ticket-overlay-style-card";
import React from "react";
import SwiperCore, { Navigation } from "swiper";
import Image from "next/image";
import PrimaryButton from "../atoms/primary-button";

SwiperCore.use([Navigation]);

const BannerSwiperSection = (props: { width: number | string }) => {
  return (
    <Stack
      direction={"column"}
      sx={{
        width: "100%",
      }}
    >
      <Stack
        direction={"column"}
        sx={{
          width: "100%",
        }}
      >
        <Box width={props.width}>
          <Swiper
            spaceBetween={1}
            slidesPerView={1}
            scrollbar={{ draggable: true }}
          >
            <SwiperSlide>
              <Box
                sx={{
                  borderRadius: 4,
                  width: "100%",
                  height: 300,
                  background: "#6D3EFF",
                  backgroundImage:
                    'url("https://3ridge.s3.ap-northeast-2.amazonaws.com/banner/bg.webp")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/*<div*/}
                {/*  style={{*/}
                {/*    position: "absolute",*/}
                {/*    width: height,*/}
                {/*    height: height,*/}
                {/*    background: "",*/}
                {/*    left: 0,*/}
                {/*    top: 0,*/}
                {/*    padding: mdUp ? 24 : smUp ? 10 : 10,*/}
                {/*  }}*/}
                {/*>*/}
                {/*  <Stack direction={"column"} alignItems={"end"}>*/}
                {/*    <Image*/}
                {/*      alt={"3ridge-logo"}*/}
                {/*      width={mdUp ? 150 : smUp ? 140 : 130}*/}
                {/*      height={mdUp ? 58 : smUp ? 40 : 37}*/}
                {/*      src={*/}
                {/*        "https://3ridge.s3.ap-northeast-2.amazonaws.com/logo/02_svg/3ridge_logo_white.svg"*/}
                {/*      }*/}
                {/*    />*/}
                {/*  </Stack>*/}
                {/*  <Stack*/}
                {/*    direction={"column"}*/}
                {/*    sx={{ background: "", width: "100%", height: "100%" }}*/}
                {/*    paddingTop={mdUp ? 10 : smUp ? 3 : 1}*/}
                {/*    paddingLeft={mdUp ? 5 : smUp ? 3 : 1}*/}
                {/*  >*/}
                {/*    <Stack direction={"column"} alignItems={"left"}>*/}
                {/*      <Stack direction={"row"} alignItems={"left"} spacing={1}>*/}
                {/*        <Typography*/}
                {/*          variant={mdUp ? "h2" : smUp ? "body1" : "body2"}*/}
                {/*          textAlign={"left"}*/}
                {/*          sx={{*/}
                {/*            overflow: "hidden",*/}
                {/*            textOverflow: "ellipsis",*/}
                {/*            display: "-webkit-box",*/}
                {/*            WebkitLineClamp: "3",*/}
                {/*            WebkitBoxOrient: "vertical",*/}
                {/*          }}*/}
                {/*        >*/}
                {/*          국내 Web3 컨텐츠 플랫폼, 3ridge에서 시작하세요*/}
                {/*        </Typography>*/}
                {/*      </Stack>*/}
                {/*      <Stack*/}
                {/*        sx={{ marginTop: mdUp ? 4 : 2 }}*/}
                {/*        alignItems={"left"}*/}
                {/*      >*/}
                {/*        <Typography*/}
                {/*          variant={mdUp ? "h5" : smUp ? "body1" : "body2"}*/}
                {/*          textAlign={"left"}*/}
                {/*        >*/}
                {/*          웹3, 다양한 경험에 함께 참여하세요!*/}
                {/*        </Typography>*/}
                {/*      </Stack>*/}
                {/*      <Stack*/}
                {/*        direction={"row"}*/}
                {/*        alignItems={"left"}*/}
                {/*        spacing={1}*/}
                {/*        sx={{ marginTop: mdUp ? 8 : smUp ? 5 : 3 }}*/}
                {/*      >*/}
                {/*        <PrimaryButton*/}
                {/*          onClick={async () => {*/}
                {/*            router.push(`/explore`).then((res) => {});*/}
                {/*            return;*/}
                {/*          }}*/}
                {/*        >*/}
                {/*          이벤트 참여하기*/}
                {/*        </PrimaryButton>*/}
                {/*      </Stack>*/}
                {/*    </Stack>*/}
                {/*  </Stack>*/}
                {/*</div>*/}
              </Box>
            </SwiperSlide>
          </Swiper>
        </Box>
      </Stack>
      <Box sx={{ height: 4 }}></Box>
    </Stack>
  );
};

export default BannerSwiperSection;
