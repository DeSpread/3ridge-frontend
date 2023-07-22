import { Card, CardContent, CardProps, Grid } from "@mui/material";
import React from "react";
import { Ticket } from "../../../type";

type QueueCardProps = CardProps & {
  ticket?: Ticket;
};

const QueueCard = (props: QueueCardProps) => {
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
      // onClick={props.onClick}
    >
      <CardContent
        sx={{
          boxShadow: "inset 4px 4px 4px #35333a, inset -4px -4px 4px #35333a",
        }}
      >
        <Grid></Grid>
      </CardContent>
    </Card>
  );
};

export default QueueCard;
