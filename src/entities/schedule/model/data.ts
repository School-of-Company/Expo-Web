/** 박람회 운영 일자. 정원·일정 데이터와 날짜 탭 UI가 공유하는 단일 진실원. */
export const EVENT_DATES = ["10.31(토)", "11.1(일)"] as const;

export type EventDate = (typeof EVENT_DATES)[number];

export interface TimelineItem {
  time: string;
  title: string;
  location: string;
  detail: string[];
  date: EventDate;
}

/** 주요 프로그램 운영 일정표를 그대로 옮긴다. 일자 안에서는 시작 시각 순으로 둔다. */
export const timeline: TimelineItem[] = [
  {
    time: "09:30~17:00",
    title: "AI·SW 교육 체험마당",
    location: "AI교육원 내·외부 공간",
    detail: ["각급학교, 기업 AI·SW교육 체험부스 운영"],
    date: "10.31(토)",
  },
  {
    time: "09:30~17:00",
    title: "AI코스웨어 및 에듀테크 체험",
    location: "AI교육원 2층",
    detail: ["에듀테크 및 AI코스웨어 체험 관련 유관기관·기업·대학 참여"],
    date: "10.31(토)",
  },
  {
    time: "09:30~17:00",
    title: "AI미래교육 홍보",
    location: "AI교육원 외부공간",
    detail: ["AI미래교육 정책 홍보"],
    date: "10.31(토)",
  },
  {
    time: "10:00~10:30",
    title: "사전공연",
    location: "3층 대강당",
    detail: ["개막 사전 공연"],
    date: "10.31(토)",
  },
  {
    time: "10:30~11:00",
    title: "개막식",
    location: "3층 대강당",
    detail: ["인사말씀", "운영안내 및 안전교육", "개막행사"],
    date: "10.31(토)",
  },
  {
    time: "11:00~12:30",
    title: "기조강연",
    location: "3층 대강당",
    detail: ["“AI 시대, 살아남기를 넘어 번영하기: 핵심 역량과 확장된 AI 리터러시”"],
    date: "10.31(토)",
  },
  {
    time: "13:00~14:00",
    title: "교원 자율연수",
    location: "213호",
    detail: ["초, 중학교 선생님을 대상으로 하는 갤럭시 AI클래스 수업"],
    date: "10.31(토)",
  },
  {
    time: "13:30~14:30",
    title: "초등학생 AI·SW골든벨",
    location: "3층 대강당",
    detail: ["초등학생 AI·SW골든벨 운영"],
    date: "10.31(토)",
  },
  {
    time: "14:00~15:00",
    title: "교원 자율연수",
    location: "212호",
    detail: ["Google AI 교육자 과정: 학생의 맞춤형 수업자료 만들기"],
    date: "10.31(토)",
  },
  {
    time: "15:00~16:00",
    title: "교원 자율연수",
    location: "213호",
    detail: ["효율 UP! AI•디지털 활용 수업 및 행정 활용 사례"],
    date: "10.31(토)",
  },
  {
    time: "16:00~17:00",
    title: "교원 자율연수",
    location: "201호",
    detail: ["‘수업은 쉽게, 참여는 깊게’ iPad로 만드는 참여 중심 수업"],
    date: "10.31(토)",
  },
  {
    time: "09:30~16:00",
    title: "AI·SW 교육 체험마당",
    location: "AI교육원 내·외부 공간",
    detail: ["각급학교, 기업 AI·SW교육 체험부스 운영"],
    date: "11.1(일)",
  },
  {
    time: "09:30~16:00",
    title: "AI코스웨어 및 에듀테크 체험",
    location: "AI교육원 2층",
    detail: ["에듀테크 및 AI코스웨어 체험 관련 유관기관·기업·대학 참여"],
    date: "11.1(일)",
  },
  {
    time: "09:30~16:00",
    title: "AI미래교육 홍보",
    location: "AI교육원 외부공간",
    detail: ["AI미래교육 정책 홍보"],
    date: "11.1(일)",
  },
  {
    time: "09:30~10:30",
    title: "교원 자율연수",
    location: "201호",
    detail: ["‘수업은 쉽게, 참여는 깊게’ iPad로 만드는 참여 중심 수업"],
    date: "11.1(일)",
  },
  {
    time: "10:30~11:30",
    title: "교원 자율연수",
    location: "212호",
    detail: ["아이온 EDU+ 기능 정복하기: Gemini Sidebar"],
    date: "11.1(일)",
  },
  {
    time: "11:00~12:00",
    title: "중·고등학생 AI·SW골든벨",
    location: "3층 대강당",
    detail: ["중·고등학생 AI·SW골든벨 운영"],
    date: "11.1(일)",
  },
  {
    time: "11:30~12:30",
    title: "교원 자율연수",
    location: "213호",
    detail: ["학생은 그리고 선생님은 설계한다. 갤럭시탭과 AI로 여는 초등교실"],
    date: "11.1(일)",
  },
  {
    time: "13:00~14:00",
    title: "교원 자율연수",
    location: "201호",
    detail: ["‘수업은 쉽게, 참여는 깊게’ iPad로 만드는 참여 중심 수업"],
    date: "11.1(일)",
  },
  {
    time: "14:00~15:00",
    title: "교원 자율연수",
    location: "213호",
    detail: ["생성형 AI에서 AI에이전트까지 교육은 어떻게 달라지는가!"],
    date: "11.1(일)",
  },
  {
    time: "15:00~16:00",
    title: "교원 자율연수",
    location: "212호",
    detail: ["Google AI 교육자 과정: 수업 지도안 및 보조 자료 만들기"],
    date: "11.1(일)",
  },
  {
    time: "15:30~16:00",
    title: "폐막",
    location: "전시홀",
    detail: ["폐회 및 정리"],
    date: "11.1(일)",
  },
];
