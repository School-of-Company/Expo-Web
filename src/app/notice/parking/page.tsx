import { pageMetadata } from "@/shared/config/site";
import NoticeParkingPage from "@/views/notice-parking/ui/NoticeParkingPage";

export const metadata = pageMetadata("주차 안내", "AI미래교육박람회 행사장 주차 안내 - 주차 가능 장소와 이용 방법", "/notice/parking");

export default function Page() {
  return <NoticeParkingPage />;
}
