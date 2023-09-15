import TypeParseHelper from "../../../helper/type-parse-helper";
import { ItemOfArray } from "../../../types/utill";
import { AllTicketsQuery } from "../../../__generated__/graphql";

export const convertTicketData = (
  ticket: ItemOfArray<AllTicketsQuery["tickets"]>
) => {
  return {
    _id: ticket._id ?? undefined,
    beginTime: ticket.beginTime ?? undefined,
    untilTime: ticket.untilTime ?? undefined,
    title: ticket.title ?? undefined,
    description: ticket.description ?? undefined,
    description_v2: ticket.description_v2 ?? undefined,
    completed: ticket.completed ?? undefined,
    participants: ticket.participants?.map((_e) => {
      return {
        _id: _e._id ?? undefined,
        name: _e.name ?? undefined,
        profileImageUrl: _e.profileImageUrl ?? undefined,
      };
    }),
    // participantCount: ticket.participantCount ?? undefined,
    imageUrl: ticket.imageUrl ?? undefined,
    quests: ticket.quests?.map((_e) => {
      return {
        _id: _e._id ?? undefined,
        title: _e.title ?? undefined,
        title_v2: _e.title_v2 ?? undefined,
        description: _e.description ?? undefined,
        questPolicy: {
          context: TypeParseHelper.parseQuestPolicy(
            _e.questPolicy?.context,
            _e.questPolicy?.questPolicy
          ),
          questPolicy: _e.questPolicy?.questPolicy ?? undefined,
        },
        isComplete: false,
      };
    }),
    rewardPolicy: {
      context: TypeParseHelper.parseRewardPolicy(
        ticket.rewardPolicy?.context ?? undefined,
        ticket.rewardPolicy?.rewardPolicyType ?? undefined
      ),
      rewardPoint: ticket.rewardPolicy?.rewardPoint ?? undefined,
      rewardPolicyType: ticket.rewardPolicy?.rewardPolicyType ?? undefined,
    },
    winners: ticket.winners?.map((_e) => {
      return {
        name: _e.name ?? undefined,
      };
    }),
    project: {
      _id: ticket.project?._id ?? "",
      categories: ticket.project?.categories ?? [],
      description: ticket.project?.description ?? "",
      imageUrl: ticket.project?.imageUrl ?? "",
      name: ticket.project?.name ?? "",
      projectSocial: {
        discordUrl: ticket.project?.projectSocial?.discordUrl ?? "",
        officialUrl: ticket.project?.projectSocial?.officialUrl ?? "",
        telegramUrl: ticket.project?.projectSocial?.telegramUrl ?? "",
        twitterUrl: ticket.project?.projectSocial?.twitterUrl ?? "",
        mediumUrl: ticket.project?.projectSocial?.mediumUrl ?? "",
        naverBlogUrl: ticket.project?.projectSocial?.naverBlogUrl ?? "",
      },
    },
    visible: ticket.visible,
  };
};
