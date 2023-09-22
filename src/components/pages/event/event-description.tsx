import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { PropsWithChildren } from "react";

import ContentMetaDataRenderComponent, {
  MarkDownRenderer,
} from "@/components/atomic/atoms/content-meta-data-render-component";
import ComponentHelper from "@/helper/component-helper";
import { Ticket } from "@/types";

interface EventDescriptionProps {
  ticketData?: Ticket;
}

const EventDescription = ({
  ticketData,
}: // FIXME: children prop is not used
PropsWithChildren<EventDescriptionProps>) => {
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
                  {ComponentHelper.renderMultiLineContentText(content, {
                    sx: { wordBreak: "keep-all" },
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
          markComponentFunc={(content) => {
            return (
              <div className="text-center md:text-left">
                <MarkDownRenderer content={content} />
              </div>
            );
          }}
        ></ContentMetaDataRenderComponent>
      </Box>
    </Stack>
  );
};

export default EventDescription;
