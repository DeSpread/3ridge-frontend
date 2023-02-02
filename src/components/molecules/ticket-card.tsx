import {
  Box,
  Card,
  CardContent,
  CardProps,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import StyledChip from "../atoms/styled/styled-chip";
import { Ticket } from "../../type";

type EventCardProps = CardProps & {
  ticket?: Ticket;
};

const TicketCard = (props: EventCardProps) => {
  const { ticket } = props;
  const theme = useTheme();
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
              sx={{
                borderRadius: 4,
                background: theme.palette.neutral["700"],
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={ticket?.imageUrl}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  borderRadius: 10,
                }}
              />
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TicketCard;
