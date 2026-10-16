"use client";

import { Fragment, useState } from "react";
import SectionPage from "@/widgets/section-page/ui/SectionPage";
import { noticeNavItems } from "@/shared/config/notice-nav";
import { faqs, type Faq } from "@/entities/faq/model/data";

type Filter = "전체" | Faq["category"];

/** 질문이 하나도 없는 대상은 탭에서 뺀다. */
const FILTERS: Filter[] = (["전체", "공통", "학생", "교사"] as const).filter(
  (f) => f === "전체" || faqs.some((faq) => faq.category === f),
);

/** "**굵게**" 표기를 <strong>으로 바꿔 답변 속 핵심 문구를 강조한다. */
function RichText({ text }: { text: string }) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-bold text-fg-1">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export default function NoticeFaqPage() {
  const [filter, setFilter] = useState<Filter>("전체");

  const visibleFaqs = filter === "전체" ? faqs : faqs.filter((f) => f.category === filter);
  const countOf = (f: Filter) => (f === "전체" ? faqs.length : faqs.filter((faq) => faq.category === f).length);

  return (
    <SectionPage title="FAQ" desc="자주 묻는 질문을 확인하세요." navTitle="알림마당" navItems={noticeNavItems}>
      <h2 className="text-heading-s font-bold text-fg-1">FAQ</h2>

      {/* 탭은 사이트의 다른 탭(부스 안내 등)과 같은 밑줄형으로 맞춘다. */}
      <div role="group" aria-label="질문 대상" className="mt-4 flex gap-1 border-b border-border-default">
        {FILTERS.map((f) => {
          const isActive = filter === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={isActive}
              onClick={() => setFilter(f)}
              className={`-mb-px flex shrink-0 items-center gap-1 border-b-2 px-3 py-3 text-body-s font-bold transition-colors duration-150 ease-out sm:px-4 ${
                isActive ? "border-primary-50 text-primary-50" : "border-transparent text-fg-3 hover:text-fg-1"
              }`}
            >
              {f}
              <span className="font-semibold tabular-nums">{countOf(f)}</span>
            </button>
          );
        })}
      </div>

      {/* 질문이 몇 개 안 되므로 접지 않고 답변까지 모두 펼쳐 보여준다. */}
      <ul className="mt-6 border-t-2 border-fg-1">
        {visibleFaqs.map((f) => (
          <li key={f.q} className="border-b border-border-default px-2 py-5 sm:px-4 sm:py-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <span aria-hidden className="w-5 shrink-0 text-body-s font-extrabold leading-snug text-primary-50 sm:text-body-m">
                Q
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-body-xs font-bold text-fg-3">{f.category}</p>
                <h3 className="mt-1 text-body-s font-bold leading-snug text-fg-1 sm:text-body-m">{f.q}</h3>
              </div>
            </div>
            <div className="mt-4 flex gap-3 sm:gap-4">
              <span aria-hidden className="w-5 shrink-0 text-body-s font-extrabold leading-relaxed text-fg-3 sm:text-body-m">
                A
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-3 text-body-xs leading-relaxed text-fg-2 sm:text-body-s">
                {f.a.split("\n\n").map((paragraph) => (
                  <p key={paragraph}>
                    <RichText text={paragraph} />
                  </p>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </SectionPage>
  );
}
