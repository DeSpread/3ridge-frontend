import {
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CSSProperties, PropsWithChildren } from "react";
import CommunityChip from "../atoms/community-chip";
import XpChip from "../atoms/xp-chip";

type BountySingleCardProps = PropsWithChildren & {
  sx?: CSSProperties;
  title?: string;
  summary?: string;
  community?: {
    name: string;
    thumbnailUrl?: string;
  };
};

const EventSingleCard = (props: BountySingleCardProps) => {
  return (
    <>
      <Box
        sx={{
          "&:hover": {
            "& .bountyCard": {
              transition: "box-shadow 0.1s ease-out 0s",
              boxShadow:
                "inset 1px 1px 1px #35333a, inset -1px -1px 1px #35333a",
              transitionDuration: "0.1s",
              transitionDelay: "0s",
              transitionTimingFunction: "ease-out",
              transitionProperty: "box-shadow",
            },
          },
          minWidth: 552,
          height: "186px",
          ...props.sx,
        }}
      >
        <Card
          className={"bountyCard"}
          variant="outlined"
          sx={{
            zIndex: 1,
            height: "186px",
          }}
        >
          <CardContent>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Stack
                direction={"column"}
                spacing={2}
                sx={{ width: "100%" }}
                justifyContent={"space-evenly"}
              >
                <Stack direction={"column"} spacing={2}>
                  <Stack direction={"row"} spacing={1}>
                    <Stack direction={"row"} spacing={1}>
                      <Chip label={"4 bounties"} />
                      {props.community && (
                        <CommunityChip
                          name={props.community.name}
                          thumbnailUrl={props.community.thumbnailUrl}
                        />
                      )}
                    </Stack>
                  </Stack>
                  <Stack
                    direction={"column"}
                    sx={{ background: "" }}
                    spacing={1}
                  >
                    <Typography variant={"h6"}>{props.title}</Typography>
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
                        {props.summary}
                      </Typography>
                      <XpChip label={"100XP"}></XpChip>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
              {/*<img*/}
              {/*  src={*/}
              {/*    "https://pinx.layer3.xyz/ipfs/QmcmGhyD31imuhFZw32teTqQSEax4nh9D8gsfVQrDj38Nz"*/}
              {/*  }*/}
              {/*  style={{*/}
              {/*    objectFit: "cover",*/}
              {/*    borderRadius: 8,*/}
              {/*  }}*/}
              {/*  width={120}*/}
              {/*  height={120}*/}
              {/*/>*/}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default EventSingleCard;
