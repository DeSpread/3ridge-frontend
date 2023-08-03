import {
  RewardContext,
  VerifyTwitterFollowQuestContext,
  QuizQuestContext,
  VerifyTwitterRetweetQuestContext,
  REWARD_POLICY_TYPE,
  VerifyTwitterLikingQuestContext,
  VerifyDiscordQuestContext,
  Verify3ridgePointQuestContext,
  VerifyTelegramQuestContext,
  VerifyHasEmailQuestContext,
  VerifyHasWalletAddressQuestContext,
  VerifyHasTwitterQuestContext,
  VerifyHasTelegramQuestContext,
  VerifyVisitWebsiteQuestContext,
  VerifyAgreementQuestContext,
  VerifySurveyQuestContext,
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
        return contextJson as VerifyTwitterRetweetQuestContext;
      } else if (questPolicyType === QuestPolicyType.VerifyTwitterFollow) {
        return contextJson as VerifyTwitterFollowQuestContext;
      } else if (questPolicyType === QuestPolicyType.VerifyTwitterLiking) {
        return contextJson as VerifyTwitterLikingQuestContext;
      } else if (questPolicyType === QuestPolicyType.VerifyDiscord) {
        return contextJson as VerifyDiscordQuestContext;
      } else if (questPolicyType === QuestPolicyType.VerifyTelegram) {
        return contextJson as VerifyTelegramQuestContext;
      } else if (questPolicyType === QuestPolicyType.Verify_3RidgePoint) {
        return contextJson as Verify3ridgePointQuestContext;
      } else if (questPolicyType === QuestPolicyType.VerifyEmail) {
        return contextJson as VerifyHasEmailQuestContext;
      } else if (questPolicyType === QuestPolicyType.VerifyHasWalletAddress) {
        return contextJson as VerifyHasWalletAddressQuestContext;
      } else if (questPolicyType === QuestPolicyType.VerifyHasTwitter) {
        return contextJson as VerifyHasTwitterQuestContext;
      } else if (questPolicyType === QuestPolicyType.VerifyHasTelegram) {
        return contextJson as VerifyHasTelegramQuestContext;
      } else if (questPolicyType === QuestPolicyType.VerifyVisitWebsite) {
        return contextJson as VerifyVisitWebsiteQuestContext;
      } else if (questPolicyType === QuestPolicyType.VerifyAgreement) {
        return contextJson as VerifyAgreementQuestContext;
      } else if (questPolicyType === QuestPolicyType.VerifySurvey) {
        return contextJson as VerifySurveyQuestContext;
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
