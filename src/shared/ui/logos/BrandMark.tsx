import type { StaticImageData } from "next/image";
import { getBackgroundImage } from "@/shared/lib/getBackgroundImage";
import apple from "../../../../public/logos/apple.png";
import coolschool from "../../../../public/logos/coolschool.png";
import google from "../../../../public/logos/google.png";
import samsung from "../../../../public/logos/samsung.png";

export type BrandKey = "samsung" | "google" | "apple" | "coolschool";

const BRAND: Record<BrandKey, { label: string; src: StaticImageData; box: string }> = {
  samsung: { label: "삼성", src: samsung, box: "h-10 w-24" },
  google: { label: "구글", src: google, box: "h-14 w-24" },
  apple: { label: "애플", src: apple, box: "h-16 w-24" },
  coolschool: { label: "Cool School", src: coolschool, box: "h-14 w-24" },
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
