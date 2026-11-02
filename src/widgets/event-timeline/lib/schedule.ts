import type { EventDate } from "@/entities/schedule";

export const GROUPED_TITLE = "교원 자율연수";

export const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export const formatEventDate = (date: EventDate) => date.replace("(", ".(");
