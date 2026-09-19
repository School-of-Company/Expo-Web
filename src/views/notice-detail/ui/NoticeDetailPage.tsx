import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/shared/ui/PageHero";
import { LocalNav } from "@/widgets/local-nav";
import Icon from "@/shared/ui/Icon";
import { noticeNavItems } from "@/shared/config/notice-nav";
import { notices } from "@/entities/notice/model/data";

export default function NoticeDetailPage({ id }: { id: string }) {
  const notice = notices.find((n) => n.id === id);

  if (!notice) {
    notFound();
  }

  const navItems = noticeNavItems.map((item) => (item.key === "notices" ? { ...item, active: true } : item));

  return (
    <div>
      <PageHero title="공지사항" desc="공지사항, 자주 묻는 질문, 주차 안내를 확인하세요." />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:px-6">
        <LocalNav title="알림마당" items={navItems} />

        <div className="min-w-0 flex-1">
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

          {notice.attachments && notice.attachments.length > 0 && (
            <div className="mt-8 border-t border-border-default pt-6">
              <p className="text-body-s font-semibold text-fg-1">첨부파일</p>
              <ul className="mt-3 space-y-2">
                {notice.attachments.map((file) => (
                  <li key={file.name}>
                    <a
                      href="#"
                      className="flex items-center gap-3 rounded-medium border border-border-default bg-bg-canvas px-4 py-3 transition-colors duration-150 ease-out hover:border-primary-50 hover:bg-primary-10"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center text-primary-60">
                        <Icon name="clipboard" className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 truncate text-body-s font-medium text-fg-1">{file.name}</span>
                      <span className="shrink-0 text-body-xs text-fg-3">{file.size}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
