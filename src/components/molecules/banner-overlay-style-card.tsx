import React, { useEffect, useLayoutEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  CardProps,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import { Ticket } from "../../type";
import SecondaryButton from "../atoms/secondary-button";
import PrimaryButton from "../atoms/primary-button";
import { useRouter } from "next/router";

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
          width: "100%",
          height: height,
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
                width={150}
                height={58}
                src={
                  "https://3ridge.s3.ap-northeast-2.amazonaws.com/logo/02_svg/3ridge_logo_white.svg"
                }
              />
            </Box>
            <Box sx={{ marginTop: 3 }}>
              <Typography variant={"h5"} textAlign={"left"}>
                웹3, 다양한 경험에
              </Typography>
              <Typography variant={"h5"} textAlign={"left"}>
                함께 참여하세요!
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
    </Box>
  );
};

export default BanenrOverlayStyleCard;
