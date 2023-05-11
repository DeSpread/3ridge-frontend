export default class AwsClient {
  private static instance: AwsClient;
  private readonly emailAuthApiUrl: string;

  private constructor() {
    this.emailAuthApiUrl = process.env["NEXT_PUBLIC_EMAIL_AUTH_URL"] ?? "";
  }

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

  asyncResendAuthMail = async (mail: string) => {
    const headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    const bodyContent = JSON.stringify({
      mail,
    });

    const response = await fetch(`${this.emailAuthApiUrl}/resend`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });
    return response;
  };

  asyncIsAuthMail = async (mail: string) => {
    const headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `${this.emailAuthApiUrl}/auth?mail=${encodeURIComponent(mail)}`,
      {
        method: "GET",
        headers: headersList,
      }
    );
    return response;
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

    const response = await fetch(`${this.emailAuthApiUrl}/login`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });
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

    const response = await fetch(`${this.emailAuthApiUrl}/auth`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });
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

    const response = await fetch(`${this.emailAuthApiUrl}/auth`, {
      method: "PUT",
      body: bodyContent,
      headers: headersList,
    });
    return response;
  };
}
