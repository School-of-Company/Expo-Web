"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Booth } from "@/entities/booth/model/data";
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

/** 사이트 헤더 높이. 배치도는 이 아래에 붙는다. */
const HEADER_HEIGHT = 57;
/** 모바일에서 끝까지 줄었을 때 배치도 높이. 사진은 96px, 준비중 안내는 64px까지 줄인다. */
const MIN_MAP_HEIGHT = 96;
const MIN_PLACEHOLDER_HEIGHT = 64;
const MOBILE_QUERY = "(max-width: 767.98px)";

/**
 * 부스 배치도와 부스 목록을 한 화면에 이어 보여주는 공용 위젯. 학생마당·교사마당이 함께 쓴다.
 *
 * 배치도를 위에, 목록을 그 아래에 둔다. 모바일(md 미만)에서는 배치도를 헤더 바로 아래에
 * 고정해 두어 부스 목록을 스크롤하면서도 위치를 함께 볼 수 있다. 고정된 뒤에는 내린 만큼
 * 배치도가 줄어들어 목록이 보이는 자리를 넓히고, 다시 올리면 그만큼 커진다.
 */
export default function BoothBoard({ groups, listLabel, mapLabel, map, tabbed = false }: BoothBoardProps) {
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLImageElement & HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const minVisualHeight = map ? MIN_MAP_HEIGHT : MIN_PLACEHOLDER_HEIGHT;

  // 배치도가 헤더에 붙은 뒤 내린 거리만큼 배치도 높이를 깎는다. 깎인 만큼 아래 여백으로 채워
  // 문서 높이를 그대로 두므로, 목록은 평소처럼 스크롤되고 배치도만 스크롤에 맞춰 줄어든다.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    const section = stickyRef.current;
    const visual = visualRef.current;
    if (!sentinel || !section || !visual) return;
    const hint = hintRef.current;
    const mobile = window.matchMedia(MOBILE_QUERY);
    let full: { visual: number; hint: number; hintMargin: number } | null = null;
    let frame = 0;

    const reset = () => {
      visual.style.height = "";
      section.style.marginBottom = "";
      if (hint) {
        hint.style.height = "";
        hint.style.marginTop = "";
        hint.style.opacity = "";
      }
    };

    const update = () => {
      frame = 0;
      if (!mobile.matches) {
        reset();
        full = null;
        return;
      }
      if (!full) {
        reset();
        full = {
          visual: visual.offsetHeight,
          hint: hint?.offsetHeight ?? 0,
          hintMargin: hint ? parseFloat(getComputedStyle(hint).marginTop) : 0,
        };
      }
      const visualShrink = Math.max(full.visual - minVisualHeight, 0);
      const hintShrink = full.hint + full.hintMargin;
      const range = visualShrink + hintShrink;
      const scrolled = Math.min(Math.max(HEADER_HEIGHT - sentinel.getBoundingClientRect().top, 0), range);
      const progress = range ? scrolled / range : 0;

      visual.style.height = `${full.visual - visualShrink * progress}px`;
      if (hint) {
        hint.style.height = `${full.hint * (1 - progress)}px`;
        hint.style.marginTop = `${full.hintMargin * (1 - progress)}px`;
        hint.style.opacity = `${1 - progress}`;
      }
      section.style.marginBottom = `${scrolled}px`;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const remeasure = () => {
      full = null;
      schedule();
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);
    mobile.addEventListener("change", remeasure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
      mobile.removeEventListener("change", remeasure);
      reset();
    };
  }, [minVisualHeight]);

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
        <div ref={sentinelRef} aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px" />
        {/* 탭이 있으면 배치도와 함께 붙여, 목록을 내리다가도 바로 다른 탭으로 옮겨 갈 수 있게 한다. */}
        <div
          ref={stickyRef}
          className={`sticky top-[57px] z-10 -mx-4 bg-bg-canvas px-4 pt-2 sm:-mx-6 sm:px-6 md:static md:mx-0 md:p-0 ${
            tabbed ? "" : "border-b border-border-default pb-2 md:border-0"
          }`}
        >
          <section aria-label={mapLabel}>
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
                    preload
                    ref={visualRef}
                    className="h-auto max-h-[60vh] w-full object-contain md:max-h-none"
                  />
                </button>
                <p ref={hintRef} className="mt-2 overflow-hidden text-center text-body-xs font-bold text-fg-2 md:mt-3 md:text-body-m">배치도를 클릭하면 확대해서 볼 수 있습니다.</p>
              </>
            ) : (
              // TODO: 배치도 이미지가 확정되면 map prop으로 넘겨 확대 모달까지 그대로 동작한다.
              <div
                ref={visualRef}
                className="flex h-32 w-full items-center justify-center rounded-xlarge border border-dashed border-border-default bg-bg-subtle px-4 text-center text-body-s text-fg-3 md:aspect-[4/3] md:h-auto"
              >
                부스 배치도 준비중
              </div>
            )}
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
