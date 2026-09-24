"use client";

import { useEffect, useRef, useState } from "react";
import { EVENT_DATES, timeline } from "@/entities/schedule/model/data";

export default function TimelineSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkScrollable = () => setScrollable(el.scrollWidth > el.clientWidth + 1);
    checkScrollable();

    const observer = new ResizeObserver(checkScrollable);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <p
        className={`mb-2 text-body-xs font-semibold text-fg-3 transition-opacity duration-150 ease-out ${
          scrollable ? "opacity-100" : "h-0 opacity-0"
        }`}
        aria-hidden={!scrollable}
      >
        ← 좌우로 스크롤하여 전체 일정을 확인하세요 →
      </p>

      <div ref={scrollRef} className="scroll-shadow-x overflow-x-auto rounded-xlarge border border-border-default">
        <table className="w-full min-w-[1100px] border-collapse text-left text-body-s min-[1000px]:min-w-0">
          <thead>
            <tr className="border-b-2 border-secondary-70 bg-bg-canvas text-fg-1">
              <th className="h-12 whitespace-nowrap border-r border-border-default px-4 text-center font-bold">일자</th>
              <th className="h-12 whitespace-nowrap border-r border-border-default px-4 text-center font-bold">구분</th>
              <th className="h-12 whitespace-nowrap border-r border-border-default px-4 text-center font-bold">시간</th>
              <th className="h-12 whitespace-nowrap border-r border-border-default px-4 text-center font-bold">장소</th>
              <th className="h-12 w-full px-4 text-center font-bold">주요내용</th>
            </tr>
          </thead>
          <tbody>
            {EVENT_DATES.map((date, dateIndex) => {
              const items = timeline.filter((t) => t.date === date);

              return items.map((item, i) => (
                <tr
                  key={`${date}-${item.time}-${item.title}`}
                  className={i === 0 && dateIndex > 0 ? "border-t-2 border-gray-40" : "border-t border-gray-20"}
                >
                  {i === 0 && (
                    <td
                      rowSpan={items.length}
                      className="whitespace-nowrap border-r border-gray-20 bg-primary-10 px-4 py-3 text-center font-bold text-fg-1"
                    >
                      {date}
                    </td>
                  )}
                  <td className="whitespace-nowrap border-r border-gray-20 px-4 py-3 text-center font-semibold text-fg-1">{item.title}</td>
                  <td className="whitespace-nowrap border-r border-gray-20 px-4 py-3 text-center text-fg-2">{item.time}</td>
                  <td className="whitespace-nowrap border-r border-gray-20 px-4 py-3 text-center text-fg-2">{item.location}</td>
                  <td className="px-4 py-3 text-fg-2">
                    <ul className="space-y-0.5">
                      {item.detail.map((d) => (
                        <li key={d}>· {d}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
