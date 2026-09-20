import type { ReactNode } from "react";

import PageHero from "@/shared/ui/PageHero";
import LocalNav, { type LocalNavItem } from "@/widgets/local-nav/ui/LocalNav";

interface SectionPageProps {
  title: string;
  desc: string;
  /** LocalNav 상단 라벨. 섹션 이름을 그대로 넘긴다. */
  navTitle: string;
  navItems: LocalNavItem[];
  /** 본문 영역 클래스. 카드형 본문처럼 배경·여백을 덧붙일 때 덮어쓴다. */
  contentClassName?: string;
  children: ReactNode;
}

/** PageHero + LocalNav + 본문으로 이루어진 섹션 하위 페이지 공통 셸. */
export default function SectionPage({
  title,
  desc,
  navTitle,
  navItems,
  contentClassName = "min-w-0 flex-1",
  children,
}: SectionPageProps) {
  return (
    <div>
      <PageHero title={title} desc={desc} />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:px-6">
        <LocalNav title={navTitle} items={navItems} />

        <div className={contentClassName}>{children}</div>
      </div>
    </div>
  );
}
