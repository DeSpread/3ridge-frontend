const LOG_ENABLE = process.env["NEXT_PUBLIC_CONSOLE_LOG_ENABLE"];

export default class Console {
  static log = (message?: any) => {
    if (LOG_ENABLE) console.log(message);
  };
}
