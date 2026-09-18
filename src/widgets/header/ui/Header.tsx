import Image from "next/image";
import Link from "next/link";

import Icon from "@/shared/ui/Icon";
import { SITE } from "@/shared/config/site";
import { SITE_NAVIGATION } from "@/shared/config/navigation";

interface HeaderProps {
  /** 실시간 혼잡도 라벨. 추후 실시간 현황 API 연동 시 주입한다. */
  congestion?: string;
}

export default function Header({ congestion = "혼잡" }: HeaderProps) {
  return (
    <header className="w-full border-b border-border-default bg-bg-canvas">
      <div className="mx-auto grid h-14 w-full max-w-[1152px] grid-cols-[1fr_auto_1fr] items-center px-6">
        <Link href="/" className="justify-self-start" aria-label={SITE.name}>
          <Image src="/images/logo.png" alt={SITE.name} width={150} height={36} priority />
        </Link>

        <nav aria-label="주요 메뉴" className="justify-self-center">
          <ul className="flex items-center gap-6">
            {SITE_NAVIGATION.map((menu) => (
              <li key={menu.href}>
                <Link
                  href={menu.href}
                  className="flex h-14 items-center whitespace-nowrap text-body-m font-bold text-fg-2 transition-colors duration-150 ease-out hover:text-primary-60"
                >
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 justify-self-end">
          <div className="flex items-center gap-2">
            <p className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-pill bg-bg-subtle px-3 py-1 text-body-xs font-semibold text-fg-2">
              <span>실시간 현황</span>
              <span aria-hidden="true" className="size-2 rounded-pill bg-danger" />
              <span>{congestion}</span>
            </p>
            <Link
              href="/notice/parking"
              className="shrink-0 whitespace-nowrap rounded-pill bg-bg-subtle px-3 py-1 text-body-xs font-semibold text-fg-2 transition-colors duration-150 ease-out hover:bg-gray-20"
            >
              주차장 안내
            </Link>
          </div>

          <button type="button" aria-label="검색 열기" className="flex size-10 items-center justify-center text-fg-2">
            <Icon name="search" />
          </button>
          <button type="button" aria-label="메뉴 열기" className="flex size-10 items-center justify-center text-fg-2">
            <Icon name="menu" />
          </button>
        </div>
      </div>
    </header>
  );
}
