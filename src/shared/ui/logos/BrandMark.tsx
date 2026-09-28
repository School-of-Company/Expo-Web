import Image from "next/image";

export type BrandKey = "samsung" | "google" | "apple";

/**
 * 협력사 브랜드 마크.
 *
 * 로고마다 가로세로 비율이 달라 한 가지 박스로 맞추면 크기가 들쭉날쭉해 보인다.
 * 폭은 24로 고정해 카드끼리 본문 시작선을 맞추고, 높이만 브랜드별로 조정한다.
 */
const BRAND: Record<BrandKey, { label: string; src: string; box: string }> = {
  samsung: { label: "삼성", src: "/logos/samsung.png", box: "h-10 w-24" },
  google: { label: "구글", src: "/logos/google.png", box: "h-14 w-24" },
  apple: { label: "애플", src: "/logos/apple.png", box: "h-14 w-24" },
};

export default function BrandMark({
  brand,
  className = "",
}: {
  brand: BrandKey;
  className?: string;
}) {
  const { label, src, box } = BRAND[brand];

  return (
    <Image
      src={src}
      alt={`${label} 로고`}
      width={192}
      height={96}
      className={`${box} object-contain ${className}`}
    />
  );
}
