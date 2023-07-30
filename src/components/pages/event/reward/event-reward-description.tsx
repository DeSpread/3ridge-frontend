import { Ticket } from "../../../../type";
import React, { PropsWithChildren } from "react";
import { Box, Divider, Stack, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import StringHelper from "../../../../helper/string-helper";
import ComponentHelper from "../../../../helper/component-helper";
import PrimaryCard from "../../../atomic/atoms/primary-card";
import { useTheme } from "@mui/material/styles";
import ContentMetaDataRenderComponent from "../../../atomic/atoms/content-meta-data-render-component";
import ClickTypography from "../../../atomic/atoms/click-typhography";
import EventRewardImage from "./description/event-reward-image";
import EventRewardPoint from "./description/event-reward-point";

const EventRewardDescription = (
  props: {
    ticketData?: Ticket;
    eventRewardImageCompFunc?: (ticketData?: Ticket) => JSX.Element;
    eventRewardPointCompFunc?: (ticketData?: Ticket) => JSX.Element;
  } & PropsWithChildren
) => {
  const {
    ticketData,
    eventRewardImageCompFunc = (ticketData) => {
      return <EventRewardImage ticketData={ticketData}></EventRewardImage>;
    },
    eventRewardPointCompFunc = () => {
      return <EventRewardPoint ticketData={ticketData}></EventRewardPoint>;
    },
  } = props;

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  const changeChainToAlias = (chain: string) => {
    if (chain === "offchain-by-email") {
      return "이메일";
    } else if (chain.includes("offchain-by-wallet")) {
      return "지갑";
    } else if (chain === "offchain-by-telegram") {
      return "텔레그램 계정을";
    }
    return chain;
  };

  const getRewardLabel = () => {
    if (ticketData?.rewardPolicy?.context?.rewardChain) {
      if (ticketData?.rewardPolicy?.context?.overrideRewardChainContent) {
        return (
          <ContentMetaDataRenderComponent
            contentMetaData={
              ticketData.rewardPolicy?.context?.overrideRewardChainContent
            }
            htmlComponentFunc={(content) => {
              return (
                <Stack sx={{ background: "", alignItems: "center" }}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: content ?? "<></>",
                    }}
                  ></div>
                </Stack>
              );
            }}
          />
        );
      }
      return ticketData.rewardPolicy?.context?.rewardChain.includes(
        "offchain"
      ) ? (
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={1}
        >
          <Typography variant={"body2"}>
            {`등록된 ${changeChainToAlias(
              ticketData.rewardPolicy?.context?.rewardChain
            )} 통해 보상 지급 예정`}
          </Typography>
        </Stack>
      ) : (
        <Stack>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={1}
          >
            <img
              src={`https://3ridge.s3.ap-northeast-2.amazonaws.com/reward_chain/${ticketData.rewardPolicy?.context?.rewardChain}.svg`}
              width={32}
              height={32}
              style={{
                background: theme.palette.neutral[100],
                borderRadius: 16,
                padding: 5,
              }}
            />
            <Typography variant={"body2"}>
              {ticketData.rewardPolicy?.context?.rewardChain} 체인 지원
            </Typography>
          </Stack>
          {ticketData.rewardPolicy?.context?.rewardInfo && (
            <Stack sx={{ background: "", marginTop: 1 }} alignItems={"center"}>
              <ClickTypography
                variant={"caption"}
                onClick={async () => {
                  // if (ticketData.rewardPolicy?.context?.rewardInfo?.content) {
                  //   setOpenContentsRendererDialog(true);
                  //   setHtmlContent(
                  //     decodeBase64(
                  //       ticketData.rewardPolicy?.context?.rewardInfo?.content
                  //     )
                  //   );
                  // }
                }}
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
                {ticketData.rewardPolicy?.context?.rewardInfo?.title}
              </ClickTypography>
            </Stack>
          )}
        </Stack>
      );
    }
    return <></>;
  };

  return (
    <PrimaryCard>
      <Stack direction={"column"} spacing={5} sx={{}}>
        <Stack direction={"column"} spacing={2}>
          <Stack
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {eventRewardImageCompFunc?.(ticketData)}
          </Stack>
          <Divider></Divider>
          <Box>
            {eventRewardPointCompFunc?.(ticketData)}
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{ paddingTop: 1 }}
            >
              <Typography variant={"body1"}>대상자 수</Typography>
              <Stack direction={"row"} alignItems={"center"}>
                <Typography variant={"body1"}>
                  {StringHelper.getRewardAmountLabel(
                    ticketData?.rewardPolicy?.context?.limitNumber
                  )}
                </Typography>
              </Stack>
            </Stack>
            {ticketData?.rewardPolicy?.context?.rewardName && (
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{ paddingTop: 1 }}
              >
                <Typography variant={"body1"}>리워드</Typography>
                <Stack direction={"column"} alignItems={"flex-end"}>
                  {ComponentHelper.renderMultiLineContentText(
                    ticketData?.rewardPolicy?.context?.rewardName ?? "",
                    { variant: "body1", textAlign: "right" }
                  )}
                </Stack>
              </Stack>
            )}
          </Box>
        </Stack>
        {getRewardLabel()}
      </Stack>
    </PrimaryCard>
  );
};

export default EventRewardDescription;
