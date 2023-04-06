export default class AwsClient {
  private static instance: AwsClient;

  private constructor() {}

  public static getInstance() {
    return this.instance || (this.instance = new this());
  }

  asyncUploadProfileImage = async ({
    base64Data,
    imageName,
  }: {
    base64Data: string;
    imageName: string;
  }) => {
    const URL =
      "https://u6pdzy7iqa.execute-api.ap-northeast-2.amazonaws.com/Prod/profile";
    const data = {
      name: imageName,
      data: base64Data,
    };
    const res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "no-cors",
      cache: "default",
      body: JSON.stringify(data),
    });
    return res;
  };

  asyncLoginWithMail = async (mail: string, password: string) => {
    const headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    const bodyContent = JSON.stringify({
      mail,
      password,
    });

    const response = await fetch(
      "https://bqkigu1jwg.execute-api.ap-northeast-2.amazonaws.com/Prod/login",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );
    return response;
  };

  asyncRequestAuthMail = async (mail: string, password: string) => {
    const headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    const bodyContent = JSON.stringify({
      mail,
      password,
    });

    const response = await fetch(
      "https://bqkigu1jwg.execute-api.ap-northeast-2.amazonaws.com/Prod/auth",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );
    return response;
  };

  asyncUpdateAuthMail = async (mail: string) => {
    const headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    const bodyContent = JSON.stringify({
      mail,
    });

    const response = await fetch(
      "https://bqkigu1jwg.execute-api.ap-northeast-2.amazonaws.com/Prod/auth",
      {
        method: "PUT",
        body: bodyContent,
        headers: headersList,
      }
    );
    return response;
  };
}
