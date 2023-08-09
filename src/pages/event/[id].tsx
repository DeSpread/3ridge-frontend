import React, { ReactElement, useEffect, useMemo, useState } from "react";
import MainLayout from "../../layouts/main-layout";
import { AppProps } from "next/app";
import Head from "next/head";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTicketQuery } from "../../hooks/ticket-query-hook";
import SecondaryButton from "../../components/atomic/atoms/secondary-button";
import QuestQuizDialog from "../../components/dialogs/quest/quest-quiz-dialog";
import SimpleDialog from "../../components/dialogs/simple-dialog";
import {
  MouseEventWithParam,
  Quest,
  REWARD_POLICY_TYPE,
  SUPPORTED_NETWORKS,
  VerifyAgreementQuestContext,
  VerifyDiscordQuestContext,
  VerifyHasWalletAddressQuestContext,
  VerifyQuizQuestContext,
  VerifySurveyQuestContext,
  VerifyTelegramQuestContext,
  VerifyTwitterFollowQuestContext,
  VerifyTwitterLikingQuestContext,
  VerifyTwitterRetweetQuestContext,
  VerifyVisitWebsiteQuestContext,
} from "../../types";
import { ContentMetadata, QuestPolicyType } from "../../__generated__/graphql";
import { useSignedUserQuery } from "../../hooks/signed-user-query-hook";
import { useAlert } from "../../provider/alert/alert-provider";
import {
  APP_ERROR_MESSAGE,
  getErrorMessage,
  getLocaleErrorMessage,
} from "../../error/my-error";
import { useLoading } from "../../provider/loading/loading-provider";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import { useLogin } from "../../provider/login/login-provider";
import { useProfileEditDialog } from "../../hooks/profile-edit-dialog-hook";
import LinkTypography from "../../components/atomic/atoms/link-typography";
import { useSignDialog } from "../../hooks/sign-dialog-hook";
import Realistic from "../../components/effects/realistic";
import { useGetSet, useMountedState } from "react-use";
import { useSetRecoilState } from "recoil";
import { backDirectionPathState } from "../../lib/recoil";
import ClickTypography from "../../components/atomic/atoms/click-typhography";
import AgreementDialog from "../../components/dialogs/agreement-dialog";
import EventTitle from "../../components/pages/event/event-title";
import EventImage from "../../components/pages/event/event-image";
import EventDateRange from "../../components/pages/event/event-date-range";
import EventDescription from "../../components/pages/event/event-description";
import EventQuests from "../../components/pages/event/event-quests";
import EventRewardPolicy from "../../components/pages/event/reward/event-reward-policy";
import EventTimeBoard from "../../components/pages/event/event-time-board";
import EventRewardDescription from "../../components/pages/event/reward/event-reward-description";
import ButtonWithLoading from "../../components/atomic/molecules/button-with-loading";
import EventParticipants from "../../components/pages/event/event-participants";
import TicketRewardHowToDialog from "../../components/dialogs/ticket-edit/ticket-reward-how-to-dialog";
import QuestSurveyDialog from "../../components/dialogs/quest/quest-survey-dialog";
import TypeHelper from "../../helper/type-helper";
import StringHelper from "../../helper/string-helper";

const Event = (props: AppProps) => {
  const { userData } = useSignedUserQuery();
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
    asyncRewardClaim,
    asyncVerify3ridgePoint,
    asyncVerifyAptosQuest,
    asyncRefreshTicketData,
    asyncVerifySurveyQuest,
  } = useTicketQuery({
    userId: userData._id,
    id: router.isReady
      ? typeof router.query.id === "string"
        ? router.query.id
        : undefined
      : undefined,
  });

  const [simpleWarningDialogTitle, setSimpleWarningDialogTitle] = useState("");
  const [simpleWarningDialogShow, setSimpleWarningDialogShow] = useState(false);
  const [openTicketRewardHowToDialog, setOpenTicketRewardHowToDialog] =
    useState(false);
  const [openAgreementQuestDialog, setOpenAgreementQuestDialog] =
    useState(false);

  const [openAgreementQuestId, setOpenAgreementQuestId] = useState<string>();
  const [openAgreementQuestContext, setOpenAgreementQuestContext] =
    useState<VerifyAgreementQuestContext>({ agreementList: [] });

  const [openedQuestId, setOpenedQuestId] = useState<string>();

  const [openSurveyQuestDialog, setOpenSurveyQuestDialog] = useState(false);
  const [openedSurveyContext, setOpenedSurveyContext] =
    useState<VerifySurveyQuestContext>({ questions: [] });

  const [openQuizQuestDialog, setOpenQuizQuestDialog] = useState(false);
  const [openedQuizQuestContext, setOpenedQuizQuestContext] =
    useState<VerifyQuizQuestContext>({ quizList: [] });

  const { showAlert, showErrorAlert, closeAlert } = useAlert();
  const { showLoading, closeLoading } = useLoading();
  const [verifiedList, setVerifiedList] = useState<boolean[]>([]);
  const [updateIndex, setUpdateIndex] = useState(0);
  const [claimCompleted, setClaimCompleted] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");

  const { setShowProfileEditDialog } = useProfileEditDialog();
  const { setShowSignInDialog } = useSignDialog();
  const [initVerifiedList, setInitVerifiedList] = useState(false);
  const [lockUpdateVerifyAll, setLockUpdateVerifyAll] = useState(false);
  const [hasMetamask, setHasMetask] = useState(false);
  const [isFire, setFire] = React.useState(false);
  const [lazyFire, setLazyFire] = React.useState(false);
  const setBackDirectionPath = useSetRecoilState(backDirectionPathState);

  useEffect(() => {
    const { ethereum } = window;
    //@ts-ignore
    const _hasMetamask = ethereum ? ethereum.isMetaMask : false;
    setHasMetask(_hasMetamask);
    setShowProfileEditDialog(false);
    setBackDirectionPath("");
  }, []);

  useEffect(() => {
    updateVerifyAll();
  }, [ticketData, userData?._id]);

  const updateVerifyAll = () => {
    if (!userData?._id || initVerifiedList) return;
    if (lockUpdateVerifyAll) return;
    setLockUpdateVerifyAll(true);
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
          setInitVerifiedList(true);
          asyncUpdateClaimCompleted().then(() => {});
          setLockUpdateVerifyAll(false);
        })
        .catch((err) => {
          console.log(err);
          setLockUpdateVerifyAll(false);
        });
    } else {
      setLockUpdateVerifyAll(false);
    }
  };

  useEffect(() => {
    if (!simpleWarningDialogShow) setSimpleWarningDialogTitle("");
  }, [simpleWarningDialogShow]);

  useEffect(() => {
    asyncUpdateClaimCompleted().then(() => {});
  }, [updateIndex]);

  useEffect(() => {
    if (!ticketData?._id) {
      return;
    }
    asyncRefreshTicketData();
  }, [updateIndex]);

  const isMounted = useMountedState();

  const [initCount, setInitCount] = useGetSet(0);

  useEffect(() => {
    if (verifiedList.length === 0) return;
    if (!isMounted) return;
    if (initCount() === 0) {
      return setInitCount(initCount() + 1);
    }

    const allComplete = verifiedList
      .map((e, _index) => {
        return e;
      })
      .reduce((accumulator, currentValue) => accumulator && currentValue, true);

    if (allComplete) {
      if (simpleWarningDialogTitle === "") {
        setFire(true);
      } else {
        setLazyFire(true);
      }
    }
  }, [verifiedList, updateIndex]);

  const openAgreementDialog = (
    questId: string,
    agreementContext: VerifyAgreementQuestContext
  ) => {
    setOpenAgreementQuestDialog(true);
    setOpenAgreementQuestId(questId);
    setOpenAgreementQuestContext(agreementContext);
  };

  const closeAgreementDialog = () => {
    setOpenAgreementQuestDialog(false);
    setOpenAgreementQuestId(undefined);
    setOpenAgreementQuestContext({ agreementList: [] });
  };

  const openSurveyDialog = (
    questId: string,
    surveyQuestContext: VerifySurveyQuestContext
  ) => {
    setOpenSurveyQuestDialog(true);
    setOpenedQuestId(questId);
    setOpenedSurveyContext(surveyQuestContext);
  };

  const closeSurveyDialog = () => {
    setOpenSurveyQuestDialog(false);
    setOpenedQuestId(undefined);
    setOpenedSurveyContext({ questions: [] });
  };

  const openQuizDialog = (
    questId: string,
    quizContext: VerifyQuizQuestContext
  ) => {
    setOpenQuizQuestDialog(true);
    setOpenedQuestId(questId);
    setOpenedQuizQuestContext(quizContext);
  };

  const closeQuizDialog = () => {
    setOpenQuizQuestDialog(false);
    setOpenedQuestId(undefined);
    setOpenedQuizQuestContext({ quizList: [] });
  };

  const openSimpleWarningDialog = (content?: ContentMetadata | string) => {
    setSimpleWarningDialogShow(true);
    if (typeof content === "string") {
      setSimpleWarningDialogTitle(content);
      setHtmlContent("");
    } else if (content) {
      setHtmlContent(StringHelper.decodeContentMetaData(content));
    }
  };

  const closeSimpleWarningDialog = () => {
    setSimpleWarningDialogShow(false);
    setSimpleWarningDialogTitle("");
    setHtmlContent("");
  };

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
    if (ticketData.rewardPolicy?.context?.rewardChain.includes("offchain"))
      return true;
    return (
      (userData?.walletAddressInfos
        ?.filter((e) => e.address)
        .map((e) => e.network)
        .filter(
          (e) =>
            String(e).toLowerCase() ===
            (String(
              ticketData.rewardPolicy?.context?.rewardChain
            ).toLowerCase() === "polygon"
              ? SUPPORTED_NETWORKS.EVM
              : String(
                  ticketData.rewardPolicy?.context?.rewardChain
                ).toLowerCase())
        )?.length ?? 0) !== 0
    );
  }, [userData?.walletAddressInfos]);

  const isExpired = () => {
    return TypeHelper.isTicketExpired(ticketData);
  };

  const isStarted = () => {
    return TypeHelper.isTicketStarted(ticketData);
  };

  const updateVerifyState = (index: number) => {
    setVerifiedList((prevState) => {
      prevState[index] = true;
      return prevState;
    });
    setUpdateIndex((prevState) => {
      return prevState + 1;
    });
    asyncRefreshTicketData();
  };

  const asyncUpdateClaimCompleted = async () => {
    if (ticketData?.rewardPolicy?.context && userData?._id) {
      if (ticketData?.rewardClaimedUserIds?.includes(userData?._id)) {
        setClaimCompleted(true);
      }
    }
  };

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

  const asyncGoToProfileAndEditDialogOpen = async () => {
    try {
      showLoading();
      setShowProfileEditDialog(true);
      setBackDirectionPath(`/event/${ticketData?._id}`);
      await router.push(`/profile/${userData?.name}`);
      closeLoading();
    } catch (e) {
      console.log(e);
    }
  };

  const showTwitterConnectAlert = () => {
    if (!userData?.userSocial?.twitterId) {
      showAlert({
        title: "알림",
        content: (
          <>
            <Typography>먼저 twitter id를 연동해주세요</Typography>
            <ClickTypography
              variant={"body1"}
              onClick={async () => {
                closeAlert();
                await asyncGoToProfileAndEditDialogOpen();
              }}
              sx={{
                fontWeight: "bold",
                "&:hover": {
                  color: "#914e1d",
                  textDecoration: "underline",
                },
                color: theme.palette.warning.main,
              }}
            >
              프로필 연동하러 가기
            </ClickTypography>
          </>
        ),
      });
      return true;
    }
    return false;
  };

  const renderConnectWalletAlertMessage = () => {
    return (
      <>
        <Stack spacing={1}>
          <Typography variant={"body1"}>
            프로필 페이지에서 지갑을 연동해주세요.
          </Typography>
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
              closeAlert();
              setTimeout(() => {
                asyncGoToProfileAndEditDialogOpen();
              }, 0);
            }}
          >
            이 링크를 누르시면 프로필 페이지로 이동합니다.
          </LinkTypography>
        </Stack>
      </>
    );
  };

  const getLoadingButtonLabel = () => {
    if (isExpired()) {
      return "이벤트가 종료되었어요";
    }
    if (!isStarted()) {
      return "이벤트가 시작되지 않았습니다";
    }
    if (claimCompleted) {
      return "이미 리워드를 클레임 하였습니다";
    }
    if (ticketData?.rewardPolicy?.context?.rewardClaimable) {
      return "리워드 클레임";
    }
    return "리워드 예정";
  };

  const asyncStartQuest = async (
    e: React.MouseEvent<Element, MouseEvent>,
    quest: Quest,
    index: number
  ) => {
    if (!ticketData._id || !quest._id) return;
    if (
      quest.questPolicy?.questPolicy === QuestPolicyType.VerifyTwitterFollow
    ) {
      try {
        const followQuestContext = quest.questPolicy
          .context as VerifyTwitterFollowQuestContext;
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
      quest.questPolicy?.questPolicy === QuestPolicyType.VerifyTwitterLiking
    ) {
      const likingQuestContext = quest.questPolicy
        .context as VerifyTwitterLikingQuestContext;
      console.log(likingQuestContext);
      window.open(
        `https://twitter.com/intent/like?tweet_id=${likingQuestContext.tweetId}`,
        "twitter",
        "width=800, height=600, status=no, menubar=no, toolbar=no, resizable=no"
      );
    } else if (
      quest.questPolicy?.questPolicy === QuestPolicyType.VerifyTwitterRetweet
    ) {
      try {
        const retweetQuestContext = quest.questPolicy
          .context as VerifyTwitterRetweetQuestContext;
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
    } else if (quest.questPolicy?.questPolicy === QuestPolicyType.Quiz) {
      const quizQuestContext = quest.questPolicy
        ?.context as VerifyQuizQuestContext;
      openQuizDialog(quest._id, quizQuestContext);
    } else if (
      quest.questPolicy?.questPolicy === QuestPolicyType.VerifySurvey
    ) {
      const surveyQuestContext = quest.questPolicy
        ?.context as VerifySurveyQuestContext;
      openSurveyDialog(quest._id, surveyQuestContext);
    } else if (
      quest.questPolicy?.questPolicy === QuestPolicyType.VerifyDiscord ||
      quest.questPolicy?.questPolicy === QuestPolicyType.VerifyTelegram ||
      quest.questPolicy?.questPolicy === QuestPolicyType.VerifyVisitWebsite
    ) {
      let questContext;
      switch (quest.questPolicy?.questPolicy) {
        case QuestPolicyType.VerifyDiscord:
          questContext = quest.questPolicy
            ?.context as VerifyDiscordQuestContext;
          window.open(
            `https://discord.gg/${questContext.channelId}`,
            "discord",
            "width=800, height=600, status=no, menubar=no, toolbar=no, resizable=no"
          );
          break;
        case QuestPolicyType.VerifyTelegram:
          questContext = quest.questPolicy
            ?.context as VerifyTelegramQuestContext;
          window.open(
            `https://t.me/${questContext.channelId}`,
            "telegram",
            "width=800, height=600, status=no, menubar=no, toolbar=no, resizable=no"
          );
          break;
        case QuestPolicyType.VerifyVisitWebsite:
          questContext = quest.questPolicy
            ?.context as VerifyVisitWebsiteQuestContext;
          // console.log(questContext?.url);
          const newWindow = window.open(
            questContext?.url,
            "_blank",
            "noopener,noreferrer"
          );
          if (newWindow) newWindow.opener = null;
          break;
      }
      if (quest.questPolicy?.questPolicy === QuestPolicyType.VerifyDiscord) {
        if (quest.questGuides?.[0]?.content) {
          openSimpleWarningDialog(quest.questGuides[0]);
        } else {
          openSimpleWarningDialog(
            `디스코드 초대 링크의 참여 상태를 주기적으로 확인할 예정입니다. 방에 참여 상태로 유지해주세요.`
          );
        }
      } else if (
        quest.questPolicy?.questPolicy === QuestPolicyType.VerifyTelegram
      ) {
        if (quest.questGuides?.[0]?.content) {
          openSimpleWarningDialog(quest.questGuides[0]);
        } else {
          openSimpleWarningDialog(
            `텔레그램 초대 링크의 참여 상태를 주기적으로 확인할 예정입니다. 방에 참여 상태로 유지해주세요.`
          );
        }
      }
      try {
        const res = await asyncCompleteQuestOfUser(ticketData._id, quest?._id);
        updateVerifyState(index);
      } catch (e) {
        if (getErrorMessage(e) === "user already participated ticket") {
          updateVerifyState(index);
        }
      }
    }
  };

  const asyncVerifyQuest = async (
    e: React.MouseEvent<Element, MouseEvent>,
    quest: Quest,
    index: number
  ) => {
    const myEvent = e as MouseEventWithParam<{
      callback: (msg: string) => void;
    }>;
    try {
      if (!ticketData._id || !quest?._id) return;
      if (quest.questPolicy?.questPolicy === QuestPolicyType.VerifyAgreement) {
        const verifyAgreementContext = quest.questPolicy
          ?.context as VerifyAgreementQuestContext;
        openAgreementDialog(quest._id, verifyAgreementContext);
        myEvent.params.callback("success");
      } else if (
        quest.questPolicy?.questPolicy === QuestPolicyType.VerifyTwitterFollow
      ) {
        if (showTwitterConnectAlert()) {
          myEvent.params.callback("success");
          return;
        }
        // await asyncVerifyTwitterFollowQuest(ticketData._id, quest._id ?? "");
        await asyncCompleteQuestOfUser(ticketData?._id, quest._id ?? "");
        myEvent.params.callback("success");
        updateVerifyState(index);
      } else if (
        quest.questPolicy?.questPolicy === QuestPolicyType.VerifyTwitterRetweet
      ) {
        if (showTwitterConnectAlert()) {
          myEvent.params.callback("success");
          return;
        }
        await asyncVerifyTwitterRetweetQuest(ticketData._id, quest._id ?? "");
        myEvent.params.callback("success");
        updateVerifyState(index);
      } else if (
        quest.questPolicy?.questPolicy === QuestPolicyType.VerifyTwitterLiking
      ) {
        if (showTwitterConnectAlert()) {
          myEvent.params.callback("success");
          return;
        }
        await asyncVerifyTwitterLikingQuest(ticketData._id, quest._id ?? "");
        myEvent.params.callback("success");
        updateVerifyState(index);
      } else if (
        quest.questPolicy?.questPolicy === QuestPolicyType.Verify_3RidgePoint
      ) {
        await asyncVerify3ridgePoint(ticketData._id, quest._id ?? "");
        myEvent.params.callback("success");
        updateVerifyState(index);
      } else if (
        quest.questPolicy?.questPolicy ===
          QuestPolicyType.VerifyAptosBridgeToAptos ||
        quest.questPolicy?.questPolicy === QuestPolicyType.VerifyAptosExistTx ||
        quest.questPolicy?.questPolicy === QuestPolicyType.VerifyAptosHasAns ||
        quest.questPolicy?.questPolicy === QuestPolicyType.VerifyAptosHasNft
      ) {
        await asyncVerifyAptosQuest(ticketData._id, quest._id ?? "");
        myEvent.params.callback("success");
        updateVerifyState(index);
      } else if (
        quest.questPolicy?.questPolicy === QuestPolicyType.VerifyEmail ||
        quest.questPolicy?.questPolicy === QuestPolicyType.VerifyHasEmail
      ) {
        if (userData?.email) {
          await asyncCompleteQuestOfUser(ticketData?._id, quest._id ?? "");
          myEvent.params.callback("success");
          updateVerifyState(index);
        } else {
          showAlert({
            title: "알림",
            content: (
              <>
                <Stack spacing={1}>
                  <Typography variant={"body1"}>
                    프로필 페이지에서 이메일을 연결해주세요.
                  </Typography>
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
                      closeAlert();
                      setTimeout(() => {
                        asyncGoToProfileAndEditDialogOpen();
                      }, 0);
                    }}
                  >
                    이 링크를 누르시면 프로필 페이지로 이동합니다.
                  </LinkTypography>
                </Stack>
              </>
            ),
          });
          myEvent.params.callback("success");
        }
      } else if (
        quest.questPolicy?.questPolicy ===
        QuestPolicyType.VerifyHasWalletAddress
      ) {
        const networks = userData?.walletAddressInfos
          ?.filter((e) => e.address)
          .map((e) => e.network.toUpperCase());
        const verifyHasWalletAddressContext = quest.questPolicy
          ?.context as VerifyHasWalletAddressQuestContext;
        const chain = verifyHasWalletAddressContext?.chain?.toUpperCase();
        // console.log("chain", chain, networks);
        if (chain === "ANY") {
          if (networks?.length ?? 0 > 0) {
            await asyncCompleteQuestOfUser(ticketData?._id, quest._id ?? "");
            myEvent.params.callback("success");
            updateVerifyState(index);
          } else {
            showAlert({
              title: "알림",
              content: renderConnectWalletAlertMessage(),
            });
            myEvent.params.callback("success");
          }
        } else {
          if (networks?.includes(chain)) {
            await asyncCompleteQuestOfUser(ticketData?._id, quest._id ?? "");
            myEvent.params.callback("success");
            updateVerifyState(index);
          } else {
            showAlert({
              title: "알림",
              content: renderConnectWalletAlertMessage(),
            });
            myEvent.params.callback("success");
          }
        }
      } else if (
        quest.questPolicy?.questPolicy === QuestPolicyType.VerifyHasTwitter
      ) {
        if (userData?.userSocial?.twitterId) {
          await asyncCompleteQuestOfUser(ticketData?._id, quest._id ?? "");
          myEvent.params.callback("success");
          updateVerifyState(index);
        } else {
          showAlert({
            title: "알림",
            content: `프로필 페이지에서 트위터를 연동해주세요`,
          });
          myEvent.params.callback("success");
        }
      } else if (
        quest.questPolicy?.questPolicy === QuestPolicyType.VerifyHasTelegram
      ) {
        if (userData?.userSocial?.telegramUser?.id) {
          await asyncCompleteQuestOfUser(ticketData?._id, quest._id ?? "");
          myEvent.params.callback("success");
          updateVerifyState(index);
        } else {
          showAlert({
            title: "알림",
            content: (
              <>
                <Stack spacing={1}>
                  <Typography variant={"body1"}>
                    프로필 페이지에서 텔레그램을 연동해주세요.
                  </Typography>
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
                      closeAlert();
                      setTimeout(() => {
                        asyncGoToProfileAndEditDialogOpen();
                      }, 0);
                    }}
                  >
                    이 링크를 누르시면 프로필 페이지로 이동합니다.
                  </LinkTypography>
                </Stack>
              </>
            ),
          });
          myEvent.params.callback("success");
        }
      }
    } catch (e) {
      const errorMessage = getErrorMessage(e);
      console.log(errorMessage);
      if (errorMessage === APP_ERROR_MESSAGE.ALREADY_PARTICIPATED_USER) {
        myEvent.params.callback("success");
        updateVerifyState(index);
      } else if (
        errorMessage === APP_ERROR_MESSAGE.DOES_NOT_TWITTER_FOLLOW ||
        errorMessage === APP_ERROR_MESSAGE.DOES_NOT_TWITTER_RETWEET ||
        errorMessage === APP_ERROR_MESSAGE.DOES_NOT_TWITTER_LIKING ||
        errorMessage === APP_ERROR_MESSAGE.DOES_NOT_HAVE_APTOS_NFT
      ) {
        showAlert({
          title: "알림",
          content: getLocaleErrorMessage(e),
        });
      } else if (
        errorMessage === APP_ERROR_MESSAGE.DOES_NOT_HAVA_APTOS_WALLET
      ) {
        showAlert({
          title: "알림",
          content: renderConnectWalletAlertMessage(),
        });
      }
    }
  };

  const doLazyFire = () => {
    if (lazyFire) {
      setTimeout(() => {
        setFire(true);
        setLazyFire(false);
      }, 500);
    }
  };

  return (
    <>
      <Head>
        <title>3ridge : Web3 온보딩 플랫폼</title>
      </Head>
      <Realistic
        fire={isFire}
        onFireComplete={() => {
          setFire(false);
        }}
        duration={2000}
      ></Realistic>
      <Grid
        container
        direction={"row"}
        justifyContent={"center"}
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
                  <EventImage imageUrl={ticketData?.imageUrl}></EventImage>
                </Box>
              </Grid>
              <Grid item>
                <Stack spacing={1} sx={{ marginBottom: 2 }}>
                  <EventTitle title={ticketData?.title}></EventTitle>
                  <EventDateRange ticketData={ticketData}></EventDateRange>
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
            {hasMetamask &&
              !isExceededTicketParticipants() &&
              userData?._id === undefined && (
                <Box sx={{}}>
                  <>
                    <Card>
                      <CardContent>
                        <ClickTypography
                          variant={"body1"}
                          onClick={async (e) => {
                            setShowSignInDialog(true);
                          }}
                          textAlign={mdUp ? "left" : "center"}
                        >
                          로그인 후, 이벤트에 참여하실 수 있어요 😅
                        </ClickTypography>
                      </CardContent>
                    </Card>
                  </>
                </Box>
              )}
            {userData?._id &&
              !walletConnectedForTicket &&
              ticketData.rewardPolicy?.context?.rewardChain && (
                <Card>
                  <CardContent>
                    <Stack
                      direction={smUp ? "row" : "column"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      spacing={smUp ? 0 : 2}
                      sx={{ padding: 1, paddingTop: 0, paddingBottom: 0 }}
                    >
                      <Stack direction={"column"}>
                        <Typography
                          variant={"h6"}
                          sx={{ color: theme.palette.warning.main }}
                          textAlign={"center"}
                        >
                          {`이벤트를 위해 ${ticketData.rewardPolicy?.context?.rewardChain} 체인을 지원하는 지갑 연결이 필요해요`}{" "}
                        </Typography>
                      </Stack>
                      <Stack direction={"column"}>
                        <SecondaryButton
                          onClick={async (e) => {
                            e.preventDefault();
                            await asyncGoToProfileAndEditDialogOpen();
                          }}
                        >
                          지갑 연결하러 가기
                        </SecondaryButton>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              )}
            <EventDescription ticketData={ticketData}></EventDescription>

            <EventQuests
              ticketData={ticketData}
              userData={userData}
              verifiedList={verifiedList}
              onVerifyBtnClicked={async (e, quest, index) => {
                await asyncVerifyQuest(e, quest, index);
              }}
              onStartBtnClicked={async (e, quest, index) => {
                await asyncStartQuest(e, quest, index);
              }}
            ></EventQuests>
          </Stack>
        </Grid>
        <Grid item>
          <Stack
            direction={"column"}
            spacing={10}
            sx={{ minWidth: 260, padding: smUp ? 0 : 4 }}
          >
            <Stack direction={"column"} spacing={5}>
              <EventRewardPolicy ticketData={ticketData}></EventRewardPolicy>
              {(ticketData?.winners?.filter(
                (winner) =>
                  String(winner.name).toUpperCase().trim() ===
                  userData?.name?.toUpperCase().trim()
              )?.length ?? 0) > 0 && (
                <Box>
                  <Card>
                    <CardContent>
                      <Stack sx={{ width: "100%" }} alignItems={"center"}>
                        <Typography
                          variant={"h6"}
                          sx={{ color: theme.palette.success.main }}
                        >
                          본 이벤트의 위너가 되었습니다 🎉
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Box>
              )}
              <EventTimeBoard ticketData={ticketData}></EventTimeBoard>
              <EventRewardDescription
                ticketData={ticketData}
                onClick={(e) => {
                  setOpenTicketRewardHowToDialog(true);
                }}
              ></EventRewardDescription>
              <ButtonWithLoading
                disabled={
                  claimRewardDisabled ||
                  claimCompleted ||
                  // updatingClaimCompleted ||
                  isExpired() ||
                  !isStarted() ||
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
                  if (
                    userData?.walletAddressInfos?.[0].address &&
                    ticketData?._id
                  ) {
                    try {
                      const res = await asyncRewardClaim(ticketData?._id);
                      console.log("res", res);
                      //@ts-ignore
                      const myEvent = e as MouseEventWithParam<{
                        callback: (msg: string) => void;
                      }>;
                      myEvent.params.callback("success");
                      setClaimCompleted(true);
                      showAlert({
                        title: "축하합니다! 🥳",
                        content: (
                          <>
                            <Stack direction={"column"} spacing={1}>
                              <Typography sx={{ wordBreak: "keep-all" }}>
                                🚨 보상 NFT를 수령하기 위한 추가 작업이
                                필요합니다!
                              </Typography>
                              <Typography sx={{ wordBreak: "keep-all" }}>
                                페트라 지갑을 열고, Library 탭을 클릭하신 후,
                                Pending 중인 트랜잭션 옆 Accept 버튼을
                                클릭하셔야만 NFT를 정상적으로 수령하실 수
                                있습니다. 지갑을 확인해주세요!
                              </Typography>
                            </Stack>
                          </>
                        ),
                      });
                    } catch (e) {
                      console.log(e);
                      showErrorAlert({ content: getLocaleErrorMessage(e) });
                    }
                  }
                }}
              >
                {getLoadingButtonLabel()}
              </ButtonWithLoading>
            </Stack>
            <EventParticipants ticketData={ticketData}></EventParticipants>
          </Stack>
        </Grid>
      </Grid>

      {/* --- Dialogs --- */}
      <AgreementDialog
        open={openAgreementQuestDialog}
        context={openAgreementQuestContext}
        onClose={() => {
          closeAgreementDialog();
        }}
        onCompleteAgreement={() => {
          if (openAgreementQuestId) {
            const ids = ticketData?.quests?.map((e) => {
              return e._id;
            });
            const index = ids?.indexOf(openAgreementQuestId) as number;
            if (index !== undefined && ticketData._id) {
              try {
                asyncCompleteQuestOfUser(
                  ticketData._id,
                  openAgreementQuestId
                ).then((res) => {
                  updateVerifyState(index);
                });
              } catch (e) {
              } finally {
                closeAgreementDialog();
              }
            }
          }
        }}
      ></AgreementDialog>
      <QuestQuizDialog
        open={openQuizQuestDialog}
        context={openedQuizQuestContext}
        onCloseBtnClicked={(e) => {
          closeQuizDialog();
        }}
        onCompleteQuiz={() => {
          if (openedQuestId) {
            const index = TypeHelper.findQuestIndex(ticketData, openedQuestId);
            if (index !== undefined && ticketData._id) {
              try {
                asyncCompleteQuestOfUser(ticketData._id, openedQuestId).then(
                  (res) => {
                    updateVerifyState(index);
                  }
                );
              } catch (e) {
              } finally {
                closeQuizDialog();
              }
            }
          }
        }}
      ></QuestQuizDialog>
      <QuestSurveyDialog
        context={openedSurveyContext}
        open={openSurveyQuestDialog}
        onCloseBtnClicked={(e) => {
          closeSurveyDialog();
        }}
        onConfirmBtnClicked={async (answers) => {
          if (openedQuestId) {
            showLoading();
            const index = TypeHelper.findQuestIndex(ticketData, openedQuestId);
            if (index !== undefined && ticketData._id) {
              try {
                await asyncVerifySurveyQuest(openedQuestId, answers);
                openSimpleWarningDialog("설문 응답을 완료하였습니다.");
                updateVerifyState(index);
              } catch (e) {
                showErrorAlert({ content: getErrorMessage(e) });
              } finally {
                closeSurveyDialog();
                closeLoading();
              }
            }
          }
        }}
      ></QuestSurveyDialog>
      <SimpleDialog
        open={simpleWarningDialogShow}
        title={"Notification"}
        onCloseBtnClicked={() => {
          closeSimpleWarningDialog();
          doLazyFire();
        }}
      >
        {htmlContent && (
          <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        )}
        {!htmlContent && <Typography>{simpleWarningDialogTitle}</Typography>}
      </SimpleDialog>
      <TicketRewardHowToDialog
        open={openTicketRewardHowToDialog}
        onCloseBtnClicked={(e) => {
          setOpenTicketRewardHowToDialog(false);
        }}
      ></TicketRewardHowToDialog>
    </>
  );
};

Event.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default Event;
