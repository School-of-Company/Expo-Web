import type { ReactNode } from "react";

import PageHero from "@/shared/ui/PageHero";
import LocalNav, { type LocalNavItem } from "./LocalNav";

interface SectionPageProps {
  title: string;
  desc: string;
  navTitle?: string;
  navItems?: LocalNavItem[];
  showNav?: boolean;
  contentClassName?: string;
  children: ReactNode;
}

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
