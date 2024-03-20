"use client";
import { useMutation } from "@apollo/client";
import { signIn, useSession } from "next-auth/react";

import VerifyCard, { VerifyCardProps } from "../atomic/molecules/verify-card";

import { gql } from "@/__generated__";
import { useAlert } from "@/provider/alert/alert-provider";
import { Quest } from "@/types";

interface QuestCardProps
  extends Omit<
    VerifyCardProps,
    "index" | "onVerifyBtnClicked" | "onStartBtnClicked"
  > {
  quest: Quest;
  index: number;
  onVerifyBtnClicked?: (
    e: React.MouseEvent<Element, MouseEvent>,
    quest: Quest,
    index: number,
  ) => void;
  onStartBtnClicked?: (
    e: React.MouseEvent<Element, MouseEvent>,
    quest: Quest,
    index: number,
  ) => void;
}

const COMPLETE_DISCORD_GUILD_JOIN_QUEST = gql(`
  mutation CompleteDiscordGuildJoinQuest($questId: String!, $discordAccessToken: String!) {
    completeDiscordGuildJoinQuest(questId: $questId, discordAccessToken: $discordAccessToken)
  }
`);

export default function QuestCard(props: QuestCardProps) {
  const [completeDiscordGuildJoinQuest] = useMutation(
    COMPLETE_DISCORD_GUILD_JOIN_QUEST,
  );

  const session = useSession();

  const { showErrorAlert } = useAlert();

  const isLoggedIn = !!session.data?.provider;

  async function onVerifyBtnClicked(e: React.MouseEvent<Element, MouseEvent>) {
    if (!session.data) {
      showErrorAlert({
        content: "디스코드 계정 정보를 불러올 수 없습니다.",
      });
      return;
    }

    if (!props.quest._id) {
      showErrorAlert({
        content: "알 수 없는 오류가 발생했습니다.",
      });
      return;
    }

    const res = await completeDiscordGuildJoinQuest({
      variables: {
        discordAccessToken: session.data.accessToken,
        questId: props.quest._id,
      },
    }).catch(() => {
      return { data: undefined };
    });

    if (res.data?.completeDiscordGuildJoinQuest !== true) {
      showErrorAlert({ content: "디스코드 서버 가입이 확인되지 않습니다." });
      return;
    }

    props.onVerifyBtnClicked?.(e, props.quest, props.index);
  }

  async function onStartBtnClicked(e: React.MouseEvent<Element, MouseEvent>) {
    if (isLoggedIn) {
      if (
        props.quest.questPolicy?.context &&
        "guildInviteUrl" in props.quest.questPolicy.context
      ) {
        window.open(props.quest.questPolicy.context.guildInviteUrl);
      } else {
        showErrorAlert({ content: "디스코드 서버 주소를 찾을 수 없습니다." });
      }
    } else {
      signIn("discord");
    }
    props.onStartBtnClicked?.(e, props.quest, props.index);
  }

  return (
    <VerifyCard
      {...props}
      startButtonLabel={isLoggedIn ? "시작" : "로그인"}
      onVerifyBtnClicked={onVerifyBtnClicked}
      onStartBtnClicked={onStartBtnClicked}
    ></VerifyCard>
  );
}
