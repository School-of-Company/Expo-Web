/**
 * 개발자 후기 설문 응답 한 건. 설문 항목과 1:1로 맞춘다.
 * 설문의 이메일 주소는 연락용이라 공개 페이지에 싣지 않으므로 여기에도 두지 않는다.
 * 소속 개발팀은 응답을 어느 DeveloperProject.members에 넣는지로 나타낸다.
 */
export interface Developer {
  /** 이름 또는 닉네임. 본인이 고른 대로 적는다. */
  name: string;
  /** 담당한 업무 또는 개발한 기능 */
  role: string;
  /** 개발하면서 가장 기억에 남았던 순간은? */
  moment: string;
  /** 개발하면서 어려웠던 점과 해결 과정 */
  challenge: string;
  /** 이번 개발을 통해 느낀 점 */
  takeaway: string;
  /** 깃허브 프로필 URL. 적지 않았으면 비워 둔다. */
  github?: string;
}

export interface DeveloperProject {
  key: string;
  name: string;
  members: Developer[];
}

// TODO: 실제 설문 응답을 받으면 교체한다. 지금은 인원수(홈페이지 5명, 혼잡도 2명, 주차 2명)만 맞춘 빈 자리다.
// 프로젝트는 카드의 배지로 구분되며, 참여자가 없는 프로젝트는 목록에 나타나지 않는다.
const placeholders = (count: number): Developer[] =>
  Array.from({ length: count }, () => ({ name: "untitled", role: "NULL", moment: "NULL", challenge: "NULL", takeaway: "NULL" }));

export const developerProjects: DeveloperProject[] = [
  { key: "web", name: "사전등록·QR 입퇴장 및 박람회 공식 홈페이지", members: placeholders(5) },
  { key: "congestion", name: "비전 AI 기반 행사장 혼잡도 실시간 안내 시스템", members: placeholders(2) },
  { key: "parking", name: "현장 맞춤형 주차 현황 안내 시스템 및 대시보드", members: placeholders(2) },
];
