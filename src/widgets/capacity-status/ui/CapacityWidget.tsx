"use client";

import { useMemo, useState } from "react";

import { capacitySlots, STATUS_LABEL, STATUS_STYLE } from "@/entities/capacity/model/data";
import { EVENT_DATES, type EventDate } from "@/entities/schedule/model/data";

export default function CapacityWidget() {
  const [date, setDate] = useState<EventDate>(EVENT_DATES[0]);

  const rows = useMemo(() => capacitySlots.filter((s) => s.date === date), [date]);

  return (
    <section className="rounded-xlarge border border-border-default bg-bg-canvas p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-body-l font-bold text-fg-1">프로그램 접수</h3>
        <div className="flex gap-1 rounded-medium bg-bg-subtle p-1 text-body-s">
          {EVENT_DATES.map((d) => (
            <button
              key={d}
              onClick={() => setDate(d)}
              aria-pressed={date === d}
              className={`rounded-small px-3 py-1.5 font-medium transition-colors duration-150 ease-out ${
                date === d ? "bg-bg-canvas text-primary-60 shadow-1" : "text-fg-3 hover:text-fg-1"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-5 divide-y divide-gray-20">
        {rows.map((slot) => {
          const remaining = Math.max(0, slot.total - slot.current);

          return (
            <li key={slot.id} className="flex items-center gap-4 py-3.5">
              <span className="w-10 shrink-0 text-body-xs font-semibold text-fg-3">{slot.time}</span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-body-s font-semibold text-fg-1" title={slot.program}>
                  {slot.program}
                </p>
                <p className="mt-0.5 text-body-xs text-fg-3">
                  {slot.audience} 대상, 정원 {slot.total}명
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <p className="text-right text-body-s tabular-nums">
                  {slot.status === "closed" ? (
                    <span className="text-fg-4">잔여 없음</span>
                  ) : (
                    <span className="font-medium text-fg-3">
                      잔여 <span className="font-bold text-fg-1">{remaining}</span>명
                    </span>
                  )}
                </p>
                <span
                  className={`inline-flex w-[4.5rem] shrink-0 justify-center rounded-xsmall px-2 py-1 text-body-xs font-semibold ring-1 ring-inset ${STATUS_STYLE[slot.status]}`}
                >
                  {STATUS_LABEL[slot.status]}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
