import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { notices } from "@/entities/notice/model/data";
import { pageMetadata } from "@/shared/config/site";
import NoticeDetailPage from "@/views/notice-detail/ui/NoticeDetailPage";

export function generateStaticParams() {
  return notices.map((n) => ({ id: n.id }));
}

export async function generateMetadata(props: PageProps<"/notice/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const notice = notices.find((n) => n.id === id);
  if (!notice) notFound();
  return pageMetadata(notice.title, notice.content[0] ?? notice.title, `/notice/${id}`);
}

export default async function Page(props: PageProps<"/notice/[id]">) {
  const { id } = await props.params;
  return <NoticeDetailPage id={id} />;
}
