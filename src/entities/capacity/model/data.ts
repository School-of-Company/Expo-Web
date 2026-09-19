export type CapacityStatus = "open" | "almost" | "closed";

export interface CapacitySlot {
  id: string;
  program: string;
  audience: "학생" | "교원";
  date: "10.31(토)" | "11.1(일)";
  time: "오전" | "오후";
  current: number;
  total: number;
  status: CapacityStatus;
}

export const STATUS_LABEL: Record<CapacityStatus, string> = {
  open: "접수중",
  almost: "마감임박",
  closed: "마감",
};

export const STATUS_STYLE: Record<CapacityStatus, string> = {
  open: "bg-success/10 text-success ring-success/20",
  almost: "bg-warning/10 text-warning ring-warning/20",
  closed: "bg-bg-subtle text-fg-4 ring-border-default",
};

export const capacitySlots: CapacitySlot[] = [
  { id: "reg-3110am", program: "학생 사전등록", audience: "학생", date: "10.31(토)", time: "오전", current: 206, total: 250, status: "almost" },
  { id: "reg-3110pm", program: "학생 사전등록", audience: "학생", date: "10.31(토)", time: "오후", current: 130, total: 250, status: "open" },
  { id: "reg-311am", program: "학생 사전등록", audience: "학생", date: "11.1(일)", time: "오전", current: 250, total: 250, status: "closed" },
  { id: "reg-311pm", program: "학생 사전등록", audience: "학생", date: "11.1(일)", time: "오후", current: 94, total: 250, status: "open" },
  { id: "gb-3110pm", program: "AI·SW 골든벨", audience: "학생", date: "10.31(토)", time: "오후", current: 48, total: 50, status: "almost" },
  { id: "gb-311pm", program: "AI·SW 골든벨", audience: "학생", date: "11.1(일)", time: "오후", current: 27, total: 50, status: "open" },
  { id: "tour-3110am", program: "AI교육원 탐방 (오디세이 투어)", audience: "학생", date: "10.31(토)", time: "오전", current: 16, total: 16, status: "closed" },
  { id: "tour-3110pm", program: "AI교육원 탐방 (오디세이 투어)", audience: "학생", date: "10.31(토)", time: "오후", current: 18, total: 32, status: "open" },
  { id: "lecture-3110am", program: "미래교육 특강", audience: "교원", date: "10.31(토)", time: "오전", current: 210, total: 300, status: "open" },
];
