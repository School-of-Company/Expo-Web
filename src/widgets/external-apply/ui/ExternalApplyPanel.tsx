"use client";

import Icon from "@/shared/ui/Icon";
import { getBackgroundImage } from "@/shared/lib/getBackgroundImage";
import { useExternalLinkGuard } from "@/shared/lib/useExternalLinkGuard";
import heroBgOrange from "../../../../public/hero-bg-orange.png";

export default function ExternalApplyPanel({
  href,
  label,
  title,
  tagline,
  body,
}: {
  href: string;
  label: string;
  title: string;
  tagline: string;
  body: string;
}) {
  const { isConfigured, onClick } = useExternalLinkGuard(href);

  return (
    <div
      className="rounded-xlarge bg-bg-muted bg-cover bg-center px-6 py-16 text-center text-fg-1 sm:px-12 sm:py-24"
      style={{ backgroundImage: getBackgroundImage(heroBgOrange, { shouldPreload: true }) }}
    >
      <div className="mx-auto max-w-2xl">
        <p className="text-heading-xs font-bold sm:text-heading-l">{title}</p>
        <p className="mt-3 text-body-l font-semibold text-primary-50 sm:text-heading-m">&ldquo;{tagline}&rdquo;</p>
        <p className="mt-6 whitespace-pre-line text-left text-body-m leading-relaxed text-fg-2 sm:text-center sm:text-body-l">{body}</p>

        <a
          href={isConfigured ? href : "#"}
          target={isConfigured ? "_blank" : undefined}
          rel={isConfigured ? "noopener noreferrer" : undefined}
          onClick={onClick}
          className="group mt-10 inline-flex items-center gap-2 rounded-medium bg-primary-50 px-10 py-4 text-body-m font-bold text-fg-on-primary transition-colors duration-150 ease-out hover:bg-primary-60 sm:text-body-l"
        >
          {label}
          <Icon name="arrow-right" className="h-6 w-6 transition-transform duration-150 ease-out group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
