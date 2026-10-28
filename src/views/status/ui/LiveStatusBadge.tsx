"use client";

import { useAreaStatus } from "@/entities/area-status/model/useAreaStatuses";
import type { AreaType } from "@/entities/area-status/model/areaStatus";
import { CONGESTION_STYLE } from "@/entities/congestion/model/data";

/** 현황 페이지 항목 오른쪽의 현재 상태. 아직 보고된 값이 없으면 "확인 중"으로 보인다. */
export default function LiveStatusBadge({ type }: { type: AreaType }) {
  const { level, text } = useAreaStatus(type);
  return (
    <span
      className={`flex shrink-0 items-center gap-1.5 rounded-pill bg-bg-subtle px-3 py-1 text-body-xs font-bold ${CONGESTION_STYLE[level].text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${CONGESTION_STYLE[level].dot}`} />
      {text}
    </span>
  );
}
