import type { CongestionLevel } from "@/entities/congestion/model/data";

export type AreaType = "VENUE" | "ROAD" | "PARKING";

/** GET /api/public/area-statuses 응답 항목. 아직 보고되지 않은 유형은 배열에 없다. */
export interface AreaStatus {
  type: AreaType;
  status: string;
  statusName: string;
  observedAt: string;
  updatedAt: string;
}

/**
 * 서버 상태 코드를 화면 색 단계로 옮긴다. 서버에는 "보통"이 없으므로 쓰지 않고,
 * 세 번째 단계(정체·포화·만차)는 빨간 "매우 혼잡" 색으로 둔다. 모르는 코드는 "없음" 색이다.
 */
const LEVEL_BY_STATUS: Record<string, CongestionLevel> = {
  SMOOTH: "여유",
  AVAILABLE: "여유",
  CONGESTED: "혼잡",
  CROWDED: "혼잡",
  JAM: "매우 혼잡",
  SATURATED: "매우 혼잡",
  FULL: "매우 혼잡",
};

/** 아직 한 번도 보고되지 않은 유형에 보여 줄 글자. */
export const PENDING_TEXT = "확인 중";

export function toLiveStatus(entry: AreaStatus | undefined): { level: CongestionLevel; text: string } {
  if (!entry) return { level: "없음", text: PENDING_TEXT };
  return { level: LEVEL_BY_STATUS[entry.status] ?? "없음", text: entry.statusName };
}
