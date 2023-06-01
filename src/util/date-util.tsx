const parseStrToDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const utcString = date.toLocaleString("en-US", { timeZone: "UTC" });
  return new Date(utcString);
};

export { parseStrToDate };
