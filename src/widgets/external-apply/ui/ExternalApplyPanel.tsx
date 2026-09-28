import Icon from "@/shared/ui/Icon";

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
  return (
    <div className="rounded-xlarge bg-primary-70 px-6 py-16 text-center text-fg-on-primary sm:px-12 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <p className="text-heading-xs font-bold sm:text-heading-l">{title}</p>
        <p className="mt-3 text-body-l font-semibold text-primary-10 sm:text-heading-m">&ldquo;{tagline}&rdquo;</p>
        <p className="mt-6 whitespace-pre-line text-left text-body-m leading-relaxed text-white/85 sm:text-center sm:text-body-l">{body}</p>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex items-center gap-2 rounded-medium bg-bg-canvas px-10 py-4 text-body-m font-bold text-primary-70 transition-colors duration-150 ease-out hover:bg-primary-10 sm:text-body-l"
        >
          {label}
          <Icon name="arrow-right" className="h-6 w-6 transition-transform duration-150 ease-out group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
