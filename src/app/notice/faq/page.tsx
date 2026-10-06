import { pageMetadata } from "@/shared/config/site";
import { faqs } from "@/entities/faq/model/data";
import JsonLd from "@/shared/ui/JsonLd";
import NoticeFaqPage from "@/views/notice-faq/ui/NoticeFaqPage";

export const metadata = pageMetadata("자주 묻는 질문(FAQ)", "AI미래교육박람회 참가·신청·행사장 이용 관련 자주 묻는 질문과 답변", "/notice/faq");

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <NoticeFaqPage />
    </>
  );
}
