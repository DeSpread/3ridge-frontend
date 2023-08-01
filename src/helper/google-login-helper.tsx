import { TokenResponse } from "@react-oauth/google";

class GoogleLoginHelper {
  public static asyncIsLoggedInGoogle = async () => {
    const tokenResponse = this.fetchTokenResponse();
    if (!tokenResponse) return false;
    const { access_token } = tokenResponse;
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (response.status === 400) {
      this.googleLogout();
    }
    return response.ok;
  };

  public static asyncFetchUserInfo = async () => {
    const tokenResponse = this.fetchTokenResponse();
    if (!tokenResponse) return false;
    const { access_token } = tokenResponse;
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return null;
  };

  public static googleLogout = () => {
    localStorage.removeItem("serializedGoogleTokenResponse");
  };

  public static fetchTokenResponse = () => {
    const serialized = localStorage.getItem("serializedGoogleTokenResponse");
    if (!serialized) return false;
    const tokenResponse = JSON.parse(serialized) as TokenResponse;
    return tokenResponse;
  };

  public static storeTokenResponse = (tokenResponse: TokenResponse) => {
    localStorage.setItem(
      "serializedGoogleTokenResponse",
      JSON.stringify(tokenResponse)
    );
  };
}

export default GoogleLoginHelper;
