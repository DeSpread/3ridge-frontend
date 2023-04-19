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
        cursor: "pointer",
        ...props.sx,
      }}
      ref={ref}
      onClick={props.onClick}
    >
      <Box
        sx={{
          borderRadius: 4,
          width: height,
          height: height,
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
                    <Typography
                      variant={mdUp ? "body1" : smUp ? "body1" : "body2"}
                    >
                      {ticket?.project?.name}
                    </Typography>
                  )}
                  {!ticket?.project?.name && (
                    <Typography
                      variant={mdUp ? "body1" : smUp ? "body1" : "body2"}
                    >
                      3ridge
                    </Typography>
                  )}
                </Box>
              </Stack>
              <Box>
                <Typography variant={mdUp ? "body2" : smUp ? "body1" : "body2"}>
                  {ticket?.quests?.length ?? 0} 퀘스트
                </Typography>
              </Box>
            </Stack>
            <Stack
              sx={{
                background: "#00000066",
                justifyContent: "center",
                borderRadius: 4,
                padding: 1,
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Typography
                  variant={"body1"}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                    textAlign: "center",
                  }}
                  fontFamily={"LINESeedKR-Bd"}
                >
                  {ticket?.title}
                </Typography>
              </Box>
              <Stack direction={"row"} alignItems={"center"}>
                <Image
                  src={
                    "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/icon_point.svg"
                  }
                  alt={"StarIcon"}
                  width={32}
                  height={32}
                  style={{ marginLeft: -6 }}
                ></Image>
                <Typography variant={"body2"}>
                  {`${ticket?.rewardPolicy?.context?.point ?? 0} 포인트`}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </div>
      </Box>
    </Box>
  );
};

export default TicketOverlayStyleCard;
