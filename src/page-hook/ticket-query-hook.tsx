import {
  CLAIM_REWARD,
  COMPLETE_QUEST_OF_USER,
  GET_TICKET_BY_ID,
  IS_COMPLETED_QUEST_BY_USER_ID,
  UPDATE_TICKET_VISIBLE,
  VERIFY_3RIDGE_POINT_QUEST,
  VERIFY_APTOS_QUEST,
  VERIFY_TWITTER_FOLLOW_QUEST,
  VERIFY_TWITTER_LIKING_QUEST,
  VERIFY_TWITTER_RETWEET_QUEST,
} from "../lib/apollo/query";
import { client } from "../lib/apollo/client";
import { useEffect, useState } from "react";
import { Ticket } from "../type";
import TypeParseHelper from "../helper/type-parse-helper";
import { useMutation } from "@apollo/client";
import { APP_ERROR_MESSAGE, AppError } from "../error/my-error";
import Console from "../helper/console-helper";

export function useTicketQuery({
  userId,
  id,
}: {
  userId?: string;
  id?: string;
}) {
  const [ticketData, setTicketData] = useState<Ticket>({});
  const [verifyTwitterLikingQuest] = useMutation(VERIFY_TWITTER_LIKING_QUEST);
  const [verifyTwitterFollowQuest] = useMutation(VERIFY_TWITTER_FOLLOW_QUEST);
  const [verifyTwitterRetweetQuest] = useMutation(VERIFY_TWITTER_RETWEET_QUEST);
  const [verify3ridgePoint] = useMutation(VERIFY_3RIDGE_POINT_QUEST);
  const [completeQuestOfUser] = useMutation(COMPLETE_QUEST_OF_USER);
  const [verifyAptosQuest] = useMutation(VERIFY_APTOS_QUEST);
  const [claimReward] = useMutation(CLAIM_REWARD);
  const typeParseHelper = TypeParseHelper.getInstance();

  useEffect(() => {
    (async () => {
      if (!id) {
        return;
      }
      const { data } = await client.query({
        query: GET_TICKET_BY_ID,
        variables: {
          id,
        },
      });
      const {
        _id,
        title,
        beginTime,
        untilTime,
        description,
        description_v2,
        completed,
        participants,
        participantCount,
        quests,
        rewardPolicy,
        winners,
        imageUrl,
        rewardClaimedUsers,
      } = data.ticketById;
      const _rewardPolicy = typeParseHelper.parseRewardPolicy(
        rewardPolicy?.context ?? undefined,
        rewardPolicy?.rewardPolicyType ?? undefined
      );

      setTicketData((prevState) => {
        return {
          ...prevState,
          _id: _id ?? undefined,
          title: title ?? undefined,
          beginTime: beginTime ?? undefined,
          untilTime: untilTime ?? undefined,
          description: description ?? undefined,
          description_v2: description_v2 ?? undefined,
          completed: completed ?? undefined,
          participants: participants?.map((e) => {
            return {
              _id: e._id ?? undefined,
              name: e.name ?? undefined,
              profileImageUrl: e.profileImageUrl ?? undefined,
            };
          }),
          participantCount: participantCount ?? undefined,
          imageUrl: imageUrl ?? undefined,
          quests: quests?.map((e) => {
            return {
              _id: e._id ?? undefined,
              title: e.title ?? undefined,
              title_v2: e.title_v2 ?? undefined,
              description: e.description ?? undefined,
              questPolicy: {
                context: TypeParseHelper.getInstance().parseQuestPolicy(
                  e.questPolicy?.context,
                  e.questPolicy?.questPolicy
                ),
                questPolicy: e.questPolicy?.questPolicy ?? undefined,
              },
              isComplete: false,
              questGuides: e.questGuides ?? [],
            };
          }),
          rewardPolicy: {
            context: _rewardPolicy,
            rewardPolicyType: rewardPolicy?.rewardPolicyType ?? undefined,
          },
          winners: winners?.map((e) => {
            return {
              name: e.name ?? undefined,
            };
          }),
          rewardClaimedUserIds:
            rewardClaimedUsers?.map((e) => {
              return e._id ?? "";
            }) ?? undefined,
        };
      });
    })();
  }, [id]);

  const asyncRefreshTicketData = async () => {
    if (!id) {
      return;
    }
    const { data } = await client.query({
      query: GET_TICKET_BY_ID,
      variables: {
        id,
      },
      fetchPolicy: "no-cache",
    });
    const {
      _id,
      title,
      beginTime,
      untilTime,
      description,
      description_v2,
      completed,
      participants,
      quests,
      rewardPolicy,
      winners,
      imageUrl,
      rewardClaimedUsers,
    } = data.ticketById;
    const _rewardPolicy = typeParseHelper.parseRewardPolicy(
      rewardPolicy?.context ?? undefined,
      rewardPolicy?.rewardPolicyType ?? undefined
    );
    setTicketData((prevState) => {
      return {
        ...prevState,
        _id: _id ?? undefined,
        title: title ?? undefined,
        beginTime: beginTime ?? undefined,
        untilTime: untilTime ?? undefined,
        description: description ?? undefined,
        description_v2: description_v2 ?? undefined,
        completed: completed ?? undefined,
        participants: participants?.map((e) => {
          return {
            _id: e._id ?? undefined,
            name: e.name ?? undefined,
            profileImageUrl: e.profileImageUrl ?? undefined,
          };
        }),
        imageUrl: imageUrl ?? undefined,
        quests: quests?.map((e) => {
          return {
            _id: e._id ?? undefined,
            title: e.title ?? undefined,
            title_v2: e.title_v2 ?? undefined,
            description: e.description ?? undefined,
            questPolicy: {
              context: TypeParseHelper.getInstance().parseQuestPolicy(
                e.questPolicy?.context,
                e.questPolicy?.questPolicy
              ),
              questPolicy: e.questPolicy?.questPolicy ?? undefined,
            },
            isComplete: false,
            questGuides: e.questGuides ?? [],
          };
        }),
        rewardPolicy: {
          context: _rewardPolicy,
          rewardPolicyType: rewardPolicy?.rewardPolicyType ?? undefined,
        },
        winners: winners?.map((e) => {
          return {
            name: e.name ?? undefined,
          };
        }),
        rewardClaimedUserIds:
          rewardClaimedUsers?.map((e) => {
            return e._id ?? "";
          }) ?? undefined,
      };
    });
  };

  const asyncVerifyTwitterFollowQuest = async (
    ticketId: string,
    questId: string
  ) => {
    if (ticketId && questId && userId) {
      Console.log(
        `verifyTwitterFollowQuest(questId: "${questId}", ticketId: "${ticketId}", userId: "${userId}") {\n _id \n}`
      );
      const res = await verifyTwitterFollowQuest({
        variables: {
          ticketId,
          questId,
          userId,
        },
      });
    }
  };

  const asyncVerifyTwitterLikingQuest = async (
    ticketId: string,
    questId: string
  ) => {
    if (ticketId && questId && userId) {
      Console.log(
        `VerifyTwitterLikingQuest(questId: "${questId}", ticketId: "${ticketId}", userId: "${userId}") {\n _id \n}`
      );
      const res = await verifyTwitterLikingQuest({
        variables: {
          ticketId,
          questId,
          userId,
        },
      });
    }
  };

  const asyncVerifyTwitterRetweetQuest = async (
    ticketId: string,
    questId: string
  ) => {
    if (ticketId && questId && userId) {
      Console.log(
        `VerifyTwitterRetweetQuest(questId: "${questId}", ticketId: "${ticketId}", userId: "${userId}") {\n _id \n}`
      );
      const res = await verifyTwitterRetweetQuest({
        variables: {
          ticketId,
          questId,
          userId,
        },
      });
    } else {
      throw new AppError(APP_ERROR_MESSAGE.PARAMETER_ERROR);
    }
  };

  const asyncCompleteQuestOfUser = async (
    ticketId: string,
    questId: string
  ) => {
    if (ticketId && questId && userId) {
      Console.log(
        `CompleteQuestOfUser(questId: "${questId}", ticketId: "${ticketId}", userId: "${userId}") {\n _id \n}`
      );
      const res = await completeQuestOfUser({
        variables: {
          ticketId,
          questId,
          userId,
        },
      });
    } else {
      throw new AppError(APP_ERROR_MESSAGE.PARAMETER_ERROR);
    }
  };

  const asyncRewardClaim = async (ticketId: string) => {
    if (ticketId && userId) {
      Console.log(`claimReward(ticketId: "${ticketId}", userId: "${userId}")`);
      return await claimReward({
        variables: {
          ticketId,
          userId,
        },
      });
    } else {
      throw new AppError(APP_ERROR_MESSAGE.PARAMETER_ERROR);
    }
  };

  const asyncVerifyAptosQuest = async (ticketId: string, questId: string) => {
    if (ticketId && questId && userId) {
      Console.log(
        `verifyAptosQuest(questId: "${questId}", ticketId: "${ticketId}", userId: "${userId}") {\n _id \n}`
      );
      const res = await verifyAptosQuest({
        variables: {
          ticketId,
          questId,
          userId,
        },
      });
    } else {
      throw new AppError(APP_ERROR_MESSAGE.PARAMETER_ERROR);
    }
  };

  const asyncVerify3ridgePoint = async (ticketId: string, questId: string) => {
    if (ticketId && questId && userId) {
      Console.log(
        `verifyAptosQuest(questId: "${questId}", ticketId: "${ticketId}", userId: "${userId}") {\n _id \n}`
      );
      const res = await verify3ridgePoint({
        variables: {
          ticketId,
          questId,
          userId,
        },
      });
    } else {
      throw new AppError(APP_ERROR_MESSAGE.PARAMETER_ERROR);
    }
  };

  const asyncIsCompletedQuestByUserId = async (questId: string) => {
    if (questId && userId) {
      try {
        const { data } = await client.query({
          query: IS_COMPLETED_QUEST_BY_USER_ID,
          variables: {
            questId,
            userId,
          },
          fetchPolicy: "no-cache",
        });
        const { isCompleted } = data.isCompletedQuestByUserId;
        return {
          isCompleted,
          questId,
        };
      } catch (e) {
        console.log(e);
        return {
          isCompleted: false,
          questId,
        };
      }
    }
    return {
      isCompleted: false,
      questId,
    };
  };

  return {
    ticketData,
    asyncIsCompletedQuestByUserId,
    asyncVerifyTwitterFollowQuest,
    asyncVerifyTwitterRetweetQuest,
    asyncVerifyTwitterLikingQuest,
    asyncCompleteQuestOfUser,
    asyncVerify3ridgePoint,
    asyncVerifyAptosQuest,
    asyncRefreshTicketData,
    asyncRewardClaim,
  };
}
