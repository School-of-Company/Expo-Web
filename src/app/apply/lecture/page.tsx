import { pageMetadata } from "@/shared/config/site";
import TeachersLecturePage from "@/views/teachers-lecture/ui/TeachersLecturePage";

export const metadata = pageMetadata("미래교육 특강 신청", "AI미래교육박람회 미래교육 특강 신청 안내", "/apply/lecture");

export default function Page() {
  return <TeachersLecturePage />;
}
