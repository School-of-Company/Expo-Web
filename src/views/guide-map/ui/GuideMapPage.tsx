"use client";

import { useState } from "react";

import { guideNavItems } from "@/shared/config/guide-nav";
import { SectionPage } from "@/widgets/section-page";

const MAPS = [
  { key: "ai-sw", label: "AI·SW 체험한마당" },
  { key: "future-edu", label: "미래교육박람회" },
] as const;

export default function GuideMapPage() {
  const [mapKey, setMapKey] = useState<(typeof MAPS)[number]["key"]>(MAPS[0].key);

  return (
    <SectionPage navTitle="박람회 안내"
      navItems={guideNavItems} title="부스 배치도" desc="전시장 층별 부스 위치와 체험존 배치를 확인하세요.">
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
                mapKey === map.key ? "bg-bg-canvas text-primary-60 shadow-1" : "text-fg-3 hover:text-fg-1"
              }`}
            >
              {map.label}
            </button>
          ))}
        </div>
      </div>

      {/* TODO: 배치도 이미지가 확정되면 플레이스홀더를 교체한다. */}
      <div className="mt-4 flex h-72 items-center justify-center rounded-xlarge border border-dashed border-border-default bg-bg-canvas px-4 text-center text-body-s text-fg-3 sm:h-96">
        {MAPS.find((map) => map.key === mapKey)?.label} 부스 배치도 이미지 영역 (추후 삽입 예정)
      </div>
    </SectionPage>
  );
}
