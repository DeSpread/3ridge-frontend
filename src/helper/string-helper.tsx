class StringHelper {
  private static instance: StringHelper;

  private constructor() {}

  public static getInstance() {
    return this.instance || (this.instance = new this());
  }

  getMidEllipsisString = (src: string, preLen = 6, postLen = 4): string => {
    if (src.length < preLen + postLen) {
      return src;
    }

    return (
      src.substring(0, preLen) +
      "..." +
      src.substring(src.length - postLen, src.length)
    );
  };
}

export default StringHelper;
