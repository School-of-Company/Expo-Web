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
        <p className="text-heading-m font-bold">{title}</p>
        <p className="mt-3 text-body-l font-semibold text-primary-10">&ldquo;{tagline}&rdquo;</p>
        <p className="mt-6 whitespace-pre-line text-body-s leading-relaxed text-fg-on-primary/85 sm:text-body-m">{body}</p>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 rounded-medium bg-bg-canvas px-10 py-4 text-body-s font-bold text-primary-70 transition-colors duration-150 ease-out hover:bg-primary-10 sm:text-body-m"
        >
          {label}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
