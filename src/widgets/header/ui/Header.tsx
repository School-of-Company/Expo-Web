"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_SECTIONS } from "@/shared/config/site-nav";
import Icon from "@/shared/ui/Icon";
import { getBackgroundImage } from "@/shared/lib/getBackgroundImage";
import HeaderSearch from "./HeaderSearch";
import MobileMenu from "./MobileMenu";
import type { SearchItem } from "../lib/search-index";
import logo from "../../../../public/logo.png";

export default function Header({ searchIndex }: { searchIndex: SearchItem[] }) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [openDesktopKey, setOpenDesktopKey] = useState<string | null>(null);
  const [openSeq, setOpenSeq] = useState(0);
  const openSeqRef = useRef(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobileMenu = useCallback(() => setMobileOpen(false), []);
  const isMenuOpen = openDesktopKey !== null || mobileOpen;

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
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center text-fg-2 transition-colors duration-150 ease-out hover:text-primary-50"
              onClick={() => {
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

      <MobileMenu open={mobileOpen} onClose={closeMobileMenu} />

      <HeaderSearch open={searchOpen} onClose={() => setSearchOpen(false)} searchIndex={searchIndex} />
    </>
  );
}
