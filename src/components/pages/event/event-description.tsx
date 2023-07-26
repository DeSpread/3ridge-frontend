import { Ticket } from "../../../type";
import React, { PropsWithChildren } from "react";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import ContentMetaDataRenderComponent from "../../atomic/atoms/content-meta-data-render-component";
import { useTheme } from "@mui/material/styles";

const EventDescription = (
  props: { ticketData?: Ticket } & PropsWithChildren
) => {
  const { ticketData } = props;

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Stack
      direction={"column"}
      spacing={2}
      alignItems={mdUp ? "flex-start" : "center"}
    >
      <Typography textAlign={mdUp ? "left" : "center"} variant={"h5"}>
        이벤트 설명
      </Typography>
      <Box sx={{ width: mdUp ? 800 : smUp ? 600 : 300 }}>
        <ContentMetaDataRenderComponent
          contentMetaData={ticketData?.description_v2}
          textComponentFunc={(content) => {
            return (
              <Box sx={{ width: mdUp ? 800 : smUp ? 600 : 300 }}>
                <Stack>
                  {content?.split("\n")?.map((e, i) => {
                    return (
                      <Typography key={i} sx={{ wordBreak: "keep-all" }}>
                        {e}
                      </Typography>
                    );
                  })}
                </Stack>
              </Box>
            );
          }}
          htmlComponentFunc={(content) => {
            return (
              <div
                dangerouslySetInnerHTML={{
                  __html: content ?? "<></>",
                }}
              ></div>
            );
          }}
        ></ContentMetaDataRenderComponent>
      </Box>
    </Stack>
  );
};

export default EventDescription;
