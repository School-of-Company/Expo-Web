"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/shared/ui/Icon";

const PROMO_HLS_SRC = "/promo/index.m3u8";

type WebkitPresentationVideo = HTMLVideoElement & {
  webkitPresentationMode?: "inline" | "picture-in-picture" | "fullscreen";
  webkitSetPresentationMode?: (mode: "inline" | "picture-in-picture" | "fullscreen") => void;
};

export default function PromoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let destroy: (() => void) | undefined;
    let cancelled = false;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = PROMO_HLS_SRC;
    } else {
      // 자막·다중 오디오·DRM이 없는 단순 HLS라 기능을 덜어 낸 light 빌드로 충분하다(약 35% 작음).
      import("hls.js/light").then(({ default: Hls }) => {
        if (cancelled || !Hls.isSupported()) return;
        const hls = new Hls({ startLevel: 0, capLevelToPlayerSize: true });
        hls.loadSource(PROMO_HLS_SRC);
        hls.attachMedia(video);
        destroy = () => hls.destroy();
      });
    }

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, []);

  // disablePictureInPicture를 우회하는 경로(Safari 메뉴, 탭 전환 시 자동 PiP 등)로 들어가면 바로 되돌린다.
  useEffect(() => {
    const video = videoRef.current as WebkitPresentationVideo | null;
    if (!video) return;

    const exitPictureInPicture = () => {
      if (document.pictureInPictureElement === video) void document.exitPictureInPicture();
    };
    const exitWebkitPictureInPicture = () => {
      if (video.webkitPresentationMode === "picture-in-picture") video.webkitSetPresentationMode?.("inline");
    };

    video.addEventListener("enterpictureinpicture", exitPictureInPicture);
    video.addEventListener("webkitpresentationmodechanged", exitWebkitPictureInPicture);
    return () => {
      video.removeEventListener("enterpictureinpicture", exitPictureInPicture);
      video.removeEventListener("webkitpresentationmodechanged", exitWebkitPictureInPicture);
    };
  }, []);

  const toggleMuted = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    if (!video.muted) void video.play();
  };

  return (
    <div className="relative aspect-video w-full select-none overflow-hidden rounded-xlarge border border-border-default bg-black">
      <video
        ref={videoRef}
        className="pointer-events-none h-full w-full object-cover"
        poster="/promo-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        aria-label="2026 전남광주통합특별시교육청 AI미래교육박람회 홍보 영상"
      />
      <button
        type="button"
        onClick={toggleMuted}
        aria-label={isMuted ? "소리 켜기" : "소리 끄기"}
        className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
      >
        <Icon name={isMuted ? "volume-off" : "volume-on"} className="h-5 w-5" />
      </button>
    </div>
  );
}
