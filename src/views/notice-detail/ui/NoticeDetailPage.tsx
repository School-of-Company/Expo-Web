import { notFound } from "next/navigation";
import Link from "next/link";
import SectionPage from "@/widgets/section-page/ui/SectionPage";
import Icon from "@/shared/ui/Icon";
import { noticeNavItems } from "@/shared/config/notice-nav";
import { getNotice } from "@/entities/notice/api/notices";

export default async function NoticeDetailPage({ id }: { id: string }) {
  const notice = await getNotice(id);

  if (!notice) {
    notFound();
  }

  const navItems = noticeNavItems.map((item) => (item.key === "notices" ? { ...item, active: true } : item));

  return (
    <SectionPage
      title="공지사항"
      desc="공지사항, 자주 묻는 질문, 주차 안내를 확인하세요."
      navTitle="알림마당"
      navItems={navItems}
    >
      <Link href="/notice" className="flex items-center gap-1 text-body-s font-medium text-fg-3 hover:text-fg-1">
        <Icon name="chevron-right" className="h-4 w-4 rotate-180" />
        목록으로
      </Link>

      <h2 className="mt-4 text-heading-s font-bold text-fg-1">{notice.title}</h2>
      <p className="mt-1 text-body-xs tabular-nums text-fg-3">{notice.date}</p>
      <div className="mt-6 space-y-3 border-t border-border-default pt-6 text-body-s leading-relaxed text-fg-2">
        {notice.content.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

    </SectionPage>
  );
}
