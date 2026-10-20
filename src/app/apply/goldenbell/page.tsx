import { pageMetadata } from "@/shared/config/site";
import StudentsGoldenBellPage from "@/views/students-golden-bell/ui/StudentsGoldenBellPage";

export const metadata = pageMetadata("AI·SW 골든벨 신청", "AI미래교육박람회 학생 AI·SW 골든벨 참가 신청 안내", "/apply/goldenbell");

export default function Page() {
  return <StudentsGoldenBellPage />;
}
