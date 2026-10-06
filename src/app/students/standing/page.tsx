import { pageMetadata } from "@/shared/config/site";
import StudentsStandingPage from "@/views/students-standing/ui/StudentsStandingPage";

export const metadata = pageMetadata("학생마당 스탠딩 안내", "AI미래교육박람회 학생마당 스탠딩 프로그램 안내", "/students/standing");

export default function Page() {
  return <StudentsStandingPage />;
}
