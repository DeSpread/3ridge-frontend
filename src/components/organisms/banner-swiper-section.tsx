import { Box, Stack, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import SwiperCore, { Navigation } from "swiper";
import Image from "next/image";
import PrimaryButton from "../atoms/primary-button";
import { useRouter } from "next/router";

SwiperCore.use([Navigation]);

const BannerSwiperSection = (props: { width: number | string }) => {
  const router = useRouter();

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
                <Box
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background: "",
                    left: 0,
                    top: 0,
                    paddingTop: 40,
                    paddingBottom: 40,
                    paddingRight: 50,
                    paddingLeft: 50,
                  }}
                >
                  <Stack
                    direction={"column"}
                    sx={{ width: "100%", height: "100%" }}
                    justifyContent={"space-between"}
                  >
                    <Stack
                      direction={"column"}
                      sx={{ width: "100%", height: "100%" }}
                    >
                      <Stack direction={"column"} sx={{ width: "100%" }}>
                        <Stack
                          direction={"row"}
                          justifyContent={"space-between"}
                        >
                          <Stack direction={"column"} alignItems={"flex-start"}>
                            <Typography variant={"h3"} textAlign={"left"}>
                              여러분의 웹3를 위한 여정,
                            </Typography>
                            <Typography variant={"h3"} textAlign={"left"}>
                              웹3 온보딩 플랫폼 3ridge에서 시작하세요
                            </Typography>
                          </Stack>
                          <Stack direction={"column"} alignItems={"flex-end"}>
                            <Image
                              alt={"3ridge-logo"}
                              width={160}
                              height={62}
                              src={
                                "https://3ridge.s3.ap-northeast-2.amazonaws.com/logo/02_svg/3ridge_logo_white.svg"
                              }
                              style={{
                                marginTop: -6,
                              }}
                            />
                          </Stack>
                        </Stack>
                        {/*<Stack direction={"row"} sx={{ marginTop: 2 }}>*/}
                        {/*  <Typography variant={"h5"} textAlign={"left"}>*/}
                        {/*    웹3, 다양한 경험에 함께 참여하세요!*/}
                        {/*  </Typography>*/}
                        {/*</Stack>*/}
                      </Stack>
                    </Stack>

                    <Stack direction={"row"}>
                      <PrimaryButton
                        onClick={async () => {
                          router.push(`/explore`).then((res) => {});
                          return;
                        }}
                      >
                        이벤트 참여하기
                      </PrimaryButton>
                    </Stack>
                  </Stack>
                </Box>
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
