import Link from "next/link";
import PageHero from "@/shared/ui/PageHero";
import LocalNav from "@/widgets/local-nav/ui/LocalNav";
import Pagination from "@/shared/ui/Pagination";
import { noticeNavItems } from "@/shared/config/notice-nav";
import { notices } from "@/entities/notice/model/data";

const PAGE_SIZE = 10;

export default function NoticePage({ page }: { page: number }) {
  const totalPages = Math.max(1, Math.ceil(notices.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page || 1), totalPages);
  const pageItems = notices.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div>
      <PageHero title="공지사항" desc="공지사항, 자주 묻는 질문, 주차 안내를 확인하세요." />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:px-6">
        <LocalNav title="알림마당" items={noticeNavItems} />

        <div className="min-w-0 flex-1">
          <h2 className="text-heading-s font-bold text-fg-1">공지사항</h2>
          <div className="mt-4 flex flex-col divide-y divide-gray-20 border-t-2 border-fg-1">
            {pageItems.map((n) => (
              <Link
                key={n.id}
                href={`/notice/${n.id}`}
                className="flex gap-6 px-3 py-5 transition-colors duration-150 ease-out hover:bg-primary-10"
              >
                <span className="w-24 shrink-0 text-body-s font-medium tabular-nums text-fg-3">{n.date}</span>
                <div className="min-w-0">
                  <p className="font-bold text-fg-1">{n.title}</p>
                  <p className="mt-1 truncate text-body-s text-fg-3">{n.content.join(" ")}</p>
                </div>
              </Link>
            ))}
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            hrefFor={(p) => (p === 1 ? "/notice" : `/notice?page=${p}`)}
          />
        </div>
      </div>
    </div>
  );
}
