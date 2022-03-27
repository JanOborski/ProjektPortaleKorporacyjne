export function clock() {
  const newDate = new Date();
  return {
    date: newDate
      .toISOString()
      .replace(/T.*/, "")
      .split("-")
      .reverse()
      .join("-"),
    hours: newDate.getHours(),
    minutes: newDate.getMinutes(),
  };
}
