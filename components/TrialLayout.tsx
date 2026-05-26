import type { ReactNode } from "react";

export type TrialStage = "opening" | "evidence" | "verdict" | "debrief";

const STAGES: { id: TrialStage; label: string; act: string }[] = [
  { id: "opening", label: "Opening statements", act: "Act I" },
  { id: "evidence", label: "Evidence & cross-exam", act: "Act II" },
  { id: "verdict", label: "Verdict", act: "Act III" },
  { id: "debrief", label: "Debrief", act: "Coda" },
];

export function TrialProgress({ current }: { current: TrialStage }) {
  const currentIndex = STAGES.findIndex((s) => s.id === current);
  return (
    <ol className="font-ui small-caps text-[11px] flex flex-wrap items-center gap-x-2 gap-y-1 text-[var(--ink-faint)]">
      {STAGES.map((s, i) => {
        const state =
          i < currentIndex ? "done" : i === currentIndex ? "current" : "pending";
        return (
          <li key={s.id} className="flex items-center gap-2">
            <span
              className={
                state === "current"
                  ? "text-[var(--ink)]"
                  : state === "done"
                    ? "text-[var(--ink-soft)] line-through decoration-[var(--rule)]"
                    : "text-[var(--ink-faint)]"
              }
              aria-current={state === "current" ? "step" : undefined}
            >
              {s.act}. {s.label}
            </span>
            {i < STAGES.length - 1 && (
              <span aria-hidden className="text-[var(--ink-faint)]">
                /
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export function TrialLayout({
  docketNumber,
  title,
  defendantIdea,
  stage,
  children,
}: {
  docketNumber: string;
  title: string;
  defendantIdea: string;
  stage: TrialStage;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-6">
      <header className="pt-12 pb-6">
        <div className="font-ui small-caps text-[11px] text-[var(--ink-faint)]">
          Case No. {docketNumber} &middot; The People v. {defendantIdea}
        </div>
        <h1 className="font-display text-3xl md:text-5xl leading-[1.08] tracking-tight mt-2">
          {title}
        </h1>
        <div className="mt-6 rule-top pt-4">
          <TrialProgress current={stage} />
        </div>
      </header>
      <div className="pb-20">{children}</div>
    </div>
  );
}

export function SectionHeading({
  kicker,
  title,
}: {
  kicker: string;
  title: string;
}) {
  return (
    <div className="mb-6">
      <div className="font-ui small-caps text-[11px] text-[var(--accent)]">
        {kicker}
      </div>
      <h2 className="font-display text-2xl md:text-3xl tracking-tight mt-1">
        {title}
      </h2>
    </div>
  );
}
