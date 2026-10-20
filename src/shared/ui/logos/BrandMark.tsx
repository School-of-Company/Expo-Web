import type { StaticImageData } from "next/image";
import { getBackgroundImage } from "@/shared/lib/getBackgroundImage";
import apple from "../../../../public/logos/apple.png";
import google from "../../../../public/logos/google.png";
import samsung from "../../../../public/logos/samsung.png";

export type BrandKey = "samsung" | "google" | "apple";

/**
 * 협력사 브랜드 마크.
 *
 * 로고마다 가로세로 비율이 달라 한 가지 박스로 맞추면 크기가 들쭉날쭉해 보인다.
 * 폭은 24로 고정해 카드끼리 본문 시작선을 맞추고, 높이만 브랜드별로 조정한다.
 * <img>가 아닌 배경으로 깔아 로고를 끌거나 저장할 수 없게 한다.
 */
const BRAND: Record<BrandKey, { label: string; src: StaticImageData; box: string }> = {
  samsung: { label: "삼성", src: samsung, box: "h-10 w-24" },
  google: { label: "구글", src: google, box: "h-14 w-24" },
  apple: { label: "애플", src: apple, box: "h-16 w-24" },
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
    <span
      role="img"
      aria-label={`${label} 로고`}
      className={`block ${box} bg-contain bg-center bg-no-repeat ${className}`}
      style={{ backgroundImage: getBackgroundImage(src, { blur: false, width: 96 }) }}
    />
  );
}
