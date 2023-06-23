import { ElasticErrorDocument, LOG_LEVEL } from "../type";

export default class ElasticClient {
  private static instance: ElasticClient;

  public static getInstance() {
    return this.instance || (this.instance = new this());
  }

  asyncPostErrorLog = async (message: string) => {
    const userAgent = window.navigator.userAgent;
    const doc = {
      userAgent,
      message,
      logLevel: LOG_LEVEL.ERROR,
    } as ElasticErrorDocument;
    const body = JSON.stringify(doc);
    const headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };
    // try {
    //   const res = await fetch("/api/elastic", {
    //     method: "POST",
    //     headers: headersList,
    //     body,
    //   });
    //   console.log(res.status);
    //   console.log(res);
    // } catch (e) {
    //   console.log(e);
    // }

    try {
      const res = await fetch("/api/elastic", {
        method: "GET",
        headers: headersList,
      });
      console.log(res.status);
      console.log(res);
    } catch (e) {
      console.log(e);
    }

    // const res = await fetch("/api/hello");
    // console.log(res.status);
    // const res = await fetch("/api/hello", {
    //   method: "GET",
    // });
    // console.log(res.status);

    // const res = await fetch("/api/elastic", {
    //   method: "GET",
    //   headers: headersList,
    // });
    // console.log(res.status);
  };
}
