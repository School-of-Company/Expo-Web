"use client";

import Image from "next/image";
import { useState } from "react";
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
}

/**
 * 부스 배치도와 부스 목록을 한 화면에 이어 보여주는 공용 위젯. 학생마당·교사마당이 함께 쓴다.
 *
 * 배치도를 위에, 목록을 그 아래에 둔다. 모바일(md 미만)에서는 배치도를 헤더 바로 아래에
 * 고정해 두어 부스 목록을 스크롤하면서도 위치를 함께 볼 수 있다.
 */
export default function BoothBoard({ groups, listLabel, mapLabel, map }: BoothBoardProps) {
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  return (
    <>
      <div className="mt-4 flex flex-col gap-4 md:gap-10">
        <section
          aria-label={mapLabel}
          className="sticky top-[57px] z-10 -mx-4 border-b border-border-default bg-bg-canvas px-4 py-2 sm:-mx-6 sm:px-6 md:static md:mx-0 md:border-0 md:p-0"
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
                  preload
                  className="h-auto w-full object-contain"
                />
              </button>
              <p className="mt-2 text-center text-body-xs font-bold text-fg-2 md:mt-3 md:text-body-m">배치도를 클릭하면 확대해서 볼 수 있습니다.</p>
            </>
          ) : (
            // TODO: 배치도 이미지가 확정되면 map prop으로 넘겨 확대 모달까지 그대로 동작한다.
            <div className="flex h-32 w-full md:aspect-[4/3] md:h-auto items-center justify-center rounded-xlarge border border-dashed border-border-default bg-bg-subtle px-4 text-center text-body-s text-fg-3">
              부스 배치도 준비중
            </div>
          )}
        </section>

        <div className="flex flex-col gap-10">
          {groups.map((g) => (
            <section key={g.title ?? listLabel} aria-label={g.title}>
              {g.title && <h3 className="mb-3 text-body-l font-bold text-fg-1">{g.title}</h3>}
              <BoothTable booths={g.booths} caption={g.title ?? listLabel} nameLabel={g.nameLabel} />
            </section>
          ))}
        </div>
      </div>

      {map && isZoomOpen && <ZoomableImageModal image={map} onClose={() => setIsZoomOpen(false)} />}
    </>
  );
}
