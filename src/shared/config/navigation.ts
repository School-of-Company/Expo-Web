export interface NavItem {
  label: string;
  href: string;
}

export interface NavMenu extends NavItem {
  children: NavItem[];
}

/** 헤더 주요 메뉴 · 푸터 사이트맵이 공유하는 전역 내비게이션 트리. */
export const SITE_NAVIGATION: NavMenu[] = [
  {
    label: "박람회 안내",
    href: "/about",
    children: [
      { label: "행사 개요", href: "/about/overview" },
      { label: "전체 일정표", href: "/about/schedule" },
      { label: "부스 배치도", href: "/about/booth-map" },
      { label: "오시는 길", href: "/about/directions" },
      { label: "실시간 현황", href: "/about/live" },
    ],
  },
  {
    label: "학생마당",
    href: "/student",
    children: [
      { label: "체험 부스 안내", href: "/student/booths" },
      { label: "AI·SW 골든벨", href: "/student/goldenbell" },
      { label: "오디세이 투어", href: "/student/odyssey" },
    ],
  },
  {
    label: "교사마당",
    href: "/teacher",
    children: [
      { label: "부스 안내", href: "/teacher/booths" },
      { label: "교사 연수", href: "/teacher/training" },
      { label: "미래교육 특강", href: "/teacher/lecture" },
    ],
  },
  {
    label: "사전신청",
    href: "/apply",
    children: [
      { label: "[전체] 사전등록", href: "/apply/register" },
      { label: "[전체] 특강 신청", href: "/apply/lecture" },
      { label: "[학생] 골든벨 신청", href: "/apply/goldenbell" },
      { label: "[학생] 오디세이 투어 신청", href: "/apply/odyssey" },
      { label: "[교사] 연수 신청", href: "/apply/training" },
      { label: "신청 내역 조회·취소", href: "/apply/history" },
    ],
  },
  {
    label: "알림마당",
    href: "/notice",
    children: [
      { label: "공지사항", href: "/notice/announcements" },
      { label: "FAQ", href: "/notice/faq" },
      { label: "주차안내", href: "/notice/parking" },
    ],
  },
];
