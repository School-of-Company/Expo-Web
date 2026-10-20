import { pageMetadata } from "@/shared/config/site";
import { ApplyRegisterPage } from "@/views/apply-register";

export const metadata = pageMetadata("사전등록", "AI미래교육박람회 사전등록 안내 - 학생·학부모·교원·일반 참가자 사전신청 방법", "/apply/register");

export default function Page() {
  return <ApplyRegisterPage />;
}
