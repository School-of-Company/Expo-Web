import NoticePage from "@/views/notice/ui/NoticePage";

export default async function Page(props: PageProps<"/notice">) {
  const { page } = await props.searchParams;
  return <NoticePage page={typeof page === "string" ? Number(page) : 1} />;
}
