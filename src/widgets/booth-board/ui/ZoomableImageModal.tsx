"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "@/shared/ui/Icon";

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const SCALE_STEP = 0.5;

export interface ZoomableImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const clampScale = (value: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));

/**
 * 이미지 확대 모달.
 *
 * - 버튼/휠로 확대·축소, 확대 상태에서 드래그로 이동
 * - 모바일에서는 두 손가락 거리로 확대·축소 (Pointer Events로 마우스와 함께 처리)
 * - 닫기 버튼 또는 Esc로 닫으며, 닫아도 호출한 쪽의 탭 상태는 그대로 유지된다
 */
export default function ZoomableImageModal({ image, onClose }: { image: ZoomableImage; onClose: () => void }) {
  const [scale, setScale] = useState(MIN_SCALE);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const dialogRef = useRef<HTMLDivElement>(null);
  /** 화면에 닿아 있는 포인터들. 2개가 되면 핀치 줌으로 해석한다. */
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchStart = useRef<{ distance: number; scale: number } | null>(null);

  const reset = useCallback(() => {
    setScale(MIN_SCALE);
    setOffset({ x: 0, y: 0 });
  }, []);

  const zoomBy = useCallback((delta: number) => {
    setScale((prev) => {
      const next = clampScale(prev + delta);
      if (next === MIN_SCALE) setOffset({ x: 0, y: 0 });
      return next;
    });
  }, []);

  // Esc로 닫고, 열려 있는 동안 뒤쪽 페이지가 스크롤되지 않게 잠근다.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const pointerDistance = () => {
    const [a, b] = [...pointers.current.values()];
    return Math.hypot(a.x - b.x, a.y - b.y);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2) {
      pinchStart.current = { distance: pointerDistance(), scale };
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const previous = pointers.current.get(e.pointerId);
    if (!previous) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size >= 2) {
      if (!pinchStart.current || pinchStart.current.distance === 0) return;
      const next = clampScale(pinchStart.current.scale * (pointerDistance() / pinchStart.current.distance));
      setScale(next);
      if (next === MIN_SCALE) setOffset({ x: 0, y: 0 });
      return;
    }

    // 확대된 상태에서만 이동을 허용해 원본 크기일 때 이미지가 화면 밖으로 밀리지 않게 한다.
    if (scale > MIN_SCALE) {
      setOffset((o) => ({ x: o.x + (e.clientX - previous.x), y: o.y + (e.clientY - previous.y) }));
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${image.alt} 확대 보기`}
      tabIndex={-1}
      className="fixed inset-0 z-100 flex flex-col bg-black/80"
    >
      <div className="flex shrink-0 items-center justify-end gap-2 p-4">
        <button
          type="button"
          onClick={() => zoomBy(-SCALE_STEP)}
          disabled={scale <= MIN_SCALE}
          aria-label="축소"
          className="flex h-11 w-11 items-center justify-center rounded-medium bg-bg-canvas text-heading-xxs font-bold text-fg-1 transition-colors duration-150 ease-out hover:bg-bg-subtle disabled:cursor-not-allowed disabled:opacity-40"
        >
          −
        </button>
        <button
          type="button"
          onClick={() => zoomBy(SCALE_STEP)}
          disabled={scale >= MAX_SCALE}
          aria-label="확대"
          className="flex h-11 w-11 items-center justify-center rounded-medium bg-bg-canvas text-heading-xxs font-bold text-fg-1 transition-colors duration-150 ease-out hover:bg-bg-subtle disabled:cursor-not-allowed disabled:opacity-40"
        >
          +
        </button>
        <button
          type="button"
          onClick={reset}
          aria-label="원래 크기로"
          className="flex h-11 items-center justify-center rounded-medium bg-bg-canvas px-4 text-body-s font-bold text-fg-1 transition-colors duration-150 ease-out hover:bg-bg-subtle"
        >
          원래 크기
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="배치도 확대 닫기"
          className="flex h-11 w-11 items-center justify-center rounded-medium bg-bg-canvas text-fg-1 transition-colors duration-150 ease-out hover:bg-bg-subtle"
        >
          <Icon name="close" />
        </button>
      </div>

      <div
        className="relative flex-1 touch-none overflow-hidden"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={(e) => zoomBy(e.deltaY < 0 ? SCALE_STEP : -SCALE_STEP)}
        style={{ cursor: scale > MIN_SCALE ? "grab" : "default" }}
      >
        <div
          className="flex h-full w-full items-center justify-center p-4"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})` }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            draggable={false}
            priority
            className="max-h-full max-w-full select-none object-contain"
            style={{ width: "auto", height: "auto" }}
          />
        </div>
      </div>

      <p className="shrink-0 px-4 pb-4 text-center text-body-xs text-white/80">
        휠 또는 확대·축소 버튼으로 크기를 조절하고, 확대한 뒤 끌어서 이동할 수 있습니다. 모바일에서는 두 손가락으로
        확대·축소하세요.
      </p>
    </div>
  );
}
