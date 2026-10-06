import { pageMetadata } from "@/shared/config/site";
import StudentsAiTourPage from "@/views/students-ai-tour/ui/StudentsAiTourPage";

export const metadata = pageMetadata("오디세이 투어 신청", "AI미래교육박람회 학생 AI 오디세이 투어 참가 신청 안내", "/apply/odyssey");

export default function Page() {
  return <StudentsAiTourPage />;
}
