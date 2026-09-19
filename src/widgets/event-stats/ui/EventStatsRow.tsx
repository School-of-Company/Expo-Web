import Link from "next/link";
import { congestionZones, type CongestionLevel } from "@/entities/congestion/model/data";
import { capacitySlots } from "@/entities/capacity/model/data";
import Icon, { type IconName } from "@/shared/ui/Icon";
import Badge from "@/shared/ui/Badge";

function StatCard({
  href,
  icon,
  label,
  badge,
  value,
  progress,
  desc,
}: {
  href: string;
  icon: IconName;
  label: string;
  badge: string;
  value: string;
  progress: number;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-3 rounded-xlarge border border-border-default bg-bg-canvas p-5 transition-colors duration-150 ease-out hover:border-primary-50 hover:shadow-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-medium bg-primary-50 text-fg-on-primary">
            <Icon name={icon} className="h-4 w-4" />
          </span>
          <span className="text-body-s font-bold text-fg-1">{label}</span>
        </div>
        <Badge variant="solid-pastel">{badge}</Badge>
      </div>
      <p className="text-heading-m font-bold text-fg-1">{value}</p>
      <div className="h-1.5 w-full overflow-hidden rounded-pill bg-bg-subtle">
        <div className="h-full rounded-pill bg-primary-50" style={{ width: `${Math.min(100, progress)}%` }} />
      </div>
      <p className="text-body-xs text-fg-3">{desc}</p>
    </Link>
  );
}

export default function EventStatsRow() {
  // 구역 평균 기준. 헤더 인디케이터는 최악 구역 기준이라 표기가 다를 수 있다.
  const avgCongestion = Math.round(congestionZones.reduce((sum, z) => sum + z.percent, 0) / congestionZones.length);
  const congestionLevel: CongestionLevel = avgCongestion < 40 ? "여유" : avgCongestion < 70 ? "보통" : avgCongestion < 90 ? "혼잡" : "매우 혼잡";

  const registerSlots = capacitySlots.filter((s) => s.program === "학생 사전등록");
  const registerCurrent = registerSlots.reduce((sum, s) => sum + s.current, 0);
  const registerTotal = registerSlots.reduce((sum, s) => sum + s.total, 0);
  const registerPercent = Math.round((registerCurrent / registerTotal) * 100);

  // TODO: 주차 데이터 소스가 생기면 entity로 옮긴다.
  const parkingTotal = 500;
  const parkingRemaining = 68;
  const parkingPercent = Math.round(((parkingTotal - parkingRemaining) / parkingTotal) * 100);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard
        href="/about/live"
        icon="users"
        label="행사장 혼잡도"
        badge="실시간 (예시)"
        value={`${congestionLevel} ${avgCongestion}%`}
        progress={avgCongestion}
        desc="구역별 혼잡도는 실시간 현황 페이지에서 확인하세요."
      />
      <StatCard
        href="/notice/parking"
        icon="car"
        label="주차 안내"
        badge="예시 데이터"
        value={`잔여 ${parkingRemaining}대 / ${parkingTotal}대`}
        progress={parkingPercent}
        desc="주차 공간이 한정되어 대중교통 이용을 권장합니다."
      />
      <StatCard
        href="/apply/register"
        icon="clipboard"
        label="사전등록 현황"
        badge="실시간 (예시)"
        value={`${registerCurrent.toLocaleString()}명`}
        progress={registerPercent}
        desc={`목표 ${registerTotal.toLocaleString()}명 대비 ${registerPercent}%`}
      />
    </div>
  );
}
