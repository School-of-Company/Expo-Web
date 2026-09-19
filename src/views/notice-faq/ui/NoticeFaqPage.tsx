"use client";

import { useState } from "react";
import PageHero from "@/shared/ui/PageHero";
import { LocalNav } from "@/widgets/local-nav";
import Badge from "@/shared/ui/Badge";
import Icon from "@/shared/ui/Icon";
import { noticeNavItems } from "@/shared/config/notice-nav";
import { faqs } from "@/entities/faq/model/data";

export default function NoticeFaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const navItems = noticeNavItems.map((item) => (item.key === "faq" ? { ...item, active: true } : item));

  return (
    <div>
      <PageHero title="FAQ" desc="자주 묻는 질문을 확인하세요." />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:px-6">
        <LocalNav title="알림마당" items={navItems} />

        <div className="min-w-0 flex-1">
          <h2 className="text-heading-s font-bold text-fg-1">FAQ</h2>
          <div className="mt-4 divide-y divide-gray-20 border-t-2 border-fg-1">
            {faqs.map((f, i) => {
              const isOpen = openIndex === i;

              return (
                <div key={f.q} className="px-3 py-4">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-3 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <Badge variant="solid-pastel">{f.category}</Badge>
                      <span className="text-body-m font-bold text-fg-1">{f.q}</span>
                    </span>
                    <Icon
                      name="chevron-down"
                      className={`h-4 w-4 shrink-0 text-fg-3 transition-transform duration-200 ease-out ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-200 ease-in-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="mt-3 text-body-s leading-relaxed text-fg-2">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
