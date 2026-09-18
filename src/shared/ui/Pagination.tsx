import Link from "next/link";

export default function Pagination({
  totalPages,
  currentPage,
  hrefFor,
}: {
  totalPages: number;
  currentPage: number;
  hrefFor: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="페이지" className="mt-6 flex items-center justify-center gap-1">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
        const active = p === currentPage;
        return (
          <Link
            key={p}
            href={hrefFor(p)}
            aria-current={active ? "page" : undefined}
            className={`flex h-10 w-10 items-center justify-center rounded-small text-body-s font-medium transition-colors duration-150 ease-out ${
              active ? "bg-primary-50 font-bold text-fg-on-primary" : "text-fg-2 hover:bg-bg-subtle"
            }`}
          >
            {p}
          </Link>
        );
      })}
    </nav>
  );
}
