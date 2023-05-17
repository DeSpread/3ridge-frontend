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
  const router = useRouter();
  const ref = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(0);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

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
          height: mdUp? 500 : smUp? 300 : 220,
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
            padding: mdUp? 24 : smUp? 10 : 10,
          }}
        >
            <Stack
                direction={"column"}
                alignItems={"end"}
            >
                <Image
                    alt={"3ridge-logo"}
                    width={mdUp ? 150 : smUp? 140 : 130}
                    height={mdUp ? 58 : smUp? 40 : 37}
                    src={"https://3ridge.s3.ap-northeast-2.amazonaws.com/logo/02_svg/3ridge_logo_white.svg"}
                />
            </Stack>
          <Stack
              direction={"column"}
              sx={{ background: "", width:"100%", height: "100%" }}
              paddingTop={mdUp ? 10 : smUp ? 3 : 1}
              paddingLeft={mdUp ? 5 : smUp ? 3 : 1}
          >
              <Stack direction={"column"} alignItems={"left"}>
                  <Stack direction={"row"} alignItems={"left"} spacing={1}>
                        <Typography
                            variant={mdUp ? "h2" : smUp ? "body1" : "body2"}
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
                <Stack sx={{ marginTop: mdUp? 4 : 2 }} alignItems={"left"} >
                    <Typography
                        variant={mdUp ? "h5" : smUp ? "body1" : "body2"}
                        textAlign={"left"}
                    >
                        웹3, 다양한 경험에 함께 참여하세요!
                    </Typography>
                </Stack>
                  <Stack direction={"row"} alignItems={"left"} spacing={1} sx={{ marginTop: mdUp? 8 : smUp? 5 : 3 }}>
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
