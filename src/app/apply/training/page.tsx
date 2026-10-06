import { pageMetadata } from "@/shared/config/site";
import TeachersTrainingPage from "@/views/teachers-training/ui/TeachersTrainingPage";

export const metadata = pageMetadata("교사 연수 신청", "AI미래교육박람회 교원 대상 AI 교육 연수 프로그램 신청 안내", "/apply/training");

export default function Page() {
  return <TeachersTrainingPage />;
}
