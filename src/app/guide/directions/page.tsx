import { pageMetadata } from "@/shared/config/site";
import { GuideDirectionsPage } from "@/views/guide-directions";

export const metadata = pageMetadata("오시는 길", "전남광주통합특별시교육청AI교육원 오시는 길 - 광주 북구 능안로30번길 7, 대중교통·자가용 이용 안내", "/guide/directions");

export default function Page() {
  return <GuideDirectionsPage />;
}
