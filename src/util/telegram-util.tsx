import { AppError } from "../error/my-error";

class TelegramUtil {
  public static asyncLogin = () => {
    return new Promise<{
      auth_date: number;
      first_name: string;
      hash: string;
      id: number;
      photo_url: string;
      username: string;
    }>((resolve, reject) => {
      //@ts-ignore
      window.Telegram.Login.auth(
        {
          bot_id: process.env["NEXT_PUBLIC_TELEGRAM_BOT_ID"],
          request_access: true,
        },
        (data: {
          auth_date: number;
          first_name: string;
          hash: string;
          id: number;
          photo_url: string;
          username: string;
        }) => {
          if (data) resolve(data);
          else reject(new AppError("Can`t fetch telegram user data"));
        }
      );
    });
  };
}

export default TelegramUtil;
