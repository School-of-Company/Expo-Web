"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { NAV_SECTIONS } from "@/shared/config/site-nav";
import { overallCongestionLevel, CONGESTION_STYLE } from "@/entities/congestion/model/data";
import Icon from "@/shared/ui/Icon";
import HeaderSearch from "./HeaderSearch";

export default function Header() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [openDesktopKey, setOpenDesktopKey] = useState<string | null>(null);
  const [openSeq, setOpenSeq] = useState(0);
  const openSeqRef = useRef(0);

  const openDesktopMenu = (key: string) => {
    if (openDesktopKey === null) {
      openSeqRef.current += 1;
      setOpenSeq(openSeqRef.current);
    }
    setOpenDesktopKey(key);
  };

  const closeOnHoverOut = () => {
    if (openDesktopKey && openDesktopKey !== "menu") setOpenDesktopKey(null);
  };

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b border-border-default bg-bg-canvas"
        onMouseLeave={closeOnHoverOut}
        onClick={() => setOpenDesktopKey(null)}
      >
        <div className="relative mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => {
              setOpenDesktopKey(null);
              if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Image src="/logo.png" alt="2026 전남광주통합특별시교육청 AI미래교육박람회" width={1230} height={361} className="h-8 w-auto sm:h-9" priority />
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 md:flex">
              <span className="flex items-center gap-1.5 whitespace-nowrap rounded-pill bg-bg-subtle px-3 py-1 text-body-xs font-semibold text-fg-2">
                실시간 현황
                <span className={`h-2 w-2 shrink-0 rounded-full ${CONGESTION_STYLE[overallCongestionLevel].dot}`} />
                {overallCongestionLevel}
              </span>
              {/* TODO: 실제 주차장 안내 사이트 URL로 교체 (현재는 준비 중 404로 연결) */}
              <a
                href="/parking-guide"
                className="flex items-center whitespace-nowrap rounded-pill bg-bg-subtle px-3 py-1 text-body-xs font-semibold text-fg-2 transition-colors duration-150 ease-out hover:text-primary-60"
              >
                주차장 안내
              </a>
            </div>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center text-fg-2 transition-colors duration-150 ease-out hover:text-primary-60"
              onClick={(e) => {
                e.stopPropagation();
                setSearchOpen((v) => !v);
              }}
              aria-label={searchOpen ? "검색 닫기" : "검색 열기"}
            >
              <Icon name="search" className="h-5 w-5" />
            </button>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center text-fg-2 transition-colors duration-150 ease-out hover:text-primary-60"
              onClick={(e) => {
                e.stopPropagation();
                if (openDesktopKey) {
                  setOpenDesktopKey(null);
                } else {
                  openDesktopMenu("menu");
                }
              }}
              aria-label={openDesktopKey ? "메뉴 닫기" : "메뉴 열기"}
            >
              <Icon name={openDesktopKey ? "close" : "menu"} className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          className={`absolute inset-x-0 top-full overflow-hidden border-b border-border-default bg-bg-canvas shadow-2 transition-opacity ease-out ${
            openDesktopKey ? "pointer-events-auto opacity-100 duration-200" : "pointer-events-none opacity-0 duration-300"
          }`}
        >
          <div key={openSeq} className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6 md:grid-cols-5 md:gap-8">
            {NAV_SECTIONS.filter((section) => !section.external).map((section) => (
              <div key={section.key}>
                <p className="text-body-xs font-bold text-fg-3">{section.label}</p>
                <ul className="mt-4 flex flex-col gap-1">
                  {section.sub.map((s, i) => (
                    <li key={s.key} className="animate-[nav-item-in_0.3s_ease-out_both]" style={{ animationDelay: `${i * 30}ms` }}>
                      <Link
                        href={s.href}
                        onClick={() => setOpenDesktopKey(null)}
                        className="block text-body-m font-semibold text-fg-1 transition-colors duration-150 ease-out hover:text-primary-60"
                      >
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </header>

      <HeaderSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
