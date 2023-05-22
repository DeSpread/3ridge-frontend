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
      ref={ref}
      onClick={props.onClick}
      sx={{
        borderRadius: 4,
        width: height,
        height: mdUp ? 500 : smUp ? 300 : 220,
        background: "#6D3EFF",
        backgroundImage:
          'url("https://3ridge.s3.ap-northeast-2.amazonaws.com/banner/bg.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "all 0.2s ease-out 0s",
        transitionDuration: "0.2s",
        transitionDelay: "0s",
        transitionTimingFunction: "ease-out",
        ...props.sx,
      }}
    >
      <Grid container={true}>
        <Grid item xs={4} sx={{ background: "red" }}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Box>
  );
};

export default BanenrOverlayStyleCard;
