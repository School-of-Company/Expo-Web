"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const MIN = 1;
const MAX = 4;

export default function ZoomImage({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(MIN);

  const close = () => {
    setOpen(false);
    setScale(MIN);
  };
  const zoom = (delta: number) => setScale((s) => Math.min(MAX, Math.max(MIN, s + delta)));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const btn = "h-10 w-10 rounded-full bg-white/15 text-xl font-bold text-white hover:bg-white/25";

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} onClick={() => setOpen(true)} className="mx-auto max-h-[70vh] max-w-full cursor-zoom-in rounded-small object-contain" />
      {open &&
        createPortal(
        <div role="dialog" aria-modal="true" aria-label={alt} className="fixed inset-0 z-[200] flex flex-col bg-black/90">
          <div className="flex justify-end gap-2 p-3">
            <button type="button" aria-label="축소" onClick={() => zoom(-0.5)} className={btn}>
              −
            </button>
            <button type="button" aria-label="확대" onClick={() => zoom(0.5)} className={btn}>
              +
            </button>
            <button type="button" aria-label="닫기" onClick={close} className={btn}>
              ✕
            </button>
          </div>
          {/* 처음엔 화면에 맞춰 보여주고, 확대하면 이미지가 커져서 스크롤로 이동한다 */}
          <div className="min-h-0 flex-1 overflow-auto" onClick={(e) => e.target === e.currentTarget && close()}>
            <div className="flex min-h-full min-w-full" onClick={(e) => e.target === e.currentTarget && close()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                onClick={() => setScale((s) => (s > MIN ? MIN : 2))}
                style={
                  scale === MIN
                    ? { maxWidth: "100%", maxHeight: "calc(100dvh - 4rem)" }
                    : { width: `${scale * 100}%`, maxWidth: "none", maxHeight: "none" }
                }
                className={`m-auto shrink-0 object-contain ${scale > MIN ? "cursor-zoom-out" : "cursor-zoom-in"}`}
              />
            </div>
          </div>
        </div>,
        document.body,
        )}
    </>
  );
}
