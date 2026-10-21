"use client";

import { upload } from "@vercel/blob/client";
import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import type { Attachment } from "@/entities/notice/model/types";
import Button from "@/shared/ui/Button";

export default function AttachmentField({
  items,
  setItems,
}: {
  items: Attachment[];
  setItems: Dispatch<SetStateAction<Attachment[]>>;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function onPick(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setError("");
    try {
      const added: Attachment[] = [];
      for (const file of files) {
        if (file.type.startsWith("video/")) throw new Error("영상은 올릴 수 없습니다.");
        if (file.size > 20 * 1024 * 1024) throw new Error(`${file.name}: 20MB 이하만 올릴 수 있습니다.`);
        const blob = await upload(file.name, file, { access: "public", handleUploadUrl: "/api/admin/upload" });
        added.push({ url: blob.url, name: file.name, type: file.type });
      }
      setItems((prev) => [...prev, ...added]);
    } catch (e) {
      setError((e as Error).message || "업로드에 실패했습니다.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <p className="mb-1.5 text-body-s font-semibold text-fg-2">
        첨부 (이미지·파일, 파일당 20MB 이하)
      </p>
      <input type="hidden" name="attachments" value={JSON.stringify(items)} />
      <input
        ref={fileRef}
        type="file"
        multiple
        hidden
        onChange={(e) => {
          onPick(e.target.files);
          e.target.value = "";
        }}
      />
      <Button type="button" variant="tertiary" size="s" disabled={busy} onClick={() => fileRef.current?.click()}>
        {busy ? "업로드 중..." : "파일 선택"}
      </Button>
      {busy && <p className="mt-1.5 text-body-xs text-fg-3">업로드가 끝날 때까지 기다려 주세요.</p>}
      {error && <p className="mt-1.5 text-body-xs text-danger">{error}</p>}
      <ul className="mt-3 space-y-2">
        {items.map((a) => (
          <li key={a.url} className="flex items-center gap-3 text-body-s text-fg-2">
            {a.type.startsWith("image/") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={a.url} alt={a.name} className="h-16 w-16 rounded-small border border-border-default object-cover" />
            ) : (
              <span className="flex h-16 w-16 items-center justify-center rounded-small border border-border-default bg-bg-subtle text-body-xs text-fg-3">
                파일
              </span>
            )}
            <span className="min-w-0 flex-1 truncate">{a.name}</span>
            <button type="button" onClick={() => setItems((prev) => prev.filter((i) => i.url !== a.url))} className="text-body-xs text-danger">
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
