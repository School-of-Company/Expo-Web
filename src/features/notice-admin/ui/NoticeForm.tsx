import type { Notice } from "@/entities/notice/model/types";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import { saveNotice } from "../api/actions";
import NoticeBody from "./NoticeBody";

export default function NoticeForm({ notice }: { notice?: Notice }) {
  return (
    <form action={saveNotice} className="flex flex-col gap-5">
      {notice && <input type="hidden" name="id" value={notice.id} />}
      <Input id="title" name="title" label="제목" required defaultValue={notice?.title} />
      <NoticeBody initialContent={notice?.content.join("\n")} initialAttachments={notice?.attachments} />
      <div className="flex justify-end gap-2">
        <Button href="/admin" variant="tertiary">
          취소
        </Button>
        <Button type="submit">{notice ? "수정" : "등록"}</Button>
      </div>
    </form>
  );
}
