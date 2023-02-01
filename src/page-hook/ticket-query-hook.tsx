import {
  COMPLETE_QUEST_OF_USER,
  GET_TICKET_BY_ID,
  IS_COMPLETED_QUEST_BY_USER_ID,
  REQUEST_CLAIM_NFT,
  VERIFY_TWITTER_FOLLOW_QUEST,
  VERIFY_TWITTER_RETWEET_QUEST,
} from "../apollo/query";
import { client } from "../apollo/client";
import { useEffect, useState } from "react";
import { Ticket } from "../type";
import TypeParseHelper from "../helper/type-parse-helper";
import { useMutation } from "@apollo/client";

export function useTicketQuery({
  userId,
  id,
}: {
  userId?: string;
  id?: string;
}) {
  const [ticketData, setTicketData] = useState<Ticket>({});
  const [verifyTwitterFollowQuest] = useMutation(VERIFY_TWITTER_FOLLOW_QUEST);
  const [verifyTwitterRetweetQuest] = useMutation(VERIFY_TWITTER_RETWEET_QUEST);
  const [completeQuestOfUser] = useMutation(COMPLETE_QUEST_OF_USER);
  const [requestClaimNFT] = useMutation(REQUEST_CLAIM_NFT);
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
        description,
        completed,
        participants,
        quests,
        rewardPolicy,
        winners,
        imageUrl,
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
          description: description ?? undefined,
          completed: completed ?? undefined,
          participants: participants?.map((e) => {
            return {
              name: e.name ?? undefined,
              profileImageUrl: e.profileImageUrl ?? undefined,
            };
          }),
          imageUrl: imageUrl ?? undefined,
          quests: quests?.map((e) => {
            // console.log("aaa", userId);
            // let isComplete = false;
            // if (userId) {
            //   isComplete =
            //     e.completedUsers
            //       ?.map((_e) => {
            //         return _e._id;
            //       })
            //       .includes(userId) ?? false;
            // }
            return {
              _id: e._id ?? undefined,
              title: e.title ?? undefined,
              description: e.description ?? undefined,
              questPolicy: {
                context: TypeParseHelper.getInstance().parseQuestPolicy(
                  e.questPolicy?.context,
                  e.questPolicy?.questPolicy
                ),
                questPolicy: e.questPolicy?.questPolicy ?? undefined,
              },
              isComplete: false,
              // completedUsers: e.completedUsers
              //   ? e.completedUsers.map((_e) => {
              //       return {
              //         _id: _e._id ?? undefined,
              //         walletAddress:
              //           _e.wallets && _e.wallets.length > 0
              //             ? _e.wallets[0].address
              //             : undefined,
              //         name: _e.name ?? undefined,
              //         email: _e.email ?? undefined,
              //         profileImageUrl: _e.profileImageUrl ?? undefined,
              //       };
              //     })
              //   : undefined,
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
        };
      });
    })();
  }, [id]);

  const asyncVerifyTwitterFollowQuest = async (questId: string) => {
    if (questId && userId) {
      const res = await verifyTwitterFollowQuest({
        variables: {
          questId,
          userId,
        },
      });
    }
  };

  const asyncVerifyTwitterRetweetQuest = async (questId: string) => {
    if (questId && userId) {
      const res = await verifyTwitterRetweetQuest({
        variables: {
          questId,
          userId,
        },
      });
    }
  };

  const asyncCompleteQuestOfUser = async (questId: string) => {
    if (questId && userId) {
      const res = await completeQuestOfUser({
        variables: {
          questId,
          userId,
        },
      });
    }
  };

  const asyncRequestClaimNtf = async (receiverAddress: string) => {
    if (receiverAddress) {
      const res = await requestClaimNFT({
        variables: {
          receiverAddress,
        },
      });
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
    asyncVerifyTwitterFollowQuest,
    asyncIsCompletedQuestByUserId,
    asyncVerifyTwitterRetweetQuest,
    asyncCompleteQuestOfUser,
    asyncRequestClaimNtf,
  };
}
