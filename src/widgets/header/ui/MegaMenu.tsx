import Link from "next/link";

import { SITE_NAVIGATION } from "@/shared/config/navigation";

interface MegaMenuProps {
  isOpen: boolean;
  /** 열릴 때마다 증가. key로 써서 항목 등장 애니메이션을 다시 재생시킨다. */
  openSeq: number;
  onNavigate: () => void;
}

export default function MegaMenu({ isOpen, openSeq, onNavigate }: MegaMenuProps) {
  return (
    <div
      inert={!isOpen}
      className={`absolute inset-x-0 top-full overflow-hidden border-b border-border-default bg-bg-canvas shadow-2 transition-opacity ease-out motion-reduce:transition-none ${
        isOpen ? "pointer-events-auto opacity-100 duration-200" : "pointer-events-none opacity-0 duration-300"
      }`}
    >
      <div
        key={openSeq}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6 md:grid-cols-5 md:gap-8"
      >
        {SITE_NAVIGATION.map((menu) => (
          <div key={menu.href}>
            <p className="text-body-xs font-bold text-fg-3">{menu.label}</p>
            <ul className="mt-4 flex flex-col gap-1">
              {menu.children.map((item, index) => (
                <li
                  key={item.href}
                  className="animate-[nav-item-in_0.3s_ease-out_both] motion-reduce:animate-none"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className="block text-body-m font-semibold text-fg-1 transition-colors duration-150 ease-out hover:text-primary-60"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
