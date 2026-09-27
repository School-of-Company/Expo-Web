import Link from "next/link";
import Icon, { type IconName } from "@/shared/ui/Icon";

interface QuickApplyItem {
  href: string;
  icon: IconName;
  title: string;
  desc: string;
}

interface QuickApplyGroup {
  key: string;
  icon: IconName;
  title: string;
  desc: string;
  items: QuickApplyItem[];
}

const GROUPS: QuickApplyGroup[] = [
  {
    key: "all",
    icon: "users",
    title: "전체",
    desc: "모두를 위한 AI, 함께 열어가는 미래",
    items: [{ href: "/teachers/lecture", icon: "mic", title: "특별 강연 신청", desc: "AI가 만드는 우리의 일상, 미래를 만나는 시간" }],
  },
  {
    key: "students",
    icon: "book",
    title: "학생",
    desc: "AI·SW로 꿈을 키우는 미래의 주인공",
    items: [
      { href: "/students", icon: "map-pin", title: "AI·SW체험한마당 부스 안내", desc: "체험 부스 위치와 프로그램을 확인하세요" },
      { href: "/students/golden-bell", icon: "trophy", title: "AI·SW 골든벨 신청", desc: "도전하고, 배우고, 성장하는 AI·SW 퀴즈 대회" },
      { href: "/students/ai-tour", icon: "compass", title: "오디세이 투어 신청", desc: "보고, 체험하고, 탐험하는 AI·SW 체험 투어" },
    ],
  },
  {
    key: "teachers",
    icon: "clipboard",
    title: "교사",
    desc: "함께 만들어가는 2030 미래교육",
    items: [
      { href: "/teachers", icon: "map-pin", title: "미래교육박람회 부스 안내", desc: "교사를 위한 미래교육 부스 전시를 확인하세요" },
      { href: "/teachers/training", icon: "book", title: "교사 연수 신청", desc: "AI 시대, 교사의 성장을 지원하는 전문 연수" },
    ],
  },
];

export default function QuickApplyGroups() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {GROUPS.map((group) => (
        <div key={group.key} className="flex flex-col rounded-xlarge bg-gray-10 p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-medium bg-primary-50 text-fg-on-primary">
              <Icon name={group.icon} className="h-5 w-5" />
            </span>
            <div>
              <p className="text-body-l font-bold text-fg-1">{group.title}</p>
              <p className="text-body-xs text-fg-3">{group.desc}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-1 flex-col gap-2 border-t border-border-default pt-5">
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col gap-1.5 rounded-medium bg-bg-canvas px-4 py-3.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-body-s font-bold text-fg-1">
                    <Icon name={item.icon} className="h-4 w-4 text-primary-60" />
                    {item.title}
                  </span>
                  <Icon name="arrow-right" className="h-4 w-4 shrink-0 text-fg-3 transition-colors duration-150 ease-out group-hover:text-primary-60" />
                </div>
                <p className="text-body-xs leading-relaxed text-fg-3">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
