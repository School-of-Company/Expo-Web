"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { CONGESTION_STYLE, overallCongestionLevel, type CongestionLevel } from "@/entities/congestion/model/data";
import { SITE } from "@/shared/config/site";
import Icon from "@/shared/ui/Icon";

import HeaderNav from "./HeaderNav";
import MegaMenu from "./MegaMenu";

/** 햄버거로 연 메뉴는 포인터가 헤더를 벗어나도 닫히지 않도록 구분한다. */
const PINNED_KEY = "menu";

interface HeaderProps {
  /** 실시간 혼잡도. 기본값은 목데이터 기준 최악 구역 레벨이며, API 연동 시 주입한다. */
  congestion?: CongestionLevel;
}

export default function Header({ congestion = overallCongestionLevel }: HeaderProps) {
  const pathname = usePathname();
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [openSeq, setOpenSeq] = useState(0);
  const openSeqRef = useRef(0);

  const openMenu = (key: string) => {
    // 닫힌 상태에서 열 때만 seq를 올려, 메뉴 간 이동 시에는 등장 애니메이션을 반복하지 않는다.
    if (openKey === null) {
      openSeqRef.current += 1;
      setOpenSeq(openSeqRef.current);
    }
    setOpenKey(key);
  };

  const closeMenu = () => setOpenKey(null);

  const closeOnHoverOut = () => {
    if (openKey && openKey !== PINNED_KEY) closeMenu();
  };

  useEffect(() => {
    if (!openKey) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openKey]);

  return (
    <header
      className="sticky top-0 z-50 border-b border-border-default bg-bg-canvas"
      onMouseLeave={closeOnHoverOut}
      onClick={closeMenu}
    >
      <div className="relative mx-auto grid h-14 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center"
          aria-label={SITE.name}
          onClick={() => {
            if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Image src="/images/logo.png" alt={SITE.name} width={643} height={154} className="h-8 w-auto sm:h-9" priority />
        </Link>

        <HeaderNav onOpen={openMenu} />

        <div className="flex items-center gap-3 justify-self-end">
          <div className="hidden items-center gap-2 md:flex">
            <span className="flex items-center gap-1.5 whitespace-nowrap rounded-pill bg-bg-subtle px-3 py-1 text-body-xs font-semibold text-fg-2">
              실시간 현황
              <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${CONGESTION_STYLE[congestion].dot}`} />
              {congestion}
            </span>
            <Link
              href="/notice/parking"
              className="flex items-center whitespace-nowrap rounded-pill bg-bg-subtle px-3 py-1 text-body-xs font-semibold text-fg-2 transition-colors duration-150 ease-out hover:text-primary-60"
            >
              주차장 안내
            </Link>
          </div>

          <button
            type="button"
            aria-label="검색 열기"
            className="flex h-10 w-10 items-center justify-center text-fg-2 transition-colors duration-150 ease-out hover:text-primary-60"
          >
            <Icon name="search" className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label={openKey ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={openKey !== null}
            className="flex h-10 w-10 items-center justify-center text-fg-2 transition-colors duration-150 ease-out hover:text-primary-60"
            onClick={(event) => {
              event.stopPropagation();
              if (openKey) {
                closeMenu();
              } else {
                openMenu(PINNED_KEY);
              }
            }}
          >
            <Icon name={openKey ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </div>

      <MegaMenu isOpen={openKey !== null} openSeq={openSeq} onNavigate={closeMenu} />
    </header>
  );
}
