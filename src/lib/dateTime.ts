export const months = (
  locale?: string,
  format: Intl.DateTimeFormatOptions["month"] = "long"
): string[] => {
  const month = Intl.DateTimeFormat(locale, { month: format });
  return Array.from({ length: 12 }, (_, i) =>
    month.format(new Date(0, 0).setMonth(i))
  );
};

export const formatAnniversary = (anniversary: string): string => {
  const [m, d, y] = anniversary.split("/");
  const month = months()[parseInt(m) - 1];
  let result = "";
  if (month) {
    result += month + " " + d;
    if (y) result += ", " + y;
  } else {
    result += m + "/" + d;
    if (y) result += "/" + y;
  }

  return result;
};
