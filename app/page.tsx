import { CaseCard } from "@/components/CaseCard";
import { getAllCases } from "@/lib/cases";

export default function Home() {
  const cases = getAllCases();

  return (
    <div className="mx-auto w-full max-w-6xl px-6">
      <section className="py-14 md:py-20 grid md:grid-cols-12 gap-x-10 gap-y-6 items-end">
        <div className="md:col-span-8">
          <div className="font-ui small-caps text-[11px] text-[var(--ink-faint)] mb-3">
            The Docket &middot; Today&rsquo;s Calendar
          </div>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight">
            Put big ideas on trial.
            <br />
            <span className="text-[var(--ink-soft)]">
              Learn by judging the case.
            </span>
          </h1>
        </div>
        <div className="md:col-span-4">
          <p className="text-[15px] leading-[1.65] text-[var(--ink-soft)] max-w-[42ch]">
            Each case is a structured argument about a contested idea &mdash;
            art, ethics, politics, technology. You weigh the evidence,
            cross-examine the witnesses, and deliver a verdict. There is no
            right answer. There is the answer you can defend.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="rule-double py-3 mb-2 flex items-baseline justify-between">
          <h2 className="font-display text-xl">Cases on the calendar</h2>
          <span className="font-ui small-caps text-[11px] text-[var(--ink-faint)]">
            {cases.length} {cases.length === 1 ? "matter" : "matters"} pending
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-x-10">
          {cases.map((c, i) => (
            <CaseCard key={c.id} caseData={c} index={i} />
          ))}
        </div>

        {cases.length === 0 && (
          <p className="py-10 text-[var(--ink-soft)] italic">
            The docket is empty.
          </p>
        )}
      </section>
    </div>
  );
}
