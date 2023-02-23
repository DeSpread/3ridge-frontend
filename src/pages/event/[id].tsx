import React, {
  CSSProperties,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import MainLayout from "../../layouts/main-layout";
import { AppProps } from "next/app";
import Head from "next/head";
import {
  Avatar,
  Box,
  ButtonProps,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import VerifyCard from "../../components/molecules/verify-card";
import { GetStaticPaths } from "next";
import { useTicketQuery } from "../../page-hook/ticket-query-hook";
import { format } from "date-fns";
import StyledChip from "../../components/atoms/styled/styled-chip";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import PrimaryCard from "../../components/atoms/primary-card";
import { TimerSettings, useTimer } from "react-timer-hook";
import SecondaryButton from "../../components/atoms/secondary-button";
import { nFormatter } from "../../util/validate-string";
import QuestQuizDialog from "../../components/dialogs/quest-quiz-dialog";
import {
  FollowQuestContext,
  MouseEventWithParam,
  QUEST_POLICY_TYPE,
  QuizQuestContext,
  RetweetQuestContext,
} from "../../type";
import { QuestPolicyType } from "../../__generated__/graphql";
import { useSignedUserQuery } from "../../page-hook/user-query-hook";
import { useAlert } from "../../provider/alert/alert-provider";
import { useFirebaseAuth } from "../../firebase/hook/firebase-hook";
import { getErrorMessage } from "../../error/my-error";
import { useLoading } from "../../provider/loading/loading-provider";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import StarsIcon from "@mui/icons-material/Stars";
import CircularProgress from "@mui/material/CircularProgress";
import { DEFAULT_PROFILE_IMAGE_DATA_SRC } from "../../const";
import { gql, request } from "graphql-request";
import { LazyLoadImage } from "react-lazy-load-image-component";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

  return {
    props: {},
  };
};

interface MyTimerSettings extends TimerSettings {
  sx?: CSSProperties;
}

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

const TimerBoard = (props: MyTimerSettings) => {
  const { seconds, minutes, hours, days } = useTimer(props);
  const CELL_WIDTH = 40;
  return (
    <Box sx={props.sx}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
      >
        <Stack
          direction={"column"}
          alignItems={"center"}
          sx={{ width: CELL_WIDTH }}
        >
          <Typography variant={"h5"}>
            {days.toString().padStart(2, "0")}
          </Typography>
          <Typography variant={"body2"}>Days</Typography>
        </Stack>
        <Stack
          direction={"column"}
          alignItems={"center"}
          sx={{ width: CELL_WIDTH }}
        >
          <Typography variant={"h5"}>
            {hours.toString().padStart(2, "0")}
          </Typography>
          <Typography variant={"body2"}>Hours</Typography>
        </Stack>
        <Stack
          direction={"column"}
          alignItems={"center"}
          sx={{ width: CELL_WIDTH }}
        >
          <Typography variant={"h5"}>
            {minutes.toString().padStart(2, "0")}
          </Typography>
          <Typography variant={"body2"}>Minutes</Typography>
        </Stack>
        <Stack
          direction={"column"}
          alignItems={"center"}
          sx={{ width: CELL_WIDTH }}
        >
          <Typography variant={"h5"}>
            {seconds.toString().padStart(2, "0")}
          </Typography>
          <Typography variant={"body2"}>Seconds</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

const DummyTimerBoard = (props: { sx?: CSSProperties }) => {
  const CELL_WIDTH = 40;

  return (
    <Box sx={props.sx}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
      >
        <Stack
          direction={"column"}
          alignItems={"center"}
          sx={{ width: CELL_WIDTH }}
        >
          <Typography variant={"h5"}>{"00"}</Typography>
          <Typography variant={"body2"}>Days</Typography>
        </Stack>
        <Stack
          direction={"column"}
          alignItems={"center"}
          sx={{ width: CELL_WIDTH }}
        >
          <Typography variant={"h5"}>{"00"}</Typography>
          <Typography variant={"body2"}>Hours</Typography>
        </Stack>
        <Stack
          direction={"column"}
          alignItems={"center"}
          sx={{ width: CELL_WIDTH }}
        >
          <Typography variant={"h5"}>{"00"}</Typography>
          <Typography variant={"body2"}>Minutes</Typography>
        </Stack>
        <Stack
          direction={"column"}
          alignItems={"center"}
          sx={{ width: CELL_WIDTH }}
        >
          <Typography variant={"h5"}>{"00"}</Typography>
          <Typography variant={"body2"}>Seconds</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

const Event = (props: AppProps) => {
  const { userData, asyncUpdateSocialTwitter, asyncUpdateRewardPoint } =
    useSignedUserQuery();
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();
  const {
    ticketData,
    asyncVerifyTwitterFollowQuest,
    asyncIsCompletedQuestByUserId,
    asyncVerifyTwitterRetweetQuest,
    asyncCompleteQuestOfUser,
    asyncRequestClaimNtf,
  } = useTicketQuery({
    userId: userData._id,
    //@ts-ignore
    id: router.query.id ?? undefined,
  });
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

  const asyncUpdateClaimCompleted = async () => {
    if (ticketData?.rewardPolicy?.context && userData?.walletAddress) {
      setUpdatingClaimCompleted(true);
      const res1 = await asyncCheckTokenExist();
      const res2 = await asyncPendingTokenExist();
      const res = res1 || res2;
      setClaimCompleted(res);
      setUpdatingClaimCompleted(false);
    }
  };

  const asyncCheckTokenExist = async () => {
    try {
      if (ticketData?.rewardPolicy?.context && userData?.walletAddress) {
        const { collectionName, tokenName } = ticketData?.rewardPolicy?.context;
        const query = gql`
            {
                token_ownerships(
                    where: {
                        name: { _eq: "${tokenName}" }
                        collection_name: { _eq: "${collectionName}" }
                        owner_address: {
                            _eq: "${userData?.walletAddress}"
                        }
                    }
                ) {
                    name
                    owner_address
                    collection_name
                }
            }
        `;
        const res = await request(
          "https://indexer-testnet.staging.gcp.aptosdev.com/v1/graphql/",
          query
        );
        console.log(query);
        console.log(res);
        if (res?.token_ownerships && res?.token_ownerships.length > 0) {
          return true;
        }
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const asyncPendingTokenExist = async () => {
    try {
      if (ticketData?.rewardPolicy?.context && userData?.walletAddress) {
        const { collectionName, tokenName } = ticketData?.rewardPolicy?.context;
        const query = gql`
          {
            current_token_pending_claims(
              where: {
                to_address: {_eq: "${userData?.walletAddress}"}
                name: { _eq: "${tokenName}" }
                collection_name: { _eq: "${collectionName}" }
              }
            ) {
                amount
                collection_name
                name
                from_address
                to_address
            }
          }
        `;
        const res = await request(
          "https://indexer-testnet.staging.gcp.aptosdev.com/v1/graphql/",
          query
        );
        console.log(query);
        console.log(res);
        if (
          res?.current_token_pending_claims &&
          res?.current_token_pending_claims.length > 0
        ) {
          return true;
        }
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

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

  const isExpired = () => {
    return ticketData?.rewardPolicy?.context?.untilTime
      ? //@ts-ignore
        new Date(ticketData?.rewardPolicy?.context?.untilTime) -
          //@ts-ignore
          new Date() <
          0
      : true;
  };

  return (
    <>
      <Head>
        <title>Event</title>
      </Head>
      <Grid
        container
        direction={"row"}
        justifyContent={"center"}
        spacing={5}
        sx={{ marginTop: 4, marginBottom: 12 }}
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
                        borderColor: theme.palette.neutral[100],
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
                  <Typography variant={smUp ? "h3" : "h3"}>
                    {ticketData?.title}
                  </Typography>
                  <Grid container alignItems={"left"} spacing={1}>
                    {!ticketData?.completed && (
                      <Grid item>
                        <StyledChip label={"Ongoing"}></StyledChip>
                      </Grid>
                    )}
                    {ticketData?.completed && (
                      <Grid item>
                        <StyledChip label={"completed"}></StyledChip>
                      </Grid>
                    )}
                    {ticketData?.rewardPolicy?.context?.untilTime && (
                      <Grid item>
                        {smUp ? (
                          <StyledChip
                            label={`${format(
                              new Date(
                                ticketData?.rewardPolicy?.context?.beginTime
                              ),
                              "yyyy/MM/dd hh:mm:ss"
                            )} ~ ${format(
                              new Date(
                                ticketData?.rewardPolicy?.context?.untilTime
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
                                      ticketData?.rewardPolicy?.context?.beginTime
                                    ),
                                    "yyyy/MM/dd hh:mm:ss"
                                  )}
                                  ~`}
                                </Typography>
                                <Typography variant={"body2"}>
                                  {`${format(
                                    new Date(
                                      ticketData?.rewardPolicy?.context?.untilTime
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
                </Stack>
              </Grid>
            </Grid>
            {userData?._id === undefined && (
              <Box sx={{}}>
                <Typography
                  variant={smUp ? "h5" : "h6"}
                  sx={{
                    color: theme.palette.warning.main,
                    marginTop: smUp ? 0 : -5,
                    background: "",
                    textAlign: smUp ? "left" : "center",
                  }}
                >
                  {smUp
                    ? "--- Please Sign In First ---\n"
                    : "--- Mobile is not supported --- "}
                </Typography>
              </Box>
            )}
            {userData?._id && userData?.walletAddress === undefined && (
              <Typography
                variant={"h5"}
                sx={{ color: theme.palette.warning.main }}
              >
                --- Please Wallet Connect In Profile ---
              </Typography>
            )}

            <Stack direction={"column"} spacing={2}>
              <Typography variant={"h5"}>Description</Typography>
              <Box sx={{ maxWidth: 800 }}>
                <Typography
                  variant={"body1"}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "5",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {ticketData?.description}
                </Typography>
              </Box>
            </Stack>

            <Stack
              direction={"column"}
              alignItems={"left"}
              spacing={2}
              maxWidth={790}
            >
              <Typography variant="h5">Quest</Typography>
              <Stack direction={"column"} spacing={4} alignItems={"center"}>
                {ticketData?.quests?.map((quest, index) => {
                  return (
                    <VerifyCard
                      key={index + 1}
                      sx={{ width: "100%" }} //mdUp ? 800 : smUp ? 600 : 320 }}
                      index={index + 1}
                      title={quest.title}
                      description={quest.description}
                      disabled={userData?._id ? false : true}
                      verified={verifiedList[index]}
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
                            setVerifiedList((prevState) => {
                              prevState[index] = true;
                              return prevState;
                            });
                            setUpdateIndex((prevState) => {
                              return prevState + 1;
                            });
                          } else if (
                            quest.questPolicy?.questPolicy ===
                            QUEST_POLICY_TYPE.VERIFY_TWITTER_RETWEET
                          ) {
                            await asyncVerifyTwitterRetweetQuest(
                              ticketData._id,
                              quest._id ?? ""
                            );
                            myEvent.params.callback("success");
                            setVerifiedList((prevState) => {
                              prevState[index] = true;
                              return prevState;
                            });
                            setUpdateIndex((prevState) => {
                              return prevState + 1;
                            });
                          }
                        } catch (e) {
                          console.log(e);
                        }
                      }}
                      onStartBtnClicked={async (e) => {
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
                              .context as FollowQuestContext;
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
                              .context as RetweetQuestContext;
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
                        }
                      }}
                      autoVerified={
                        quest.questPolicy?.questPolicy === QuestPolicyType.Quiz
                      }
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
                <Typography variant="h5">Reward</Typography>
                <StyledChip
                  label={"FCFS"}
                  icon={<DirectionsRunIcon></DirectionsRunIcon>}
                ></StyledChip>
              </Stack>
              <PrimaryCard hoverEffect={false}>
                <Box sx={{ width: smUp ? 300 : 260 }}>
                  <Stack>
                    <Typography variant={"body1"}>
                      First Come First Serve In :
                    </Typography>
                    {ticketData?.rewardPolicy?.context?.untilTime ? (
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
                            sx={{ color: theme.palette.warning.main }}
                          >
                            This project is expired
                          </Typography>
                        </Stack>
                      ) : (
                        <TimerBoard
                          sx={{
                            marginTop: 4,
                            background: "",
                          }}
                          expiryTimestamp={
                            new Date(
                              ticketData?.rewardPolicy?.context?.untilTime
                            )
                          }
                        />
                      )
                    ) : (
                      <DummyTimerBoard
                        sx={{
                          marginTop: 4,
                          background: "",
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
                      alignItems={"flex-start"}
                      justifyContent={"center"}
                    >
                      <Typography variant={"body1"}>Reward</Typography>
                      <Box
                        sx={{
                          marginTop: 1,
                          transform: "translateY(0%)",
                          transition: "all 0.2s ease-out 0s",
                          transitionDuration: "0.2s",
                          transitionDelay: "0s",
                          "&:hover": {
                            transform: "translate(0,-2px)",
                            boxShadow:
                              "12px 12px 2px 1px rgba(128, 128, 128, .2)",
                          },
                          width: smUp ? 300 : 260,
                          height: smUp ? 300 : 260,
                          borderRadius: 2,
                        }}
                      >
                        {ticketData?.rewardPolicy?.context?.nftImageUrl && (
                          <Box
                            sx={{
                              "&:hover": {
                                "& .lazyLoadImage": {
                                  color: theme.palette.neutral["400"],
                                  transition: "all 0.1s ease-out 0s",
                                  borderColor: theme.palette.secondary.main,
                                  transitionDuration: "0.2s",
                                  transitionDelay: "0s",
                                  transitionTimingFunction: "ease-out",
                                  transitionProperty: "all",
                                },
                              },
                            }}
                          >
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
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Typography variant={"body1"}>POINT</Typography>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={1}
                      >
                        <StarsIcon
                          color={"warning"}
                          style={{
                            width: 24,
                            height: 24,
                            background: "yellow",
                            borderRadius: 24,
                          }}
                        ></StarsIcon>
                        <Typography variant={"h6"}>
                          {ticketData?.rewardPolicy?.context?.point ?? 0}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                  <Stack
                    direction={"row"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    spacing={1}
                  >
                    <img
                      src={
                        "https://sakura-frontend.s3.ap-northeast-2.amazonaws.com/icon/aptos_icon.svg"
                      }
                      width={16}
                      height={16}
                      style={{
                        background: theme.palette.neutral[100],
                        borderRadius: 16,
                        padding: 1,
                      }}
                    />
                    <Typography variant={"body2"}>Aptos Chain</Typography>
                  </Stack>
                </Stack>
              </PrimaryCard>
              <LoadingButton
                disabled={
                  claimRewardDisabled ||
                  claimCompleted ||
                  updatingClaimCompleted ||
                  isExpired()
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
                    userData?.walletAddress &&
                    collectionName &&
                    tokenName &&
                    ticketData?._id
                  ) {
                    console.log(
                      userData?.walletAddress,
                      collectionName,
                      tokenName
                    );
                    try {
                      await asyncRequestClaimNtf(
                        collectionName,
                        tokenName,
                        userData?.walletAddress,
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
                                Reward NFT has been sent to your wallet !
                              </Typography>
                              <Typography>
                                Please accept the NFT transmitted from the NFT
                                tab on Petra Wallet
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
                  ? "Project ended"
                  : claimCompleted
                  ? "Claim completed"
                  : "Claim reward"}
              </LoadingButton>
            </Stack>

            <Stack direction={"column"}>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Typography variant="h5">Participants</Typography>
              </Stack>
              <Stack
                direction={"row"}
                spacing={-2}
                sx={{ marginTop: 4 }}
                alignItems={"center"}
              >
                {(ticketData?.participants?.length ?? 0) > 0 ? (
                  <>
                    {ticketData?.participants?.map((e, index) => {
                      return (
                        <Avatar
                          key={index}
                          alt=""
                          src={
                            e.profileImageUrl ?? DEFAULT_PROFILE_IMAGE_DATA_SRC
                          }
                          sx={{
                            width: 42,
                            height: 42,
                          }}
                        />
                      );
                    })}
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        background: (theme) => theme.palette.neutral["800"],
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        borderRadius: 42,
                        zIndex: 1,
                      }}
                      onClick={() => {}}
                    >
                      <Typography variant={"caption"} color={"neutral.100"}>
                        {`+${nFormatter(
                          ticketData?.participants?.length ?? 0,
                          4
                        )}`}
                      </Typography>
                    </Box>
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
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
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
    </>
  );
};

Event.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default Event;
