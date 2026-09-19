"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface LocalNavItem {
  key: string;
  label: string;
  shortLabel?: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

export default function LocalNav({ title, items }: { title: string; items: LocalNavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="shrink-0 sm:sticky sm:top-14 sm:w-60 sm:self-start sm:border-r sm:border-border-default sm:pr-2">
      <p className="px-3 text-body-xs font-bold uppercase tracking-wide text-fg-3">{title}</p>
      <ul className="mt-2 flex gap-1 overflow-x-auto px-1 pb-2 sm:mt-3 sm:flex-col sm:gap-0.5 sm:overflow-visible sm:px-0 sm:pb-0">
        {items.map((item) => {
          const isActive = item.onClick ? item.active : item.active ?? (item.href ? pathname === item.href : false);
          const className = `block w-40 shrink-0 whitespace-nowrap rounded-medium px-4 py-3 text-center text-body-s font-medium leading-snug transition-colors duration-150 ease-out sm:w-full sm:whitespace-normal sm:rounded-none sm:border-l-[3px] sm:px-4 sm:py-2.5 sm:text-left ${
            isActive
              ? "bg-primary-10 font-bold text-primary-60 sm:border-primary-50"
              : "bg-bg-subtle text-fg-2 hover:bg-primary-10 hover:text-primary-60 sm:border-transparent sm:bg-transparent"
          }`;
          const content = item.shortLabel ?? item.label;

          if (item.onClick) {
            return (
              <li key={item.key} className="shrink-0">
                <button type="button" onClick={item.onClick} className={className}>
                  {content}
                </button>
              </li>
            );
          }

          if (item.href?.startsWith("#")) {
            return (
              <li key={item.key} className="shrink-0">
                <a href={item.href} className={className}>
                  {content}
                </a>
              </li>
            );
          }

          return (
            <li key={item.key} className="shrink-0">
              <Link href={item.href ?? "#"} className={className}>
                {content}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
