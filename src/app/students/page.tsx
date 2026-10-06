import { pageMetadata } from "@/shared/config/site";
import StudentsPage from "@/views/students/ui/StudentsPage";

export const metadata = pageMetadata("학생마당 체험 부스 안내", "AI미래교육박람회 학생 대상 AI·SW 체험 부스 안내 - 직접 만들고 체험하는 미래교육 프로그램", "/students");

export default function Page() {
  return <StudentsPage />;
}
