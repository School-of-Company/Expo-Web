import { congestionZones, congestionUpdatedAt, CONGESTION_STYLE } from "@/entities/congestion/model/data";

export default function CongestionWidget() {
  return (
    <div className="rounded-xlarge border border-border-default bg-bg-canvas p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-body-l font-bold text-fg-1">실시간 행사 혼잡도</h3>
          <p className="mt-0.5 text-body-xs text-fg-3">구역별 혼잡도 · {congestionUpdatedAt}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-body-xs text-fg-2">
          {(Object.keys(CONGESTION_STYLE) as (keyof typeof CONGESTION_STYLE)[]).map((level) => (
            <span key={level} className="flex items-center gap-1">
              <span className={`h-2 w-2 rounded-full ${CONGESTION_STYLE[level].dot}`} />
              {level}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {congestionZones.map((z) => (
          <div key={z.zone}>
            <div className="flex items-center justify-between text-body-s">
              <span className="font-medium text-fg-2">{z.zone}</span>
              <span className={`text-body-xs font-semibold ${CONGESTION_STYLE[z.level].text}`}>{z.level}</span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-pill bg-bg-subtle">
              <div
                className={`h-full rounded-pill ${CONGESTION_STYLE[z.level].bar}`}
                style={{ width: `${z.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
