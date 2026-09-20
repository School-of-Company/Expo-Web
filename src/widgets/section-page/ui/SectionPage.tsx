import type { ReactNode } from "react";

import { NAV_SECTIONS } from "@/shared/config/site-nav";
import PageHero from "@/shared/ui/PageHero";
import LocalNav from "@/widgets/local-nav/ui/LocalNav";

interface SectionPageProps {
  /** 섹션 루트 href. LocalNav의 제목과 항목을 NAV_SECTIONS에서 끌어온다. */
  sectionHref: string;
  title: string;
  desc: string;
  /** 본문 영역 클래스. 조회 화면처럼 폭을 좁힐 때 덮어쓴다. */
  contentClassName?: string;
  children: ReactNode;
}

export default function SectionPage({
  sectionHref,
  title,
  desc,
  contentClassName = "min-w-0 flex-1",
  children,
}: SectionPageProps) {
  const section = NAV_SECTIONS.find((item) => (item.matchPrefix ?? item.href) === sectionHref);

  return (
    <div>
      <PageHero title={title} desc={desc} />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:px-6">
        {section && <LocalNav title={section.label} items={section.sub} />}
        <div className={contentClassName}>{children}</div>
      </div>
    </div>
  );
}
