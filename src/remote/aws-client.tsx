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
}
