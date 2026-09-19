/** 사전신청 섹션(LocalNav) 메뉴. 라우트는 SITE_NAVIGATION의 사전신청 하위 경로와 일치시킨다. */
export const applyNavItems = [
  { key: "register", label: "[전체] 사전등록", shortLabel: "사전등록", href: "/apply/register" },
  { key: "lecture", label: "[전체] 특강 신청", shortLabel: "특강 신청", href: "/apply/lecture" },
  { key: "golden-bell", label: "[학생] 골든벨 신청", shortLabel: "골든벨 신청", href: "/apply/goldenbell" },
  { key: "ai-tour", label: "[학생] 오디세이 투어 신청", shortLabel: "오디세이 투어 신청", href: "/apply/odyssey" },
  { key: "training", label: "[교사] 연수 신청", shortLabel: "연수 신청", href: "/apply/training" },
  { key: "check", label: "신청 내역 조회·취소", href: "/apply/history" },
];
