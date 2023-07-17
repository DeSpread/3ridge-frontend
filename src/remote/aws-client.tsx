export default class AwsClient {
  private static instance: AwsClient;
  private readonly emailAuthApiUrl: string;

  private constructor() {
    this.emailAuthApiUrl = process.env["NEXT_PUBLIC_EMAIL_AUTH_URL"] ?? "";
  }

  public static getInstance() {
    return this.instance || (this.instance = new this());
  }

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

  asyncRequestAuthCodeMail = async (mail: string) => {
    const headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    const bodyContent = JSON.stringify({
      mail,
    });

    const response = await fetch(`${this.emailAuthApiUrl}/authcode`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });
    return response;
  };

  asyncGetAuthCodeOfMail = async (mail: string) => {
    const headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `${this.emailAuthApiUrl}/authcode?mail=${encodeURIComponent(mail)}`,
      {
        method: "GET",
        headers: headersList,
      }
    );
    return response;
  };
}
