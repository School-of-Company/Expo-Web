import { getBackgroundImage } from "@/shared/lib/getBackgroundImage";
import pageHeroBg from "../../../public/page-hero-bg.webp";

export default function PageHero({ title, desc }: { title: string; desc: string }) {
  return (
    <section
      className="border-b border-border-default bg-[#f6f6f6] bg-cover bg-center"
      style={{ backgroundImage: getBackgroundImage(pageHeroBg, { shouldPreload: true }) }}
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-heading-l font-bold text-fg-1">{title}</h1>
        <p className="mt-2 text-body-m text-fg-2">{desc}</p>
      </div>
    </section>
  );
}
