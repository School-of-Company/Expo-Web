import NoticeDetailPage from "@/views/notice-detail/ui/NoticeDetailPage";

export default async function Page(props: PageProps<"/notice/[id]">) {
  const { id } = await props.params;
  return <NoticeDetailPage id={id} />;
}
