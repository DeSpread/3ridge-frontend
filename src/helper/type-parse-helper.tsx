import {
  FCFSRewardContext,
  FollowQuestContext,
  QUEST_POLICY_TYPE,
  QuizQuestContext,
  RetweetQuestContext,
  REWARD_POLICY_TYPE,
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
      if (rewardPolicyType === REWARD_POLICY_TYPE.FCFS) {
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
        return contextJson as RetweetQuestContext;
      } else if (questPolicyType === QUEST_POLICY_TYPE.VERIFY_TWITTER_FOLLOW) {
        return contextJson as FollowQuestContext;
      }
    } catch (e) {
      console.log(e);
      return undefined;
    }
    return undefined;
  };
}

export default TypeParseHelper;
