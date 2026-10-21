"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_SECTIONS, type NavSection } from "@/shared/config/site-nav";
import { liveStatusItems } from "@/entities/congestion/model/data";
import Icon from "@/shared/ui/Icon";
import { LiveLevelText, LiveNowLabel, shortLabel } from "./LiveStatusBar";

/**
 * 토스처럼 빠르게 출발해 길게 감속하는 곡선(ease-out-expo 계열). 열 때는 이 곡선으로 느긋하게,
 * 닫을 때는 짧은 표준 곡선으로 패널 전체를 한 덩어리로 걷어낸다.
 */
const EASE_ENTER = "ease-[cubic-bezier(0.16,1,0.3,1)]";
const EASE_EXIT = "ease-[cubic-bezier(0.4,0,0.2,1)]";

const isSectionActive = (section: NavSection, pathname: string) => {
  const prefix = section.matchPrefix ?? section.href;
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
};

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  parkingHref: string;
  parkingExternal: boolean;
}

/**
 * md 미만에서 햄버거 버튼으로 여는 드롭다운 메뉴.
 *
 * - 헤더 뒤에서 아래로 펼쳐지고, 메뉴 아래로는 어둡게 깐 현재 페이지가 비친다. 그 부분을 누르면 닫힌다.
 * - 메뉴가 화면보다 길어지면 메뉴 안에서만 스크롤되고, 열려 있는 동안 뒤쪽 페이지 스크롤은 잠근다.
 * - 섹션은 한 번에 하나만 펼치는 아코디언이며, 지금 보고 있는 페이지의 섹션을 처음부터 펼쳐 둔다.
 * - 데스크톱 헤더에만 있는 실시간 현황 티커와 자세히 보기 버튼을 메뉴 맨 위로 옮겨 온다.
 * - Esc, 링크 이동, md 이상으로 화면이 넓어지는 경우에 닫힌다.
 */
export default function MobileMenu({ open, onClose, parkingHref, parkingExternal }: MobileMenuProps) {
  const pathname = usePathname();
  const sections = NAV_SECTIONS.filter((section) => !section.external);
  const activeKey = sections.find((section) => isSectionActive(section, pathname))?.key ?? null;
  // 사용자가 펼친 섹션(null이면 모두 접음). 아직 손대지 않았다면(undefined) 현재 섹션을 펼친다.
  const [openKey, setOpenKey] = useState<string | null | undefined>(undefined);
  // 다른 페이지로 옮기면 직접 펼쳤던 섹션을 잊고 새 현재 섹션을 펼친다. 컴포넌트를 다시 마운트하면
  // 닫히는 애니메이션이 사라지므로 key 대신 렌더 중에 상태를 맞춘다.
  const [openKeyPathname, setOpenKeyPathname] = useState(pathname);
  if (openKeyPathname !== pathname) {
    setOpenKeyPathname(pathname);
    setOpenKey(undefined);
  }
  const expandedKey = openKey === undefined ? activeKey : openKey;

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const handleResize = () => {
      if (desktop.matches) onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", handleResize);
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      aria-hidden={!open}
      inert={!open}
      className={`fixed inset-x-0 bottom-0 top-[57px] z-40 overflow-hidden md:hidden ${open ? "" : "pointer-events-none"}`}
    >
      {/* 열 때는 어두운 배경이 먼저 깔린 뒤 메뉴가 내려오고, 닫을 때는 메뉴가 먼저 올라간 뒤 배경이 걷힌다. */}
      <button
        type="button"
        tabIndex={-1}
        aria-label="메뉴 닫기"
        onClick={onClose}
        className={`absolute inset-0 bg-gray-100/40 transition-opacity motion-reduce:transition-none ${
          open ? "opacity-100 duration-[120ms] ease-out" : `opacity-0 delay-100 duration-[220ms] ${EASE_EXIT}`
        }`}
      />

      <nav
        aria-label="전체 메뉴"
        className={`relative max-h-full overflow-y-auto overscroll-contain rounded-b-xlarge bg-bg-canvas shadow-2 transition-[translate] motion-reduce:transition-none ${
          open ? `translate-y-0 delay-[100ms] duration-[450ms] ${EASE_ENTER}` : `-translate-y-full duration-[280ms] ${EASE_EXIT}`
        }`}
      >
        {/* 데스크톱 헤더와 같은 "● 지금 행사장 없음 · 도로 없음 · …" 모양을 쓰되, 폭이 좁아 항목만 왼쪽으로 흘린다. */}
        <div className="flex items-center gap-2.5 border-b border-border-default px-4 py-4 text-body-xs font-semibold text-fg-2">
          <LiveNowLabel />
          {/* 양 끝을 투명하게 가려, 흘러 들어오고 나가는 항목이 칼같이 잘리지 않고 서서히 나타나고 사라지게 한다. */}
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
                  <LiveLevelText level={item.level} />
                </li>
              ))}
            </ul>
          </div>
          <a
            href={parkingHref}
            target={parkingExternal ? "_blank" : undefined}
            rel={parkingExternal ? "noopener noreferrer" : undefined}
            onClick={onClose}
            className="flex shrink-0 items-center whitespace-nowrap text-fg-3 transition-colors duration-150 ease-out active:text-primary-50"
          >
            자세히 보기
            <Icon name="chevron-right" className="h-3.5 w-3.5" />
          </a>
        </div>

        <ul>
          {sections.map((section) => {
            const isOpen = section.key === expandedKey;
            const isActive = section.key === activeKey;
            const panelId = `mobile-menu-${section.key}`;
            return (
              <li key={section.key} className="border-b border-border-default last:border-b-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenKey(isOpen ? null : section.key)}
                  className={`flex min-h-14 w-full items-center justify-between px-4 text-left text-body-m font-bold ${
                    isActive ? "text-primary-50" : "text-fg-1"
                  }`}
                >
                  {section.label}
                  <Icon
                    name="chevron-down"
                    className={`h-5 w-5 text-fg-3 transition-transform duration-300 ${EASE_ENTER} ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  id={panelId}
                  className={`grid bg-bg-subtle transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${EASE_ENTER} ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  {/* 펼치는 도중에는 이 목록이 바깥 칸보다 늦게 커지므로, 회색 배경은 바깥 칸에 칠해 흰 틈이 보이지 않게 한다. */}
                  <ul className="overflow-hidden" inert={!isOpen}>
                    {section.sub.map((item) => {
                      const isCurrent = pathname === item.href;
                      // 회색 배경은 펼치는 즉시 보이고, 항목 글자만 뒤따라 서서히 나타난다.
                      return (
                        <li
                          key={item.key}
                          className={`transition-opacity duration-300 motion-reduce:transition-none ${EASE_ENTER} ${
                            isOpen ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <Link
                            href={item.href}
                            onClick={onClose}
                            aria-current={isCurrent ? "page" : undefined}
                            className={`flex min-h-12 items-center justify-between gap-3 py-3 pl-7 pr-4 text-body-s transition-colors duration-150 ease-out active:bg-gray-20 ${
                              isCurrent ? "font-bold text-primary-50" : "font-medium text-fg-2"
                            }`}
                          >
                            {item.label}
                            <Icon name="chevron-right" className="h-4 w-4 shrink-0 text-fg-3" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
