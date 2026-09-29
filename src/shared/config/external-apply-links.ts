// 실제 외부 신청 시스템 URL이 정해지면 아래 값을 교체하세요.
export const EXTERNAL_APPLY_LINKS = {
  register: process.env.NEXT_PUBLIC_APPLY_REGISTER_URL ?? "",
  goldenBell: process.env.NEXT_PUBLIC_APPLY_GOLDENBELL_URL ?? "",
  aiTour: process.env.NEXT_PUBLIC_APPLY_AITOUR_URL ?? "",
  teacherTraining: process.env.NEXT_PUBLIC_APPLY_TRAINING_URL ?? "",
  teacherLecture: process.env.NEXT_PUBLIC_APPLY_LECTURE_URL ?? "",
};
