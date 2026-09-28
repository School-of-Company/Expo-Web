import Image from "next/image";

export type BrandKey = "samsung" | "google" | "apple";

/** 협력사 브랜드 마크. 로고 비율이 제각각이라 고정 박스 안에서 object-contain으로 맞춘다. */
const BRAND: Record<BrandKey, { label: string; src: string }> = {
  samsung: { label: "삼성", src: "/logos/samsung.png" },
  google: { label: "구글", src: "/logos/google.png" },
  apple: { label: "애플", src: "/logos/apple.png" },
};

export default function BrandMark({
  brand,
  className = "h-10 w-24",
}: {
  brand: BrandKey;
  className?: string;
}) {
  const { label, src } = BRAND[brand];

  return (
    <Image
      src={src}
      alt={`${label} 로고`}
      width={192}
      height={96}
      className={`${className} object-contain`}
    />
  );
}
