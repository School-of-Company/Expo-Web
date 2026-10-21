"use client";

import { useState } from "react";
import type { Attachment } from "@/entities/notice/model/types";
import AttachmentField from "./AttachmentField";

export default function NoticeBody({ initialContent = "", initialAttachments = [] }: { initialContent?: string; initialAttachments?: Attachment[] }) {
  const [content, setContent] = useState(initialContent);
  const [items, setItems] = useState(initialAttachments);
  const [preview, setPreview] = useState(false);
  const tab = (active: boolean) =>
    `rounded-small px-3 py-1 text-body-xs font-semibold ${active ? "bg-primary-50 text-fg-on-primary" : "text-fg-3 hover:bg-bg-subtle"}`;

  return (
    <>
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="content" className="text-body-s font-semibold text-fg-2">
            내용 <span className="text-danger">*</span>
          </label>
          <div className="flex gap-1">
            <button type="button" onClick={() => setPreview(false)} className={tab(!preview)}>
              작성
            </button>
            <button type="button" onClick={() => setPreview(true)} className={tab(preview)}>
              미리보기
            </button>
          </div>
        </div>
        {/* 폼 전송을 위해 미리보기 중에도 textarea를 마운트해 둔다 */}
        <textarea
          id="content"
          name="content"
          required
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`w-full rounded-small border border-border-default px-3 py-2.5 text-body-s leading-relaxed outline-none transition-colors duration-150 ease-out focus:border-primary-50 focus:ring-2 focus:ring-gray-20 ${preview ? "hidden" : ""}`}
        />
        {preview && (
          <div className="min-h-64 space-y-3 rounded-small border border-border-default px-3 py-2.5 text-body-s leading-relaxed text-fg-2">
            {content
              .split("\n")
              .map((line) => line.trim())
              .filter(Boolean)
              .map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            {items.map((a) =>
              a.type.startsWith("image/") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={a.url} src={a.url} alt={a.name} className="mx-auto max-h-[70vh] max-w-full rounded-small object-contain" />
              ) : (
                <p key={a.url} className="rounded-small border border-border-default px-4 py-3 font-medium text-fg-1">
                  {a.name}
                </p>
              ),
            )}
          </div>
        )}
      </div>
      <AttachmentField items={items} setItems={setItems} />
    </>
  );
}
