import type { EventDate } from "@/entities/schedule/model/data";

/** 회차가 여러 개인 프로그램. 표에서는 "구분" 칸을 병합하고, 좁은 폭에서는 한 줄로 접는다. */
export const GROUPED_TITLE = "교원 자율연수";

export const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** "10.31(토)" → "10.31.(토)". 데이터 키는 그대로 두고 화면에 보일 때만 날짜 뒤에 점을 찍는다. */
export const formatEventDate = (date: EventDate) => date.replace("(", ".(");
