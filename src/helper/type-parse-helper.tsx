import {
  RewardContext,
  TwitterFollowQuestContext,
  QuizQuestContext,
  TwitterRetweetQuestContext,
  REWARD_POLICY_TYPE,
  TwitterLikingQuestContext,
  DiscordQuestContext,
  Verify3ridgePointContext,
  QuestContextVerifyTelegram,
  VerifyHasEmailContext,
  VerifyHasWalletAddressContext,
  VerifyHasTwitter,
  VerifyHasTelegram,
  VerifyVisitWebsiteContext,
  VerifyAgreementContext,
} from "../type";
import { QuestPolicyType } from "../__generated__/graphql";

class TypeParseHelper {
  public static parseRewardPolicy = (
    context?: string,
    rewardPolicyType?: string
  ) => {
    if (!context) return undefined;
    try {
      if (
        rewardPolicyType === REWARD_POLICY_TYPE.FCFS ||
        rewardPolicyType === REWARD_POLICY_TYPE.LUCKY_DRAW ||
        rewardPolicyType === REWARD_POLICY_TYPE.ALL
      ) {
        const _context = context.trim();
        const contextJson = JSON.parse(_context);
        const res = contextJson as RewardContext;
        return res;
      }
    } catch (e) {
      return undefined;
    }
    return undefined;
  };

  public static parseQuestPolicy = (
    context?: string,
    questPolicyType?: string
  ) => {
    if (!context) return undefined;
    try {
      const _context = context.trim();
      const contextJson = JSON.parse(_context);
      if (questPolicyType === QuestPolicyType.Quiz) {
        return contextJson as QuizQuestContext;
      } else if (questPolicyType === QuestPolicyType.VerifyTwitterRetweet) {
        return contextJson as TwitterRetweetQuestContext;
      } else if (questPolicyType === QuestPolicyType.VerifyTwitterFollow) {
        return contextJson as TwitterFollowQuestContext;
      } else if (questPolicyType === QuestPolicyType.VerifyTwitterLiking) {
        return contextJson as TwitterLikingQuestContext;
      } else if (questPolicyType === QuestPolicyType.VerifyDiscord) {
        return contextJson as DiscordQuestContext;
      } else if (questPolicyType === QuestPolicyType.VerifyTelegram) {
        return contextJson as QuestContextVerifyTelegram;
      } else if (questPolicyType === QuestPolicyType.Verify_3RidgePoint) {
        return contextJson as Verify3ridgePointContext;
      } else if (questPolicyType === QuestPolicyType.VerifyEmail) {
        return contextJson as VerifyHasEmailContext;
      } else if (questPolicyType === QuestPolicyType.VerifyHasWalletAddress) {
        return contextJson as VerifyHasWalletAddressContext;
      } else if (questPolicyType === QuestPolicyType.VerifyHasTwitter) {
        return contextJson as VerifyHasTwitter;
      } else if (questPolicyType === QuestPolicyType.VerifyHasTelegram) {
        return contextJson as VerifyHasTelegram;
      } else if (questPolicyType === QuestPolicyType.VerifyVisitWebsite) {
        return contextJson as VerifyVisitWebsiteContext;
      } else if (questPolicyType === QuestPolicyType.VerifyAgreement) {
        return contextJson as VerifyAgreementContext;
      }
    } catch (e) {
      console.log(context, questPolicyType);
      console.log(e);
      return undefined;
    }
    return undefined;
  };
}

export default TypeParseHelper;
