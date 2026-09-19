import { PROMO_YOUTUBE_ID } from "@/shared/config/promo-video";
import Icon from "@/shared/ui/Icon";

export default function PromoVideo() {
  if (!PROMO_YOUTUBE_ID) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xlarge border border-dashed border-border-default bg-bg-canvas text-fg-3">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-bg-subtle text-fg-3">
          <Icon name="play" className="h-6 w-6" />
        </span>
        <p className="text-body-s">홍보 영상 준비중입니다</p>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-xlarge border border-border-default bg-gray-100">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${PROMO_YOUTUBE_ID}`}
        title="2026 전남광주통합특별시교육청 AI미래교육박람회 홍보 영상"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
