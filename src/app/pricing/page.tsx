import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const engagements = [
  {
    label: "Discovery Sprint",
    duration: "2 Weeks",
    description:
      "A focused diagnostic engagement. We map your data architecture, AI readiness, and identify the highest-leverage implementation opportunities. Delivered as a prioritized technical roadmap — backed by code spikes, not slides.",
    deliverables: [
      "Current-state technical audit",
      "AI/data maturity assessment",
      "Prioritized opportunity backlog",
      "Architecture recommendations with working prototypes",
    ],
    ideal: "Pre-engagement scoping or organizations new to enterprise AI.",
  },
  {
    label: "Embedded FDE Engagement",
    duration: "8–16 Weeks",
    description:
      "Our core offering. One to three senior FDEs embed directly in your engineering or data organization. We operate inside your tools, your repositories, and your sprint cadence — shipping production systems end-to-end.",
    deliverables: [
      "Production AI or data systems, fully integrated",
      "Internal documentation & runbooks",
      "Knowledge transfer to your team",
      "Handoff-ready codebase with CI/CD",
    ],
    ideal: "Teams that need to ship AI to production in weeks, not quarters.",
    highlighted: true,
  },
  {
    label: "Operational Re-engineering",
    duration: "Custom",
    description:
      "Post-acquisition or large-scale operational transformation. We scope, staff, and execute a multi-workstream engagement with defined milestones and executive reporting cadence.",
    deliverables: [
      "Cross-entity system integration",
      "Process automation implementation",
      "Executive dashboard & KPI instrumentation",
      "Ongoing advisory retainer available",
    ],
    ideal: "Post-M&A integration or enterprise-wide operational transformation.",
  },
];

export default function PricingPage() {
  return (
    <div className="pt-14">
      {/* Hero */}
      <section className="border-b border-zinc-800 py-24 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="text-xs tracking-[0.2em] uppercase text-zinc-600">Engagement Model</span>
          <h1
            className="text-4xl md:text-6xl text-white mt-3 mb-6 max-w-3xl"
            style={{ fontWeight: 300, letterSpacing: "0.05em" }}
          >
            Priced Around
            <br />
            Outcomes, Not Hours.
          </h1>
          <p className="text-zinc-400 font-light max-w-xl leading-relaxed">
            We don&apos;t bill by the hour or sell retainer blocks. Engagements are scoped around specific deliverables and priced on a fixed or milestone basis.
          </p>
        </div>
      </section>

      {/* Engagement tiers */}
      <section className="py-20 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-px border border-zinc-800 bg-zinc-800">
            {engagements.map((eng, i) => (
              <div
                key={i}
                className={`p-8 flex flex-col ${
                  eng.highlighted ? "bg-[#18181b]" : "bg-[#09090b]"
                }`}
              >
                {eng.highlighted && (
                  <span className="inline-block text-xs tracking-widest uppercase text-zinc-400 border border-zinc-600 px-2 py-0.5 mb-4 self-start">
                    Most Common
                  </span>
                )}
                <div className="flex-1">
                  <h2
                    className="text-xl text-white mb-1"
                    style={{ fontWeight: 300, letterSpacing: "0.04em" }}
                  >
                    {eng.label}
                  </h2>
                  <p className="text-xs font-mono text-zinc-600 mb-5">{eng.duration}</p>
                  <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">
                    {eng.description}
                  </p>

                  <div className="mb-6">
                    <p className="text-xs tracking-[0.12em] uppercase text-zinc-600 mb-3">Deliverables</p>
                    <ul className="space-y-2">
                      {eng.deliverables.map((d, di) => (
                        <li key={di} className="flex items-start gap-2 text-xs text-zinc-500">
                          <Check className="w-3.5 h-3.5 text-zinc-400 mt-0.5 flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-zinc-800 pt-4">
                    <p className="text-xs text-zinc-600">
                      <span className="text-zinc-500">Ideal for:</span> {eng.ideal}
                    </p>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center justify-center gap-2 text-xs tracking-[0.1em] uppercase border border-zinc-700 text-zinc-300 px-4 py-2.5 hover:border-zinc-400 hover:text-white transition-all"
                >
                  Discuss This Engagement
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing note */}
      <section className="border-t border-zinc-800 py-16 bg-[#18181b]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2
            className="text-2xl text-white mb-4"
            style={{ fontWeight: 300, letterSpacing: "0.05em" }}
          >
            Transparent Pricing
          </h2>
          <p className="text-zinc-400 font-light leading-relaxed mb-4">
            All engagements are priced on a project or milestone basis following a scoping call. We will never propose more scope than your problem requires. Discovery Sprints typically range from $15,000 – $25,000. Embedded FDE engagements typically range from $75,000 – $250,000 depending on team size and duration.
          </p>
          <p className="text-zinc-500 text-sm font-light">
            We maintain a small active portfolio. Reach out early — availability is limited.
          </p>
        </div>
      </section>
    </div>
  );
}
