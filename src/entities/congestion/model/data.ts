export type CongestionLevel = "여유" | "보통" | "혼잡" | "매우 혼잡";

export const CONGESTION_STYLE: Record<CongestionLevel, { dot: string; text: string; bar: string }> = {
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

export const congestionUpdatedAt = "14:20 기준";

const LEVEL_ORDER: Record<CongestionLevel, number> = { "여유": 0, "보통": 1, "혼잡": 2, "매우 혼잡": 3 };

export const overallCongestionLevel: CongestionLevel = congestionZones.reduce(
  (worst, z) => (LEVEL_ORDER[z.level] > LEVEL_ORDER[worst] ? z.level : worst),
  "여유" as CongestionLevel
);
