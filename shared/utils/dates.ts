import { format, toZonedTime, fromZonedTime } from "date-fns-tz";
import { formatDistanceToNow } from "date-fns";

const timeZone = "Europe/London";

export function formatDate(input: string | Date, pattern: string) {
  const localTime = toZonedTime(input, timeZone);
  return format(localTime, pattern, { timeZone });
}

export function timeAgo(input: string | Date) {
  const utcTime = fromZonedTime(input, timeZone);
  return `${formatDistanceToNow(utcTime)} ago`;
}
