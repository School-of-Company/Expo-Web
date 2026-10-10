"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import type { Notice } from "@/entities/notice/model/types";
import Button from "@/shared/ui/Button";
import ConfirmDialog from "@/shared/ui/ConfirmDialog";
import { deleteNotices } from "../api/actions";

export default function AdminNoticeList({ notices }: { notices: Notice[] }) {
  const [selecting, setSelecting] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const allSelected = notices.length > 0 && selected.size === notices.length;

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  const [pendingIds, setPendingIds] = useState<string[] | null>(null);
  const [deleting, startDeleting] = useTransition();
  const pendingTitle = pendingIds?.length === 1 ? notices.find((n) => n.id === pendingIds[0])?.title : undefined;

  const exitSelecting = () => {
    setSelecting(false);
    setSelected(new Set());
  };

  const confirmDelete = () =>
    startDeleting(async () => {
      await deleteNotices(pendingIds ?? []);
      setPendingIds(null);
      exitSelecting();
    });

  return (
    <div className="mt-6">
      <div className="flex min-h-13 items-center justify-between gap-3 border-b-2 border-fg-1 pb-3 pl-3">
        {selecting ? (
          <>
            <label className="flex items-center gap-2 text-body-s font-semibold text-fg-2">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={() => setSelected(allSelected ? new Set() : new Set(notices.map((n) => n.id)))}
                className="h-4 w-4 accent-primary-50"
              />
              전체 선택
            </label>
            <div className="flex items-center gap-2">
              <Button variant="tertiary" size="s" onClick={exitSelecting}>
                취소
              </Button>
              <button
                type="button"
                disabled={selected.size === 0}
                onClick={() => setPendingIds([...selected])}
                className="inline-flex h-10 items-center justify-center rounded-small border border-danger bg-bg-canvas px-4 text-body-s font-bold text-danger transition-colors duration-150 ease-out hover:bg-danger/10 disabled:cursor-not-allowed disabled:border-transparent disabled:bg-bg-subtle disabled:text-fg-4"
              >
                선택 삭제{selected.size > 0 && ` (${selected.size})`}
              </button>
            </div>
          </>
        ) : (
          <>
            <span className="text-body-s text-fg-3">총 {notices.length}개</span>
            <div className="flex items-center gap-2">
              <Button variant="tertiary" size="s" onClick={() => setSelecting(true)}>
                선택
              </Button>
              <Button href="/admin/new" size="s">
                새 공지
              </Button>
            </div>
          </>
        )}
      </div>

      {notices.length === 0 && <p className="py-12 text-center text-body-s text-fg-3">등록된 공지가 없습니다.</p>}
      <ul className="divide-y divide-gray-20">
        {notices.map((n) => (
          <li key={n.id} className="flex items-center gap-4 px-3 py-4">
            {selecting && (
              <input
                type="checkbox"
                checked={selected.has(n.id)}
                onChange={() => toggle(n.id)}
                aria-label={`${n.title} 선택`}
                className="h-4 w-4 shrink-0 accent-primary-50"
              />
            )}
            <span className="w-24 shrink-0 text-body-s tabular-nums text-fg-3">{n.date}</span>
            <Link href={`/notice/${n.id}`} className="min-w-0 flex-1 truncate font-bold text-fg-1 hover:underline">
              {n.title}
            </Link>
            {!selecting && (
              <>
                <Link href={`/admin/${n.id}`} className="shrink-0 text-body-s font-semibold text-fg-link hover:underline">
                  수정
                </Link>
                <button
                  type="button"
                  onClick={() => setPendingIds([n.id])}
                  className="shrink-0 text-body-s font-semibold text-danger hover:underline"
                >
                  삭제
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      <ConfirmDialog
        open={pendingIds !== null}
        title={pendingTitle ? "공지를 삭제하시겠습니까?" : `공지 ${pendingIds?.length ?? 0}개를 삭제하시겠습니까?`}
        confirmLabel="삭제"
        danger
        pending={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setPendingIds(null)}
      >
        {pendingTitle && <p className="mb-1 font-semibold text-fg-1">{pendingTitle}</p>}
        삭제한 공지는 되돌릴 수 없습니다.
      </ConfirmDialog>
    </div>
  );
}
