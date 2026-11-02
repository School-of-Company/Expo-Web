"use client";

import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";
import ZoomableImageModal, { type ZoomableImage } from "./ZoomableImageModal";

export default function BoothMap({ map, className = "" }: { map: ZoomableImage; className?: string }) {
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  return (
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
          sizes="(min-width: 1280px) 960px, (min-width: 640px) 70vw, 100vw"
          className={`h-auto w-full object-contain ${className}`}
        />
      </button>
      <p className="mt-2 overflow-hidden text-center text-body-xs font-bold text-fg-2 md:mt-3 md:text-body-m">배치도를 클릭하면 확대해서 볼 수 있습니다.</p>
      {isZoomOpen && createPortal(<ZoomableImageModal image={map} onClose={() => setIsZoomOpen(false)} />, document.body)}
    </>
  );
}
