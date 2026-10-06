import { getBackgroundImage } from "@/shared/lib/getBackgroundImage";
import organizerLogo from "../../../../public/logos/organizer.svg";
import hostLogo from "../../../../public/logos/host.svg";

/**
 * 주최·주관 로고. SVG를 인라인으로 두면 모든 페이지 HTML과 RSC 페이로드에 100KB씩 실려서,
 * 정적 파일로 분리해 한 번 받은 뒤 캐시되게 한다. aspect는 각 SVG의 viewBox 비율이다.
 */
const ORGANIZERS = [
  { role: "주최", label: "전남광주통합특별시교육청", logo: organizerLogo, aspect: "aspect-[1923/180]" },
  { role: "주관", label: "전남광주통합특별시교육청AI교육원", logo: hostLogo, aspect: "aspect-[2200/180]" },
];

const KAKAO_MAP_SEARCH = "https://map.kakao.com/link/search/전남광주통합특별시 북구 능안로 30번길 7";
const PRIVACY_POLICY_URL = "https://ai.jge.go.kr/infopolicy.php?id=100";

export default function Footer() {
  return (
    <footer className="mt-16 bg-gray-100 text-fg-on-primary">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-6 border-b border-gray-95 pb-10">
          {ORGANIZERS.map(({ role, label, logo, aspect }) => (
            <div key={role} className="flex items-center gap-2">
              <p className="text-body-xs font-semibold text-white/50">{role}</p>
              <span
                role="img"
                aria-label={`${role} ${label} 로고`}
                className={`block h-5 ${aspect} bg-contain bg-no-repeat`}
                style={{ backgroundImage: getBackgroundImage(logo, { unoptimized: true }) }}
              />
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
