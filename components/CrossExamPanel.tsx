"use client";

import type { CrossExamPrompt } from "@/types/case";

export function CrossExamPanel({
  prompts,
  choices,
  onChoose,
}: {
  prompts: CrossExamPrompt[];
  choices: Record<string, string>;
  onChoose: (promptId: string, optionId: string) => void;
}) {
  return (
    <div className="flex flex-col gap-10">
      {prompts.map((prompt, idx) => {
        const chosen = choices[prompt.id];
        return (
          <article
            key={prompt.id}
            className="rule-top pt-5"
            aria-labelledby={`ce-${prompt.id}-title`}
          >
            <div className="font-ui small-caps text-[11px] text-[var(--ink-faint)] mb-2">
              Cross-examination {idx + 1}
            </div>
            <h3
              id={`ce-${prompt.id}-title`}
              className="font-display text-xl md:text-2xl leading-[1.25] tracking-tight"
            >
              &ldquo;{prompt.prompt}&rdquo;
            </h3>

            <div
              role="radiogroup"
              aria-labelledby={`ce-${prompt.id}-title`}
              className="mt-5 flex flex-col"
            >
              {prompt.options.map((opt) => {
                const selected = chosen === opt.id;
                return (
                  <button
                    type="button"
                    key={opt.id}
                    role="radio"
                    aria-checked={selected}
                    onClick={() => onChoose(prompt.id, opt.id)}
                    className={`text-left rule-top py-4 flex items-baseline gap-4 transition-colors ${
                      selected
                        ? "bg-[var(--accent-soft)]"
                        : "hover:bg-[color-mix(in_srgb,var(--bg-elev)_60%,transparent)]"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`mt-1 inline-block w-3 h-3 border ${
                        selected
                          ? "bg-[var(--accent)] border-[var(--accent)]"
                          : "border-[var(--ink-faint)]"
                      }`}
                    />
                    <span className="text-[16px] leading-[1.55] text-[var(--ink)] max-w-[58ch]">
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
            {chosen && (
              <p className="mt-3 font-ui text-xs text-[var(--ink-faint)] italic">
                Recorded. Reasoning will be unsealed at the debrief.
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}
