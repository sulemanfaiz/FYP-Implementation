export const formatNumberWithCommas = (number) => {
  if (!number && number !== 0) return "";
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
