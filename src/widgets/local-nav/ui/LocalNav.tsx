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
    <nav className="shrink-0 sm:sticky sm:top-[72px] sm:w-60 sm:self-start sm:border-r sm:border-border-default sm:pr-2">
      <p className="px-3 text-body-xs font-bold uppercase tracking-wide text-fg-3">{title}</p>
      <ul className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(8.5rem,1fr))] gap-1 px-1 sm:mt-3 sm:flex sm:flex-col sm:gap-0.5 sm:px-0">
        {items.map((item) => {
          const isActive = item.onClick ? item.active : item.active ?? (item.href ? pathname === item.href : false);
          const className = `block w-full rounded-medium px-4 py-3 text-center text-body-s font-medium leading-snug transition-colors duration-150 ease-out sm:rounded-none sm:border-l-[3px] sm:px-4 sm:py-2.5 sm:text-left ${
            isActive
              ? "bg-gray-20 font-bold text-primary-50 sm:border-primary-50 sm:bg-bg-subtle"
              : "bg-bg-subtle text-fg-2 hover:text-fg-1 sm:border-transparent sm:bg-transparent sm:hover:bg-bg-subtle"
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
