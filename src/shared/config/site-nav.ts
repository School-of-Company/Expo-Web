import { applyNavItems } from "./apply-nav";
import { guideNavItems } from "./guide-nav";
import { studentsNavItems } from "./students-nav";
import { teachersNavItems } from "./teachers-nav";
import { noticeNavItems } from "./notice-nav";

export interface NavSubItem {
  key: string;
  href: string;
  label: string;
}

export interface NavSection {
  key: string;
  href: string;
  matchPrefix?: string;
  label: string;
  sub: NavSubItem[];
  external?: boolean;
}

export const NAV_SECTIONS: NavSection[] = [
  {
    key: "guide",
    href: "/guide",
    label: "박람회 안내",
    sub: guideNavItems,
  },
  {
    key: "students",
    href: "/students",
    label: "학생마당",
    sub: studentsNavItems,
  },
  {
    key: "teachers",
    href: "/teachers",
    label: "교사마당",
    sub: teachersNavItems,
  },
  {
    key: "apply",
    href: "/apply/register",
    matchPrefix: "/apply",
    label: "사전신청",
    sub: applyNavItems.map((item) => ({ key: item.key, href: item.href, label: item.label })),
  },
  {
    key: "notice",
    href: "/notice",
    label: "알림마당",
    sub: noticeNavItems,
  },
];
