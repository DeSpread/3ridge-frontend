import isAfter from "date-fns/isAfter";

class DateUtil {
  public static parseStrToDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date;
  };

  public static isAfter = (
    date?: Date | string,
    dateToCompare?: Date | string
  ) => {
    if (!date) {
      return true;
    }
    if (typeof date === "string") {
      if (!dateToCompare) {
        return isAfter(this.parseStrToDate(date), new Date());
      }
      if (typeof dateToCompare === "string")
        return isAfter(
          this.parseStrToDate(date),
          this.parseStrToDate(dateToCompare)
        );
      return isAfter(this.parseStrToDate(date), dateToCompare);
    }
    if (!dateToCompare) {
      return isAfter(date, new Date());
    }
    if (typeof dateToCompare === "string")
      return isAfter(date, this.parseStrToDate(dateToCompare));
    return isAfter(date, dateToCompare);
  };

  public static isBefore = (
    target?: Date | string,
    dateToCompare?: Date | string
  ) => {
    return !this.isAfter(target, dateToCompare);
  };
}

export default DateUtil;
