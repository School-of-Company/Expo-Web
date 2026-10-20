import type { Notice } from "@/entities/notice/model/types";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import { saveNotice } from "../api/actions";

export default function NoticeForm({ notice }: { notice?: Notice }) {
  const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Seoul" });

  return (
    <form action={saveNotice} className="flex flex-col gap-5">
      {notice && <input type="hidden" name="id" value={notice.id} />}
      <Input id="title" name="title" label="제목" required defaultValue={notice?.title} />
      <Input
        id="date"
        name="date"
        type="date"
        label="게시일"
        required
        defaultValue={notice ? notice.date.replaceAll(".", "-") : today}
        className="max-w-48"
      />
      <div>
        <label htmlFor="content" className="mb-1.5 block text-body-s font-semibold text-fg-2">
          내용 <span className="text-danger">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={12}
          defaultValue={notice?.content.join("\n")}
          className="w-full rounded-small border border-border-default px-3 py-2.5 text-body-s leading-relaxed outline-none transition-colors duration-150 ease-out focus:border-primary-50 focus:ring-2 focus:ring-gray-20"
        />
        <p className="mt-1.5 text-body-xs text-fg-3">줄을 바꾸면 문단이 나뉩니다.</p>
      </div>
      <div className="flex justify-end gap-2">
        <Button href="/admin" variant="tertiary">
          취소
        </Button>
        <Button type="submit">{notice ? "수정" : "등록"}</Button>
      </div>
    </form>
  );
}
