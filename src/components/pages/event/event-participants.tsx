import { Avatar, Box, Grid, Stack, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { PropsWithChildren } from "react";

import { DEFAULT_PROFILE_IMAGE_DATA_SRC } from "../../../const";
import { Ticket } from "../../../types";
import StringUtil from "../../../util/string-util";
import BlockIcon from "../../atomic/molecules/block-icon";


const EventParticipants = (
  props: {
    ticketData?: Ticket;
  } & PropsWithChildren
) => {
  const { ticketData } = props;
  const theme = useTheme();
  return (
    <Stack direction={"column"} sx={{ background: "", maxWidth: 350 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={1}
        justifyContent={"center"}
      >
        <Typography
          variant="h5"
          textAlign={"center"}
          sx={{ wordBreak: "keep-all" }}
        >
          아래의 사람들이 참여하고 있어요
        </Typography>
      </Stack>
      <Grid container sx={{ marginTop: 4 }} justifyContent={"center"}>
        {(ticketData?.participants?.length ?? 0) > 0 ? (
          <>
            {ticketData?.participants?.slice(0, 10).map((e, index) => {
              return (
                <Grid item key={index}>
                  {e.profileImageUrl && (
                    <Tooltip
                      title={e.name}
                      key={index}
                      // sx={{ zIndex: 1 + index }}
                    >
                      <Avatar
                        alt=""
                        src={
                          e.profileImageUrl ?? DEFAULT_PROFILE_IMAGE_DATA_SRC
                        }
                        sx={{
                          width: 42,
                          height: 42,
                        }}
                      />
                    </Tooltip>
                  )}
                  {!e.profileImageUrl && e?._id && (
                    <Tooltip title={e.name} key={index}>
                      <div style={{ width: 42, height: 42 }}>
                        <BlockIcon seed={e?._id} scale={5}></BlockIcon>
                      </div>
                    </Tooltip>
                  )}
                </Grid>
              );
            })}
            {ticketData?.participants?.length &&
              ticketData?.participants?.length > 10 && (
                <Grid item>
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      background: theme.palette.neutral["800"],
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                      borderRadius: 42,
                      zIndex: 1,
                      borderWidth: 2,
                      borderColor: theme.palette.neutral[100],
                      borderStyle: "solid",
                    }}
                    onClick={() => {}}
                  >
                    <Typography variant={"caption"} color={"neutral.100"}>
                      {`+${StringUtil.nFormatter(
                        ticketData?.participants?.length - 10,
                        4
                      )}`}
                    </Typography>
                  </Box>
                </Grid>
              )}
          </>
        ) : (
          <>
            <Stack
              sx={{
                cursor: "pointer",
                width: "100%",
              }}
              alignItems={"center"}
            >
              <Typography>⛔&nbsp;EMPTY</Typography>
            </Stack>
          </>
        )}
      </Grid>
    </Stack>
  );
};

export default EventParticipants;
