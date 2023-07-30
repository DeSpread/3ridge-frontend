import {
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  Box,
} from "@mui/material";
import { QuestPolicyType } from "../../../__generated__/graphql";
import VerifyCard from "../../atomic/molecules/verify-card";
import { Quest, REWARD_POLICY_TYPE, Ticket, User } from "../../../type";
import React, { MouseEventHandler, PropsWithChildren } from "react";
import { useTheme } from "@mui/material/styles";
import DateUtil from "../../../util/date-util";
import CloseIcon from "@mui/icons-material/Close";

const EventQuests = (
  props: {
    ticketData?: Ticket;
    userData?: User;
    verifiedList: boolean[];
    onVerifyBtnClicked?: (
      e: React.MouseEvent<Element, MouseEvent>,
      quest: Quest,
      index: number
    ) => void;
    onStartBtnClicked?: (
      e: React.MouseEvent<Element, MouseEvent>,
      quest: Quest,
      index: number
    ) => void;
    onEditBtnClicked?: (
      e: React.MouseEvent<Element, MouseEvent>,
      quest: Quest,
      index: number
    ) => void;
    onDeleteBtnClicked?: (
      e: React.MouseEvent<Element, MouseEvent>,
      quest: Quest,
      index: number
    ) => void;
  } & PropsWithChildren
) => {
  const {
    ticketData,
    userData,
    verifiedList,
    onVerifyBtnClicked,
    onStartBtnClicked,
    onEditBtnClicked,
    onDeleteBtnClicked,
  } = props;

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  const ICON_SIZE = 32;

  const isExceededTicketParticipants = () => {
    if (
      ticketData?.participantCount !== undefined &&
      ticketData?.rewardPolicy?.context?.limitNumber !== undefined &&
      ticketData?.rewardPolicy?.rewardPolicyType === REWARD_POLICY_TYPE.FCFS
    ) {
      return (
        ticketData?.participantCount >=
        ticketData?.rewardPolicy?.context?.limitNumber
      );
    }
    return false;
  };

  const isStarted = () => {
    return DateUtil.parseStrToDate(ticketData?.beginTime ?? "")
      ? //@ts-ignore
        DateUtil.parseStrToDate(ticketData?.beginTime ?? "") - new Date() < 0
      : false;
  };

  const isExpired = () => {
    return DateUtil.parseStrToDate(ticketData?.untilTime ?? "")
      ? //@ts-ignore
        DateUtil.parseStrToDate(ticketData?.untilTime ?? "") -
          //@ts-ignore
          new Date() <
          0
      : true;
  };

  const getConfirmBtnLabel = (quest: Partial<Quest>) => {
    return undefined;
  };

  return (
    <Stack
      direction={"column"}
      alignItems={mdUp ? "flex-start" : "center"}
      spacing={2}
      sx={{ background: "" }}
    >
      <Typography variant="h5" textAlign={mdUp ? "left" : "center"}>
        퀘스트
      </Typography>
      <Stack
        direction={"column"}
        spacing={4}
        alignItems={mdUp ? "flex-start" : "center"}
        sx={{}}
      >
        {ticketData?.quests?.map((quest, index) => {
          const autoVerified =
            quest.questPolicy?.questPolicy === QuestPolicyType.VerifyDiscord ||
            quest.questPolicy?.questPolicy === QuestPolicyType.VerifyTelegram ||
            quest.questPolicy?.questPolicy ===
              QuestPolicyType.VerifyVisitWebsite;

          return (
            <div style={{ position: "relative" }} key={index + 1}>
              <VerifyCard
                key={index + 1}
                sx={{ width: mdUp ? 800 : smUp ? 600 : 300 }}
                index={index + 1}
                title={quest.title}
                title_v2={quest.title_v2}
                description={quest.description}
                disabled={
                  (userData?._id ? false : true) ||
                  isExceededTicketParticipants() ||
                  !isStarted() ||
                  isExpired()
                }
                verified={verifiedList[index]}
                overrideConfirmBtnLabel={getConfirmBtnLabel(quest)}
                hideStartButton={
                  quest.questPolicy?.questPolicy ===
                    QuestPolicyType.Verify_3RidgePoint ||
                  quest.questPolicy?.questPolicy ===
                    QuestPolicyType.VerifyAptosBridgeToAptos ||
                  quest.questPolicy?.questPolicy ===
                    QuestPolicyType.VerifyAptosHasNft ||
                  quest.questPolicy?.questPolicy ===
                    QuestPolicyType.VerifyAptosExistTx ||
                  quest.questPolicy?.questPolicy ===
                    QuestPolicyType.VerifyEmail ||
                  quest.questPolicy?.questPolicy ===
                    QuestPolicyType.VerifyHasEmail ||
                  quest.questPolicy?.questPolicy ===
                    QuestPolicyType.VerifyHasWalletAddress ||
                  quest.questPolicy?.questPolicy ===
                    QuestPolicyType.VerifyHasTwitter ||
                  quest.questPolicy?.questPolicy ===
                    QuestPolicyType.VerifyHasTelegram ||
                  quest.questPolicy?.questPolicy === QuestPolicyType.Quiz ||
                  quest.questPolicy?.questPolicy ===
                    QuestPolicyType.VerifyAgreement
                }
                onVerifyBtnClicked={async (e) => {
                  onVerifyBtnClicked?.(e, quest, index);
                }}
                onStartBtnClicked={async (e) => {
                  onStartBtnClicked?.(e, quest, index);
                }}
                autoVerified={autoVerified}
              ></VerifyCard>
              {onEditBtnClicked && onDeleteBtnClicked && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    borderWidth: 2,
                    borderStyle: "solid",
                    borderColor: "white",
                    borderRadius: 1,
                    zIndex: theme.zIndex.drawer,
                    cursor: "pointer",
                    margin: 0,
                    transition: "all 0.2s ease-out 0s",
                    transitionDuration: "0.2s",
                    transitionDelay: "0s",
                    "&:hover": {
                      borderColor: theme.palette.secondary.main,
                      background: "#61E1FF55",
                    },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditBtnClicked?.(e, quest, index);
                  }}
                >
                  <Stack
                    sx={{
                      position: "absolute",
                      left: `calc(100% + ${-ICON_SIZE / 2}px);`,
                      top: -(ICON_SIZE / 2),
                      background: "",
                      borderWidth: 2,
                      borderStyle: "solid",
                      borderColor: "white",
                      borderRadius: 16,
                      backgroundColor: "black",
                      transition: "all 0.2s ease-out 0s",
                      transitionDuration: "0.2s",
                      transitionDelay: "0s",
                      transitionTimingFunction: "ease-out",
                      "&:hover": {
                        borderColor: theme.palette.error.main,
                        "& .MuiIconButton": {
                          color: theme.palette.error.main,
                        },
                      },
                    }}
                    justifyContent={"center"}
                    alignItems={"center"}
                    zIndex={theme.zIndex.drawer + 1}
                  >
                    <IconButton
                      className={"MuiIconButton"}
                      sx={{
                        borderRadius: 16,
                        width: ICON_SIZE,
                        height: ICON_SIZE,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteBtnClicked?.(e, quest, index);
                      }}
                    >
                      <CloseIcon></CloseIcon>
                    </IconButton>
                  </Stack>
                </Box>
              )}
            </div>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default EventQuests;