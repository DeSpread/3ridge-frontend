import { Kakao } from "@/__generated__/graphql";
import { APP_ERROR_MESSAGE, AppError } from "@/error/my-error";

export function useKakaoLogin() {
  const asyncFetchKakaoUserInfo = async () => {
    await kakaoLogin();
    const kakaoUserInfo = await getKakaoUserInfo();
    return kakaoUserInfo;
  };

  const kakaoLogin = () => {
    return new Promise((resolve, reject) => {
      window.Kakao.Auth.login({
        success: (response: any) => {
          window.Kakao.Auth.setAccessToken(response.access_token);
          resolve(true);
        },
        fail: (e: any) => {
          reject(e);
        },
      });
    });
  };

  const getKakaoUserInfo = () => {
    return new Promise<Kakao>((resolve, reject) => {
      window.Kakao.Auth.getStatusInfo(({ status }: { status: string }) => {
        try {
          if (status == "connected") {
            window.Kakao.API.request({
              url: "/v2/user/me",
              success: function (res: any) {
                const kakao: Kakao = {
                  id: res.id,
                  connected_at: res.connected_at ?? "",
                  properties: {
                    nickname: res.properties.nickname ?? "",
                    profile_image: res.properties.profile_image ?? "",
                    thumbnail_image: res.properties.thumbnail_image ?? "",
                  },
                  kakao_account: {
                    profile_nickname_needs_agreement:
                      res.kakao_account.profile_nickname_needs_agreement ??
                      undefined,
                    profile_image_needs_agreement:
                      res.kakao_account.profile_nickname_needs_agreement ??
                      undefined,
                    has_age_range: res.kakao_account.has_age_range ?? undefined,
                    age_range_needs_agreement:
                      res.kakao_account.age_range_needs_agreement ?? undefined,
                    age_range: res.kakao_account.age_range ?? undefined,
                    has_birthday: res.kakao_account.has_birthday ?? undefined,
                    birthday_needs_agreement:
                      res.kakao_account.birthday_needs_agreement ?? undefined,
                    birthday: res.kakao_account.birthday ?? undefined,
                    birthday_type: res.kakao_account.birthday_type ?? undefined,
                    has_gender: res.kakao_account.has_gender ?? undefined,
                    gender_needs_agreement:
                      res.kakao_account.gender_needs_agreement ?? undefined,
                    gender: res.kakao_account.gender ?? undefined,
                  },
                };
                resolve(kakao);
              },
              fail: function (error: any) {
                reject(error);
              },
            });
          } else {
            reject(new AppError(APP_ERROR_MESSAGE.FAIL_TO_FETCH_KAKAO_INFO));
          }
        } catch (e) {
          reject(e);
        }
      });
    });
  };

  return { asyncFetchKakaoUserInfo };
}
