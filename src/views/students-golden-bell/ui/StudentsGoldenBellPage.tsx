import SectionPage from "@/widgets/section-page/ui/SectionPage";
import ProgramInfoPanel from "@/shared/ui/ProgramInfoPanel";
import { EXTERNAL_APPLY_LINKS } from "@/shared/config/external-apply-links";

const applyNotice = (
  <>
    사전 신청: <strong className="font-bold text-fg-1">10.26.(월) 08:30</strong>부터 홈페이지에서 선착순 접수
    <br />
    현장 신청: 행사 당일 <strong className="font-bold text-fg-1">09:30</strong>부터 홈페이지에서 선착순 접수
  </>
);

export default function StudentsGoldenBellPage() {
  return (
    <SectionPage
      title="AI·SW 골든벨"
      desc="AI·SW 시대를 이끌어 갈 여러분의 도전이 시작됩니다!"
    >
      <h2 className="text-heading-s font-bold text-fg-1">AI·SW 골든벨</h2>

      <ProgramInfoPanel
        schedules={[
          { label: "초등", value: "10.31.(토) 13:30~14:30" },
          { label: "중·고등", value: "11.1.(일) 11:00~12:00" },
        ]}
        facts={[
          { label: "대상", value: "초등학교 3~6학년 및 중·고등학생 (초등 100명, 중·고등 100명)" },
          { label: "장소", value: "AI교육원 3층 대강당\n(3층 대강당 앞에서 참가등록부 작성 후 입장)" },
        ]}
        notes={[
          { label: "내용", text: "AI·SW 기초상식 및 IT 관련 일반상식 퀴즈" },
          {
            label: "신청안내",
            text: "사전 신청: 10.26.(월) 8:30부터 홈페이지에서 선착순 접수\n현장 신청: 행사 당일 9:30부터 홈페이지에서 선착순 접수",
          },
        ]}
        cta={{
          href: EXTERNAL_APPLY_LINKS.goldenBell,
          label: "골든벨 사전 신청 및 조회",
          external: true,
          notice: <p className="text-body-s leading-relaxed text-fg-2">{applyNotice}</p>,
          noticeTitle: "골든벨 사전 신청 안내",
          opensAt: "2026-10-26T08:30:00+09:00",
        }}
      />
    </SectionPage>
  );
}
