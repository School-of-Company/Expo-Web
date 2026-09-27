import Organizer from "@/shared/ui/logos/Organizer";
import Host from "@/shared/ui/logos/Host";

const ORGANIZERS = [
  { role: "주최", Logo: Organizer },
  { role: "주관", Logo: Host },
];

const KAKAO_MAP_SEARCH = "https://map.kakao.com/link/search/전남광주통합특별시 북구 능안로 30번길 7";
const PRIVACY_POLICY_URL = "https://ai.jge.go.kr/infopolicy.php?id=100";

export default function Footer() {
  return (
    <footer className="mt-16 bg-gray-100 text-fg-on-primary">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-6 border-b border-gray-95 pb-10">
          {ORGANIZERS.map(({ role, Logo }) => (
            <div key={role} className="flex items-center gap-2">
              <p className="text-body-xs font-semibold text-white/50">{role}</p>
              <Logo className="h-5 w-auto" />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-body-s text-white/60">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <p>주소: 전남광주통합특별시 북구 능안로30번길 7 (오치동 5-25)</p>
            <p>연락처: 062-519-0400</p>
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href={KAKAO_MAP_SEARCH} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
              오시는 길
            </a>
            <a href={PRIVACY_POLICY_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
              개인정보처리방침
            </a>
          </div>
          <p className="mt-4 text-body-xs text-white/40">
            Copyright © 2026 전남광주통합특별시교육청 AI미래교육박람회. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
