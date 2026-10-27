/** 부스 배치도에서 구역별로 칠한 색. 목록의 부스번호 칸도 같은 색으로 맞춘다. */
const BOOTH_COLORS: Record<string, string> = {
  E: "#8dc953",
  M: "#f99b25",
  H: "#664fa6",
  S: "#f349a3",
  D: "#3aaccc",
};

/** 부스번호("E-01") 앞 글자로 배치도 색을 찾는다. 번호가 없거나 모르는 구역이면 undefined. */
export const boothColor = (no: string): string | undefined => BOOTH_COLORS[no.charAt(0)];
