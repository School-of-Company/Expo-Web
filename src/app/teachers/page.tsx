import { pageMetadata } from "@/shared/config/site";
import TeachersPage from "@/views/teachers/ui/TeachersPage";

export const metadata = pageMetadata("교사마당 부스 안내", "AI미래교육박람회 교원 대상 AI 활용 수업 부스·교육 프로그램 안내", "/teachers");

export default function Page() {
  return <TeachersPage />;
}
