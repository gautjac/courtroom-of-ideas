"use client";

import Link from "next/link";
import type { CourtroomCase, TrialState } from "@/types/case";
import { SectionHeading } from "./TrialLayout";

export function DebriefView({
  caseData,
  state,
  onReplay,
}: {
  caseData: CourtroomCase;
  state: TrialState;
  onReplay: () => void;
}) {
  return (
    <section>
      <SectionHeading kicker="Coda" title="The debrief" />

      <div className="rule-top rule-bottom py-5 mb-10">
        <p className="text-[17px] leading-[1.7] text-[var(--ink)] max-w-[62ch]">
          {caseData.debrief.summary}
        </p>
      </div>

      {/* User's verdict reflected back */}
      <article className="mb-12">
        <div className="font-ui small-caps text-[11px] text-[var(--ink-faint)] mb-3">
          Your verdict, on the record
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {caseData.verdictAxes.map((axis) => {
            const v = state.verdictValues[axis.id];
            return (
              <div key={axis.id} className="rule-top pt-3">
                <div className="font-ui small-caps text-[10px] text-[var(--ink-faint)]">
                  {axis.axisName}
                </div>
                <div className="font-display text-2xl tracking-tight mt-1">
                  {typeof v === "number" ? v : "—"}
                </div>
                <div className="mt-1 flex justify-between font-ui text-[11px] text-[var(--ink-soft)]">
                  <span>{axis.lowLabel}</span>
                  <span>{axis.highLabel}</span>
                </div>
                <div className="relative h-1 bg-[var(--rule)] mt-2">
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-[var(--ink)]"
                    style={{
                      left: `${Math.max(0, Math.min(100, v ?? 50))}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {state.rulingText.trim().length > 0 && (
          <blockquote className="mt-6 pl-5 border-l-2 border-[var(--ink)] italic text-[16px] leading-[1.7] text-[var(--ink)] max-w-[62ch]">
            &ldquo;{state.rulingText.trim()}&rdquo;
          </blockquote>
        )}
      </article>

      {/* Cross-exam rationales */}
      <article className="mb-12">
        <div className="font-ui small-caps text-[11px] text-[var(--ink-faint)] mb-3">
          Cross-examination, unsealed
        </div>
        <div className="flex flex-col gap-6">
          {caseData.crossExam.map((prompt) => {
            const chosenId = state.crossExamChoices[prompt.id];
            const chosen = prompt.options.find((o) => o.id === chosenId);
            return (
              <div key={prompt.id} className="rule-top pt-4">
                <h3 className="font-display text-lg leading-[1.3] tracking-tight">
                  &ldquo;{prompt.prompt}&rdquo;
                </h3>
                {chosen ? (
                  <>
                    <p className="mt-2 text-[15px] leading-[1.6] text-[var(--ink)]">
                      <span className="font-ui small-caps text-[10px] text-[var(--ink-faint)] mr-2">
                        You answered
                      </span>
                      {chosen.label}
                    </p>
                    <p className="mt-2 text-[15px] leading-[1.65] text-[var(--ink-soft)] max-w-[62ch]">
                      <span className="font-ui small-caps text-[10px] text-[var(--accent)] mr-2">
                        Reasoning
                      </span>
                      {chosen.rationale}
                    </p>
                  </>
                ) : (
                  <p className="mt-2 font-ui text-xs text-[var(--ink-faint)] italic">
                    You did not answer this question.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </article>

      {/* Context */}
      <article className="mb-12 grid md:grid-cols-2 gap-x-10 gap-y-8">
        <div>
          <div className="font-ui small-caps text-[11px] text-[var(--ink-faint)] mb-3">
            Traditions defending the idea
          </div>
          <ul className="flex flex-col gap-1 text-[15px] leading-[1.55] text-[var(--ink)]">
            {caseData.debrief.defenseTraditions.map((t) => (
              <li key={t} className="rule-top pt-1">
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-ui small-caps text-[11px] text-[var(--ink-faint)] mb-3">
            Traditions critiquing the idea
          </div>
          <ul className="flex flex-col gap-1 text-[15px] leading-[1.55] text-[var(--ink)]">
            {caseData.debrief.critiqueTraditions.map((t) => (
              <li key={t} className="rule-top pt-1">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </article>

      <article className="mb-12">
        <div className="font-ui small-caps text-[11px] text-[var(--ink-faint)] mb-3">
          Context
        </div>
        <div className="text-[16px] leading-[1.7] text-[var(--ink)] max-w-[68ch] whitespace-pre-line">
          {caseData.debrief.contextNotes}
        </div>
      </article>

      {caseData.debrief.transferNotes && (
        <article className="mb-12">
          <div className="font-ui small-caps text-[11px] text-[var(--ink-faint)] mb-3">
            Where this argument travels
          </div>
          <p className="text-[16px] leading-[1.7] text-[var(--ink)] max-w-[68ch]">
            {caseData.debrief.transferNotes}
          </p>
        </article>
      )}

      {caseData.debrief.relatedCases.length > 0 && (
        <article className="mb-12">
          <div className="font-ui small-caps text-[11px] text-[var(--ink-faint)] mb-3">
            Related cases on the calendar
          </div>
          <ul className="flex flex-wrap gap-2">
            {caseData.debrief.relatedCases.map((r) => (
              <li
                key={r}
                className="font-ui small-caps text-[10px] text-[var(--ink-soft)] border border-[var(--rule)] px-2 py-0.5"
              >
                {r}
              </li>
            ))}
          </ul>
          <p className="mt-2 font-ui text-xs text-[var(--ink-faint)] italic">
            These cases are scheduled for future sessions.
          </p>
        </article>
      )}

      <div className="rule-top pt-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/"
          className="font-ui small-caps text-[11px] tracking-[0.16em] text-[var(--ink-soft)] hover:text-[var(--ink)]"
        >
          ← Return to the docket
        </Link>
        <button
          type="button"
          onClick={onReplay}
          className="font-ui small-caps text-[11px] tracking-[0.16em] px-5 py-3 border border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors"
        >
          Replay the case →
        </button>
      </div>
    </section>
  );
}
