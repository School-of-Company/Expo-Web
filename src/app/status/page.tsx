import { pageMetadata } from "@/shared/config/site";
import StatusPage from "@/views/status/ui/StatusPage";

export const metadata = pageMetadata("실시간 현황", "행사장, 도로, 주차 현황 안내", "/status");

export default function Page() {
  return <StatusPage />;
}
