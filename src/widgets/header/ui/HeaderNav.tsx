import Link from "next/link";
import { usePathname } from "next/navigation";

import { SITE_NAVIGATION } from "@/shared/config/navigation";

interface HeaderNavProps {
  /** 해당 메뉴에 포인터/포커스가 닿으면 메가메뉴를 연다. */
  onOpen: (key: string) => void;
}

export default function HeaderNav({ onOpen }: HeaderNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="주요 메뉴" className="hidden h-14 items-center gap-6 md:flex">
      {SITE_NAVIGATION.map((menu) => {
        const isActive = pathname === menu.href || pathname.startsWith(`${menu.href}/`);

        return (
          <Link
            key={menu.href}
            href={menu.href}
            aria-current={isActive ? "page" : undefined}
            onMouseEnter={() => onOpen(menu.href)}
            onFocus={() => onOpen(menu.href)}
            className={`relative flex h-full items-center whitespace-nowrap text-body-m font-bold transition-colors duration-150 ease-out ${
              isActive ? "text-primary-60" : "text-fg-2 hover:text-fg-1"
            }`}
          >
            {menu.label}
            {isActive && <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-primary-50" />}
          </Link>
        );
      })}
    </nav>
  );
}
