export interface TrainingProgram {
  id: string;
  title: string;
  desc: string;
  time: string;
}

export const trainingPrograms: TrainingProgram[] = [
  { id: "p1", title: "① 삼성 연수", desc: "세부 사항 추후 안내", time: "일정 추후 안내" },
  { id: "p2", title: "② 애플 연수", desc: "세부 사항 추후 안내", time: "일정 추후 안내" },
  { id: "p3", title: "③ 구글 연수", desc: "세부 사항 추후 안내", time: "일정 추후 안내" },
];
