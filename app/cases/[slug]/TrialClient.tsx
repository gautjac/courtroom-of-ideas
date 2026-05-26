"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type {
  CourtroomCase,
  EvidenceMark,
  TrialState,
} from "@/types/case";
import { TrialLayout, type TrialStage } from "@/components/TrialLayout";
import { OpeningStatements } from "@/components/OpeningStatements";
import { EvidenceBoard } from "@/components/EvidenceBoard";
import { CrossExamPanel } from "@/components/CrossExamPanel";
import { VerdictForm } from "@/components/VerdictForm";
import { DebriefView } from "@/components/DebriefView";
import { SectionHeading } from "@/components/TrialLayout";

function initialState(): TrialState {
  return {
    evidenceMarks: {},
    crossExamChoices: {},
    verdictValues: {},
    rulingText: "",
  };
}

// TODO: persistence — for v1 this resets on reload. Later, persist per-case in
// localStorage or a server store keyed by an account.

export function TrialClient({
  caseData,
  docketNumber,
}: {
  caseData: CourtroomCase;
  docketNumber: string;
}) {
  const [stage, setStage] = useState<TrialStage>("opening");
  const [state, setState] = useState<TrialState>(initialState);

  const markedCount = useMemo(
    () =>
      Object.values(state.evidenceMarks).filter((v) => v !== null).length,
    [state.evidenceMarks],
  );
  const answeredCount = useMemo(
    () =>
      Object.values(state.crossExamChoices).filter((v) => typeof v === "string")
        .length,
    [state.crossExamChoices],
  );

  // Require at least 1 evidence mark AND 1 cross-exam answer to proceed.
  // Keeps the floor low without letting users sprint past the act.
  const canProceedToVerdict = markedCount >= 1 && answeredCount >= 1;

  function setEvidenceMark(id: string, mark: EvidenceMark) {
    setState((s) => ({
      ...s,
      evidenceMarks: { ...s.evidenceMarks, [id]: mark },
    }));
  }

  function chooseCrossExam(promptId: string, optionId: string) {
    setState((s) => ({
      ...s,
      crossExamChoices: { ...s.crossExamChoices, [promptId]: optionId },
    }));
  }

  function setVerdictValue(id: string, v: number) {
    setState((s) => ({
      ...s,
      verdictValues: { ...s.verdictValues, [id]: v },
    }));
  }

  function setRulingText(text: string) {
    setState((s) => ({ ...s, rulingText: text }));
  }

  function replay() {
    setState(initialState());
    setStage("opening");
  }

  return (
    <TrialLayout
      docketNumber={docketNumber}
      title={caseData.title}
      defendantIdea={caseData.defendantIdea}
      stage={stage}
    >
      {stage === "opening" && (
        <OpeningStatements
          caseData={caseData}
          onContinue={() => setStage("evidence")}
        />
      )}

      {stage === "evidence" && (
        <section>
          <SectionHeading kicker="Act II" title="Evidence" />
          <p className="text-[15px] leading-[1.65] text-[var(--ink-soft)] max-w-[62ch] mb-8">
            Read each exhibit. Mark how you weigh it. There is no penalty for
            changing your mind &mdash; the marks are for your reasoning, not a
            score.
          </p>
          <EvidenceBoard
            evidence={caseData.evidence}
            marks={state.evidenceMarks}
            onMark={setEvidenceMark}
          />

          <div className="mt-16">
            <SectionHeading
              kicker="Act II &middot; continued"
              title="Cross-examination"
            />
            <p className="text-[15px] leading-[1.65] text-[var(--ink-soft)] max-w-[62ch] mb-8">
              Choose the position that comes closest to your own. Reasoning is
              withheld until the verdict is rendered.
            </p>
            <CrossExamPanel
              prompts={caseData.crossExam}
              choices={state.crossExamChoices}
              onChoose={chooseCrossExam}
            />
          </div>

          <div className="mt-14 rule-top pt-6 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setStage("opening")}
              className="font-ui small-caps text-[11px] tracking-[0.16em] text-[var(--ink-soft)] hover:text-[var(--ink)]"
            >
              ← Back to opening statements
            </button>
            <div className="flex items-center gap-4">
              <span className="font-ui small-caps text-[11px] text-[var(--ink-faint)]">
                {markedCount}/{caseData.evidence.length} marked &middot;{" "}
                {answeredCount}/{caseData.crossExam.length} answered
              </span>
              <button
                type="button"
                onClick={() => setStage("verdict")}
                disabled={!canProceedToVerdict}
                className={`font-ui small-caps text-[11px] tracking-[0.16em] px-5 py-3 transition-colors ${
                  canProceedToVerdict
                    ? "bg-[var(--ink)] text-[var(--bg)] hover:bg-[var(--accent)]"
                    : "bg-[var(--rule)] text-[var(--ink-faint)] cursor-not-allowed"
                }`}
              >
                {canProceedToVerdict
                  ? "Proceed to the verdict →"
                  : "Mark at least one exhibit and answer one question"}
              </button>
            </div>
          </div>
        </section>
      )}

      {stage === "verdict" && (
        <VerdictForm
          axes={caseData.verdictAxes}
          values={state.verdictValues}
          rulingText={state.rulingText}
          onChangeValue={setVerdictValue}
          onChangeRuling={setRulingText}
          onSubmit={() => setStage("debrief")}
          onBack={() => setStage("evidence")}
        />
      )}

      {stage === "debrief" && (
        <DebriefView caseData={caseData} state={state} onReplay={replay} />
      )}

      <div className="mt-16 rule-top pt-4 flex justify-between font-ui text-xs text-[var(--ink-faint)]">
        <Link href="/" className="hover:text-[var(--ink)] small-caps">
          ← Docket
        </Link>
        <span className="small-caps">
          Case No. {docketNumber} &middot; {caseData.estimatedMinutes} min
        </span>
      </div>
    </TrialLayout>
  );
}
