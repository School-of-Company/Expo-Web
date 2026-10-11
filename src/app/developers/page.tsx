import { pageMetadata } from "@/shared/config/site";
import DevelopersPage from "@/views/developers/ui/DevelopersPage";

// 준비 중인 동안에는 검색 결과에 빈 페이지가 노출되지 않게 한다.
export const metadata = { ...pageMetadata("개발자 후기", "AI미래교육박람회 홈페이지를 만든 개발자들의 참여 소감", "/developers"), robots: { index: false } };

export default function Page() {
  return <DevelopersPage />;
}
