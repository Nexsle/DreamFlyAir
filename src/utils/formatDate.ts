const ISO_START_DATE = 0;
const ISO_END_DATE = 10;

export function getLocalDate(date: Date | undefined) {
  if (typeof date === "undefined") return;
  return date.toLocaleDateString("en", {});
}

export function getIsoDate(date: Date | undefined) {
  if (typeof date === "undefined") return;
  return date.toISOString().substring(ISO_START_DATE, ISO_END_DATE);
}
