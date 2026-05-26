"use client";

import { useMemo } from "react";
import type { VerdictAxis } from "@/types/case";
import { SectionHeading } from "./TrialLayout";

export function VerdictForm({
  axes,
  values,
  rulingText,
  onChangeValue,
  onChangeRuling,
  onSubmit,
  onBack,
}: {
  axes: VerdictAxis[];
  values: Record<string, number>;
  rulingText: string;
  onChangeValue: (id: string, v: number) => void;
  onChangeRuling: (text: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const allSet = useMemo(
    () => axes.every((a) => typeof values[a.id] === "number"),
    [axes, values],
  );

  return (
    <section>
      <SectionHeading kicker="Act III" title="Deliver the verdict" />

      <p className="text-[15px] leading-[1.65] text-[var(--ink-soft)] max-w-[62ch] mb-8">
        Position yourself on each axis. There is no neutral default; the court
        requires you to take a position you can defend.
      </p>

      <div className="flex flex-col gap-10">
        {axes.map((axis) => {
          const v = values[axis.id];
          const set = typeof v === "number";
          return (
            <div key={axis.id} className="rule-top pt-5">
              <div className="flex items-baseline justify-between mb-3">
                <div className="font-ui small-caps text-[11px] text-[var(--ink-faint)]">
                  {axis.axisName}
                </div>
                <div className="font-ui small-caps text-[11px] text-[var(--ink)]">
                  {set ? `${v}` : "—"}
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={set ? v : 50}
                onChange={(e) =>
                  onChangeValue(axis.id, Number(e.target.value))
                }
                aria-label={axis.axisName}
                className={`w-full ${set ? "" : "opacity-50"}`}
              />
              <div className="mt-2 flex justify-between font-ui text-xs text-[var(--ink-soft)]">
                <span>{axis.lowLabel}</span>
                <span>{axis.highLabel}</span>
              </div>
              {!set && (
                <button
                  type="button"
                  onClick={() => onChangeValue(axis.id, 50)}
                  className="mt-2 font-ui small-caps text-[10px] underline text-[var(--ink-soft)]"
                >
                  Take a position on this axis
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12">
        <label
          htmlFor="ruling-text"
          className="font-ui small-caps text-[11px] text-[var(--ink-faint)] block mb-2"
        >
          Explain your ruling
        </label>
        <textarea
          id="ruling-text"
          rows={5}
          value={rulingText}
          onChange={(e) => onChangeRuling(e.target.value)}
          placeholder="In your own words, defend the verdict you just rendered. Two or three sentences are enough."
          className="w-full bg-[var(--bg-elev)] border border-[var(--rule)] p-4 font-serif text-[16px] leading-[1.65] text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--ink)] outline-none"
        />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="font-ui small-caps text-[11px] tracking-[0.16em] text-[var(--ink-soft)] hover:text-[var(--ink)]"
        >
          ← Back to evidence
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!allSet}
          className={`font-ui small-caps text-[11px] tracking-[0.16em] px-5 py-3 transition-colors ${
            allSet
              ? "bg-[var(--ink)] text-[var(--bg)] hover:bg-[var(--accent)]"
              : "bg-[var(--rule)] text-[var(--ink-faint)] cursor-not-allowed"
          }`}
        >
          {allSet ? "Render the verdict →" : "Set every axis to continue"}
        </button>
      </div>
    </section>
  );
}
