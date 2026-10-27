"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Booth } from "@/entities/booth/model/data";
import Icon from "@/shared/ui/Icon";
import BoothTable from "./BoothTable";
import ZoomableImageModal, { type ZoomableImage } from "./ZoomableImageModal";

/** 배치도 아래에 차례로 보여줄 목록 하나. 목록이 여럿이면 각각 제목을 달아 구분한다. */
export interface BoothGroup {
  title?: string;
  /** 부스 이름 열의 제목. 학교·기업이 운영하는 부스는 "학교명"·"기업명"으로 바꿔 쓴다. */
  nameLabel?: string;
  booths: Booth[];
}

interface BoothBoardProps {
  groups: BoothGroup[];
  listLabel: string;
  mapLabel: string;
  /** 배치도 이미지. 에셋을 아직 받지 못했다면 생략하면 준비중 안내를 보여준다. */
  map?: ZoomableImage;
  /** true면 목록들을 차례로 늘어놓지 않고, 각 목록의 title을 탭으로 두어 고른 목록 하나만 보여준다. */
  tabbed?: boolean;
}

/**
 * 부스 배치도와 부스 목록을 한 화면에 이어 보여주는 공용 위젯. 학생마당·교사마당이 함께 쓴다.
 *
 * 배치도를 위에, 목록을 그 아래에 둔다. 모바일(md 미만)에서는 배치도를 헤더 바로 아래에
 * 고정해 두어 부스 목록을 스크롤하면서도 위치를 함께 볼 수 있고, 접기·펼치기 버튼으로
 * 배치도를 접어 목록이 보이는 자리를 넓힐 수 있다.
 */
export default function BoothBoard({ groups, listLabel, mapLabel, map, tabbed = false }: BoothBoardProps) {
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [isMapOpen, setIsMapOpen] = useState(true);

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const next = (activeTab + (e.key === "ArrowRight" ? 1 : -1) + groups.length) % groups.length;
    setActiveTab(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      <div className="relative mt-4 flex flex-col">
        {/* 탭이 있으면 배치도와 함께 붙여, 목록을 내리다가도 바로 다른 탭으로 옮겨 갈 수 있게 한다. */}
        <div
          className={`sticky top-[57px] z-10 -mx-4 bg-bg-canvas px-4 pt-2 sm:-mx-6 sm:px-6 md:static md:mx-0 md:p-0 ${
            tabbed ? "" : "border-b border-border-default pb-2 md:border-0"
          }`}
        >
          <section aria-label={mapLabel}>
            <button
              type="button"
              onClick={() => setIsMapOpen((open) => !open)}
              aria-expanded={isMapOpen}
              aria-controls="booth-map-panel"
              className={`group mb-2 flex w-full items-center gap-3 rounded-large border px-3 py-2.5 text-left shadow-1 transition-colors duration-150 ease-out md:hidden ${
                isMapOpen ? "border-primary-50 bg-primary-5" : "border-border-default bg-bg-canvas hover:border-primary-50"
              }`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-medium bg-primary-50 text-fg-on-primary">
                <Icon name="map-pin" className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-body-s font-bold text-fg-1">{mapLabel}</span>
                <span className="block text-body-xs text-fg-3">{isMapOpen ? "누르면 배치도가 접혀요" : "누르면 배치도가 펼쳐져요"}</span>
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-bg-subtle text-fg-2 transition-colors duration-150 group-hover:bg-primary-10">
                <Icon name="chevron-down" className={`h-4 w-4 transition-transform duration-300 ease-out ${isMapOpen ? "rotate-180" : ""}`} />
              </span>
            </button>
            <div
              id="booth-map-panel"
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out md:grid-rows-[1fr] md:opacity-100 ${
                isMapOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
            {map ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsZoomOpen(true)}
                  aria-label={`${map.alt} 확대해서 보기`}
                  className="block w-full overflow-hidden rounded-xlarge border border-border-default bg-bg-canvas transition-colors duration-150 ease-out hover:border-primary-50"
                >
                  <Image
                    src={map.src}
                    alt={map.alt}
                    width={map.width}
                    height={map.height}
                    preload
                    className="h-auto max-h-[60vh] w-full object-contain md:max-h-none"
                  />
                </button>
                <p className="mt-2 overflow-hidden text-center text-body-xs font-bold text-fg-2 md:mt-3 md:text-body-m">배치도를 클릭하면 확대해서 볼 수 있습니다.</p>
              </>
            ) : (
              // TODO: 배치도 이미지가 확정되면 map prop으로 넘겨 확대 모달까지 그대로 동작한다.
              <div
                className="flex h-32 w-full items-center justify-center rounded-xlarge border border-dashed border-border-default bg-bg-subtle px-4 text-center text-body-s text-fg-3 md:aspect-[4/3] md:h-auto"
              >
                부스 배치도 준비중
              </div>
            )}
              </div>
            </div>
          </section>

          {tabbed && (
            <div role="tablist" aria-label={listLabel} className="mt-2 flex gap-1 border-b border-border-default md:mt-10">
              {groups.map((g, i) => {
                const isActive = i === activeTab;
                return (
                  <button
                    key={g.title}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`booth-tab-${i}`}
                    aria-selected={isActive}
                    aria-controls={`booth-panel-${i}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveTab(i)}
                    onKeyDown={handleTabKeyDown}
                    className={`-mb-px min-w-0 flex-1 border-b-2 px-2 py-3 sm:flex-none sm:px-4 text-body-s font-bold transition-colors duration-150 ease-out ${
                      isActive ? "border-primary-50 text-primary-60" : "border-transparent text-fg-3 hover:text-primary-60"
                    }`}
                  >
                    {g.title}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {tabbed ? (
          <div>
            {groups.map((g, i) => (
              <div key={g.title} role="tabpanel" id={`booth-panel-${i}`} aria-labelledby={`booth-tab-${i}`} hidden={i !== activeTab} className="mt-4">
                <BoothTable booths={g.booths} caption={`${g.title} ${listLabel}`} nameLabel={g.nameLabel} />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-10 md:mt-10">
            {groups.map((g) => (
              <section key={g.title ?? listLabel} aria-label={g.title}>
                {g.title && <h3 className="mb-3 text-body-l font-bold text-fg-1">{g.title}</h3>}
                <BoothTable booths={g.booths} caption={g.title ?? listLabel} nameLabel={g.nameLabel} />
              </section>
            ))}
          </div>
        )}
      </div>

      {map && isZoomOpen && <ZoomableImageModal image={map} onClose={() => setIsZoomOpen(false)} />}
    </>
  );
}
