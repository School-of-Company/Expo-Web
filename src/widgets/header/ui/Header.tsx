"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_SECTIONS } from "@/shared/config/site-nav";
import { useLiveStatusItems } from "@/entities/area-status/model/useAreaStatuses";
import Icon from "@/shared/ui/Icon";
import { getBackgroundImage } from "@/shared/lib/getBackgroundImage";
import HeaderSearch from "./HeaderSearch";
import MobileMenu from "./MobileMenu";
import { LiveLevelText, LiveNowLabel, LiveStatusBarV6, shortLabel } from "./LiveStatusBar";
import type { SearchItem } from "@/shared/config/search-index";
import logo from "../../../../public/logo.png";

const PARKING_GUIDE_URL = process.env.NEXT_PUBLIC_PARKING_GUIDE_URL?.trim() ?? "";
/** 외부 현황 링크가 아직 설정되지 않았으면 안내 페이지로 보낸다. */
const STATUS_GUIDE_PATH = "/status";
const isParkingGuideExternal = PARKING_GUIDE_URL.length > 0 && PARKING_GUIDE_URL !== "#";
const parkingGuideHref = isParkingGuideExternal ? PARKING_GUIDE_URL : STATUS_GUIDE_PATH;

export default function Header({ searchIndex }: { searchIndex: SearchItem[] }) {
  const liveStatusItems = useLiveStatusItems();
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [openDesktopKey, setOpenDesktopKey] = useState<string | null>(null);
  const [openSeq, setOpenSeq] = useState(0);
  const openSeqRef = useRef(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobileMenu = useCallback(() => setMobileOpen(false), []);
  const isMenuOpen = openDesktopKey !== null || mobileOpen;

  // 뒤로 가기처럼 메뉴 링크를 거치지 않고 페이지가 바뀌어도 모바일 메뉴를 닫는다.
  const [menuPathname, setMenuPathname] = useState(pathname);
  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setMobileOpen(false);
  }

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

  // 데스크톱 메뉴는 헤더 바깥을 누를 때 닫는다. 헤더 안쪽을 눌러서는 닫히지 않는다.
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (openDesktopKey === null) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (headerRef.current?.contains(e.target as Node)) return;
      setOpenDesktopKey(null);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [openDesktopKey]);

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-50 border-b border-border-default bg-bg-canvas"
        onMouseLeave={closeOnHoverOut}
      >
        <div className="relative mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => {
              setOpenDesktopKey(null);
              setMobileOpen(false);
              if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span
              role="img"
              aria-label="2026 전남광주통합특별시교육청 AI미래교육박람회"
              className="block aspect-[2400/612] w-[150px] bg-contain bg-no-repeat sm:w-[180px]"
              style={{ backgroundImage: getBackgroundImage(logo, { shouldPreload: true, blur: false, width: 180 }) }}
            />
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 md:flex">
              {/* lg 이상은 세 항목을 한 줄에 모두 보여 준다. 폭이 모자란 md 구간은 같은 모양으로 항목만 한 줄씩 넘긴다. */}
              <div className="hidden lg:flex">
                <LiveStatusBarV6 href={parkingGuideHref} external={isParkingGuideExternal} />
              </div>
              <div className="flex items-center gap-2.5 text-body-xs font-semibold text-fg-2 lg:hidden">
                <LiveNowLabel />
                <div className="group h-8 overflow-hidden">
                  <ul className="animate-[status-ticker_9s_ease-in-out_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
                    {[...liveStatusItems, liveStatusItems[0]].map((item, i) => (
                      <li
                        key={i}
                        aria-hidden={i === liveStatusItems.length || undefined}
                        className="flex h-8 items-center whitespace-nowrap"
                      >
                        {shortLabel(item.label)}
                        <LiveLevelText level={item.level} text={item.text} />
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={parkingGuideHref}
                  target={isParkingGuideExternal ? "_blank" : undefined}
                  rel={isParkingGuideExternal ? "noopener noreferrer" : undefined}
                  className="flex items-center whitespace-nowrap text-fg-3 transition-colors duration-150 ease-out hover:text-primary-50"
                >
                  자세히 보기
                  <Icon name="chevron-right" className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center text-fg-2 transition-colors duration-150 ease-out hover:text-primary-50"
              onClick={(e) => {
                setOpenDesktopKey(null);
                setMobileOpen(false);
                setSearchOpen((v) => !v);
              }}
              aria-label={searchOpen ? "검색 닫기" : "검색 열기"}
            >
              <Icon name="search" className="h-5 w-5" />
            </button>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center text-fg-2 transition-colors duration-150 ease-out hover:text-primary-50"
              onClick={() => {
                if (isMenuOpen) {
                  setOpenDesktopKey(null);
                  setMobileOpen(false);
                } else if (window.matchMedia("(min-width: 768px)").matches) {
                  openDesktopMenu("menu");
                } else {
                  setMobileOpen(true);
                }
              }}
              aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={isMenuOpen}
            >
              <Icon name={isMenuOpen ? "close" : "menu"} className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* md 미만은 로고 옆에 자리가 없어 헤더 아래 줄에 항목만 왼쪽으로 흘려 보여 준다. 메뉴를 열지 않아도 바로 보인다. */}
        <div className="flex h-9 items-center gap-2.5 border-t border-border-default px-4 text-body-xs font-semibold text-fg-2 sm:px-6 md:hidden">
          <LiveNowLabel />
          {/* 양 끝을 투명하게 가려, 흘러 들어오고 나가는 항목이 칼같이 잘리지 않게 한다. */}
          <div className="h-8 min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-16px),transparent)]">
            <ul className="flex w-max animate-[status-marquee_14s_linear_infinite] motion-reduce:animate-none">
              {[...liveStatusItems, ...liveStatusItems].map((item, i) => (
                <li
                  key={i}
                  aria-hidden={i >= liveStatusItems.length || undefined}
                  // 끝 항목 뒤에도 구분점을 붙여야 복제본과 이어질 때 간격이 똑같이 유지된다.
                  className="flex h-8 items-center whitespace-nowrap after:mx-2 after:text-fg-4 after:content-['·']"
                >
                  {shortLabel(item.label)}
                  <LiveLevelText level={item.level} text={item.text} />
                </li>
              ))}
            </ul>
          </div>
          <a
            href={parkingGuideHref}
            target={isParkingGuideExternal ? "_blank" : undefined}
            rel={isParkingGuideExternal ? "noopener noreferrer" : undefined}
            onClick={() => setMobileOpen(false)}
            className="flex shrink-0 items-center whitespace-nowrap text-fg-3 transition-colors duration-150 ease-out active:text-primary-50"
          >
            자세히 보기
            <Icon name="chevron-right" className="h-3.5 w-3.5" />
          </a>
        </div>

        <div
          className={`absolute inset-x-0 top-full overflow-hidden max-md:hidden border-b border-border-default bg-bg-canvas shadow-2 transition-opacity ease-out ${
            openDesktopKey ? "pointer-events-auto opacity-100 duration-200" : "pointer-events-none opacity-0 duration-300"
          }`}
        >
          <div key={openSeq} className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6 md:grid-cols-5 md:gap-8 lg:grid-cols-[repeat(5,minmax(max-content,1fr))]">
            {NAV_SECTIONS.filter((section) => !section.external).map((section) => (
              <div key={section.key}>
                <p className="text-body-xs font-bold text-fg-3">{section.label}</p>
                <ul className="mt-4 flex flex-col gap-1">
                  {section.sub.map((s, i) => (
                    <li key={s.key} className="animate-[nav-item-in_0.3s_ease-out_both]" style={{ animationDelay: `${i * 30}ms` }}>
                      <Link
                        href={s.href}
                        onClick={() => setOpenDesktopKey(null)}
                        className="block text-body-m font-semibold text-fg-1 transition-colors duration-150 ease-out hover:text-primary-50 lg:whitespace-nowrap"
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

      <MobileMenu
        open={mobileOpen}
        onClose={closeMobileMenu}
        parkingHref={parkingGuideHref}
        parkingExternal={isParkingGuideExternal}
      />

      <HeaderSearch open={searchOpen} onClose={() => setSearchOpen(false)} searchIndex={searchIndex} />
    </>
  );
}
