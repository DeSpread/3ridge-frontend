import { uuid } from "@walletconnect/legacy-utils";

class StringUtil {
  public static validateMail = (val?: string | unknown) => {
    if (typeof val !== "string") {
      return false;
    }
    const expression: RegExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return expression.test(val);
  };

  public static validatePassword = (val?: string | unknown) => {
    if (typeof val === "string" && val.length > 5) {
      return true;
    }
    return false;
  };

  public static isValidEthereumAddress = (address?: string) => {
    if (!address) return false;
    const ethereumAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
    return ethereumAddressRegex.test(address);
  };

  public static nFormatter = (num: number, digits: number) => {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item
      ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
      : "0";
  };

  public static decodeBase64 = (base64String: string) => {
    const decodedString = Buffer.from(base64String, "base64").toString("utf-8");
    return decodedString;
  };

  public static encodeBase64 = (plainText: string) => {
    const buffer = Buffer.from(plainText, "utf-8");
    return buffer.toString("base64");
  };

  public static generateUniqId = () => {
    const DELIMITER = "-";
    const currentUnixTimestamp = new Date().getTime();
    return currentUnixTimestamp + DELIMITER + uuid();
  };
}

export default StringUtil;
