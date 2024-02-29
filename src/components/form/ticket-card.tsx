"use client";
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
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import React, { forwardRef, Ref, useEffect, useLayoutEffect } from "react";

import { PartialTicket } from "../../types";
import TicketInfoTextSet from "../atomic/atoms/ticket-info-text-set";

type EventCardProps = CardProps & {
  ticket?: PartialTicket;
  username?: string;
  isWinner?: boolean;
};

const TicketCard = (props: EventCardProps, targetRef?: Ref<HTMLDivElement>) => {
  const { ticket, username } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(0);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  useLayoutEffect(() => {
    setHeight((ref.current?.offsetWidth ?? 0) * 0.9);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setHeight((ref.current?.offsetWidth ?? 0) * 0.9);
    });
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect(); // clean up
  }, []);

  return (
    <Card
      ref={targetRef}
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
          transform: "translate(0,0px)",
        },
        cursor: "pointer",
        ...props.sx,
      }}
      onClick={props.onClick}
    >
      <CardContent sx={{ background: theme.palette.neutral[800] }}>
        <Stack direction={"column"}>
          <Stack direction={"column"} sx={{ marginTop: 0 }}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{
                paddingBottom: 3,
                paddingLeft: "4px",
              }}
            >
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
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
                {ticket?.project?.name && (
                  <Typography variant={mdUp ? "body1" : "h6"}>
                    {ticket?.project?.name}
                  </Typography>
                )}
                {!ticket?.project?.name && (
                  <Typography variant={mdUp ? "body1" : "h6"}>
                    3ridge
                  </Typography>
                )}
              </Stack>
              {props.isWinner &&
                (ticket?.winners?.filter(
                  (winner) =>
                    String(winner.name).toUpperCase().trim() ===
                    String(username).toUpperCase().trim(),
                )?.length ?? 0) > 0 && (
                  <Box>
                    <Typography variant={mdUp ? "h6" : "h5"}>👑</Typography>
                  </Box>
                )}
              {!props.isWinner && (
                <Box>
                  <Typography variant={mdUp ? "body2" : "body1"}>
                    {ticket?.quests?.length ?? 0} 퀘스트
                  </Typography>
                </Box>
              )}
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
              {ticket?.imageUrl ? (
                <Image
                  width={height}
                  height={height}
                  alt={""}
                  style={{
                    borderRadius: 4,
                    objectFit: "cover",
                  }}
                  src={ticket?.imageUrl}
                ></Image>
              ) : (
                <Skeleton
                  width={height}
                  height={height}
                  animation={"wave"}
                  variant={"rounded"}
                ></Skeleton>
              )}
            </Box>
          </Stack>
          <Stack direction={"column"} sx={{}}>
            <Box
              sx={{
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant={"h6"}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                  paddingTop: 4,
                  wordBreak: "keep-all",
                }}
                textAlign={"center"}
                fontFamily={"LINESeedKR-Bd"}
              >
                {ticket?.title}
              </Typography>
            </Box>
            <Grid
              sx={{
                marginTop: 4,
                marginBottom: -2,
                background: "",
              }}
              container
              columnSpacing={1}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Grid item>
                <TicketInfoTextSet
                  ticket={ticket}
                  whiteSpaceMode={true}
                ></TicketInfoTextSet>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default forwardRef(TicketCard);
