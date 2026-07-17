import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PhaseModule } from "@/components/careers/PhaseModule";
import { PHASE_SLUGS, phaseBySlug } from "../data";

export function generateStaticParams() {
  return PHASE_SLUGS.map((phase) => ({ phase }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ phase: string }>;
}): Promise<Metadata> {
  const { phase: slug } = await params;
  const phase = phaseBySlug(slug);
  if (!phase) return { title: "Careers — Vantix Strategies" };
  return {
    title: `Phase ${phase.number}: ${phase.name} — Vantix AI Engineering Track`,
    description: `${phase.subtitle}. ${phase.tagline} What you build: ${phase.youBuild} Core concept: ${phase.coreConcept}`,
  };
}

export default async function PhasePage({
  params,
}: {
  params: Promise<{ phase: string }>;
}) {
  const { phase: slug } = await params;
  const phase = phaseBySlug(slug);
  if (!phase) notFound();

  return <PhaseModule phase={phase} />;
}
