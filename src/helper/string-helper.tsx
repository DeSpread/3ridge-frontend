import { ContentEncodingType, ContentMetadata } from "../__generated__/graphql";
import StringUtil from "../util/string-util";

class StringHelper {
  public static convertAddressToMidEllipsis = (
    src: string | undefined,
    preLen = 6,
    postLen = 4
  ): string | undefined => {
    if (src === undefined) return undefined;
    if (src.length < preLen + postLen) {
      return src;
    }

    return (
      src.substring(0, preLen) +
      "..." +
      src.substring(src.length - postLen, src.length)
    );
  };

  public static getRewardAmountLabel = (rewardAmount?: number) => {
    const _rewardAmount = rewardAmount ?? 0;
    if (_rewardAmount >= 10000000) {
      return "전원";
    }
    return _rewardAmount?.toLocaleString() + "명";
  };

  public static decodeContentMetaData = (contentMetaData: ContentMetadata) => {
    if (contentMetaData.contentEncodingType === ContentEncodingType.Base64) {
      return StringUtil.decodeBase64(contentMetaData.content);
    }
    return contentMetaData.content;
  };
}

export default StringHelper;
