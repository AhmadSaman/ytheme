import { clsx, type ClassValue } from "clsx";
import {
  addSeconds,
  format,
  formatDuration,
  intervalToDuration,
} from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (seconds: number) => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });

  // Get hours, minutes, and seconds
  const hours = duration.hours;
  const minutes = String(duration.minutes ?? "0").padStart(2, "0");
  const secs = String(duration.seconds ?? "0").padStart(2, "0");

  // If hours are 0, return mm:ss, otherwise HH:mm:ss
  return seconds > 3600
    ? `${String(hours).padStart(2, "0")}:${minutes}:${secs}`
    : `${minutes}:${secs}`;
};
