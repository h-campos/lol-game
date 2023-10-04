import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import duration from "dayjs/plugin/duration.js";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

export const dayJS = dayjs;
export { Dayjs } from "dayjs";