import PageHero from "@/shared/ui/PageHero";
import LocalNav from "@/widgets/local-nav/ui/LocalNav";
import ProgramInfoPanel from "@/shared/ui/ProgramInfoPanel";
import { studentsNavItems } from "@/shared/config/students-nav";

export default function StudentsGoldenBellPage() {
  return (
    <div>
      <PageHero title="AI·SW 골든벨" desc="초등부 · 중등부로 나누어 진행되는 퀴즈 배틀. 우승팀에게는 상품이 제공됩니다." />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:px-6">
        <LocalNav title="학생마당 (AI·SW교육)" items={studentsNavItems} />

        <div className="min-w-0 flex-1">
          <h2 className="text-heading-s font-bold text-fg-1">AI·SW 골든벨</h2>

          <ProgramInfoPanel
            schedules={[
              { label: "초등일시", value: "10.31(토) 13:30~14:30" },
              { label: "중고등일시", value: "11.1(일) 11:00~12:00" },
            ]}
            facts={[
              { label: "대상", value: "초·중·고 희망학생 (초등부·중고등부 각 50명)" },
              { label: "장소", value: "3층 대강당" },
            ]}
            notes={[
              { label: "내용", text: "AI·SW 기초상식 및 IT 관련 일반상식 퀴즈" },
              { label: "운영방식", text: "사전신청 및 현장신청을 통해 참여 가능" },
            ]}
            cta={{ href: "/apply/golden-bell", label: "골든벨 사전신청하기" }}
          />
        </div>
      </div>
    </div>
  );
}
