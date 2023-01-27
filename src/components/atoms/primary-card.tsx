import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { CSSProperties, MouseEventHandler, PropsWithChildren } from "react";

type PrimaryCardProps = PropsWithChildren & {
  boxSx?: CSSProperties;
  isCursorPointer?: boolean;
  onCardItemClick?: MouseEventHandler;
  hoverEffect?: boolean;
  cardSx?: CSSProperties;
  withCardContent?: boolean;
};

const PrimaryCard = ({
  hoverEffect,
  isCursorPointer,
  boxSx,
  cardSx,
  onCardItemClick,
  children,
  withCardContent = true,
}: PrimaryCardProps) => {
  return (
    <Box
      sx={{
        "&:hover": hoverEffect
          ? {
              "& .bountyCard": {
                transition: "box-shadow 0.1s ease-out 0s",
                boxShadow:
                  "inset 1px 1px 1px #35333a, inset -1px -1px 1px #35333a",
                transitionDuration: "0.1s",
                transitionDelay: "0s",
                transitionTimingFunction: "ease-out",
                transitionProperty: "box-shadow",
              },
            }
          : {},
        cursor: `${isCursorPointer ? "pointer" : ""}`,
        ...boxSx,
      }}
      onClick={onCardItemClick}
    >
      <Card
        className={"bountyCard"}
        variant="outlined"
        sx={{
          zIndex: 1,
          ...cardSx,
        }}
      >
        {withCardContent && <CardContent>{children}</CardContent>}
        {!withCardContent && children}
      </Card>
    </Box>
  );
};

export default PrimaryCard;
