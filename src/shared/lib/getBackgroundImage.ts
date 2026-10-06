import { getImageProps, type StaticImageData } from "next/image";
import { preload } from "react-dom";

/**
 * 정적 이미지를 Next 이미지 최적화를 거친 CSS background-image 값으로 바꾼다.
 * <img>가 아니라 배경이므로 끌어서 옮기거나 우클릭으로 저장할 수 없다.
 *
 * - 1x/2x 해상도별 URL을 image-set()으로 넘긴다.
 * - shouldPreload면 <head>에 preload를 넣어 CSS 배경이 늦게 뜨며 깜빡이는 것을 막는다.
 * - width를 주면 그 CSS 폭 기준의 1x/2x만 받는다. 작게 표시되는 로고가 원본 크기를 받지 않게 할 때 쓴다.
 * - blur면 정적 import가 만든 blurDataURL을 아래 레이어로 깔아, 원본이 오기 전에도 흐린 사진이 보이게 한다.
 *   투명 PNG는 blur가 회색 박스로 보이므로 끈다.
 * - unoptimized면 최적화 없이 원본 파일을 그대로 쓴다(SVG처럼 최적화 대상이 아닌 이미지용).
 */
export function getBackgroundImage(
  src: StaticImageData,
  { shouldPreload = false, unoptimized = false, blur = true, width }: { shouldPreload?: boolean; unoptimized?: boolean; blur?: boolean; width?: number } = {},
) {
  if (unoptimized) {
    if (shouldPreload) preload(src.src, { as: "image" });
    return `url("${src.src}")`;
  }

  const { props } = getImageProps(
    width ? { src, alt: "", width, height: Math.round((width * src.height) / src.width) } : { src, alt: "" },
  );
  const srcSet = props.srcSet ?? `${props.src} 1x`;

  if (shouldPreload) preload(props.src, { as: "image", imageSrcSet: srcSet });

  const imageSet = srcSet
    .split(", ")
    .map((entry) => {
      const [url, dpi] = entry.split(" ");
      return `url("${url}") ${dpi}`;
    })
    .join(", ");

  return blur && src.blurDataURL ? `image-set(${imageSet}), url("${src.blurDataURL}")` : `image-set(${imageSet})`;
}
