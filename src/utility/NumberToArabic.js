export const toIndiaDigits = (str) => {
  const indiaDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/[0-9]/g, (digit) => indiaDigits[digit]);
};
