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
  Stack,
  Typography,
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
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { DEFAULT_PROFILE_IMAGE_DATA_SRC } from "../../const";

export const getStaticPaths: GetStaticPaths<{ id: string }> = (id) => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export async function getStaticProps() {
  return { props: {} };
}

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
  const { userData, asyncUpdateSocialTwitter } = useSignedUserQuery();
  const theme = useTheme();
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
  const {
    signAndSubmitTransaction,
    signTransaction,
    signMessage,
    signMessageAndVerify,
  } = useWallet();
  const [openQuizQuestDialog, setOpenQuizQuestDialog] = useState(false);
  const [openQuizQuestId, setOpenQuizQuestId] = useState<string>();
  const [openQuizQuestContext, setOpenQuizQuestContext] =
    useState<QuizQuestContext>({ quizList: [] });
  const { showAlert, showErrorAlert, closeAlert } = useAlert();
  const { asyncTwitterSignInPopUp } = useFirebaseAuth();
  const { showLoading, closeLoading } = useLoading();
  const [verifiedList, setVerifiedList] = useState<boolean[]>([]);

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
    }
  }, [ticketData?.quests, userData?._id]);

  const claimRewardDisabled = useMemo(() => {
    if (userData?._id === undefined) return true;
    if (verifiedList.length === 0) return true;
    const res = verifiedList.reduce(
      (accumulator, currentValue) => accumulator && currentValue,
      true
    );
    return !res;
  }, [verifiedList]);

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
          <Stack direction={"column"} spacing={8}>
            <Grid
              container
              spacing={2}
              direction={"row"}
              alignItems="center"
              sx={{ background: "", marginBottom: 2 }}
            >
              <Grid item>
                <Box sx={{ height: 128, width: 128, background: "" }}>
                  <img
                    style={{
                      width: 128,
                      height: 128,
                      borderRadius: 10,
                    }}
                    src={
                      "https://imgp.layer3cdn.com/ipfs/QmUnZrLc6F4u4VZyvHoxkerPe9ZvfBdEkx7BSW4naWWBe9"
                    }
                  />
                </Box>
              </Grid>
              <Grid item>
                <Stack spacing={1} sx={{ marginBottom: 2 }}>
                  <Typography variant="h3">{ticketData?.title}</Typography>
                  <Stack direction={"row"} alignItems={"left"} spacing={1}>
                    {!ticketData?.completed && (
                      <StyledChip label={"Ongoing"}></StyledChip>
                    )}
                    {ticketData?.completed && (
                      <StyledChip label={"completed"}></StyledChip>
                    )}
                    {ticketData?.rewardPolicy?.context?.untilTime && (
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
                    )}
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
            {userData?._id === undefined && (
              <Typography
                variant={"h5"}
                sx={{ color: theme.palette.warning.main }}
              >
                --- Please First Sign In ---
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
              <Stack direction={"column"} spacing={4}>
                {ticketData?.quests?.map((quest, index) => {
                  return (
                    <VerifyCard
                      key={index + 1}
                      sx={{ width: 800 }}
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
                          if (
                            quest.questPolicy?.questPolicy ===
                            QUEST_POLICY_TYPE.VERIFY_TWITTER_FOLLOW
                          ) {
                            await asyncVerifyTwitterFollowQuest(
                              quest._id ?? ""
                            );
                            myEvent.params.callback("success");
                            setVerifiedList((prevState) => {
                              prevState[index] = true;
                              return prevState;
                            });
                          } else if (
                            quest.questPolicy?.questPolicy ===
                            QUEST_POLICY_TYPE.VERIFY_TWITTER_RETWEET
                          ) {
                            await asyncVerifyTwitterRetweetQuest(
                              quest._id ?? ""
                            );
                            myEvent.params.callback("success");
                            setVerifiedList((prevState) => {
                              prevState[index] = true;
                              return prevState;
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
          <Stack direction={"column"} spacing={10} sx={{ minWidth: 260 }}>
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
                <Box sx={{ width: 300 }}>
                  <Stack>
                    <Typography variant={"body1"}>
                      First Come First Serve In :
                    </Typography>
                    {ticketData?.rewardPolicy?.context?.untilTime ? (
                      //@ts-ignore
                      new Date(ticketData?.rewardPolicy?.context?.untilTime) -
                        //@ts-ignore
                        new Date() <
                      0 ? (
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
                <Stack direction={"column"} spacing={5}>
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
                          width: 300,
                          height: 300,
                          borderRadius: 2,
                        }}
                      >
                        <img
                          src={ticketData?.rewardPolicy?.context?.nftImageUrl}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 16,
                          }}
                        />
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
                          style={{ width: 24, height: 24 }}
                        ></StarsIcon>
                        <Typography variant={"h6"}>
                          {ticketData?.rewardPolicy?.context?.point}
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
                disabled={claimRewardDisabled}
                onClick={async (e) => {
                  if (userData?.walletAddress) {
                    console.log(userData?.walletAddress);
                    try {
                      await asyncRequestClaimNtf(userData?.walletAddress);
                      //@ts-ignore
                      const myEvent = e as MouseEventWithParam<{
                        callback: (msg: string) => void;
                      }>;
                      myEvent.params.callback("success");
                      showAlert({
                        title: "Info",
                        content: "Claim Completed !!!",
                      });
                    } catch (e) {
                      console.log(e);
                    }
                  }
                }}
              >
                Claim reward
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
                        //@ts-ignore
                        background: (theme) => theme.palette.neutral["800"],
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        borderRadius: 42,
                        zIndex: 1,
                      }}
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
                    <Typography>⛔&nbsp;EMPTY</Typography>
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
            if (index !== undefined) {
              try {
                asyncCompleteQuestOfUser(openQuizQuestId).then((res) => {
                  setVerifiedList((prevState) => {
                    prevState[index] = true;
                    return prevState;
                  });
                });
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
