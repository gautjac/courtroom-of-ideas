import { notFound } from "next/navigation";
import { getAllCases, getAllSlugs, getCaseBySlug } from "@/lib/cases";
import { TrialClient } from "./TrialClient";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseData = getCaseBySlug(slug);
  if (!caseData) notFound();

  const all = getAllCases();
  const index = all.findIndex((c) => c.slug === slug);
  const docketNumber = String(index + 1).padStart(3, "0");

  return <TrialClient caseData={caseData} docketNumber={docketNumber} />;
}
