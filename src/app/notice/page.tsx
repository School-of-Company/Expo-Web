import { NoticePage } from "@/views/notice";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page } = await searchParams;
  const pageParam = Array.isArray(page) ? page[0] : page;
  const pageNumber = Number(pageParam) || 1;

  return <NoticePage page={pageNumber} />;
}
