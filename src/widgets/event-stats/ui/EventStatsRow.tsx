import Link from "next/link";

import { capacitySlots } from "@/entities/capacity/model/data";
import { congestionZones, type CongestionLevel } from "@/entities/congestion/model/data";

interface Stat {
  label: string;
  /** 지표의 주인공 숫자. 단위는 unit으로 분리해 크기를 낮춘다. */
  value: string;
  unit: string;
  note: string;
  noteHref?: string;
}

function StatItem({ label, value, unit, note, noteHref }: Stat) {
  return (
    <div className="py-5 sm:px-6 sm:py-1 sm:first:pl-0 sm:last:pr-0">
      <dt className="text-body-xs font-medium text-fg-3">{label}</dt>
      <dd className="mt-1.5 flex items-baseline gap-1">
        <span className="text-heading-l font-bold tabular-nums text-fg-1">{value}</span>
        <span className="text-body-m font-medium text-fg-2">{unit}</span>
      </dd>
      <p className="mt-1.5 text-body-xs text-fg-3">
        {noteHref ? (
          <Link href={noteHref} className="underline decoration-gray-30 underline-offset-4 hover:text-fg-link hover:decoration-current">
            {note}
          </Link>
        ) : (
          note
        )}
      </p>
    </div>
  );
}

export default function EventStatsRow() {
  // 구역 평균 기준. 헤더 인디케이터는 최악 구역 기준이라 표기가 다를 수 있다.
  const avgCongestion = Math.round(congestionZones.reduce((sum, z) => sum + z.percent, 0) / congestionZones.length);
  const congestionLevel: CongestionLevel = avgCongestion < 40 ? "여유" : avgCongestion < 70 ? "보통" : avgCongestion < 90 ? "혼잡" : "매우 혼잡";
  const busiestZone = congestionZones.reduce((worst, z) => (z.percent > worst.percent ? z : worst));

  const registerSlots = capacitySlots.filter((s) => s.program === "학생 사전등록");
  const registerCurrent = registerSlots.reduce((sum, s) => sum + s.current, 0);
  const registerTotal = registerSlots.reduce((sum, s) => sum + s.total, 0);
  const registerPercent = Math.round((registerCurrent / registerTotal) * 100);

  // TODO: 주차 데이터 소스가 생기면 entity로 옮긴다.
  const parkingTotal = 500;
  const parkingRemaining = 68;

  const stats: Stat[] = [
    {
      label: "행사장 혼잡도",
      value: congestionLevel,
      unit: `${avgCongestion}%`,
      note: `${busiestZone.zone}가 가장 붐빕니다`,
    },
    {
      label: "주차 잔여",
      value: `${parkingRemaining}`,
      unit: `대 / ${parkingTotal}대`,
      note: "주차 안내 보기",
      noteHref: "/notice/parking",
    },
    {
      label: "사전등록 접수",
      value: registerCurrent.toLocaleString(),
      unit: `명 / ${registerTotal.toLocaleString()}명`,
      note: `정원의 ${registerPercent}%를 채웠습니다`,
    },
  ];

  return (
    <dl className="grid divide-y divide-border-default border-y border-border-default sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:py-4">
      {stats.map((stat) => (
        <StatItem key={stat.label} {...stat} />
      ))}
    </dl>
  );
}
