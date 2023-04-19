import React, { useEffect, useLayoutEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  CardContent,
  CardProps,
  Grid,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Ticket } from "../../type";

type EventCardProps = CardProps & {
  ticket?: Ticket;
};

const TicketOverlayStyleCard = (props: EventCardProps) => {
  const { ticket } = props;
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
        background: "transparent",
        // transform: "translateY(0%)",
        // transition: "all 0.2s ease-out 0s",
        // transitionDuration: "0.2s",
        // transitionDelay: "0s",
        // borderWidth: 3,
        // borderColor: theme.palette.neutral[700], //"#343238",
        // borderStyle: "solid",
        // transitionTimingFunction: "ease-out",
        // "&:hover": {
        //   borderColor: theme.palette.secondary.main,
        // transform: "translate(0,-2px)",
        // },
        cursor: "pointer",
        padding: 0,
        ...props.sx,
      }}
      ref={ref}
      onClick={props.onClick}
    >
      {/*<CardContent*/}
      {/*  sx={{ background: theme.palette.neutral[800], padding: 0 }}*/}
      {/*>*/}
      <Box>
        <LazyLoadImage
          width={height}
          // height={height}
          src={ticket?.imageUrl}
          style={{
            borderRadius: 4,
            objectFit: "cover",
            transition: "all 0.2s ease-out 0s",
            transitionDuration: "0.2s",
            transitionDelay: "0s",
            borderWidth: 3,
            borderColor: theme.palette.neutral[700], //"#343238",
            borderStyle: "solid",
            transitionTimingFunction: "ease-out",
          }}
          effect="blur"
          beforeLoad={() => {
            return (
              <Skeleton
                width={height}
                height={height}
                animation={"wave"}
                variant={"rounded"}
              ></Skeleton>
            );
          }}
        ></LazyLoadImage>
        <div
          style={{
            position: "absolute",
            width: height,
            height: height,
            background: "",
            left: 0,
            top: 0,
            padding: 16,
            // paddingLeft: 8,
            // paddingRight: 8,
          }}
        >
          <Stack direction={"row"}>
            {ticket?.project?.imageUrl && (
              <Image
                alt={""}
                width={28}
                height={28}
                src={ticket?.project?.imageUrl}
                style={{
                  borderWidth: 2,
                  borderColor: "white",
                  borderStyle: "solid",
                  borderRadius: 32,
                }}
              />
            )}
            {!ticket?.project?.imageUrl && (
              <Image
                alt={""}
                width={28}
                height={28}
                src={
                  "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/favicon.ico"
                }
                style={{
                  borderWidth: 2,
                  borderColor: "white",
                  borderStyle: "solid",
                  borderRadius: 32,
                }}
              />
            )}
          </Stack>
        </div>
      </Box>
      {/*</CardContent>*/}
    </Box>
  );
};

export default TicketOverlayStyleCard;
