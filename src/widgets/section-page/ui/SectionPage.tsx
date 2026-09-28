import type { ReactNode } from "react";

import PageHero from "@/shared/ui/PageHero";
import LocalNav, { type LocalNavItem } from "@/widgets/local-nav/ui/LocalNav";

interface SectionPageProps {
  title: string;
  desc: string;
  /** LocalNav 상단 라벨. 좌측 메뉴를 두지 않는 페이지는 navItems와 함께 생략한다. */
  navTitle?: string;
  navItems?: LocalNavItem[];
  /** 좌측 LocalNav 노출 여부. 메뉴 목록은 있지만 신청 폼처럼 본문을 넓게 써야 할 때 false로 끈다. */
  showNav?: boolean;
  /** 본문 영역 클래스. 카드형 본문처럼 배경·여백을 덧붙일 때 덮어쓴다. */
  contentClassName?: string;
  children: ReactNode;
}

/**
 * PageHero + 좌측 LocalNav(선택) + 본문으로 이루어진 섹션 하위 페이지 공통 셸.
 *
 * 좌측 메뉴를 빼는 경로는 두 가지다. 넘길 메뉴 자체가 없으면 nav prop을 생략하고,
 * 메뉴는 있지만 이 페이지에서만 감추고 싶으면 showNav={false}를 준다. 어느 쪽이든
 * 본문이 컨테이너 폭을 모두 쓴다.
 */
export default function SectionPage({
  title,
  desc,
  navTitle,
  navItems,
  showNav = true,
  contentClassName = "min-w-0 flex-1",
  children,
}: SectionPageProps) {
  return (
    <div>
      <PageHero title={title} desc={desc} />

      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:flex-row sm:px-6">
        {showNav && navTitle && navItems?.length ? <LocalNav title={navTitle} items={navItems} /> : null}

        <div className={contentClassName}>{children}</div>
      </div>
    </div>
  );
}
