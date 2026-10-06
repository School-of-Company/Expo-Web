import { pageMetadata } from "@/shared/config/site";
import { GuideSchedulePage } from "@/views/guide-schedule";

export const metadata = pageMetadata("전체 일정표", "AI미래교육박람회 이틀간 전체 프로그램 일정표 - 체험 부스, AI·SW 골든벨, 교사 연수, 미래교육 특강 시간 안내", "/guide/schedule");

export default function Page() {
  return <GuideSchedulePage />;
}
