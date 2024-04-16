export function formatDateTime(dateTimeString) {
  const dateObject = new Date(dateTimeString);
  const formattedDate = `${dateObject.toLocaleString("default", {
    month: "short",
  })} ${dateObject.getDate()}, ${dateObject.getFullYear()}`;
  const formattedTime = dateObject.toLocaleTimeString();

  return { date: formattedDate, time: formattedTime };
}
