import { pageMetadata } from "@/shared/config/site";
import { GuideMapPage } from "@/views/guide-map";

export const metadata = pageMetadata("부스 배치도", "AI미래교육박람회 체험 부스 배치도 - 전시장 층별 부스 위치와 참가 기관 안내", "/guide/map");

export default function Page() {
  return <GuideMapPage />;
}
