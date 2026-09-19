import Link from "next/link";
import { notices } from "@/entities/notice/model/data";

export default function RecentNotices() {
  const recent = notices.slice(0, 3);

  return (
    <div className="divide-y divide-border-default rounded-xlarge border border-border-default bg-bg-canvas">
      {recent.map((n) => (
        <Link
          key={n.id}
          href={`/notice/${n.id}`}
          className="flex items-center gap-4 px-5 py-4 transition-colors duration-150 ease-out hover:bg-primary-10 sm:gap-6 sm:px-6"
        >
          <span className="w-20 shrink-0 text-body-xs font-medium tabular-nums text-fg-3 sm:w-24 sm:text-body-s">{n.date}</span>
          <p className="min-w-0 flex-1 truncate text-body-s font-bold text-fg-1 sm:text-body-m">{n.title}</p>
        </Link>
      ))}
    </div>
  );
}
