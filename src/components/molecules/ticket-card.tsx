import {
  Box,
  Card,
  CardContent,
  CardProps,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useLayoutEffect } from "react";
import StyledChip from "../atoms/styled/styled-chip";
import { Ticket } from "../../type";
import { LazyLoadImage } from "react-lazy-load-image-component";

type EventCardProps = CardProps & {
  ticket?: Ticket;
};

const TicketCard = (props: EventCardProps) => {
  const { ticket } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(0);

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
    <Card
      sx={{
        background: "transparent",
        transform: "translateY(0%)",
        transition: "all 0.2s ease-out 0s",
        transitionDuration: "0.2s",
        transitionDelay: "0s",
        transitionTimingFunction: "ease-out",
        "&:hover": {
          transform: "translate(0,-2px)",
          boxShadow: "12px 12px 2px 1px rgba(128, 128, 128, .2)",
        },
        ...props.sx,
      }}
      onClick={props.onClick}
    >
      <CardContent
        sx={{
          boxShadow: "inset 4px 4px 4px #35333a, inset -4px -4px 4px #35333a",
        }}
      >
        <Stack direction={"column"}>
          <Stack direction={"column"}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Box sx={{ height: 50, display: "flex", alignItems: "center" }}>
                <Typography
                  variant={"h6"}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {ticket?.title}
                </Typography>
              </Box>
              <StyledChip
                label={`${ticket?.quests?.length ?? 0} Quests`}
              ></StyledChip>
            </Stack>
            <Box sx={{ marginTop: 2, minHeight: 100 }}>
              <Typography
                variant={"body2"}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "4",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {ticket?.description}
              </Typography>
            </Box>
          </Stack>
          <Stack direction={"column"} sx={{ marginTop: 2 }}>
            <Box
              ref={ref}
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {ticket?.imageUrl && (
                <LazyLoadImage
                  width={height}
                  height={height}
                  src={ticket?.imageUrl}
                  style={{
                    borderRadius: 4,
                    objectFit: "cover",
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
              )}
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TicketCard;
