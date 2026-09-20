"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { searchIndex } from "@/shared/config/search-index";
import Icon from "@/shared/ui/Icon";
import Badge from "@/shared/ui/Badge";

export default function HeaderSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchIndex.filter((item) => `${item.title} ${item.desc} ${item.group}`.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-gray-100/50 px-4 pt-24 sm:pt-32"
      onClick={handleClose}
    >
      <div className="w-full max-w-xl rounded-xlarge bg-bg-canvas p-2 shadow-4" onClick={(e) => e.stopPropagation()}>
        <form
          className="flex items-center gap-3 rounded-large border border-border-default px-4 py-3.5 focus-within:border-primary-50"
          onSubmit={(e) => {
            e.preventDefault();
            if (results[0]) {
              router.push(results[0].href);
              handleClose();
            }
          }}
        >
          <Icon name="search" className="h-5 w-5 shrink-0 text-fg-3" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="검색어를 입력하세요"
            className="w-full bg-transparent text-body-m text-fg-1 outline-none placeholder:text-fg-3"
          />
          <button
            type="button"
            onClick={handleClose}
            className="shrink-0 rounded-xsmall bg-bg-subtle px-2.5 py-1 text-body-xs font-semibold text-fg-3 hover:text-fg-1"
          >
            ESC
          </button>
        </form>

        {query.trim() && (
          <div className="mt-2 max-h-80 overflow-y-auto">
            {results.length === 0 ? (
              <p className="px-4 py-6 text-center text-body-s text-fg-3">&ldquo;{query}&rdquo;에 대한 검색 결과가 없습니다.</p>
            ) : (
              <ul className="flex flex-col gap-1 p-1">
                {results.map((r) => (
                  <li key={`${r.group}-${r.href}-${r.title}`}>
                    <Link
                      href={r.href}
                      onClick={handleClose}
                      className="flex items-start gap-3 rounded-medium px-3 py-2.5 transition-colors duration-150 ease-out hover:bg-primary-10"
                    >
                      <Badge variant="solid-pastel" className="mt-0.5">
                        {r.group}
                      </Badge>
                      <span className="min-w-0">
                        <span className="block truncate text-body-s font-semibold text-fg-1">{r.title}</span>
                        <span className="block truncate text-body-xs text-fg-3">{r.desc}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
