import { NextRouter } from "next/router";

class RouterUtil {
  public static getStringQuery = (router: NextRouter, key: string) => {
    if (!router.isReady) {
      return undefined;
    }
    const val = router.query[key];
    if (typeof val === "string") {
      return val;
    }
    return undefined;
  };
}

export default RouterUtil;
