import type { BrandKey } from "@/shared/ui/logos/BrandMark";

export interface TrainingSession {
  /** 회사 안에서의 회차. 1부터 매긴다. */
  round: number;
  date: string;
  time: string;
  title: string;
}

export interface TrainingProgram {
  id: string;
  /** 로고가 있는 협력사만 준다. 없으면 로고 칸 없이 제목만 보인다. */
  brand?: BrandKey;
  title: string;
  place: string;
  /** 모든 회차를 맡는 강사. 회차 제목 아래에 보여 준다. */
  instructor?: string;
  sessions: TrainingSession[];
}

const COOL_SCHOOL_TOPIC = "AI를 활용한 학교공간재구조화 및 2030교실 자동구성";

/** 삼성·구글·애플이 각자 여러 회차를 이틀에 걸쳐 운영한다. 회사별 연수실은 회차와 상관없이 같다. */
export const trainingPrograms: TrainingProgram[] = [
  {
    id: "samsung",
    brand: "samsung",
    title: "삼성 연수",
    place: "AI교육원 213호",
    sessions: [
      { round: 1, date: "10.31.(토)", time: "13:00~14:00", title: "초, 중학교 교원 대상 갤럭시 AI클래스 수업" },
      { round: 2, date: "10.31.(토)", time: "15:00~16:00", title: "효율 UP! AI•디지털 활용 수업 및 행정 활용 사례" },
      { round: 3, date: "11.1.(일)", time: "11:30~12:30", title: "학생은 그리고 선생님은 설계한다. 갤럭시탭과 AI로 여는 초등교실" },
      { round: 4, date: "11.1.(일)", time: "14:00~15:00", title: "생성형 AI에서 AI에이전트까지 교육은 어떻게 달라지는가!" },
    ],
  },
  {
    id: "google",
    brand: "google",
    title: "구글 연수",
    place: "AI교육원 212호",
    sessions: [
      { round: 1, date: "10.31.(토)", time: "14:00~15:00", title: "Google AI 교육자 과정: 학생의 맞춤형 수업자료 만들기" },
      { round: 2, date: "11.1.(일)", time: "10:30~11:30", title: "아이온 EDU+ 기능 정복하기: Gemini Sidebar" },
      { round: 3, date: "11.1.(일)", time: "15:00~16:00", title: "Google AI 교육자 과정: 수업 지도안 및 보조 자료 만들기" },
    ],
  },
  {
    id: "apple",
    brand: "apple",
    title: "애플 연수",
    place: "AI교육원 202호",
    sessions: [
      { round: 1, date: "10.31.(토)", time: "16:00~17:00", title: "‘수업은 쉽게, 참여는 깊게’ iPad로 만드는 참여 중심 수업" },
      { round: 2, date: "11.1.(일)", time: "09:30~10:30", title: "‘수업은 쉽게, 참여는 깊게’ iPad로 만드는 참여 중심 수업" },
      { round: 3, date: "11.1.(일)", time: "13:00~14:00", title: "‘수업은 쉽게, 참여는 깊게’ iPad로 만드는 참여 중심 수업" },
    ],
  },
  {
    id: "cool-school",
    brand: "coolschool",
    title: "Cool School 연수",
    place: "AI교육원 2층 206호",
    instructor: "오진연 (Cool School 대표 · 한국디지털교육협회 K디지털교실분과 위원장)",
    sessions: [
      { round: 1, date: "10.31.(토)", time: "11:30~12:00", title: COOL_SCHOOL_TOPIC },
      { round: 2, date: "10.31.(토)", time: "12:00~12:30", title: COOL_SCHOOL_TOPIC },
      { round: 3, date: "10.31.(토)", time: "15:00~15:30", title: COOL_SCHOOL_TOPIC },
      { round: 4, date: "10.31.(토)", time: "15:30~16:00", title: COOL_SCHOOL_TOPIC },
      { round: 5, date: "11.1.(일)", time: "11:00~11:30", title: COOL_SCHOOL_TOPIC },
      { round: 6, date: "11.1.(일)", time: "12:00~12:30", title: COOL_SCHOOL_TOPIC },
      { round: 7, date: "11.1.(일)", time: "14:30~15:00", title: COOL_SCHOOL_TOPIC },
    ],
  },
];
