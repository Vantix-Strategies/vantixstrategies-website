import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PhaseModule } from "@/components/careers/PhaseModule";
import { PHASE_SLUGS, phaseBySlug } from "../data";
import { breadcrumbSchema, phaseCourseSchema } from "../schema";

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
  if (!phase) return { title: "Careers" };

  const description = `${phase.subtitle}. ${phase.tagline} You build: ${phase.youBuild} Core concept: ${phase.coreConcept}`;
  const path = `/careers/${phase.slug}`;
  return {
    title: `Phase ${phase.number}: ${phase.name}`,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `Phase ${phase.number}: ${phase.name} — ${phase.subtitle} | Vantix Strategies`,
      description,
      url: path,
      images: ["/opengraph-image.png"],
    },
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

  return (
    <>
      <JsonLd data={phaseCourseSchema(phase)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
          { name: `Phase ${phase.number}: ${phase.name}`, path: `/careers/${phase.slug}` },
        ])}
      />
      <PhaseModule phase={phase} />
    </>
  );
}
