import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardProps,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useLayoutEffect } from "react";
import StyledChip from "../atoms/styled/styled-chip";
import { Ticket } from "../../type";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import StarsIcon from "@mui/icons-material/Stars";

type EventCardProps = CardProps & {
  ticket?: Ticket;
};

const TicketCard = (props: EventCardProps) => {
  const { ticket } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(0);
  const theme = useTheme();

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
        borderWidth: 3,
        borderColor: theme.palette.neutral[700], //"#343238",
        borderStyle: "solid",
        transitionTimingFunction: "ease-out",
        "&:hover": {
          borderColor: theme.palette.secondary.main,
          transform: "translate(0,-2px)",
        },
        cursor: "pointer",
        ...props.sx,
      }}
      onClick={props.onClick}
    >
      <CardContent sx={{ background: "black" }}>
        <Stack direction={"column"}>
          <Stack direction={"column"} sx={{ marginTop: 0 }}>
            <Stack
              direction={"row"}
              // spacing={1}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{ paddingBottom: 2, paddingLeft: 1 }}
            >
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                {ticket?.project?.imageUrl && (
                  <Image
                    alt={""}
                    width={32}
                    height={32}
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
                    width={32}
                    height={32}
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
                {}
                {ticket?.project?.name && (
                  <Typography>{ticket?.project?.name}</Typography>
                )}
                {!ticket?.project?.name && <Typography>3ridge</Typography>}
              </Stack>
              <StyledChip
                label={`${ticket?.quests?.length ?? 0} Quests`}
              ></StyledChip>
            </Stack>
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
          <Stack direction={"column"} sx={{}}>
            <Box sx={{ height: 50, display: "flex", alignItems: "center" }}>
              <Typography
                variant={"h6"}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                  paddingTop: 4,
                }}
                fontFamily={"LINESeedKR-Bd"}
              >
                {ticket?.title}
              </Typography>
            </Box>
            <Grid
              sx={{ marginTop: 4, marginBottom: -1 }}
              container
              columnSpacing={1}
            >
              {/*<Grid item>*/}

              {/*</Grid>*/}
              <Grid item>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={1}
                  justifyContent={"center"}
                >
                  <Image
                    src={
                      "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/icon_point.png"
                    }
                    alt={"StarIcon"}
                    width={24}
                    height={24}
                  ></Image>
                  <Typography variant={"body1"}>
                    {`${ticket?.rewardPolicy?.context?.point ?? 0} point`}
                  </Typography>
                </Stack>
                {/*}*/}
                {/*></StyledChip>*/}
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TicketCard;
