import SectionPage from "@/widgets/section-page/ui/SectionPage";
import Button from "@/shared/ui/Button";
import Icon, { type IconName } from "@/shared/ui/Icon";
import type { AreaType } from "@/entities/area-status/model/areaStatus";
import LiveStatusBadge from "./LiveStatusBadge";

const STATUS_ITEMS: { icon: IconName; type: AreaType; label: string; desc: string }[] = [
  { icon: "users", type: "VENUE", label: "행사장 현황", desc: "구역별 혼잡도" },
  { icon: "car", type: "ROAD", label: "도로 현황", desc: "주변 도로 교통 상황" },
  { icon: "parking", type: "PARKING", label: "주차 현황", desc: "임시 주차장 혼잡도" },
];

export default function StatusPage() {
  return (
    <SectionPage title="실시간 현황" desc="행사장, 도로, 주차 현황 안내">
      <section className="mx-auto max-w-3xl overflow-hidden rounded-xlarge border border-border-default bg-bg-canvas shadow-[0_8px_30px_-12px_rgba(20,20,60,0.12)]">
        <div className="bg-gradient-to-b from-primary-5 to-bg-canvas px-6 pb-10 pt-12 text-center sm:px-12 sm:pt-14">
          <span className="inline-flex items-center gap-2 rounded-pill border border-primary-20 bg-bg-canvas px-3 py-1 text-body-xs font-bold text-primary-50">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-pill bg-primary-40 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-pill bg-primary-50" />
            </span>
            행사 당일 오픈
          </span>
          <h2 className="mt-5 break-keep text-heading-xs font-bold leading-snug tracking-tight text-fg-1 sm:text-heading-s">
            행사장, 도로, 주차 상황은
            <br className="sm:hidden" /> 행사 당일 확인할 수 있습니다.
          </h2>
          <p className="mt-3 break-keep text-body-s text-fg-3 sm:text-body-m">
            행사 당일 이 페이지에서 실시간 혼잡도를 안내해 드립니다.
          </p>
        </div>

        <ul className="mx-6 divide-y divide-border-default border-y border-border-default sm:mx-12">
          {STATUS_ITEMS.map(({ icon, type, label, desc }) => (
            <li key={label} className="flex items-center gap-4 py-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-medium bg-primary-5 text-primary-50">
                <Icon name={icon} className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-body-m font-bold text-fg-1">{label}</p>
                <p className="text-body-xs text-fg-3">{desc}</p>
              </div>
              <LiveStatusBadge type={type} />
            </li>
          ))}
        </ul>

        <div className="flex flex-col justify-center gap-3 px-6 py-8 sm:flex-row sm:px-12">
          <Button href="/notice/parking" variant="primary">
            주차 안내 보기
          </Button>
          <Button href="/guide/directions" variant="tertiary">
            오시는 길
          </Button>
        </div>
      </section>
    </SectionPage>
  );
}
