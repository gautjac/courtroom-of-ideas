"use client";

import type { CourtroomCase } from "@/types/case";
import { SectionHeading } from "./TrialLayout";

export function OpeningStatements({
  caseData,
  onContinue,
}: {
  caseData: CourtroomCase;
  onContinue: () => void;
}) {
  return (
    <section>
      <SectionHeading kicker="Act I" title="Opening statements" />

      <div className="rule-top rule-bottom py-5 mb-8">
        <div className="font-ui small-caps text-[11px] text-[var(--ink-faint)] mb-2">
          The Charge
        </div>
        <p className="font-display text-xl md:text-2xl leading-[1.35] tracking-tight">
          {caseData.charge}
        </p>
        <p className="mt-4 text-[15px] leading-[1.65] text-[var(--ink-soft)] max-w-[62ch]">
          <span className="font-ui small-caps text-[10px] text-[var(--ink-faint)] mr-2">
            Why it matters now
          </span>
          {caseData.whyItMattersNow}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <article>
          <div className="font-ui small-caps text-[11px] text-[var(--prosecution)] mb-2">
            For the prosecution
          </div>
          <div className="border-t-2 border-[var(--prosecution)] pt-4">
            <p className="text-[16px] leading-[1.7] text-[var(--ink)]">
              {caseData.openingStatements.prosecution}
            </p>
          </div>
        </article>
        <article>
          <div className="font-ui small-caps text-[11px] text-[var(--defense)] mb-2">
            For the defense
          </div>
          <div className="border-t-2 border-[var(--defense)] pt-4">
            <p className="text-[16px] leading-[1.7] text-[var(--ink)]">
              {caseData.openingStatements.defense}
            </p>
          </div>
        </article>
      </div>

      <div className="mt-12 flex justify-end">
        <button
          type="button"
          onClick={onContinue}
          className="font-ui small-caps text-[11px] tracking-[0.16em] px-5 py-3 bg-[var(--ink)] text-[var(--bg)] hover:bg-[var(--accent)] transition-colors"
        >
          Continue to the evidence →
        </button>
      </div>
    </section>
  );
}
