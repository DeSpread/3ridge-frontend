import { Ticket } from "../../../../../type";
import React, { MouseEventHandler, PropsWithChildren } from "react";
import ContentMetaDataRenderComponent from "../../../../atomic/atoms/content-meta-data-render-component";
import { Stack, Skeleton, Box } from "@mui/material";
import ClickTypography from "../../../../atomic/atoms/click-typhography";
import { ChainType } from "../../../../../__generated__/graphql";
import { useTheme } from "@mui/material/styles";

const EventRewardChainContent = (
  props: {
    ticketData?: Ticket;
    onClick?: MouseEventHandler;
  } & PropsWithChildren
) => {
  const { ticketData, onClick } = props;
  const theme = useTheme();

  return (
    <>
      {ticketData && (
        <>
          <ContentMetaDataRenderComponent
            contentMetaData={
              ticketData?.rewardPolicy?.context?.overrideRewardChainContent
            }
            htmlComponentFunc={(content) => {
              return (
                <Stack sx={{ background: "", alignItems: "center" }}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: content ?? "<></>",
                    }}
                  ></div>
                  {ticketData?.rewardPolicy?.context?.rewardChain ===
                    ChainType.Aptos &&
                    ticketData?.rewardPolicy?.context?.rewardClaimable &&
                    ticketData?.rewardPolicy?.context?.rewardUnit === "NFT" && (
                      <Stack
                        sx={{ background: "", marginTop: 1 }}
                        alignItems={"center"}
                      >
                        <ClickTypography
                          variant={"caption"}
                          onClick={onClick}
                          sx={{
                            fontWeight: "bold",
                            "&:hover": {
                              color: "#914e1d",
                              textDecoration: "underline",
                            },
                            color: theme.palette.warning.main,
                            cursor: "pointer",
                          }}
                        >
                          앱토스 NFT 수령 방법
                        </ClickTypography>
                      </Stack>
                    )}
                </Stack>
              );
            }}
          />
        </>
      )}
      {(!ticketData ||
        !ticketData?.rewardPolicy?.context?.overrideRewardChainContent) && (
        <Box sx={{ width: "100%", height: 30 }}></Box>
      )}
    </>
  );
};

export default EventRewardChainContent;
