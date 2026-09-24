"use client";

import Image from "next/image";
import { useState } from "react";
import type { Booth } from "@/entities/booth/model/data";
import BoothTable from "./BoothTable";
import ZoomableImageModal, { type ZoomableImage } from "./ZoomableImageModal";

type TabKey = "list" | "map";

interface BoothBoardProps {
  booths: Booth[];
  listLabel: string;
  mapLabel: string;
  /** 배치도 이미지. 에셋을 아직 받지 못했다면 생략하면 준비중 안내를 보여준다. */
  map?: ZoomableImage;
}

/**
 * 부스 안내 · 부스 배치도를 탭으로 묶은 공용 위젯. 학생마당·교사마당이 함께 쓴다.
 *
 * 두 패널을 처음부터 모두 렌더해 두고 보이지 않는 쪽만 감춘다. 그래서 탭을 눌러도
 * 페이지 이동이나 추가 로딩 없이 화면만 바뀐다.
 */
export default function BoothBoard({ booths, listLabel, mapLabel, map }: BoothBoardProps) {
  const [tab, setTab] = useState<TabKey>("list");
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const tabs: { key: TabKey; label: string }[] = [
    { key: "list", label: listLabel },
    { key: "map", label: mapLabel },
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    setTab((prev) => (prev === "list" ? "map" : "list"));
  };

  return (
    <>
      <div role="tablist" aria-label="부스 정보" className="mt-4 flex gap-1 border-b border-border-default">
        {tabs.map((t) => {
          const isActive = tab === t.key;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              id={`booth-tab-${t.key}`}
              aria-selected={isActive}
              aria-controls={`booth-panel-${t.key}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setTab(t.key)}
              onKeyDown={handleKeyDown}
              className={`-mb-px border-b-2 px-4 py-3 text-body-s font-bold transition-colors duration-150 ease-out ${
                isActive
                  ? "border-primary-50 text-primary-60"
                  : "border-transparent text-fg-3 hover:text-primary-60"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="booth-panel-list"
        aria-labelledby="booth-tab-list"
        hidden={tab !== "list"}
        className="mt-4"
      >
        <BoothTable booths={booths} caption={listLabel} />
      </div>

      <div
        role="tabpanel"
        id="booth-panel-map"
        aria-labelledby="booth-tab-map"
        hidden={tab !== "map"}
        className="mt-4"
      >
        {map ? (
          <>
            <button
              type="button"
              onClick={() => setIsZoomOpen(true)}
              aria-label={`${map.alt} 확대해서 보기`}
              className="block w-full overflow-hidden rounded-xlarge border border-border-default bg-bg-canvas p-2 transition-colors duration-150 ease-out hover:border-primary-50"
            >
              <Image
                src={map.src}
                alt={map.alt}
                width={map.width}
                height={map.height}
                priority
                className="h-auto w-full object-contain"
              />
            </button>
            <p className="mt-2 text-center text-body-xs text-fg-3">배치도를 클릭하면 확대해서 볼 수 있습니다.</p>
          </>
        ) : (
          // TODO: 배치도 이미지가 확정되면 map prop으로 넘겨 확대 모달까지 그대로 동작한다.
          <div className="flex aspect-[4/3] w-full items-center justify-center rounded-xlarge border border-dashed border-border-default bg-bg-subtle px-4 text-center text-body-s text-fg-3">
            부스 배치도 준비중
          </div>
        )}
      </div>

      {map && isZoomOpen && <ZoomableImageModal image={map} onClose={() => setIsZoomOpen(false)} />}
    </>
  );
}
