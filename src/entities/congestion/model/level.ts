/** 혼잡도 서버의 단계. "unknown"은 카메라가 꺼졌거나 서버에 닿지 않을 때다. */
export type CongestionLevel = "free" | "normal" | "busy" | "unknown";

export const CONGESTION_LEVELS: readonly CongestionLevel[] = ["free", "normal", "busy", "unknown"];

export const CONGESTION_LABEL: Record<CongestionLevel, string> = {
  free: "여유",
  normal: "보통",
  busy: "혼잡",
  unknown: "확인 중",
};

/** Tailwind가 찾을 수 있도록 클래스 이름을 통째로 적어 둔다. */
export const CONGESTION_STYLE: Record<CongestionLevel, { text: string; underline: string }> = {
  free: { text: "text-success", underline: "decoration-success/40" },
  normal: { text: "text-warning", underline: "decoration-warning/40" },
  busy: { text: "text-danger", underline: "decoration-danger/40" },
  unknown: { text: "text-fg-3", underline: "decoration-gray-30" },
};

export function toCongestionLevel(value: unknown): CongestionLevel {
  return CONGESTION_LEVELS.includes(value as CongestionLevel) ? (value as CongestionLevel) : "unknown";
}
