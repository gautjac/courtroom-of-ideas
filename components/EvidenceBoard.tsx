"use client";

import type { EvidenceItem, EvidenceMark } from "@/types/case";

const MARKS: { value: Exclude<EvidenceMark, null>; label: string }[] = [
  { value: "strong", label: "Strong" },
  { value: "weak", label: "Weak" },
  { value: "emotional", label: "Emotional appeal" },
  { value: "unclear", label: "Unclear / missing context" },
];

const SIDE_LABEL: Record<EvidenceItem["side"], string> = {
  prosecution: "Prosecution exhibit",
  defense: "Defense exhibit",
  neutral: "Court exhibit",
};

const SIDE_COLOR: Record<EvidenceItem["side"], string> = {
  prosecution: "var(--prosecution)",
  defense: "var(--defense)",
  neutral: "var(--neutral)",
};

const TYPE_LABEL: Record<EvidenceItem["type"], string> = {
  historical: "Historical",
  quote: "Quote",
  example: "Example",
  policy: "Policy",
  counterexample: "Counterexample",
  edge_case: "Edge case",
};

export function EvidenceBoard({
  evidence,
  marks,
  onMark,
}: {
  evidence: EvidenceItem[];
  marks: Record<string, EvidenceMark>;
  onMark: (id: string, mark: EvidenceMark) => void;
}) {
  return (
    <div className="flex flex-col gap-10">
      {evidence.map((item, idx) => {
        const current = marks[item.id] ?? null;
        const exhibitLetter = String.fromCharCode(65 + idx);
        return (
          <article
            key={item.id}
            className="rule-top pt-5"
            aria-labelledby={`ev-${item.id}-title`}
          >
            <header className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
              <div className="font-ui small-caps text-[11px]">
                <span style={{ color: SIDE_COLOR[item.side] }}>
                  Exhibit {exhibitLetter} &middot; {SIDE_LABEL[item.side]}
                </span>
              </div>
              <div className="font-ui small-caps text-[11px] text-[var(--ink-faint)]">
                {TYPE_LABEL[item.type]}
              </div>
            </header>

            <h3
              id={`ev-${item.id}-title`}
              className="font-display text-xl md:text-2xl leading-[1.25] tracking-tight"
            >
              {item.title}
            </h3>
            <p className="mt-3 text-[15px] leading-[1.7] text-[var(--ink)] max-w-[62ch]">
              {item.body}
            </p>
            {item.sourceNote && (
              <p className="mt-3 font-ui text-xs text-[var(--ink-faint)] italic max-w-[62ch]">
                {item.sourceNote}
              </p>
            )}

            <div className="mt-5">
              <div
                className="font-ui small-caps text-[10px] text-[var(--ink-faint)] mb-2"
                id={`ev-${item.id}-legend`}
              >
                Mark this evidence as
              </div>
              <div
                role="radiogroup"
                aria-labelledby={`ev-${item.id}-legend`}
                className="flex flex-wrap gap-2"
              >
                {MARKS.map((m) => {
                  const selected = current === m.value;
                  return (
                    <button
                      type="button"
                      key={m.value}
                      role="radio"
                      aria-checked={selected}
                      onClick={() =>
                        onMark(item.id, selected ? null : m.value)
                      }
                      className={`font-ui small-caps text-[11px] tracking-[0.12em] px-3 py-2 border transition-colors ${
                        selected
                          ? "bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)]"
                          : "border-[var(--rule)] text-[var(--ink-soft)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
                      }`}
                    >
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
