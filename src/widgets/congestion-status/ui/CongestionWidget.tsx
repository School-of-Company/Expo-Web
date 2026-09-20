import { CONGESTION_STYLE, congestionUpdatedAt, congestionZones } from "@/entities/congestion/model/data";

export default function CongestionWidget() {
  return (
    <section className="rounded-xlarge border border-border-default bg-bg-canvas p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-body-l font-bold text-fg-1">구역별 혼잡도</h3>
        <p className="text-body-xs text-fg-3">{congestionUpdatedAt}</p>
      </div>

      <ul className="mt-5 space-y-4">
        {congestionZones.map((z) => (
          <li key={z.zone}>
            <div className="flex items-baseline justify-between gap-2 text-body-s">
              <span className="font-medium text-fg-1">{z.zone}</span>
              <span className={`shrink-0 font-semibold tabular-nums ${CONGESTION_STYLE[z.level].text}`}>
                {z.level} {z.percent}%
              </span>
            </div>
            <div
              className="mt-2 h-2 w-full overflow-hidden rounded-pill bg-bg-subtle"
              role="img"
              aria-label={`${z.zone} 혼잡도 ${z.percent}퍼센트, ${z.level}`}
            >
              <div className={`h-full rounded-pill ${CONGESTION_STYLE[z.level].bar}`} style={{ width: `${z.percent}%` }} />
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-5 border-t border-gray-20 pt-4 text-body-xs text-fg-3">
        혼잡한 구역은 오전·오후 교대 시간대를 피하면 대기가 줄어듭니다.
      </p>
    </section>
  );
}
