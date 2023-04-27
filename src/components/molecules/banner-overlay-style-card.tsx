import React, { useEffect, useLayoutEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  CardProps,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import { Ticket } from "../../type";
import SecondaryButton from "../atoms/secondary-button";
import PrimaryButton from "../atoms/primary-button";
import {useRouter} from "next/router";

type EventCardProps = CardProps & {
  ticket?: Ticket;
};

const BanenrOverlayStyleCard = (props: EventCardProps) => {
  const { ticket } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(0);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();

  useLayoutEffect(() => {
    setHeight(ref.current?.offsetWidth ?? 0);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setHeight(ref.current?.offsetWidth ?? 0);
    });
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect(); // clean up
  }, []);

  return (
    <Box
      sx={{
        ...props.sx,
      }}
      ref={ref}
      onClick={props.onClick}
    >
      <Box
        sx={{
          borderRadius: 4,
          width: height,
          height: 500,
          background: "#6D3EFF",
          backgroundImage: 'url("https://3ridge.s3.ap-northeast-2.amazonaws.com/banner/bg.webp")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "all 0.2s ease-out 0s",
          transitionDuration: "0.2s",
          transitionDelay: "0s",
          transitionTimingFunction: "ease-out"
        }}
      >
        <div
          style={{
            position: "absolute",
            width: height,
            height: height,
            background: "",
            left: 0,
            top: 0,
            padding: 24,
          }}
        >
            <Stack
                direction={"column"}
                alignItems={"end"}
            >
                <Image
                    alt={"3ridge-logo"}
                    width={150}
                    height={58}
                    src={"https://3ridge.s3.ap-northeast-2.amazonaws.com/logo/02_svg/3ridge_logo_white.svg"}
                />
            </Stack>
          <Stack
              direction={"column"}
              sx={{ background: "", width:"100%", height: "100%" }}
              paddingTop={10}
              paddingLeft={5}
          >
              <Stack direction={"column"} alignItems={"left"}>
                  <Stack direction={"row"} alignItems={"left"} spacing={1}>
                        <Typography
                            variant={mdUp ? "h2" : smUp ? "h3" : "h3"}
                            textAlign={"left"}
                            sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "3",
                                WebkitBoxOrient: "vertical",
                            }}
                        >
                            국내 Web3 컨텐츠 플랫폼, 3ridge에서 시작하세요
                        </Typography>
                  </Stack>
                <Stack sx={{ marginTop: 4 }} alignItems={"left"} >
                    <Typography
                        variant={mdUp ? "h5" : "h6"}
                        textAlign={"left"}
                    >
                        웹3, 다양한 경험에 함께 참여하세요!
                    </Typography>
                </Stack>
                  <Stack direction={"row"} alignItems={"left"} spacing={1} sx={{ marginTop: 8 }}>
                      <PrimaryButton onClick={async () => {
                          router.push(`/explore`).then((res) => {});
                          return;
                          }}>이벤트 참여하기</PrimaryButton>
                  </Stack>
            </Stack>
          </Stack>
        </div>
      </Box>
    </Box>
  );
};

export default BanenrOverlayStyleCard;
