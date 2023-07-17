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
import {
  DiscordQuestContext,
  MouseEventWithParam,
  Quest,
  QUEST_POLICY_TYPE,
  QuizQuestContext,
  REWARD_POLICY_TYPE,
  SUPPORTED_NETWORKS,
  TelegramQuestContext,
  TwitterFollowQuestContext,
  TwitterLikingQuestContext,
  TwitterRetweetQuestContext,
  VerifyAgreementContext,
  VerifyHasWalletAddressContext,
  VerifyVisitWebsiteContext,
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
import { useLogin } from "../../provider/login/login-provider";
import { useProfileEditDialog } from "../../page-hook/profile-edit-dialog-hook";
import LinkTypography from "../../components/atoms/link-typography";
import { useSignDialog } from "../../page-hook/sign-dialog-hook";
import { parseStrToDate } from "../../util/date-util";
import StringHelper from "../../helper/string-helper";
import Realistic from "../../components/realistic";
import { useGetSet, useMountedState } from "react-use";
import RedeemIcon from "@mui/icons-material/Redeem";
import { useSetRecoilState } from "recoil";
import { backDirectionPathState } from "../../lib/recoil";
import ClickTypography from "../../components/click-typhography";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import ComponentHelper from "../../helper/component-helper";
import ContentMetaDataRenderComponent from "../../components/atoms/content-meta-data-render-component";
import AgreementDialog from "../../components/dialogs/agreement-dialog";
import EventTitle from "../../components/atoms/pages/event/event-title";
import EventImage from "../../components/atoms/pages/event/event-image";

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
          <CircularProgress sx={{ color: "white" }}></CircularProgress>
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
    asyncRewardClaim,
    asyncVerify3ridgePoint,
    asyncVerifyAptosQuest,
    asyncRefreshTicketData,
  } = useTicketQuery({
    userId: userData._id,
    id: router.isReady
      ? typeof router.query.id === "string"
        ? router.query.id
        : undefined
      : undefined,
  });
  const [openContentsRendererDialog, setOpenContentsRendererDialog] =
    useState(false);
  const [simpleWarningDialogTitle, setSimpleWarningDialogTitle] = useState("");
  const [simpleWarningDialogShow, setSimpleWarningDialogShow] = useState(false);

  const [openAgreementQuestDialog, setOpenAgreementQuestDialog] =
    useState(false);
  const [openAgreementQuestId, setOpenAgreementQuestId] = useState<string>();
  const [openAgreementQuestContext, setOpenAgreementQuestContext] =
    useState<VerifyAgreementContext>({ agreementList: [] });

  const [openQuizQuestDialog, setOpenQuizQuestDialog] = useState(false);
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
    const res = verifiedList.reduce(
      (accumulator, currentValue) => accumulator && currentValue,
      true
    );
    if (!res) {
      return;
    }
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
    agreementContext: VerifyAgreementContext
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

  const openQuizDialog = (questId: string, quizContext: QuizQuestContext) => {
    setOpenQuizQuestDialog(true);
    setOpenQuizQuestId(questId);
    setOpenQuizQuestContext(quizContext);
  };

  const closeQuizDialog = () => {
    setOpenQuizQuestDialog(false);
    setOpenQuizQuestId(undefined);
    setOpenQuizQuestContext({ quizList: [] });
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
    return parseStrToDate(ticketData?.untilTime ?? "") //rewardPolicy?.context?.untilTime
      ? //@ts-ignore
        parseStrToDate(ticketData?.untilTime ?? "") -
          //@ts-ignore
          new Date() <
          0
      : true;
  };

  const isStarted = () => {
    return parseStrToDate(ticketData?.beginTime ?? "")
      ? //@ts-ignore
        parseStrToDate(ticketData?.beginTime ?? "") - new Date() < 0
      : false;
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
      setUpdatingClaimCompleted(false);
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

  const getConfirmBtnLabel = (quest: Partial<Quest>) => {
    return undefined;
  };

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

  const getRewardLabel = () => {
    if (ticketData.rewardPolicy?.context?.rewardChain) {
      if (ticketData.rewardPolicy?.context?.overrideRewardChainContent) {
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
                  if (ticketData.rewardPolicy?.context?.rewardInfo?.content) {
                    setOpenContentsRendererDialog(true);
                    setHtmlContent(
                      decodeBase64(
                        ticketData.rewardPolicy?.context?.rewardInfo?.content
                      )
                    );
                  }
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

  const asyncStartQuest = async (
    e: React.MouseEvent<Element, MouseEvent>,
    quest: Quest,
    index: number
  ) => {
    if (!ticketData._id || !quest._id) return;
    if (
      quest.questPolicy?.questPolicy === QUEST_POLICY_TYPE.VERIFY_TWITTER_FOLLOW
    ) {
      try {
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
      quest.questPolicy?.questPolicy === QUEST_POLICY_TYPE.VERIFY_TWITTER_LIKING
    ) {
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
      quest.questPolicy?.questPolicy === QUEST_POLICY_TYPE.VERIFY_DISCORD ||
      quest.questPolicy?.questPolicy === QUEST_POLICY_TYPE.VERIFY_TELEGRAM ||
      quest.questPolicy?.questPolicy === QuestPolicyType.VerifyVisitWebsite
    ) {
      let questContext;
      switch (quest.questPolicy?.questPolicy) {
        case QUEST_POLICY_TYPE.VERIFY_DISCORD:
          questContext = quest.questPolicy?.context as DiscordQuestContext;
          window.open(
            `https://discord.gg/${questContext.channelId}`,
            "discord",
            "width=800, height=600, status=no, menubar=no, toolbar=no, resizable=no"
          );
          break;
        case QUEST_POLICY_TYPE.VERIFY_TELEGRAM:
          questContext = quest.questPolicy?.context as TelegramQuestContext;
          window.open(
            `https://t.me/${questContext.channelId}`,
            "telegram",
            "width=800, height=600, status=no, menubar=no, toolbar=no, resizable=no"
          );
          break;
        case QuestPolicyType.VerifyVisitWebsite:
          questContext = quest.questPolicy
            ?.context as VerifyVisitWebsiteContext;
          // console.log(questContext?.url);
          const newWindow = window.open(
            questContext?.url,
            "_blank",
            "noopener,noreferrer"
          );
          if (newWindow) newWindow.opener = null;
          break;
      }
      if (quest.questPolicy?.questPolicy === QUEST_POLICY_TYPE.VERIFY_DISCORD) {
        setSimpleWarningDialogShow(true);
        if (quest.questGuides?.[0]?.content) {
          setHtmlContent(decodeBase64(quest.questGuides[0].content));
        } else {
          setSimpleWarningDialogTitle(
            `디스코드 초대 링크의 참여 상태를 주기적으로 확인할 예정입니다. 방에 참여 상태로 유지해주세요.`
          );
          setHtmlContent("");
        }
      } else if (
        quest.questPolicy?.questPolicy === QUEST_POLICY_TYPE.VERIFY_TELEGRAM
      ) {
        setSimpleWarningDialogShow(true);
        if (quest.questGuides?.[0]?.content) {
          setHtmlContent(decodeBase64(quest.questGuides[0].content));
        } else {
          setSimpleWarningDialogTitle(
            `텔레그램 초대 링크의 참여 상태를 주기적으로 확인할 예정입니다. 방에 참여 상태로 유지해주세요.`
          );
          setHtmlContent("");
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
    } else if (
      quest.questPolicy?.questPolicy === QUEST_POLICY_TYPE.VERIFY_APTOS_HAS_ANS
    ) {
      setOpenContentsRendererDialog(true);
      if (quest.questGuides?.[0]?.content) {
        setHtmlContent(decodeBase64(quest.questGuides[0].content));
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
      if (quest.questPolicy?.questPolicy === QUEST_POLICY_TYPE.QUIZ) {
        const quizQuestContext = quest.questPolicy?.context as QuizQuestContext;
        openQuizDialog(quest._id, quizQuestContext);
        myEvent.params.callback("success");
      } else if (
        quest.questPolicy?.questPolicy === QuestPolicyType.VerifyAgreement
      ) {
        const verifyAgreementContext = quest.questPolicy
          ?.context as VerifyAgreementContext;
        openAgreementDialog(quest._id, verifyAgreementContext);
        myEvent.params.callback("success");
      } else if (
        quest.questPolicy?.questPolicy ===
        QUEST_POLICY_TYPE.VERIFY_TWITTER_FOLLOW
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
        quest.questPolicy?.questPolicy ===
        QUEST_POLICY_TYPE.VERIFY_TWITTER_RETWEET
      ) {
        if (showTwitterConnectAlert()) {
          myEvent.params.callback("success");
          return;
        }
        await asyncVerifyTwitterRetweetQuest(ticketData._id, quest._id ?? "");
        myEvent.params.callback("success");
        updateVerifyState(index);
      } else if (
        quest.questPolicy?.questPolicy ===
        QUEST_POLICY_TYPE.VERIFY_TWITTER_LIKING
      ) {
        if (showTwitterConnectAlert()) {
          myEvent.params.callback("success");
          return;
        }
        await asyncVerifyTwitterLikingQuest(ticketData._id, quest._id ?? "");
        myEvent.params.callback("success");
        updateVerifyState(index);
      } else if (
        quest.questPolicy?.questPolicy === QUEST_POLICY_TYPE.VERIFY_3RIDGE_POINT
      ) {
        await asyncVerify3ridgePoint(ticketData._id, quest._id ?? "");
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
          ?.context as VerifyHasWalletAddressContext;
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

  const isEventStarted = () => {
    const diff =
      new Date().getTime() -
      parseStrToDate(ticketData?.beginTime ?? "").getTime();
    return diff > 0;
  };

  const isEventComplete = () => {
    const diff =
      parseStrToDate(ticketData?.untilTime ?? "").getTime() -
      new Date().getTime();
    if (diff < 0) {
      return true;
    }
    return ticketData?.completed;
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
              // alignItems="center"
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
                  {smUp ? (
                    <Grid
                      container
                      alignItems={"left"}
                      justifyContent={smUp ? "flex-start" : "center"}
                      rowSpacing={1}
                    >
                      {ticketData?.beginTime && !isEventStarted() && (
                        <Grid item>
                          <StyledChip
                            label={"이벤트 시작전"}
                            // color={"success"}
                            variant="outlined"
                            sx={{
                              boxShadow: "inset 0px 0px 0px 2px #61e1ff",
                              borderWidth: 0,
                            }}
                          ></StyledChip>
                        </Grid>
                      )}
                      {ticketData && isEventStarted() && !isEventComplete() && (
                        <Grid item>
                          <StyledChip
                            label={"진행중"}
                            variant="outlined"
                            sx={{
                              boxShadow: "inset 0px 0px 0px 2px #0E8074",
                              borderWidth: 0,
                            }}
                          ></StyledChip>
                        </Grid>
                      )}
                      {ticketData && isEventStarted() && isEventComplete() && (
                        <Grid item>
                          <StyledChip
                            label={"이벤트 종료"}
                            variant="outlined"
                            sx={{
                              boxShadow: "inset 0px 0px 0px 2px #D14343",
                              borderWidth: 0,
                            }}
                          ></StyledChip>
                        </Grid>
                      )}
                      {ticketData?.beginTime && (
                        <Grid item sx={{ marginLeft: 1 }}>
                          {smUp ? (
                            <StyledChip
                              label={`${format(
                                parseStrToDate(ticketData?.beginTime ?? ""),
                                "yyyy/MM/dd"
                              )} ~ ${format(
                                parseStrToDate(ticketData?.untilTime ?? ""),
                                "yyyy/MM/dd"
                              )} (UTC+09:00)`}
                            ></StyledChip>
                          ) : (
                            <StyledChip
                              sx={{ paddingTop: 4, paddingBottom: 4 }}
                              label={
                                <Stack sx={{}}>
                                  <Typography variant={"body2"}>
                                    {`${format(
                                      parseStrToDate(
                                        ticketData?.beginTime ?? ""
                                      ),
                                      "yyyy/MM/dd"
                                    )}
                                  ~`}
                                  </Typography>
                                  <Typography variant={"body2"}>
                                    {`${format(
                                      parseStrToDate(
                                        ticketData?.untilTime ?? ""
                                      ),
                                      "yyyy/MM/dd"
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
                            parseStrToDate(ticketData?.beginTime ?? ""),
                            "yyyy/MM/dd"
                          )}`}</Typography>
                          <Typography>
                            {`~ ${format(
                              parseStrToDate(ticketData?.untilTime ?? ""),
                              "yyyy/MM/dd"
                            )} (UTC+09:00)`}
                          </Typography>
                        </>
                      )}
                      {ticketData?.beginTime && !isEventStarted() && (
                        <Box sx={{ marginTop: 2 }}>
                          <StyledChip
                            label={"이벤트 시작전"}
                            // color={"success"}
                            variant="outlined"
                            sx={{
                              boxShadow: "inset 0px 0px 0px 2px #61e1ff",
                              borderWidth: 0,
                            }}
                          ></StyledChip>
                        </Box>
                      )}
                      {ticketData && isEventStarted() && !isEventComplete() && (
                        <Box sx={{ marginTop: 2 }}>
                          <StyledChip
                            label={"진행중"}
                            variant="outlined"
                            sx={{
                              boxShadow: "inset 0px 0px 0px 2px #0E8074",
                              borderWidth: 0,
                            }}
                          ></StyledChip>
                        </Box>
                      )}
                      {ticketData && isEventStarted() && isEventComplete() && (
                        <Box sx={{ marginTop: 2 }}>
                          <StyledChip
                            label={"이벤트 종료"}
                            variant="outlined"
                            sx={{
                              boxShadow: "inset 0px 0px 0px 2px #D14343",
                              borderWidth: 0,
                            }}
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

            {hasMetamask &&
              !isExceededTicketParticipants() &&
              userData?._id === undefined && (
                <Box sx={{}}>
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
                          textAlign={mdUp ? "left" : "center"}
                        >
                          로그인 후, 이벤트에 참여하실 수 있어요 😅
                        </LinkTypography>
                      </CardContent>
                    </Card>
                  </>
                </Box>
              )}
            {userData?._id &&
              !walletConnectedForTicket &&
              ticketData.rewardPolicy?.context?.rewardNetwork && (
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
                          {`이벤트를 위해 ${ticketData.rewardPolicy?.context?.rewardNetwork}을 지원하는 지갑 연결이 필요해요`}{" "}
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
            <Stack
              direction={"column"}
              spacing={2}
              alignItems={mdUp ? "flex-start" : "center"}
            >
              <Typography textAlign={mdUp ? "left" : "center"} variant={"h5"}>
                이벤트 설명
              </Typography>
              <Box>
                <ContentMetaDataRenderComponent
                  contentMetaData={ticketData?.description_v2}
                  textComponentFunc={(content) => {
                    return (
                      <Box sx={{ width: mdUp ? 800 : smUp ? 600 : 300 }}>
                        <Typography sx={{ wordBreak: "keep-all" }}>
                          {content}
                        </Typography>
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
                    quest.questPolicy?.questPolicy ===
                      QuestPolicyType.VerifyDiscord ||
                    quest.questPolicy?.questPolicy ===
                      QuestPolicyType.VerifyTelegram ||
                    quest.questPolicy?.questPolicy ===
                      QuestPolicyType.VerifyVisitWebsite;

                  return (
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
                          QUEST_POLICY_TYPE.VERIFY_3RIDGE_POINT ||
                        quest.questPolicy?.questPolicy ===
                          QUEST_POLICY_TYPE.VERIFY_APTOS_BRIDGE_TO_APTOS ||
                        quest.questPolicy?.questPolicy ===
                          QUEST_POLICY_TYPE.VERIFY_APTOS_HAS_NFT ||
                        quest.questPolicy?.questPolicy ===
                          QUEST_POLICY_TYPE.VERIFY_APTOS_EXIST_TX ||
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
                        quest.questPolicy?.questPolicy ===
                          QuestPolicyType.Quiz ||
                        quest.questPolicy?.questPolicy ===
                          QuestPolicyType.VerifyAgreement
                      }
                      onVerifyBtnClicked={async (e) => {
                        await asyncVerifyQuest(e, quest, index);
                      }}
                      onStartBtnClicked={async (e) => {
                        await asyncStartQuest(e, quest, index);
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
                    ticketData?.rewardPolicy?.rewardPolicyType ===
                    REWARD_POLICY_TYPE.FCFS
                      ? "선착순"
                      : ticketData?.rewardPolicy?.rewardPolicyType ===
                        REWARD_POLICY_TYPE.LUCKY_DRAW
                      ? "추첨"
                      : "전원"
                  }
                  icon={
                    ticketData?.rewardPolicy?.rewardPolicyType ===
                    REWARD_POLICY_TYPE.FCFS ? (
                      <DirectionsRunIcon />
                    ) : ticketData?.rewardPolicy?.rewardPolicyType ===
                      REWARD_POLICY_TYPE.LUCKY_DRAW ? (
                      <RedeemIcon sx={{ paddingRight: "3px" }} />
                    ) : (
                      <AllInclusiveIcon
                        sx={{
                          paddingLeft: "2px",
                          paddingRight: "3px",
                          paddingTop: "2px",
                        }}
                      />
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
              <PrimaryCard hoverEffect={false}>
                <Box>
                  <Stack alignItems={"center"}>
                    <Typography
                      variant={"body1"}
                      sx={{
                        color: isExpired()
                          ? "#D14343"
                          : isStarted()
                          ? "white"
                          : "#61e1ff",
                      }}
                    >
                      {isExpired()
                        ? "본 이벤트가 종료되었습니다"
                        : isStarted()
                        ? "이벤트 종료까지 남은 시간"
                        : "이벤트 시작까지 남은 시간"}
                    </Typography>
                    {ticketData?.untilTime ? (
                      isExpired() ? (
                        <DummyTimerBoard
                          sx={{
                            marginTop: 4,
                            background: "",
                            width: "100%",
                          }}
                        />
                      ) : isStarted() ? (
                        <TimerBoard
                          sx={{
                            marginTop: 4,
                            background: "",
                            width: "100%",
                          }}
                          expiryTimestamp={parseStrToDate(
                            ticketData?.untilTime ?? ""
                          )}
                        />
                      ) : (
                        <TimerBoard
                          sx={{
                            marginTop: 4,
                            background: "",
                            width: "100%",
                          }}
                          expiryTimestamp={parseStrToDate(
                            ticketData?.beginTime ?? ""
                          )}
                          onExpire={() => {
                            console.log("refresh all");
                            window.location.reload();
                          }}
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
                            width={32}
                            height={32}
                          ></Image>
                          <Typography variant={"body1"}>
                            {ticketData?.rewardPolicy?.rewardPoint ?? 0}
                          </Typography>
                        </Stack>
                      </Stack>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        sx={{ paddingTop: 1 }}
                      >
                        <Typography variant={"body1"}>대상자 수</Typography>
                        <Stack direction={"row"} alignItems={"center"}>
                          <Typography variant={"body1"}>
                            {StringHelper.getInstance().getRewardAmountLabel(
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
                            {ComponentHelper.getInstance().renderMultiLineContentText(
                              ticketData?.rewardPolicy?.context?.rewardName ??
                                "",
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
              <LoadingButton
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
              </LoadingButton>
            </Stack>

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
                    <Stack
                      onClick={() => {
                        // console.log("aaa");
                      }}
                      sx={{
                        cursor: "pointer",
                        width: "100%",
                        // background: "red",
                      }}
                      alignItems={"center"}
                    >
                      <Typography>⛔&nbsp;EMPTY</Typography>
                    </Stack>
                  </>
                )}
              </Grid>
            </Stack>
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
        context={openQuizQuestContext}
        onClose={() => {
          closeQuizDialog();
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
      <SimpleDialog
        open={simpleWarningDialogShow}
        title={"Notification"}
        onClose={() => {
          setSimpleWarningDialogShow(false);
          doLazyFire();
        }}
        onCloseBtnClicked={() => {
          setSimpleWarningDialogShow(false);
          doLazyFire();
        }}
      >
        {htmlContent && (
          <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        )}
        {!htmlContent && <Typography>{simpleWarningDialogTitle}</Typography>}
      </SimpleDialog>
    </>
  );
};

Event.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default Event;
