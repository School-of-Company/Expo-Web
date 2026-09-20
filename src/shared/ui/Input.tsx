import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export default function Input({ label, required, error, className = "", id, ...rest }: InputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-body-s font-semibold text-fg-2">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <input
        id={id}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-small border px-3 py-2.5 text-body-s outline-none transition-colors duration-150 ease-out focus:ring-2 disabled:cursor-not-allowed disabled:bg-bg-subtle disabled:text-fg-4 ${
          error
            ? "border-danger focus:border-danger focus:ring-danger/10"
            : "border-border-default focus:border-primary-50 focus:ring-primary-10"
        } ${className}`}
        {...rest}
      />
      {error && <p className="mt-1.5 text-body-xs text-danger">{error}</p>}
    </div>
  );
}
