import type { NextConfig } from "next";

// public 파일은 기본이 max-age=0이라, 해시 없는 영상·포스터는 1시간 캐시한다.
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
