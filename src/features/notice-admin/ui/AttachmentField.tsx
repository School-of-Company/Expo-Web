"use client";

import { upload } from "@vercel/blob/client";
import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import type { Attachment } from "@/entities/notice/model/types";
import Button from "@/shared/ui/Button";

const MAX_EDGE = 1920;

// 긴 변을 1920px로 줄이고 JPEG는 q0.88로 다시 인코딩한다. PNG는 무손실 그대로 줄이기만 한다.
// 결과가 원본보다 크면 원본을 쓴다. GIF(애니메이션)·SVG 등 그 외 형식은 건드리지 않는다.
async function optimizeImage(file: File): Promise<File> {
  if (file.type !== "image/jpeg" && file.type !== "image/png") return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, file.type, 0.88));
    return blob && blob.size < file.size ? new File([blob], file.name, { type: file.type }) : file;
  } catch {
    return file;
  }
}

export default function AttachmentField({
  items,
  setItems,
}: {
  items: Attachment[];
  setItems: Dispatch<SetStateAction<Attachment[]>>;
}) {
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function onPick(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setProgress(0);
    setError("");
    try {
      const list = [...files];
      for (const file of list) {
        if (file.type.startsWith("video/")) throw new Error("영상은 올릴 수 없습니다.");
        if (file.size > 20 * 1024 * 1024) throw new Error(`${file.name}: 20MB 이하만 올릴 수 있습니다.`);
      }
      // 파일을 동시에 최적화·업로드한다. 진행률은 파일별 값의 평균.
      const percents = list.map(() => 0);
      const added = await Promise.all(
        list.map(async (file, i) => {
          const blob = await upload(file.name, await optimizeImage(file), {
            access: "public",
            handleUploadUrl: "/api/admin/upload",
            onUploadProgress: ({ percentage }) => {
              percents[i] = percentage;
              setProgress(Math.round(percents.reduce((a, b) => a + b, 0) / list.length));
            },
          });
          return { url: blob.url, name: file.name, type: file.type };
        }),
      );
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
        {busy ? `업로드 중... ${progress}%` : "파일 선택"}
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
