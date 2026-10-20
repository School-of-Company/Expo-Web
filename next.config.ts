import type { NextConfig } from "next";

/**
 * public 폴더 파일은 기본값이 `max-age=0`이라 볼 때마다 서버에 바뀌었는지 다시 묻는다.
 * 파일 이름에 해시가 없는 영상·포스터는 1시간 동안 브라우저·CDN에 그대로 두고,
 * 그 뒤 하루 동안은 캐시본을 먼저 보여 주면서 뒤에서 새로 받는다. 파일을 바꾸면 늦어도 1시간 뒤에 반영된다.
 */
const PUBLIC_MEDIA_CACHE = "public, max-age=3600, stale-while-revalidate=86400";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return ["/promo/:path*", "/hero-bg.webm", "/promo-poster.jpg", "/poster.png"].map((source) => ({
      source,
      headers: [{ key: "Cache-Control", value: PUBLIC_MEDIA_CACHE }],
    }));
  },
};

export default nextConfig;
