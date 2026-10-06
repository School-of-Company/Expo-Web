import { pageMetadata } from "@/shared/config/site";
import NoticePage from "@/views/notice/ui/NoticePage";

export const metadata = pageMetadata("공지사항", "AI미래교육박람회 공지사항 - 사전신청, 일정 변경, 운영 관련 최신 안내", "/notice");

export default async function Page(props: PageProps<"/notice">) {
  const { page } = await props.searchParams;
  return <NoticePage page={typeof page === "string" ? Number(page) : 1} />;
}
