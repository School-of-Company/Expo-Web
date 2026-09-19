"use client";

import { useMemo, useState } from "react";
import { capacitySlots, STATUS_LABEL, STATUS_STYLE } from "@/entities/capacity/model/data";
import { EVENT_DATES, type EventDate } from "@/entities/schedule/model/data";

export default function CapacityWidget() {
  const [date, setDate] = useState<EventDate>(EVENT_DATES[0]);

  const rows = useMemo(
    () => capacitySlots.filter((s) => s.date === date),
    [date]
  );

  return (
    <div className="rounded-xlarge border border-border-default bg-bg-canvas p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-body-l font-bold text-fg-1">실시간 접수 현황</h3>
          <p className="mt-0.5 text-body-xs text-fg-3">프로그램별 정원 대비 접수 상태 (예시 데이터)</p>
        </div>
        <div className="flex gap-1 rounded-medium bg-bg-subtle p-1 text-body-s">
          {EVENT_DATES.map((d) => (
            <button
              key={d}
              onClick={() => setDate(d)}
              className={`rounded-small px-3 py-1.5 font-medium transition-colors duration-150 ease-out ${
                date === d ? "bg-bg-canvas text-primary-60 shadow-1" : "text-fg-3 hover:text-fg-1"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 divide-y divide-gray-20">
        {rows.map((slot) => (
          <div key={slot.id} className="flex items-center gap-3 py-3">
            <div className="w-16 shrink-0 rounded-small bg-bg-subtle px-2 py-1 text-center text-body-xs font-semibold text-fg-3">
              {slot.time}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-body-s font-semibold text-fg-1">{slot.program}</p>
                <span className="shrink-0 rounded-xsmall bg-bg-subtle px-1.5 py-0.5 text-body-xs font-medium text-fg-3">
                  {slot.audience}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-pill bg-bg-subtle">
                <div
                  className={`h-full rounded-pill ${
                    slot.status === "closed" ? "bg-gray-30" : slot.status === "almost" ? "bg-warning" : "bg-success"
                  }`}
                  style={{ width: `${Math.min(100, (slot.current / slot.total) * 100)}%` }}
                />
              </div>
            </div>
            <div className="shrink-0 text-right">
              <span
                className={`inline-flex items-center rounded-xsmall px-2.5 py-1 text-body-xs font-semibold ring-1 ring-inset ${STATUS_STYLE[slot.status]}`}
              >
                {STATUS_LABEL[slot.status]}
              </span>
              <p className="mt-1 text-body-xs text-fg-3">
                {slot.current}/{slot.total}명
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
