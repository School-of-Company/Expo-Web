import type { SVGProps } from "react";

export type BrandKey = "samsung" | "google" | "apple";

/**
 * 협력사 브랜드 마크.
 *
 * 삼성·구글·애플 공식 로고 에셋을 아직 전달받지 못해, 브랜드 색상과 이니셜로
 * 식별만 되는 대체 마크를 사용한다. 정식 로고를 받으면 이 파일의 도형만
 * 교체하면 되고, 사용하는 쪽 코드는 그대로 둔다.
 */
const BRAND: Record<BrandKey, { label: string; initial: string; color: string }> = {
  samsung: { label: "삼성", initial: "S", color: "#1428A0" },
  google: { label: "구글", initial: "G", color: "#4285F4" },
  apple: { label: "애플", initial: "A", color: "#1D1D1F" },
};

export default function BrandMark({
  brand,
  className = "h-9 w-9",
  ...props
}: { brand: BrandKey; className?: string } & SVGProps<SVGSVGElement>) {
  const { label, initial, color } = BRAND[brand];

  return (
    <svg viewBox="0 0 36 36" className={className} role="img" aria-label={`${label} 로고`} {...props}>
      <circle cx="18" cy="18" r="18" fill={color} />
      <text
        x="18"
        y="18"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#ffffff"
        fontSize="16"
        fontWeight="700"
      >
        {initial}
      </text>
    </svg>
  );
}
