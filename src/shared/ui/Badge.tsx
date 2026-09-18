import type { ReactNode } from "react";

type Variant = "outlined-primary" | "outlined-tertiary" | "solid-primary" | "solid-pastel" | "success" | "warning" | "danger";

const VARIANT_CLASS: Record<Variant, string> = {
  "outlined-primary": "border border-primary-50 text-primary-60 bg-bg-canvas",
  "outlined-tertiary": "border border-border-default text-fg-2 bg-bg-canvas",
  "solid-primary": "bg-primary-50 text-fg-on-primary",
  "solid-pastel": "bg-primary-10 text-primary-70",
  success: "bg-success/10 text-success border border-success/30",
  warning: "bg-warning/10 text-warning border border-warning/30",
  danger: "bg-danger/10 text-danger border border-danger/30",
};

export default function Badge({
  variant = "outlined-primary",
  children,
  className = "",
}: {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-xsmall px-1.5 py-0.5 text-body-xs font-bold ${VARIANT_CLASS[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
