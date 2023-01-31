import { GET_TICKET_BY_ID, VERIFY_TWITTER_FOLLOW_QUEST } from "../apollo/query";
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

  return { ticketData, asyncVerifyTwitterFollowQuest };
}
