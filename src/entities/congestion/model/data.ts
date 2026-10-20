/** "없음"은 행사 전처럼 아직 집계된 현황이 없을 때 쓴다. */
export type CongestionLevel = "없음" | "여유" | "보통" | "혼잡" | "매우 혼잡";

export const CONGESTION_STYLE: Record<CongestionLevel, { dot: string; text: string; bar: string }> = {
  "없음": { dot: "bg-gray-40", text: "text-fg-3", bar: "bg-gray-40" },
  "여유": { dot: "bg-success", text: "text-success", bar: "bg-success" },
  "보통": { dot: "bg-warning", text: "text-warning", bar: "bg-warning" },
  "혼잡": { dot: "bg-danger", text: "text-danger", bar: "bg-danger" },
  "매우 혼잡": { dot: "bg-accent-70", text: "text-accent-70", bar: "bg-accent-70" },
};

export interface CongestionZone {
  zone: string;
  level: CongestionLevel;
  percent: number;
}

export const congestionZones: CongestionZone[] = [
  { zone: "1층 체험 부스", level: "혼잡", percent: 82 },
  { zone: "2층 상설 체험", level: "보통", percent: 55 },
  { zone: "골든벨 강당", level: "여유", percent: 30 },
  { zone: "교사 연수실", level: "보통", percent: 48 },
];

export const congestionUpdatedAt = "집계 전";

export const overallCongestionLevel: CongestionLevel = "없음";

export const roadCongestionLevel: CongestionLevel = "없음";
export const parkingCongestionLevel: CongestionLevel = "없음";

export const liveStatusItems: { label: string; icon: "users" | "car" | "parking"; level: CongestionLevel }[] = [
  { label: "행사장 현황", icon: "users", level: overallCongestionLevel },
  { label: "도로 현황", icon: "car", level: roadCongestionLevel },
  { label: "주차 현황", icon: "parking", level: parkingCongestionLevel },
];
