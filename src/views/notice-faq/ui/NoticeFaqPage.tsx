"use client";

import { Fragment, useState } from "react";
import SectionPage from "@/widgets/section-page/ui/SectionPage";
import Icon from "@/shared/ui/Icon";
import { noticeNavItems } from "@/shared/config/notice-nav";
import { faqs, type Faq } from "@/entities/faq/model/data";

type Filter = "전체" | Faq["category"];

const FILTERS: Filter[] = ["전체", "공통", "학생", "교사"];

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
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

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
              onClick={() => {
                setFilter(f);
                setOpenQuestion(null);
              }}
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

      <ul className="mt-6 border-t-2 border-fg-1">
        {visibleFaqs.map((f) => {
          const isOpen = openQuestion === f.q;
          const panelId = `faq-${faqs.indexOf(f)}`;

          return (
            <li key={f.q} className="border-b border-border-default">
              <button
                type="button"
                onClick={() => setOpenQuestion(isOpen ? null : f.q)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="group flex w-full cursor-pointer items-start gap-3 px-2 py-5 text-left transition-colors duration-150 ease-out hover:bg-bg-subtle sm:gap-4 sm:px-4 sm:py-6"
              >
                <span aria-hidden className="w-5 shrink-0 text-body-s font-extrabold leading-snug text-primary-50 sm:text-body-m">
                  Q
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-body-xs font-bold text-fg-3">{f.category}</span>
                  <span
                    className={`mt-1 block text-body-s font-bold leading-snug transition-colors duration-150 ease-out sm:text-body-m ${
                      isOpen ? "text-primary-50" : "text-fg-1"
                    }`}
                  >
                    {f.q}
                  </span>
                </span>
                <Icon
                  name="chevron-down"
                  className={`mt-0.5 h-5 w-5 shrink-0 text-fg-3 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-fg-1 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                id={panelId}
                className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden" inert={!isOpen}>
                  <div className="flex gap-3 bg-bg-canvas px-2 pb-6 sm:gap-4 sm:px-4 sm:pb-7">
                    <span aria-hidden className="w-5 shrink-0 text-body-s font-extrabold leading-relaxed text-fg-3 sm:text-body-m">
                      A
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col gap-3 text-body-xs leading-relaxed text-fg-2 sm:pr-9 sm:text-body-s">
                      {f.a.split("\n\n").map((paragraph) => (
                        <p key={paragraph}>
                          <RichText text={paragraph} />
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </SectionPage>
  );
}
