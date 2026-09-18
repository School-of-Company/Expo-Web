import Image from "next/image";
import Link from "next/link";

import { SITE } from "@/shared/config/site";
import { SITE_NAVIGATION } from "@/shared/config/navigation";

export default function Footer() {
  return (
    <footer className="bg-bg-inverse">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-6 border-b border-gray-95 pb-10">
          {SITE.credits.map((credit) => (
            <div key={credit.label} className="flex items-center gap-2">
              <p className="text-body-xs font-semibold text-white/50">{credit.label}</p>
              <Image src={credit.logo} alt={credit.name} width={credit.width} height={credit.height} unoptimized />
            </div>
          ))}
        </div>

        <nav aria-label="사이트맵" className="grid grid-cols-2 gap-8 pt-10 sm:grid-cols-3 md:grid-cols-5">
          {SITE_NAVIGATION.map((menu) => (
            <div key={menu.href}>
              <p className="text-body-s font-bold text-white">{menu.label}</p>
              <ul className="mt-3 space-y-2">
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

        <div className="mt-10 border-t border-gray-95 pt-8 text-center text-body-s text-white/60">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {SITE.contacts.map((contact) => (
              <p key={contact.label}>
                {contact.label}: {contact.value}
              </p>
            ))}
          </div>
          <p className="mt-4 text-body-xs text-white/40">{SITE.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
