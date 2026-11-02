"use client";

import { useState } from "react";

import { guideNavItems } from "@/shared/config/guide-nav";
import { BoothMap } from "@/widgets/booth-board";
import { SectionPage } from "@/widgets/section-page";

const MAPS = [
  { key: "ai-sw", label: "AI·SW 체험한마당", map: { src: "/student-booth-map.png", alt: "AI·SW 체험한마당 부스 배치도", width: 5033, height: 3580 } },
  { key: "future-edu", label: "미래교육박람회", map: { src: "/corp-booth-map.png", alt: "미래교육박람회 기업 부스 배치도", width: 5033, height: 3580 } },
] as const;

export default function GuideMapPage() {
  const [mapKey, setMapKey] = useState<(typeof MAPS)[number]["key"]>(MAPS[0].key);

  return (
    <SectionPage navTitle="박람회 안내" navItems={guideNavItems} title="부스 배치도" desc="AI·SW 체험한마당과 미래교육박람회 부스 위치를 확인하세요.">
      <div className="flex flex-col gap-3">
        <h2 className="text-heading-s font-bold text-fg-1">부스 배치도</h2>
        <div className="flex gap-1 self-start rounded-medium bg-bg-subtle p-1 text-body-s">
          {MAPS.map((map) => (
            <button
              key={map.key}
              type="button"
              aria-pressed={mapKey === map.key}
              onClick={() => setMapKey(map.key)}
              className={`rounded-small px-3 py-1.5 font-medium transition-colors duration-150 ease-out ${
                mapKey === map.key ? "bg-bg-canvas text-primary-50 shadow-1" : "text-fg-3 hover:text-fg-1"
              }`}
            >
              {map.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <BoothMap key={mapKey} map={MAPS.find((m) => m.key === mapKey)!.map} />
      </div>
    </SectionPage>
  );
}
