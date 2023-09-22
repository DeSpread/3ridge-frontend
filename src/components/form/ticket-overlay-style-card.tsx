import { type CardProps, Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import React, { useEffect, useLayoutEffect } from "react";

import { Ticket } from "../../types";
import TicketInfoTextSet from "../atomic/atoms/ticket-info-text-set";

type EventCardProps = CardProps & {
  ticket?: Ticket;
};

const TicketOverlayStyleCard = ({ ticket, sx, onClick }: EventCardProps) => {
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
    <Box
      sx={{
        cursor: "pointer",
        ...sx,
      }}
      ref={ref}
      onClick={onClick}
    >
      <Box
        sx={{
          borderRadius: 4,
          height,
          background: "black",
          backgroundImage: `url("${ticket?.imageUrl}")`,
          backgroundSize: "cover",
          transition: "all 0.2s ease-out 0s",
          transitionDuration: "0.2s",
          transitionDelay: "0s",
          borderWidth: 3,
          borderColor: theme.palette.neutral[700], //"#343238",
          borderStyle: "solid",
          transitionTimingFunction: "ease-out",
          "&:hover": {
            borderColor: theme.palette.secondary.main,
          },
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
            justifyContent={"space-between"}
            sx={{ background: "", height: "100%" }}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Box>
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
                </Box>
                <Box>
                  {ticket?.project?.name && (
                    <div className="sm:text-body1-outline text-body2-outline">
                      {ticket?.project?.name}
                    </div>
                  )}
                  {!ticket?.project?.name && (
                    <div className="sm:text-body1-outline text-body2-outline">
                      3ridge
                    </div>
                  )}
                </Box>
              </Stack>
              <Box>
                <div className="md:text-body2-outline text-body2-outline sm:text-body1-outline">
                  {ticket?.quests?.length ?? 0} 퀘스트
                </div>
              </Box>
            </Stack>
            <Stack
              sx={{
                background: "#000000c0", //66
                justifyContent: "center",
                borderRadius: 3,
                padding: 2,
                alignItems: "center",
              }}
            >
              <div className="text-body1-outline line-clamp-2 text-ellipsis break-keep font-lineBold">
                {ticket?.title}
              </div>
              <TicketInfoTextSet ticket={ticket} />
            </Stack>
          </Stack>
        </div>
      </Box>
    </Box>
  );
};

export default TicketOverlayStyleCard;
