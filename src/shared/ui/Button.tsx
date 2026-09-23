import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Size = "l" | "m" | "s";
type Variant = "primary" | "secondary" | "tertiary";

const SIZE_CLASS: Record<Size, string> = {
  l: "h-14 px-6 text-body-l rounded-medium",
  m: "h-12 px-5 text-body-m rounded-small",
  s: "h-10 px-4 text-body-s rounded-small",
};

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "bg-primary-50 text-fg-on-primary hover:bg-primary-60 active:bg-primary-70",
  secondary: "bg-bg-canvas text-primary-60 border border-primary-50 hover:bg-primary-10",
  tertiary: "bg-bg-canvas text-fg-1 border border-border-default hover:bg-bg-subtle",
};

const DISABLED_CLASS = "disabled:bg-bg-subtle disabled:text-fg-4 disabled:border-transparent disabled:cursor-not-allowed disabled:hover:bg-bg-subtle";

const BASE = "group inline-flex items-center justify-center gap-2 font-bold transition-colors duration-150 ease-out";

interface CommonProps {
  size?: Size;
  variant?: Variant;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; external?: boolean };

export default function Button(props: ButtonAsButton | ButtonAsLink) {
  const { size = "m", variant = "primary", fullWidth = false, children, className = "", ...rest } = props;
  const classes = `${BASE} ${SIZE_CLASS[size]} ${VARIANT_CLASS[variant]} ${DISABLED_CLASS} ${fullWidth ? "w-full" : ""} ${className}`;

  if ("href" in props && props.href) {
    const { href, external, ...anchorRest } = rest as { href: string; external?: boolean } & Omit<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      "href"
    >;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...anchorRest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
