export interface Application {
  id: string;
  program: string;
  date: string;
  status: "신청완료" | "취소됨";
}

export const mockApplications: Application[] = [
  { id: "a1", program: "학생 사전등록", date: "10.31(토) 오전", status: "신청완료" },
  { id: "a2", program: "AI·SW 골든벨 (중등부)", date: "10.31(토) 오후", status: "신청완료" },
];
