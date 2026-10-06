import { pageMetadata } from "@/shared/config/site";
import { GuideOverviewPage } from "@/views/guide-overview";

export const metadata = pageMetadata("행사 개요", "2026 전남광주통합특별시교육청 AI미래교육박람회 행사 개요 - 일시(2026.10.31~11.1), 장소, 주최·주관, 프로그램 소개", "/guide");

export default function Page() {
  return <GuideOverviewPage />;
}
