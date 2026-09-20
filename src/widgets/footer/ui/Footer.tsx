import Link from "next/link";
import { NAV_SECTIONS } from "@/shared/config/site-nav";
import Organizer from "@/shared/ui/logos/Organizer";
import Host from "@/shared/ui/logos/Host";

const ORGANIZERS = [
  { role: "주최", Logo: Organizer },
  { role: "주관", Logo: Host },
];

export default function Footer() {
  return (
    <footer className="mt-16 bg-gray-100 text-fg-on-primary">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-6 border-b border-gray-95 pb-10">
          {ORGANIZERS.map(({ role, Logo }) => (
            <div key={role} className="flex items-center gap-2">
              <p className="text-body-xs font-semibold text-white/50">{role}</p>
              <Logo className="h-5 w-auto" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8 pt-10 sm:grid-cols-5">
          {NAV_SECTIONS.map((col) => (
            <div key={col.key}>
              <p className="text-body-s font-bold text-white">{col.label}</p>
              <ul className="mt-3 space-y-2">
                {col.sub.map((link) => (
                  <li key={link.key}>
                    <Link href={link.href} className="text-body-s text-white/60 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
                {col.key === "guide" && (
                  <li>
                    <Link href="/guide/status" className="text-body-s text-white/60 hover:text-white">
                      실시간 현황
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-gray-95 pt-8 text-center text-body-s text-white/60">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <p>주소: 전남광주통합특별시교육청AI교육원</p>
            <p>연락처: 02-0000-0000</p>
            <p>관람관련문의: 02-0000-0000</p>
          </div>
          <p className="mt-4 text-body-xs text-white/40">
            Copyright © 2026 전남광주통합특별시교육청 AI미래교육박람회. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
