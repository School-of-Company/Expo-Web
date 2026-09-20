import Button from "./Button";
import Badge from "./Badge";

interface ScheduleItem {
  label: string;
  value: string;
}

interface FactItem {
  label: string;
  value: string;
}

interface NoteItem {
  label: string;
  text: string;
}

export default function ProgramInfoPanel({
  schedules,
  facts,
  notes,
  cta,
}: {
  schedules?: ScheduleItem[];
  facts: FactItem[];
  notes: NoteItem[];
  cta: { href: string; label: string };
}) {
  return (
    <div className="mt-4 flex flex-col gap-3">
      {schedules && schedules.length > 0 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {schedules.map((s) => (
            <div
              key={s.label}
              className="flex min-w-0 flex-1 items-center gap-3 rounded-large border border-border-default bg-bg-canvas p-4 sm:basis-48"
            >
              <Badge variant="solid-primary" className="shrink-0">
                {s.label}
              </Badge>
              <p className="min-w-0 text-body-s font-semibold text-fg-1">{s.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {facts.map((f) => (
          <div key={f.label} className="flex items-center gap-4 rounded-large border border-border-default bg-bg-canvas p-5">
            <Badge variant="outlined-primary" className="shrink-0 px-3 py-1.5 text-body-s">
              {f.label}
            </Badge>
            <p className="text-body-s text-fg-2">{f.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-large border border-border-default bg-bg-canvas p-5">
        {notes.map((n) => (
          <div key={n.label} className="flex items-start gap-3">
            <Badge variant="outlined-tertiary" className="mt-0.5 shrink-0">
              {n.label}
            </Badge>
            <p className="text-body-s text-fg-2">{n.text}</p>
          </div>
        ))}
      </div>

      <Button href={cta.href} size="l" fullWidth className="mt-3">
        {cta.label}
        <span aria-hidden="true">→</span>
      </Button>
    </div>
  );
}
