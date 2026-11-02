import { getImageProps, type StaticImageData } from "next/image";
import { preload } from "react-dom";

export function getBackgroundImage(
  src: StaticImageData,
  {
    shouldPreload = false,
    unoptimized = false,
    blur = true,
    width,
    media,
  }: { shouldPreload?: boolean; unoptimized?: boolean; blur?: boolean; width?: number; media?: string } = {},
) {
  if (unoptimized) {
    if (shouldPreload) preload(src.src, { as: "image", media });
    return `url("${src.src}")`;
  }

  const { props } = getImageProps(
    width ? { src, alt: "", width, height: Math.round((width * src.height) / src.width) } : { src, alt: "" },
  );
  const srcSet = props.srcSet ?? `${props.src} 1x`;

  if (shouldPreload) preload(props.src, { as: "image", imageSrcSet: srcSet, media });

  const imageSet = srcSet
    .split(", ")
    .map((entry) => {
      const [url, dpi] = entry.split(" ");
      return `url("${url}") ${dpi}`;
    })
    .join(", ");

  return blur && src.blurDataURL ? `image-set(${imageSet}), url("${src.blurDataURL}")` : `image-set(${imageSet})`;
}
