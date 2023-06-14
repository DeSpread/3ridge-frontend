import {
  FCFSRewardContext,
  TwitterFollowQuestContext,
  QUEST_POLICY_TYPE,
  QuizQuestContext,
  TwitterRetweetQuestContext,
  REWARD_POLICY_TYPE,
  TwitterLikingQuestContext,
  DiscordQuestContext,
  Verify3ridgePointContext,
  TelegramQuestContext,
  VerifyHasEmailContext,
  VerifyHasWalletAddressContext,
  VerifyHasTwitter,
  VerifyHasTelegram,
} from "../type";
import { QuestPolicyType } from "../__generated__/graphql";

class TypeParseHelper {
  private static instance: TypeParseHelper;

  private constructor() {}

  public static getInstance() {
    return this.instance || (this.instance = new this());
  }

  parseRewardPolicy = (context?: string, rewardPolicyType?: string) => {
    if (!context) return undefined;
    try {
      if (
        rewardPolicyType === REWARD_POLICY_TYPE.FCFS ||
        rewardPolicyType === REWARD_POLICY_TYPE.LUCKY_DRAW
      ) {
        const _context = context.trim();
        const contextJson = JSON.parse(_context);
        const res = contextJson as FCFSRewardContext;
        return res;
      }
    } catch (e) {
      return undefined;
    }
    return undefined;
  };

  parseQuestPolicy = (context?: string, questPolicyType?: string) => {
    if (!context) return undefined;
    try {
      const _context = context.trim();
      const contextJson = JSON.parse(_context);
      if (questPolicyType === QUEST_POLICY_TYPE.QUIZ) {
        return contextJson as QuizQuestContext;
      } else if (questPolicyType === QUEST_POLICY_TYPE.VERIFY_TWITTER_RETWEET) {
        return contextJson as TwitterRetweetQuestContext;
      } else if (questPolicyType === QUEST_POLICY_TYPE.VERIFY_TWITTER_FOLLOW) {
        return contextJson as TwitterFollowQuestContext;
      } else if (questPolicyType === QUEST_POLICY_TYPE.VERIFY_TWITTER_LIKING) {
        return contextJson as TwitterLikingQuestContext;
      } else if (questPolicyType === QUEST_POLICY_TYPE.VERIFY_DISCORD) {
        return contextJson as DiscordQuestContext;
      } else if (questPolicyType === QUEST_POLICY_TYPE.VERIFY_TELEGRAM) {
        return contextJson as TelegramQuestContext;
      } else if (questPolicyType === QUEST_POLICY_TYPE.VERIFY_3RIDGE_POINT) {
        return contextJson as Verify3ridgePointContext;
      } else if (questPolicyType === QuestPolicyType.VerifyEmail) {
        return contextJson as VerifyHasEmailContext;
      } else if (questPolicyType === QuestPolicyType.VerifyHasWalletAddress) {
        return contextJson as VerifyHasWalletAddressContext;
      } else if (questPolicyType === QuestPolicyType.VerifyHasTwitter) {
        return contextJson as VerifyHasTwitter;
      } else if (questPolicyType === QuestPolicyType.VerifyHasTelegram) {
        return contextJson as VerifyHasTelegram;
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
