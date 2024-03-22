import { QuestPolicyType, RewardPolicyType } from "../__generated__/graphql";
import {
  RewardContext,
  VerifyTwitterFollowQuestContext,
  VerifyQuizQuestContext,
  VerifyTwitterRetweetQuestContext,
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
  VerifyOnChainContext,
  VerifyTwitterLikingAndRetweetQuestContext,
  VerifyScreenShotQuestContext,
  DiscordGuildJoinContext,
} from "../types";

class TypeParseHelper {
  public static parseRewardPolicy = (
    context?: string,
    rewardPolicyType?: string,
  ) => {
    if (!context) return undefined;
    try {
      if (
        rewardPolicyType === RewardPolicyType.Fcfs ||
        rewardPolicyType === RewardPolicyType.LuckyDraw ||
        rewardPolicyType === RewardPolicyType.Always
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
    questPolicyType?: string,
  ) => {
    if (!context) return undefined;
    try {
      const _context = context.trim();
      const contextJson = JSON.parse(_context);
      // console.log(contextJson);
      if (questPolicyType === QuestPolicyType.Quiz) {
        return contextJson as VerifyQuizQuestContext;
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
      } else if (questPolicyType === QuestPolicyType.VerifyOnChain) {
        return contextJson as VerifyOnChainContext;
      } else if (
        questPolicyType === QuestPolicyType.VerifyTwitterLinkingRetweet
      ) {
        return contextJson as VerifyTwitterLikingAndRetweetQuestContext;
      } else if (questPolicyType === QuestPolicyType.VerifyScreenshot) {
        return contextJson as VerifyScreenShotQuestContext;
      } else if (questPolicyType === QuestPolicyType.DiscordGuildJoin) {
        return contextJson as DiscordGuildJoinContext;
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
