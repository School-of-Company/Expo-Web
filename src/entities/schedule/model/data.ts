export interface TimelineItem {
  time: string;
  title: string;
  location: string;
  detail: string[];
  date: "10.31(토)" | "11.1(일)";
}

export const timeline: TimelineItem[] = [
  {
    time: "09:30~17:00",
    title: "AI·SW 교육 체험마당",
    location: "AI교육원 외부 공간",
    detail: ["각급학교, 대학·기업·기관 AI·SW교육 체험부스 운영"],
    date: "10.31(토)",
  },
  {
    time: "09:30~17:00",
    title: "AI코스웨어 및 에듀테크 체험",
    location: "2층 실내",
    detail: ["에듀테크 및 AI코스웨어 체험 관련 유관 기관, 기업, 대학 참여"],
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
    detail: [],
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
    time: "09:30~16:00",
    title: "AI·SW 교육 체험마당",
    location: "AI교육원 외부 공간",
    detail: ["각급학교, 대학·기업·기관 AI·SW교육 체험부스 운영"],
    date: "11.1(일)",
  },
  {
    time: "09:30~16:00",
    title: "AI코스웨어 및 에듀테크 체험",
    location: "2층 실내",
    detail: ["에듀테크 및 AI코스웨어 체험 관련 유관 기관, 기업, 대학 참여"],
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
    time: "16:00~16:30",
    title: "폐막",
    location: "AI교육원 일원",
    detail: ["폐회 및 정리"],
    date: "11.1(일)",
  },
];
