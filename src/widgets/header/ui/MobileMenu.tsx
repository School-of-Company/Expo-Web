"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_SECTIONS, type NavSection } from "@/shared/config/site-nav";
import Icon from "@/shared/ui/Icon";

const EASE_ENTER = "ease-[cubic-bezier(0.16,1,0.3,1)]";
const EASE_EXIT = "ease-[cubic-bezier(0.4,0,0.2,1)]";

const isSectionActive = (section: NavSection, pathname: string) => {
  const prefix = section.matchPrefix ?? section.href;
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
};

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const sections = NAV_SECTIONS.filter((section) => !section.external);
  const activeKey = sections.find((section) => isSectionActive(section, pathname))?.key ?? null;
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
                  <ul className="overflow-hidden" inert={!isOpen}>
                    {section.sub.map((item) => {
                      const isCurrent = pathname === item.href;
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
