import Link from "next/link";
import type { CourtroomCase } from "@/types/case";

const difficultyLabel: Record<CourtroomCase["difficulty"], string> = {
  easy: "Brief",
  medium: "Standard",
  hard: "Heavy",
};

export function CaseCard({
  caseData,
  index,
}: {
  caseData: CourtroomCase;
  index: number;
}) {
  const docketNumber = String(index + 1).padStart(3, "0");
  return (
    <article className="group rule-top pt-6 pb-7 flex flex-col gap-4">
      <header className="flex items-baseline justify-between gap-4">
        <div className="font-ui small-caps text-[11px] text-[var(--ink-faint)]">
          Case No. {docketNumber}
        </div>
        <div className="font-ui small-caps text-[11px] text-[var(--ink-faint)]">
          {difficultyLabel[caseData.difficulty]} · {caseData.estimatedMinutes} min
        </div>
      </header>

      <h2 className="font-display text-2xl md:text-[28px] leading-[1.15] tracking-tight">
        <Link
          href={`/cases/${caseData.slug}`}
          className="hover:text-[var(--accent)]"
        >
          {caseData.title}
        </Link>
      </h2>

      <p className="text-[15px] leading-[1.65] text-[var(--ink-soft)] max-w-[62ch]">
        <span className="font-ui small-caps text-[10px] text-[var(--ink-faint)] mr-2">
          Charge
        </span>
        {caseData.charge}
      </p>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-1">
        {caseData.domains.map((d) => (
          <span
            key={d}
            className="font-ui small-caps text-[10px] text-[var(--ink-soft)] border border-[var(--rule)] px-2 py-0.5"
          >
            {d}
          </span>
        ))}
      </div>

      <div className="mt-2">
        <Link
          href={`/cases/${caseData.slug}`}
          className="font-ui small-caps text-[11px] inline-flex items-center gap-2 text-[var(--ink)] border-b border-[var(--ink)] pb-0.5 hover:text-[var(--accent)] hover:border-[var(--accent)]"
        >
          Open the case →
        </Link>
      </div>
    </article>
  );
}
