import type { BrandKey } from "@/shared/ui/logos/BrandMark";

export interface TrainingProgram {
  id: string;
  brand: BrandKey;
  title: string;
  /** 연수 소개. 내용 확정 전까지 샘플 문구를 노출한다. */
  desc: string;
  time: string;
  place: string;
}

/** 삼성·구글·애플 3개 세션이 같은 시간대에 나란히 운영된다. */
const TRAINING_TIME = "2026. 10. 31. (토) 13:00~14:00";

export const trainingPrograms: TrainingProgram[] = [
  {
    id: "samsung",
    brand: "samsung",
    title: "삼성 연수",
    desc: "갤럭시 탭과 갤럭시 AI로 학생의 참여를 이끄는 2030 미래교실 구성하기",
    time: TRAINING_TIME,
    place: "AI교육원 210호",
  },
  {
    id: "google",
    brand: "google",
    title: "구글 연수",
    desc: "제미나이와 구글 클래스룸으로 맞춤형 배움과 협업이 살아 있는 2030 미래교실 열기",
    time: TRAINING_TIME,
    place: "AI교육원 212호",
  },
  {
    id: "apple",
    brand: "apple",
    title: "애플 연수",
    desc: "아이패드와 애플 펜슬로 학생의 상상력이 창작으로 이어지는 2030 미래교실 만들기",
    time: TRAINING_TIME,
    place: "AI교육원 202호",
  },
];
