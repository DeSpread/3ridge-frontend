import React, { ReactElement, useEffect, useMemo, useState } from "react";
import MainLayout from "../../layouts/main-layout";
import { AppProps } from "next/app";
import Head from "next/head";
import {
  Avatar,
  Box,
  ButtonProps,
  Card,
  CardContent,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import VerifyCard from "../../components/molecules/verify-card";
import { useTicketQuery } from "../../page-hook/ticket-query-hook";
import { format } from "date-fns";
import StyledChip from "../../components/atoms/styled/styled-chip";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import PrimaryCard from "../../components/atoms/primary-card";
import SecondaryButton from "../../components/atoms/secondary-button";
import { decodeBase64, nFormatter } from "../../util/string-util";
import QuestQuizDialog from "../../components/dialogs/quest-quiz-dialog";
import SimpleDialog from "../../components/dialogs/simple-dialog";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

import {
  DiscordQuestContext,
  MouseEventWithParam,
  QUEST_POLICY_TYPE,
  QuizQuestContext,
  REWARD_POLICY_TYPE,
  TelegramQuestContext,
  TwitterFollowQuestContext,
  TwitterLikingQuestContext,
  TwitterRetweetQuestContext,
} from "../../type";
import { QuestPolicyType } from "../../__generated__/graphql";
import { useSignedUserQuery } from "../../page-hook/signed-user-query-hook";
import { useAlert } from "../../provider/alert/alert-provider";
import { useFirebaseAuth } from "../../lib/firebase/hook/firebase-hook";
import {
  APP_ERROR_MESSAGE,
  getErrorMessage,
  getLocaleErrorMessage,
} from "../../error/my-error";
import { useLoading } from "../../provider/loading/loading-provider";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { DEFAULT_PROFILE_IMAGE_DATA_SRC } from "../../const";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Image from "next/image";
import BlockIcon from "../../components/molecules/block-icon";
import TimerBoard, {
  DummyTimerBoard,
} from "../../components/molecules/timer-board";
import ContentsRendererDialog from "../../components/dialogs/contents-renderer-dialog";
import ComponentHelper from "../../helper/component-helper";
import { useLogin } from "../../provider/login/login-provider";
import { useProfileEditDialog } from "../../page-hook/profile-edit-dialog-hook";
import LinkTypography from "../../components/atoms/link-typography";
import { useSignDialog } from "../../page-hook/sign-dialog-hook";

const LoadingButton = (props: ButtonProps) => {
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <SecondaryButton
        {...props}
        fullWidth={true}
        disabled={props.disabled || loading}
        onClick={(e) => {
          setLoading(true);
          const myEvent = {} as MouseEventWithParam<{
            callback: (msg: string) => void;
          }>;
          myEvent.params = {
            callback: (msg: string) => {
              setLoading(false);
            },
          };
          //@ts-ignore
          props.onClick?.(myEvent);
        }}
      >
        {props.children}
      </SecondaryButton>
      {loading && (
        <div
          style={{
            position: "absolute",
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            transform: "translateY(-100%)",
            height: "100%",
          }}
        >
          <CircularProgress></CircularProgress>
        </div>
      )}
    </div>
  );
};

const Event = (props: AppProps) => {
  const { userData, asyncUpdateSocialTwitter, asyncUpdateRewardPoint } =
    useSignedUserQuery();
  const { isLoggedIn } = useLogin();
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();
  const {
    ticketData,
    asyncIsCompletedQuestByUserId,
    asyncVerifyTwitterFollowQuest,
    asyncVerifyTwitterRetweetQuest,
    asyncVerifyTwitterLikingQuest,
    asyncCompleteQuestOfUser,
    asyncRequestClaimNtf,
    asyncVerify3ridgePoint,
    asyncVerifyAptosQuest,
  } = useTicketQuery({
    userId: userData._id,
    id: router.isReady
      ? typeof router.query.id === "string"
        ? router.query.id
        : undefined
      : undefined,
  });
  const [openQuizQuestDialog, setOpenQuizQuestDialog] = useState(false);
  const [openContentsRendererDialog, setOpenContentsRendererDialog] =
    useState(false);
  const [simpleWarningDialogTitle, setSimpleWarningDialogTitle] = useState("");
  const [openQuizQuestId, setOpenQuizQuestId] = useState<string>();
  const [openQuizQuestContext, setOpenQuizQuestContext] =
    useState<QuizQuestContext>({ quizList: [] });
  const { showAlert, showErrorAlert, closeAlert } = useAlert();
  const { asyncTwitterSignInPopUp } = useFirebaseAuth();
  const { showLoading, closeLoading } = useLoading();
  const [verifiedList, setVerifiedList] = useState<boolean[]>([]);
  const [updateIndex, setUpdateIndex] = useState(0);
  const [claimCompleted, setClaimCompleted] = useState(false);
  const [updatingClaimCompleted, setUpdatingClaimCompleted] = useState(true);
  const [htmlContent, setHtmlContent] = useState("");
  const { isProfileEditDialogOpen, setShowProfileEditDialog } =
    useProfileEditDialog();
  const { setShowSignInDialog } = useSignDialog();

  useEffect(() => {
    if (!userData?._id) return;
    const ids = ticketData?.quests?.map((e) => {
      return e._id;
    });
    const promiseList: any[] = [];
    ids?.forEach((e) => {
      promiseList.push(asyncIsCompletedQuestByUserId(e ?? ""));
    });
    if (promiseList.length > 0) {
      Promise.all(promiseList)
        .then((res) => {
          const newVerifiedList: boolean[] = [];
          res.forEach((e) => {
            if (ids) {
              newVerifiedList[ids?.indexOf(e.questId)] = e.isCompleted;
            }
          });
          setVerifiedList(newVerifiedList);
        })
        .catch((err) => {
          console.log(err);
        });
      asyncUpdateClaimCompleted().then(() => {});
    }
  }, [ticketData?.quests, userData?._id]);

  useEffect(() => {
    asyncUpdateClaimCompleted().then(() => {});
  }, [updateIndex]);

  const claimRewardDisabled = useMemo(() => {
    if (userData?._id === undefined) return true;
    if (verifiedList.length === 0) return true;
    const res = verifiedList.reduce(
      (accumulator, currentValue) => accumulator && currentValue,
      true
    );
    return !res;
  }, [verifiedList, updateIndex]);

  const walletConnectedForTicket = useMemo(() => {
    return (
      (userData?.walletAddressInfos
        ?.filter((e) => e.address)
        .map((e) => e.network)
        .filter(
          (e) =>
            e ===
            (ticketData.rewardPolicy?.context?.rewardChain === "polygon"
              ? "evm"
              : ticketData.rewardPolicy?.context?.rewardChain)
        )?.length ?? 0) !== 0
    );
  }, [userData?.walletAddressInfos]);

  const isExpired = () => {
    return ticketData?.untilTime //rewardPolicy?.context?.untilTime
      ? //@ts-ignore
        new Date(ticketData?.untilTime) -
          //@ts-ignore
          new Date() <
          0
      : true;
  };

  const updateVerifyState = (index: number) => {
    setVerifiedList((prevState) => {
      prevState[index] = true;
      return prevState;
    });
    setUpdateIndex((prevState) => {
      return prevState + 1;
    });
  };

  const asyncUpdateClaimCompleted = async () => {
    if (ticketData?.rewardPolicy?.context && userData?._id) {
      if (ticketData?.rewardClaimedUserIds?.includes(userData?._id)) {
        setClaimCompleted(true);
      }
      setUpdatingClaimCompleted(false);
    }
  };

  const verifyCardDisabled = () => {
    return (userData?._id ? false : true) || !walletConnectedForTicket;
  };

  const isExceededTicketParticipants = () => {
    if (
      ticketData?.participantCount &&
      ticketData?.rewardPolicy?.context?.limitNumber
    ) {
      return (
        ticketData?.participantCount >=
        ticketData?.rewardPolicy?.context?.limitNumber
      );
    }
    return true;
  };

  return (
    <>
      <Head>
        <title>3ridge : Web3 온보딩 플랫폼</title>
      </Head>
      <Grid
        container
        direction={"row"}
        justifyContent={"center"}
        // spacing={6}
        columnSpacing={6}
        rowSpacing={6}
        sx={{ marginTop: smUp ? 8 : 0, marginBottom: 12 }}
      >
        <Grid item>
          <Stack
            direction={"column"}
            spacing={8}
            sx={{ background: "", padding: mdUp ? 0 : 4 }}
          >
            <Grid
              container
              spacing={4}
              direction={"row"}
              alignItems="center"
              justifyContent={mdUp ? "flex-start" : "center"}
              sx={{ background: "", marginBottom: 2 }}
            >
              <Grid item>
                <Box
                  sx={{
                    height: 128,
                    width: 128,
                    background: "",
                  }}
                >
                  {ticketData?.imageUrl ? (
                    <LazyLoadImage
                      width={smUp ? 128 : 128}
                      height={smUp ? 128 : 128}
                      src={ticketData?.imageUrl}
                      style={{
                        borderRadius: 10,
                        borderColor: theme.palette.neutral[700],
                        borderStyle: "solid",
                        borderWidth: 2,
                      }}
                      effect="blur"
                      beforeLoad={() => {
                        return (
                          <Skeleton
                            width={smUp ? 128 : 128}
                            height={smUp ? 128 : 128}
                            animation={"wave"}
                            variant={"rounded"}
                          ></Skeleton>
                        );
                      }}
                    ></LazyLoadImage>
                  ) : (
                    <Skeleton
                      width={128}
                      height={128}
                      variant={"rounded"}
                      animation={"wave"}
                    ></Skeleton>
                  )}
                </Box>
              </Grid>
              <Grid item>
                <Stack spacing={1} sx={{ marginBottom: 2 }}>
                  <Typography
                    variant={smUp ? "h3" : "h4"}
                    textAlign={smUp ? "left" : "center"}
                  >
                    {ticketData?.title}
                  </Typography>
                  {smUp ? (
                    <Grid
                      container
                      alignItems={"left"}
                      justifyContent={smUp ? "flex-start" : "center"}
                      rowSpacing={1}
                    >
                      {!ticketData?.completed && (
                        <Grid item>
                          <StyledChip
                            label={"진행중"}
                            color={"success"}
                            variant="outlined"
                          ></StyledChip>
                        </Grid>
                      )}
                      {ticketData?.completed && (
                        <Grid item>
                          <StyledChip label={"이벤트 종료"}></StyledChip>
                        </Grid>
                      )}
                      {ticketData?.beginTime && (
                        <Grid item sx={{ marginLeft: 1 }}>
                          {smUp ? (
                            <StyledChip
                              label={`${format(
                                new Date(
                                  ticketData?.beginTime ?? "" //rewardPolicy?.context?.beginTime
                                ),
                                "yyyy/MM/dd hh:mm:ss"
                              )} ~ ${format(
                                new Date(
                                  ticketData?.untilTime ?? "" //rewardPolicy?.context?.untilTime
                                ),
                                "yyyy/MM/dd hh:mm:ss"
                              )} (UTC+09:00)`}
                            ></StyledChip>
                          ) : (
                            <StyledChip
                              sx={{ paddingTop: 4, paddingBottom: 4 }}
                              label={
                                <Stack sx={{}}>
                                  <Typography variant={"body2"}>
                                    {`${format(
                                      new Date(
                                        ticketData?.beginTime ?? "" //rewardPolicy?.context?.beginTime
                                      ),
                                      "yyyy/MM/dd hh:mm:ss"
                                    )}
                                  ~`}
                                  </Typography>
                                  <Typography variant={"body2"}>
                                    {`${format(
                                      new Date(
                                        ticketData?.untilTime ?? "" //rewardPolicy?.context?.untilTime
                                      ),
                                      "yyyy/MM/dd hh:mm:ss"
                                    )} (UTC+09:00)
                                  `}
                                  </Typography>
                                </Stack>
                              }
                            ></StyledChip>
                          )}
                        </Grid>
                      )}
                    </Grid>
                  ) : (
                    <Stack
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{ background: "" }}
                    >
                      {ticketData?.beginTime && ticketData?.untilTime && (
                        <>
                          <Typography>{`${format(
                            new Date(
                              ticketData?.beginTime ?? "" //rewardPolicy?.context?.beginTime
                            ),
                            "yyyy/MM/dd hh:mm:ss"
                          )}`}</Typography>
                          <Typography>
                            {`~ ${format(
                              new Date(
                                ticketData?.untilTime ?? "" //rewardPolicy?.context?.untilTime
                              ),
                              "yyyy/MM/dd hh:mm:ss"
                            )} (UTC+09:00)`}
                          </Typography>
                        </>
                      )}
                      {!ticketData?.completed && (
                        <Box sx={{ marginTop: 2 }}>
                          <StyledChip
                            label={"진행중"}
                            color={"success"}
                            variant="outlined"
                          ></StyledChip>
                        </Box>
                      )}
                    </Stack>
                  )}
                </Stack>
              </Grid>
            </Grid>
            {isExceededTicketParticipants() && (
              <Box sx={{}}>
                <>
                  <Card>
                    <CardContent>
                      <Typography
                        variant={"body1"}
                        sx={{
                          color: theme.palette.warning.main,
                          marginTop: smUp ? 0 : -5,
                          background: "",
                          textAlign: smUp ? "left" : "center",
                        }}
                      >
                        최대 참여자{" "}
                        {ticketData?.rewardPolicy?.context?.limitNumber}명을
                        초과하여 이벤트에 참여하실 수 없습니다 😅
                      </Typography>
                    </CardContent>
                  </Card>
                </>
              </Box>
            )}

            {!isExceededTicketParticipants && userData?._id === undefined && (
              <Box sx={{}}>
                <Typography
                  variant={smUp ? "h5" : "h6"}
                  sx={{
                    color: theme.palette.secondary.main,
                    marginTop: smUp ? 0 : -5,
                    background: "",
                    textAlign: smUp ? "left" : "center",
                  }}
                >
                  <>
                    <Card>
                      <CardContent>
                        <LinkTypography
                          variant={"body1"}
                          href={"#"}
                          sx={{
                            fontWeight: "bold",
                            "&:hover": {
                              color: "#914e1d",
                              textDecoration: "underline",
                            },
                            color: theme.palette.warning.main,
                          }}
                          onClick={async (e) => {
                            setShowSignInDialog(true);
                          }}
                        >
                          로그인 후, 이벤트에 참여하실 수 있어요 😅
                        </LinkTypography>
                      </CardContent>
                    </Card>
                  </>
                </Typography>
              </Box>
            )}
            {userData?._id && !walletConnectedForTicket && (
              <Card>
                <CardContent>
                  <Stack
                    direction={smUp ? "row" : "column"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    spacing={smUp ? 0 : 2}
                  >
                    <Stack direction={"column"}>
                      <Typography
                        variant={"h6"}
                        sx={{ color: theme.palette.warning.main }}
                        // alignContent={"center"}
                        textAlign={"center"}
                      >
                        {`이벤트를 위해 ${ticketData.rewardPolicy?.context?.rewardNetwork}을 지원하는 지갑 연결이 필요해요`}{" "}
                      </Typography>
                    </Stack>
                    <Stack direction={"column"}>
                      <SecondaryButton
                        onClick={async (e) => {
                          e.preventDefault();
                          showLoading();
                          setShowProfileEditDialog(true);
                          await router.push(`/profile/${userData?.name}`);
                          closeLoading();
                        }}
                      >
                        지갑 연결하러 가기
                      </SecondaryButton>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            )}
            <Stack
              direction={"column"}
              spacing={2}
              alignItems={smUp ? "flex-start" : "center"}
            >
              <Typography textAlign={smUp ? "left" : "left"} variant={"h5"}>
                이벤트 설명
              </Typography>
              <Box sx={{ maxWidth: 800 }}>
                <Stack>
                  {ComponentHelper.getInstance().multiLineContentText(
                    ticketData?.description,
                    {
                      textAlign: smUp ? "left" : "center",
                    }
                  )}
                </Stack>
              </Box>
            </Stack>

            <Stack
              direction={"column"}
              alignItems={smUp ? "left" : "center"}
              spacing={2}
              // maxWidth={800}
              sx={{ background: "" }}
            >
              <Typography variant="h5" textAlign={smUp ? "left" : "left"}>
                퀘스트
              </Typography>
              <Stack
                direction={"column"}
                spacing={4}
                alignItems={"center"}
                sx={{}}
              >
                {ticketData?.quests?.map((quest, index) => {
                  const autoVerified =
                    quest.questPolicy?.questPolicy === QuestPolicyType.Quiz ||
                    quest.questPolicy?.questPolicy ===
                      QuestPolicyType.VerifyDiscord;

                  return (
                    <VerifyCard
                      key={index + 1}
                      sx={{ width: mdUp ? 800 : smUp ? 600 : 300 }}
                      index={index + 1}
                      title={quest.title}
                      description={quest.description}
                      disabled={
                        (userData?._id ? false : true) ||
                        isExceededTicketParticipants()
                      }
                      verified={verifiedList[index]}
                      hideStartButton={
                        quest.questPolicy?.questPolicy ===
                          QUEST_POLICY_TYPE.VERIFY_3RIDGE_POINT ||
                        quest.questPolicy?.questPolicy ===
                          QUEST_POLICY_TYPE.VERIFY_APTOS_BRIDGE_TO_APTOS ||
                        quest.questPolicy?.questPolicy ===
                          QUEST_POLICY_TYPE.VERIFY_APTOS_HAS_NFT ||
                        quest.questPolicy?.questPolicy ===
                          QUEST_POLICY_TYPE.VERIFY_APTOS_EXIST_TX
                      }
                      onVerifyBtnClicked={async (e) => {
                        const myEvent = e as MouseEventWithParam<{
                          callback: (msg: string) => void;
                        }>;
                        try {
                          if (!ticketData._id) return;
                          if (
                            quest.questPolicy?.questPolicy ===
                            QUEST_POLICY_TYPE.VERIFY_TWITTER_FOLLOW
                          ) {
                            await asyncVerifyTwitterFollowQuest(
                              ticketData._id,
                              quest._id ?? ""
                            );
                            myEvent.params.callback("success");
                            updateVerifyState(index);
                          } else if (
                            quest.questPolicy?.questPolicy ===
                            QUEST_POLICY_TYPE.VERIFY_TWITTER_RETWEET
                          ) {
                            await asyncVerifyTwitterRetweetQuest(
                              ticketData._id,
                              quest._id ?? ""
                            );
                            myEvent.params.callback("success");
                            updateVerifyState(index);
                          } else if (
                            quest.questPolicy?.questPolicy ===
                            QUEST_POLICY_TYPE.VERIFY_TWITTER_LIKING
                          ) {
                            await asyncVerifyTwitterLikingQuest(
                              ticketData._id,
                              quest._id ?? ""
                            );
                            myEvent.params.callback("success");
                            updateVerifyState(index);
                          } else if (
                            quest.questPolicy?.questPolicy ===
                            QUEST_POLICY_TYPE.VERIFY_3RIDGE_POINT
                          ) {
                            await asyncVerify3ridgePoint(
                              ticketData._id,
                              quest._id ?? ""
                            );
                            myEvent.params.callback("success");
                            updateVerifyState(index);
                          } else if (
                            quest.questPolicy?.questPolicy ===
                              QUEST_POLICY_TYPE.VERIFY_APTOS_BRIDGE_TO_APTOS ||
                            quest.questPolicy?.questPolicy ===
                              QUEST_POLICY_TYPE.VERIFY_APTOS_EXIST_TX ||
                            quest.questPolicy?.questPolicy ===
                              QUEST_POLICY_TYPE.VERIFY_APTOS_HAS_ANS ||
                            quest.questPolicy?.questPolicy ===
                              QUEST_POLICY_TYPE.VERIFY_APTOS_HAS_NFT
                          ) {
                            await asyncVerifyAptosQuest(
                              ticketData._id,
                              quest._id ?? ""
                            );
                            myEvent.params.callback("success");
                            updateVerifyState(index);
                          }
                        } catch (e) {
                          const errorMessage = getErrorMessage(e);
                          console.log(errorMessage);
                          if (
                            errorMessage ===
                            APP_ERROR_MESSAGE.ALREADY_PARTICIPATED_USER
                          ) {
                            myEvent.params.callback("success");
                            updateVerifyState(index);
                          } else if (
                            errorMessage ===
                              APP_ERROR_MESSAGE.DOES_NOT_TWITTER_FOLLOW ||
                            errorMessage ===
                              APP_ERROR_MESSAGE.DOES_NOT_TWITTER_RETWEET ||
                            errorMessage ===
                              APP_ERROR_MESSAGE.DOES_NOT_TWITTER_LIKING
                          ) {
                            showAlert({
                              title: "알림",
                              content: getLocaleErrorMessage(e),
                            });
                          }
                        }
                      }}
                      onStartBtnClicked={async (e) => {
                        if (!ticketData._id || !quest._id) return;
                        if (
                          quest.questPolicy?.questPolicy ===
                          QUEST_POLICY_TYPE.QUIZ
                        ) {
                          const quizQuestContext = quest.questPolicy
                            ?.context as QuizQuestContext;
                          setOpenQuizQuestContext(quizQuestContext);
                          setOpenQuizQuestDialog(true);
                          setOpenQuizQuestId(quest._id);
                        } else if (
                          quest.questPolicy?.questPolicy ===
                          QUEST_POLICY_TYPE.VERIFY_TWITTER_FOLLOW
                        ) {
                          try {
                            if (!userData?.userSocial?.twitterId) {
                              showLoading();
                              const res = await asyncTwitterSignInPopUp();
                              await asyncUpdateSocialTwitter(res);
                              closeLoading();
                            }
                            const followQuestContext = quest.questPolicy
                              .context as TwitterFollowQuestContext;
                            window.open(
                              `https://twitter.com/intent/follow?screen_name=${followQuestContext.username}`,
                              "twitter",
                              "width=800, height=600, status=no, menubar=no, toolbar=no, resizable=no"
                            );
                          } catch (e) {
                            closeLoading();
                            showErrorAlert({ content: getErrorMessage(e) });
                          }
                        } else if (
                          quest.questPolicy?.questPolicy ===
                          QUEST_POLICY_TYPE.VERIFY_TWITTER_LIKING
                        ) {
                          try {
                            if (!userData?.userSocial?.twitterId) {
                              showLoading();
                              const res = await asyncTwitterSignInPopUp();
                              await asyncUpdateSocialTwitter(res);
                              closeLoading();
                            }
                          } catch (e) {
                            closeLoading();
                            showErrorAlert({ content: getErrorMessage(e) });
                          }
                          const likingQuestContext = quest.questPolicy
                            .context as TwitterLikingQuestContext;
                          console.log(likingQuestContext);
                          window.open(
                            `https://twitter.com/intent/like?tweet_id=${likingQuestContext.tweetId}`,
                            "twitter",
                            "width=800, height=600, status=no, menubar=no, toolbar=no, resizable=no"
                          );
                        } else if (
                          quest.questPolicy?.questPolicy ===
                          QUEST_POLICY_TYPE.VERIFY_TWITTER_RETWEET
                        ) {
                          try {
                            if (!userData?.userSocial?.twitterId) {
                              showLoading();
                              const res = await asyncTwitterSignInPopUp();
                              await asyncUpdateSocialTwitter(res);
                              closeLoading();
                            }
                            const retweetQuestContext = quest.questPolicy
                              .context as TwitterRetweetQuestContext;
                            console.log(retweetQuestContext);
                            window.open(
                              `https://twitter.com/intent/retweet?tweet_id=${retweetQuestContext.tweetId}`,
                              "twitter",
                              "width=800, height=600, status=no, menubar=no, toolbar=no, resizable=no"
                            );
                          } catch (e) {
                            closeLoading();
                            showErrorAlert({ content: getErrorMessage(e) });
                          }
                        } else if (
                          quest.questPolicy?.questPolicy ===
                            QUEST_POLICY_TYPE.VERIFY_DISCORD ||
                          quest.questPolicy?.questPolicy ===
                            QUEST_POLICY_TYPE.VERIFY_TELEGRAM
                        ) {
                          let questContext;
                          switch (quest.questPolicy?.questPolicy) {
                            case QUEST_POLICY_TYPE.VERIFY_DISCORD:
                              questContext = quest.questPolicy
                                ?.context as DiscordQuestContext;
                              window.open(
                                `https://discord.gg/${questContext.channelId}`,
                                "discord",
                                "width=800, height=600, status=no, menubar=no, toolbar=no, resizable=no"
                              );
                              break;
                            case QUEST_POLICY_TYPE.VERIFY_TELEGRAM:
                              questContext = quest.questPolicy
                                ?.context as TelegramQuestContext;
                              window.open(
                                `https://t.me/${questContext.channelId}`,
                                "telegram",
                                "width=800, height=600, status=no, menubar=no, toolbar=no, resizable=no"
                              );
                              break;
                          }

                          try {
                            const res = await asyncCompleteQuestOfUser(
                              ticketData._id,
                              quest?._id
                            );
                            setVerifiedList((prevState) => {
                              prevState[index] = true;
                              return prevState;
                            });
                            setUpdateIndex((prevState) => {
                              return prevState + 1;
                            });
                          } catch (e) {
                            if (
                              getErrorMessage(e) ===
                              "user already participated ticket"
                            ) {
                              setVerifiedList((prevState) => {
                                prevState[index] = true;
                                return prevState;
                              });
                              setUpdateIndex((prevState) => {
                                return prevState + 1;
                              });
                            }
                          }
                          let title = "";
                          if (
                            quest.questPolicy?.questPolicy ===
                            QUEST_POLICY_TYPE.VERIFY_DISCORD
                          ) {
                            title = "디스코드";
                          } else if (
                            quest.questPolicy?.questPolicy ===
                            QUEST_POLICY_TYPE.VERIFY_TELEGRAM
                          ) {
                            title = "텔레그램";
                          }
                          setSimpleWarningDialogTitle(title);
                        } else if (
                          quest.questPolicy?.questPolicy ===
                          QUEST_POLICY_TYPE.VERIFY_APTOS_HAS_ANS
                        ) {
                          setOpenContentsRendererDialog(true);
                          if (quest.questGuides?.[0]?.content) {
                            setHtmlContent(
                              decodeBase64(quest.questGuides[0].content)
                            );
                          }
                        }
                      }}
                      autoVerified={autoVerified}
                    ></VerifyCard>
                  );
                })}
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        <Grid item>
          <Stack
            direction={"column"}
            spacing={10}
            sx={{ minWidth: smUp ? 260 : 260, padding: smUp ? 0 : 4 }}
          >
            <Stack direction={"column"} spacing={5}>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                sx={{ background: "" }}
              >
                <Typography variant="h5">리워드</Typography>
                <StyledChip
                  label={
                    ticketData?.rewardPolicy?.rewardPolicyType ==
                    REWARD_POLICY_TYPE.FCFS
                      ? "선착순"
                      : "추첨"
                  }
                  icon={
                    ticketData?.rewardPolicy?.rewardPolicyType ==
                    REWARD_POLICY_TYPE.FCFS ? (
                      <DirectionsRunIcon />
                    ) : (
                      <AccessAlarmIcon />
                    )
                  }
                ></StyledChip>
              </Stack>
              {(ticketData?.winners?.filter(
                (winner) =>
                  String(winner.name).toUpperCase().trim() ===
                  userData?.name?.toUpperCase().trim()
              )?.length ?? 0) > 0 && (
                <Box>
                  <Card>
                    <CardContent>
                      <Typography
                        variant={"h6"}
                        sx={{ color: theme.palette.success.main }}
                      >
                        본 이벤트의 위너가 되었습니다 🎉
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              )}
              <PrimaryCard hoverEffect={false}>
                <Box>
                  <Stack alignItems={"center"}>
                    <Typography variant={"body1"}>
                      이벤트가 끝나기까지 남은 시간
                    </Typography>
                    {ticketData?.untilTime ? (
                      isExpired() ? (
                        <Stack
                          sx={{
                            background: "",
                            paddingTop: 5,
                            paddingBottom: 2,
                          }}
                          direction={"row"}
                          alignItems={"center"}
                          justifyContent={"center"}
                        >
                          <Typography
                            variant={"h6"}
                            sx={{ color: theme.palette.secondary.main }}
                          >
                            본 이벤트가 끝났습니다
                          </Typography>
                        </Stack>
                      ) : (
                        <TimerBoard
                          sx={{
                            marginTop: 4,
                            background: "",
                            width: "100%",
                          }}
                          expiryTimestamp={
                            new Date(
                              ticketData?.untilTime ?? "" //rewardPolicy?.context?.untilTime
                            )
                          }
                        />
                      )
                    ) : (
                      <DummyTimerBoard
                        sx={{
                          marginTop: 4,
                          background: "",
                          width: "100%",
                        }}
                      />
                    )}
                  </Stack>
                </Box>
              </PrimaryCard>
              <PrimaryCard>
                <Stack direction={"column"} spacing={5} sx={{}}>
                  <Stack direction={"column"} spacing={2}>
                    <Stack
                      direction={"column"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Box
                        sx={{
                          width: smUp ? 300 : 260,
                          height: smUp ? 300 : 260,
                          borderRadius: 2,
                          marginBottom: 2,
                        }}
                      >
                        {ticketData?.rewardPolicy?.context?.nftImageUrl && (
                          <Box>
                            <LazyLoadImage
                              className={"lazyLoadImage"}
                              width={smUp ? 300 : 260}
                              height={smUp ? 300 : 260}
                              src={
                                ticketData?.rewardPolicy?.context?.nftImageUrl
                              }
                              style={{
                                borderWidth: 3,
                                borderRadius: 16,
                                borderColor: "",
                                borderStyle: "solid",
                              }}
                              effect="blur"
                              beforeLoad={() => {
                                return (
                                  <Skeleton
                                    width={smUp ? 300 : 260}
                                    height={smUp ? 300 : 260}
                                    animation={"wave"}
                                    variant={"rounded"}
                                  ></Skeleton>
                                );
                              }}
                            ></LazyLoadImage>
                          </Box>
                        )}
                      </Box>
                    </Stack>
                    <Divider></Divider>
                    <Box>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Typography variant={"body1"}>포인트</Typography>
                        <Stack direction={"row"} alignItems={"center"}>
                          <Image
                            src={
                              "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/icon_point.svg"
                            }
                            alt={"StarIcon"}
                            width={48}
                            height={48}
                          ></Image>
                          <Typography variant={"h6"}>
                            {ticketData?.rewardPolicy?.context?.point ?? 0}
                          </Typography>
                        </Stack>
                      </Stack>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Typography variant={"body1"}>대상자 수</Typography>
                        <Stack direction={"row"} alignItems={"center"}>
                          <Typography variant={"h6"}>
                            {ticketData?.rewardPolicy?.context?.rewardAmount ??
                              ""}
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
                          <Stack direction={"row"} alignItems={"center"}>
                            <Typography variant={"h6"}>
                              {ticketData?.rewardPolicy?.context?.rewardName ??
                                ""}
                            </Typography>
                          </Stack>
                        </Stack>
                      )}
                    </Box>
                  </Stack>
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
                </Stack>
              </PrimaryCard>
              <LoadingButton
                disabled={
                  claimRewardDisabled ||
                  claimCompleted ||
                  // updatingClaimCompleted ||
                  isExpired() ||
                  !ticketData?.rewardPolicy?.context?.rewardClaimable
                }
                onClick={async (e) => {
                  if (
                    !(
                      ticketData &&
                      ticketData?.rewardPolicy &&
                      ticketData?.rewardPolicy?.context
                    )
                  ) {
                    return;
                  }
                  const { collectionName, tokenName, point } =
                    ticketData?.rewardPolicy?.context;
                  if (
                    userData?.walletAddressInfos?.[0].address &&
                    collectionName &&
                    tokenName &&
                    ticketData?._id
                  ) {
                    console.log(
                      userData?.walletAddressInfos[0].address,
                      collectionName,
                      tokenName
                    );
                    try {
                      await asyncRequestClaimNtf(
                        collectionName,
                        tokenName,
                        userData?.walletAddressInfos[0].address,
                        ticketData?._id
                      );
                      const newRewardAmount =
                        (userData?.rewardPoint ?? 0) + point;
                      await asyncUpdateRewardPoint(newRewardAmount);
                      //@ts-ignore
                      const myEvent = e as MouseEventWithParam<{
                        callback: (msg: string) => void;
                      }>;
                      myEvent.params.callback("success");
                      setClaimCompleted(true);
                      showAlert({
                        title: "Congrats ! 🥳",
                        content: (
                          <>
                            <Stack direction={"column"} spacing={1}>
                              <Typography>
                                방금 지갑에 리워드를 보냈어요! 지갑을
                                확인해주세요
                              </Typography>
                              <Typography>
                                전송된 리워드를 받기 위해서는 Petra 지갑에서
                                Accept 해주어야 합니다. 지갑을 확인해주세요!
                              </Typography>
                            </Stack>
                          </>
                        ),
                      });
                    } catch (e) {
                      console.log(e);
                    }
                  }
                }}
              >
                {isExpired()
                  ? "이벤트가 종료되었어요"
                  : claimCompleted
                  ? "이미 리워드를 클레임 하였습니다"
                  : ticketData?.rewardPolicy?.context?.rewardClaimable
                  ? "리워드 클레임"
                  : "리워드 예정"}
              </LoadingButton>
            </Stack>

            <Stack direction={"column"}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={1}
                justifyContent={smUp ? "flex-start" : "center"}
              >
                <Typography variant="h5">
                  아래의 사람들이 참여하고 있어요
                </Typography>
              </Stack>
              <Grid
                container
                // direction={"row"}
                sx={{ marginTop: 4 }}
                // alignItems={"center"}
                justifyContent={smUp ? "flex-start" : "center"}
              >
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
                                  e.profileImageUrl ??
                                  DEFAULT_PROFILE_IMAGE_DATA_SRC
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
                              background: (theme) =>
                                theme.palette.neutral["800"],
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
                            <Typography
                              variant={"caption"}
                              color={"neutral.100"}
                            >
                              {`+${nFormatter(
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
                    <Box
                      onClick={() => {
                        // console.log("aaa");
                      }}
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      <Typography>⛔&nbsp;EMPTY</Typography>
                    </Box>
                  </>
                )}
              </Grid>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <SimpleDialog
        open={simpleWarningDialogTitle ? true : false}
        title={"Notification"}
        onClose={() => {
          setSimpleWarningDialogTitle("");
        }}
      >
        <Typography>
          {`${simpleWarningDialogTitle} 초대 링크의 참여 상태를 주기적으로 확인할 예정입니다. 방에
          참여 상태로 유지해주세요.`}
        </Typography>
      </SimpleDialog>
      <QuestQuizDialog
        open={openQuizQuestDialog}
        context={openQuizQuestContext}
        onClose={() => {
          setOpenQuizQuestDialog(false);
        }}
        onCompleteQuiz={() => {
          if (openQuizQuestId) {
            const ids = ticketData?.quests?.map((e) => {
              return e._id;
            });
            const index = ids?.indexOf(openQuizQuestId) as number;
            if (index !== undefined && ticketData._id) {
              try {
                asyncCompleteQuestOfUser(ticketData._id, openQuizQuestId).then(
                  (res) => {
                    setVerifiedList((prevState) => {
                      prevState[index] = true;
                      return prevState;
                    });
                    setUpdateIndex((prevState) => {
                      return prevState + 1;
                    });
                  }
                );
              } catch (e) {
              } finally {
                setOpenQuizQuestDialog(false);
              }
            }
          }
        }}
      ></QuestQuizDialog>
      <ContentsRendererDialog
        open={openContentsRendererDialog}
        onClose={() => {
          setOpenContentsRendererDialog(false);
        }}
        onCloseBtnClicked={(e) => {
          e.preventDefault();
          setOpenContentsRendererDialog(false);
        }}
        htmlContent={htmlContent}
      ></ContentsRendererDialog>
    </>
  );
};

Event.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default Event;
