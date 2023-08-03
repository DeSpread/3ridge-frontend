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
      const domain = window.location.origin;
      const botId = process.env["NEXT_PUBLIC_TELEGRAM_BOT_ID"] ?? "";
      const botIds = botId?.split(",");
      let targetBotId = "";
      if (domain.includes("www")) {
        targetBotId = botIds[0];
      } else {
        targetBotId = botIds.length > 1 ? botIds[1] : botIds[0];
      }
      console.log("bot_id", targetBotId);
      //@ts-ignore
      window.Telegram.Login.auth(
        {
          bot_id: targetBotId,
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
