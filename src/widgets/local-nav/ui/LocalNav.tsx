"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavItem } from "@/shared/config/navigation";

interface LocalNavProps {
  /** 섹션 이름. 사이드 내비 상단 라벨 겸 aria-label. */
  title: string;
  items: NavItem[];
}

export default function LocalNav({ title, items }: LocalNavProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label={title}
      className="shrink-0 sm:sticky sm:top-[72px] sm:w-60 sm:self-start sm:border-r sm:border-border-default sm:pr-2"
    >
      <p className="px-3 text-body-xs font-bold uppercase tracking-wide text-fg-3">{title}</p>
      <ul className="mt-2 flex gap-1 overflow-x-auto px-1 pb-2 sm:mt-3 sm:flex-col sm:gap-0.5 sm:overflow-visible sm:px-0 sm:pb-0">
        {items.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`block w-40 shrink-0 whitespace-nowrap rounded-medium px-4 py-3 text-center text-body-s font-medium leading-snug transition-colors duration-150 ease-out sm:w-full sm:whitespace-normal sm:rounded-none sm:border-l-[3px] sm:px-4 sm:py-2.5 sm:text-left ${
                  isActive
                    ? "bg-primary-10 font-bold text-primary-60 sm:border-primary-50"
                    : "bg-bg-subtle text-fg-2 hover:bg-primary-10 hover:text-primary-60 sm:border-transparent sm:bg-transparent"
                }`}
              >
                {item.shortLabel ?? item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
