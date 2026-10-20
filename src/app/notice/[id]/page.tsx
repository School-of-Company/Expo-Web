import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getNotice, getNotices } from "@/entities/notice/api/notices";
import { HOST_REF, pageMetadata, SITE_URL } from "@/shared/config/site";
import JsonLd from "@/shared/ui/JsonLd";
import NoticeDetailPage from "@/views/notice-detail/ui/NoticeDetailPage";

export async function generateStaticParams() {
  return (await getNotices()).map((n) => ({ id: n.id }));
}

export async function generateMetadata(props: PageProps<"/notice/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const notice = await getNotice(id);
  if (!notice) notFound();
  return pageMetadata(notice.title, notice.content[0] ?? notice.title, `/notice/${id}`);
}

export default async function Page(props: PageProps<"/notice/[id]">) {
  const { id } = await props.params;
  const notice = await getNotice(id);
  if (!notice) notFound();
  // 공지 날짜 형식: "2026.08.20"
  const published = `${notice.date.replaceAll(".", "-")}T00:00:00+09:00`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: notice.title,
          description: notice.content[0] ?? notice.title,
          articleBody: notice.content.join("\n"),
          datePublished: published,
          dateModified: published,
          inLanguage: "ko",
          url: `${SITE_URL}/notice/${id}`,
          image: `${SITE_URL}/opengraph-image.png`,
          author: HOST_REF,
          publisher: HOST_REF,
          isPartOf: { "@id": `${SITE_URL}/#website` },
        }}
      />
      <NoticeDetailPage id={id} />
    </>
  );
}
