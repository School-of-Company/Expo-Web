"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/shared/ui/Icon";

// 2초 단위로 쪼갠 HLS(480p·720p). 첫 조각만 받아도 재생이 시작되고, 회선 속도에 맞춰 화질이 바뀐다.
const PROMO_HLS_SRC = "/promo/index.m3u8";

export default function PromoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // 브라우저는 소리 있는 자동재생을 막으므로 음소거로 시작하고, 버튼으로 소리를 켠다.
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let destroy: (() => void) | undefined;
    let cancelled = false;

    // Safari는 HLS를 기본 지원하고, 나머지 브라우저는 hls.js로 재생한다.
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = PROMO_HLS_SRC;
    } else {
      import("hls.js").then(({ default: Hls }) => {
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
