import React, { CSSProperties, ReactElement, useState } from "react";
import MainLayout from "../../layouts/main-layout";
import { AppProps } from "next/app";
import Head from "next/head";
import { Avatar, Box, Divider, Grid, Stack, Typography } from "@mui/material";
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
import { QuizQuestContext } from "../../type";
import { QuestPolicyType } from "../../__generated__/graphql";
import { useSignedUserQuery } from "../../page-hook/user-query-hook";

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
  const { userData } = useSignedUserQuery();
  const { ticketData } = useTicketQuery({
    userId: userData._id,
    id: "63bfd87b73405e8b13784612", //router.query.id,
  });
  const [openQuizQuestDialog, setOpenQuizQuestDialog] = useState(false);
  const [openQuizQuestContext, setOpenQuizQuestContext] =
    useState<QuizQuestContext>({ quizList: [] });

  // console.log(ticketData);

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
                      onVerifyBtnClicked={(e) => {}}
                      onStartBtnClicked={(e) => {
                        const quizQuestContext = quest.questPolicy
                          ?.context as QuizQuestContext;
                        setOpenQuizQuestContext(quizQuestContext);
                        setOpenQuizQuestDialog(true);
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
                      <TimerBoard
                        sx={{
                          marginTop: 4,
                          background: "",
                        }}
                        expiryTimestamp={
                          new Date(ticketData?.rewardPolicy?.context?.untilTime)
                        }
                      />
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
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Typography variant={"body1"}>Reward</Typography>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={1}
                      >
                        <img
                          src={
                            "https://sakura-frontend.s3.ap-northeast-2.amazonaws.com/icon/tether-icon.svg"
                          }
                          width={24}
                          height={24}
                          style={{ marginRight: 2 }}
                        />
                        <Typography variant={"h6"}>
                          {ticketData?.rewardPolicy?.context?.rewardAmount}
                        </Typography>
                        <Typography variant={"h6"}>
                          {ticketData?.rewardPolicy?.context?.rewardUnit.toUpperCase()}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Divider></Divider>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Typography variant={"body1"}>XP</Typography>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={1}
                      >
                        <img
                          src={
                            "https://sakura-frontend.s3.ap-northeast-2.amazonaws.com/icon/xp.png"
                          }
                          width={24}
                          height={24}
                        />
                        <Typography variant={"h6"}>60</Typography>
                        <Typography variant={"h6"}>XP</Typography>
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
                      src={"https://beta.layer3.xyz/images/chains/ethereum.svg"}
                      width={16}
                      height={16}
                    />
                    <Typography variant={"body2"}>Ethereum Chain</Typography>
                  </Stack>
                </Stack>
              </PrimaryCard>
              <SecondaryButton disabled={true}>Claim reward</SecondaryButton>
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
                            "https://app.quest3.xyz/static/users/avatar8.png"
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
      ></QuestQuizDialog>
    </>
  );
};

Event.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default Event;
