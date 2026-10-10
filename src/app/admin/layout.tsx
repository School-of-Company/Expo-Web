import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "관리자",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">{children}</div>;
}
