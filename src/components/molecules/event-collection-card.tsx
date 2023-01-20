import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import {
  CSSProperties,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import CommunityChip from "../atoms/community-chip";
import EventLinearProgress from "../atoms/styled/event-linear-progress";

type BountyCollectionCardProps = PropsWithChildren & {
  sx?: CSSProperties;
  bountyCount?: number;
  title?: string;
  thumbnailUrl?: string;
  community?: {
    name: string;
    thumbnailUrl?: string;
  };
  questsCount?: number;
  summary?: string;
  onClick?: MouseEventHandler;
};

const BountyCollectionCardContent = ({
  title,
  thumbnailUrl,
  summary,
  community,
  questsCount,
}: BountyCollectionCardProps) => {
  return (
    <CardContent>
      <Stack direction={"row"} justifyContent={"space-between"} spacing={3}>
        <Stack
          direction={"column"}
          spacing={1}
          sx={{ width: "100%" }}
          justifyContent={"space-evenly"}
        >
          <Stack direction={"column"} spacing={2}>
            <Stack direction={"row"} spacing={1}>
              <Stack direction={"row"} spacing={1}>
                <Chip label={`${questsCount} Quest`} />
                {/*{questsCount && <Chip label={questsCount} />}*/}
                {/*{community && (*/}
                {/*  <CommunityChip*/}
                {/*    thumbnailUrl={community?.thumbnailUrl}*/}
                {/*    name={community?.name}*/}
                {/*  ></CommunityChip>*/}
                {/*)}*/}
              </Stack>
            </Stack>
            <Typography variant={"h6"}>{title}</Typography>
          </Stack>
          {summary && (
            <Stack direction={"row"} alignItems={"flex-end"}>
              <Typography
                variant={"body2"}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {summary}
              </Typography>
            </Stack>
          )}
        </Stack>
        <img
          src={
            "https://imgp.layer3cdn.com/ipfs/QmUnZrLc6F4u4VZyvHoxkerPe9ZvfBdEkx7BSW4naWWBe9"
          }
          // src={thumbnailUrl}
          style={{
            objectFit: "cover",
            borderRadius: 8,
          }}
          width={120}
          height={120}
        />
      </Stack>
    </CardContent>
  );
};

const EventCollectionCard = (props: BountyCollectionCardProps) => {
  const height = "186px";

  const getBountyCollectionCardContent = (props: BountyCollectionCardProps) => {
    return (
      <BountyCollectionCardContent
        bountyCount={props.bountyCount}
        title={props.title}
        thumbnailUrl={props.thumbnailUrl}
        community={props.community}
        summary={props.summary}
        questsCount={props.questsCount}
      ></BountyCollectionCardContent>
    );
  };

  return (
    <Box
      sx={{
        "&:hover": {
          "& .bountyCard": {
            transition: "box-shadow 0.1s ease-out 0s",
            boxShadow: "inset 1px 1px 1px #35333a, inset -1px -1px 1px #35333a",
            transitionDuration: "0.1s",
            transitionDelay: "0s",
            transitionTimingFunction: "ease-out",
            transitionProperty: "box-shadow",
          },
        },
        height: { height },
        minWidth: 552,
        ...props.sx,
      }}
    >
      <Card
        className={"bountyCard"}
        variant="outlined"
        sx={{
          zIndex: 1,
          height: { height },
        }}
      >
        {getBountyCollectionCardContent(props)}
      </Card>
      {
        <Card
          className={"bountyCard"}
          variant="outlined"
          sx={{
            position: "relative",
            marginTop: "-4px",
            transform: "translate(-4px,-100%)",
            background: "",
            zIndex: 0,
            height: { height },
            cursor: "pointer",
          }}
          onClick={props.onClick}
        >
          {getBountyCollectionCardContent(props)}
        </Card>
      }
    </Box>
  );
};

export default EventCollectionCard;
