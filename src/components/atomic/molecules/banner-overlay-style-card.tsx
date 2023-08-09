import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  CardProps,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import { Ticket } from "../../../types";
import PrimaryButton from "../atoms/primary-button";
import { useRouter } from "next/router";

type EventCardProps = CardProps & {
  ticket?: Ticket;
};

const BanenrOverlayStyleCard = (props: EventCardProps) => {
  const router = useRouter();
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Stack
      sx={{
        ...props.sx,
      }}
      onClick={props.onClick}
      alignItems={"center"}
    >
      <Box
        sx={{
          borderRadius: 4,
          width: "84vw",
          height: "84vw",
          background: "#6D3EFF",
          backgroundImage:
            'url("https://3ridge.s3.ap-northeast-2.amazonaws.com/banner/bg.webp")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "all 0.2s ease-out 0s",
          transitionDuration: "0.2s",
          transitionDelay: "0s",
          transitionTimingFunction: "ease-out",
        }}
      >
        <Stack
          direction={"column"}
          sx={{ height: "100%", background: "", padding: 3 }}
          justifyContent={"space-between"}
        >
          <Stack
            direction={"column"}
            sx={{ width: "100%", background: "", height: "50%" }}
          >
            <Box sx={{ marginLeft: "-12px", marginTop: "-12px" }}>
              <Image
                alt={"3ridge-logo"}
                width={160}
                height={62}
                src={
                  "https://3ridge.s3.ap-northeast-2.amazonaws.com/logo/02_svg/3ridge_logo_white.svg"
                }
              />
            </Box>
            <Box sx={{ marginTop: 3 }}>
              <Typography
                variant={smUp ? "h5" : "h5"}
                textAlign={"left"}
                sx={{ wordBreak: "keep-all" }}
              >
                여러분의 웹3를 위한 여정,
              </Typography>
              <Typography
                variant={smUp ? "h5" : "h5"}
                textAlign={"left"}
                sx={{ wordBreak: "keep-all" }}
              >
                웹3 온보딩 플랫폼 3ridge에서 시작하세요
              </Typography>
            </Box>
          </Stack>
          <Box>
            <PrimaryButton
              onClick={async () => {
                router.push(`/explore`).then((res) => {});
                return;
              }}
            >
              이벤트 참여하기
            </PrimaryButton>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

export default BanenrOverlayStyleCard;
