import { FCFSPolicy, REWARD_POLICY_TYPE } from "../type";

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
        const _context = context.replaceAll("'", '"');
        const contextJson = JSON.parse(_context);
        const res = contextJson as FCFSPolicy;
        return res;
      }
    } catch (e) {
      return undefined;
    }
    return undefined;
  };
}

export default TypeParseHelper;
