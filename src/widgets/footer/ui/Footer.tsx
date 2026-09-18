import Image from "next/image";
import Link from "next/link";

import { SITE } from "@/shared/config/site";
import { SITE_NAVIGATION } from "@/shared/config/navigation";

export default function Footer() {
  return (
    <footer className="w-full bg-bg-inverse">
      <div className="mx-auto flex w-full max-w-[1152px] flex-col px-6 py-12">
        <div className="flex flex-wrap items-center justify-center gap-6 border-b border-gray-95 pb-10">
          {SITE.credits.map((credit) => (
            <div key={credit.label} className="flex items-center gap-2">
              <p className="text-body-xs font-semibold text-white/50">{credit.label}</p>
              <Image src={credit.logo} alt={credit.name} width={credit.width} height={credit.height} unoptimized />
            </div>
          ))}
        </div>

        <nav aria-label="사이트맵" className="grid grid-cols-2 gap-8 pt-10 sm:grid-cols-3 lg:grid-cols-5">
          {SITE_NAVIGATION.map((menu) => (
            <div key={menu.href}>
              <p className="text-body-s font-bold text-white">{menu.label}</p>
              <ul className="flex flex-col gap-2 pt-3">
                {menu.children.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-body-s text-white/60 transition-colors duration-150 ease-out hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-10 border-t border-gray-95 pt-8">
          <div className="flex flex-wrap items-start justify-center gap-6">
            {SITE.contacts.map((contact) => (
              <p key={contact.label} className="text-center text-body-s text-white/60">
                {contact.label}: {contact.value}
              </p>
            ))}
          </div>
          <p className="pt-4 text-center text-body-xs text-white/40">{SITE.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
