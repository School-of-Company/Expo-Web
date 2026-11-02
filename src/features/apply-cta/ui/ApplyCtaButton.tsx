import ApplyClosedButton from "./ApplyClosedButton";

export default function ApplyCtaButton({ label }: { label: string }) {
  return (
    <ApplyClosedButton size="l" fullWidth className="mt-3">
      {label}
      <span aria-hidden="true">→</span>
    </ApplyClosedButton>
  );
}
