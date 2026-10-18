import { pageMetadata } from "@/shared/config/site";
import { GuideRobotDancePage } from "@/views/guide-robot-dance";

export const metadata = pageMetadata("로봇 댄스 공연", "AI미래교육박람회 로봇 댄스 공연 일정 - 로봇개(GO2) 공연, 알파미니·파이보 로봇 댄스 시간 안내", "/guide/robot-dance");

export default function Page() {
  return <GuideRobotDancePage />;
}
