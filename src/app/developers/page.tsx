import { pageMetadata } from "@/shared/config/site";
import { DevelopersPage } from "@/views/developers";

export const metadata = { ...pageMetadata("개발자 후기", "AI미래교육박람회 홈페이지를 만든 개발자들의 참여 소감", "/developers"), robots: { index: false } };

export default function Page() {
  return <DevelopersPage />;
}
