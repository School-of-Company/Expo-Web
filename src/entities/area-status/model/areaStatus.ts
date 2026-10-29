import type { CongestionLevel } from "@/entities/congestion/@x/area-status";

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
 * 응답이 기대한 모양인지 확인한다. 배열이 아니면 null을 돌려줘 기존 값을 유지하게 하고,
 * 모양이 어긋난 항목(null, 문자열이 아닌 필드)은 빼고 나머지만 쓴다.
 */
export function parseAreaStatuses(data: unknown): AreaStatus[] | null {
  if (!Array.isArray(data)) return null;
  return data.filter(
    (s): s is AreaStatus =>
      typeof s?.type === "string" && typeof s.status === "string" && typeof s.statusName === "string",
  );
}

/**
 * 서버 상태 코드를 화면 색 단계로 옮긴다. 서버에는 "보통"이 없으므로 쓰지 않고,
 * 세 번째 단계(정체·포화·만차)는 빨간 "매우 혼잡" 색으로 둔다. 모르는 코드는 "없음" 색과 "확인 중"이다.
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

/** 아직 보고되지 않았거나 모르는 상태 코드일 때 보여 줄 글자. */
export const PENDING_TEXT = "확인 중";

/** 헤더는 줄바꿈 없이 보여 주므로, 서버 문구가 길어도 이 글자 수에서 자른다. */
const MAX_TEXT_LENGTH = 6;

/** 임시: true면 서버 값과 상관없이 모든 현황을 "여유"로 보여 준다. 실시간 표시를 되살릴 때 false로 바꾼다. */
const FORCE_ALL_CLEAR = true;

export function toLiveStatus(entry: AreaStatus | undefined): { level: CongestionLevel; text: string } {
  if (FORCE_ALL_CLEAR) return { level: "여유", text: "여유" };
  // "constructor" 같은 상속된 키가 걸리지 않도록 자기 키만 본다.
  // 모르는 코드는 서버 문구가 회색으로 보이지 않도록 "확인 중"으로 둔다.
  if (!entry || !Object.hasOwn(LEVEL_BY_STATUS, entry.status)) return { level: "없음", text: PENDING_TEXT };
  const name = entry.statusName;
  const text = name.length > MAX_TEXT_LENGTH ? `${name.slice(0, MAX_TEXT_LENGTH)}…` : name;
  return { level: LEVEL_BY_STATUS[entry.status], text };
}
