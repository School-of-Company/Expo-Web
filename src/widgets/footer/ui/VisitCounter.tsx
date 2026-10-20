"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { VisitCounts } from "@/entities/visit/model/types";

/**
 * 푸터 TODAY/TOTAL 페이지뷰. 새로고침과 페이지 이동마다 한 번씩 센다.
 * 개발 모드의 StrictMode가 effect를 두 번 돌려도 같은 경로는 한 번만 세도록 마지막으로 센 경로를 기억한다.
 */
export default function VisitCounter() {
  const pathname = usePathname();
  const [counts, setCounts] = useState<VisitCounts | null>(null);
  const countedPathname = useRef<string | null>(null);

  useEffect(() => {
    if (countedPathname.current === pathname) return;
    countedPathname.current = pathname;

    fetch("/api/visits", { method: "POST" })
      .then((res) => (res.ok ? (res.json() as Promise<VisitCounts>) : null))
      .then((data) => data && setCounts(data))
      .catch(() => {});
  }, [pathname]);

  const items = [
    { label: "TODAY", value: counts?.today },
    { label: "TOTAL", value: counts?.total },
  ];

  return (
    <dl className="mt-2 flex items-center justify-center gap-3 text-body-xs text-white/40 tabular-nums">
      {items.map(({ label, value }, i) => (
        <div key={label} className="flex items-center gap-3">
          {i > 0 && <span aria-hidden className="h-3 w-px bg-white/15" />}
          <div className="flex items-center gap-1.5">
            <dt className="font-semibold tracking-wider text-white/60">{label}</dt>
            {/* 숫자를 받기 전에는 자리만 잡아 두어 푸터 높이가 흔들리지 않게 한다. */}
            <dd>{value === undefined ? "-" : value.toLocaleString("ko-KR")}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
