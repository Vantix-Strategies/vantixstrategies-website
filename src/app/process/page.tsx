import Link from "next/link";
import { ArrowRight } from "lucide-react";

const phases = [
  {
    number: "01",
    name: "Discovery Sprint",
    duration: "Weeks 1 to 2",
    tagline: "Understand before building.",
    description:
      "We spend the first two weeks embedded in your environment by attending standups, reviewing existing infrastructure, interviewing stakeholders, and mapping data flows. No slide decks. Just working sessions.",
    deliverables: [
      "Technical audit of existing stack and data architecture",
      "AI / automation readiness assessment",
      "Prioritized opportunity backlog with effort and value estimates",
      "Architecture decision records (ADRs) for the build phase",
      "Defined success metrics and measurement framework",
    ],
    capabilities: {
      ai: "Identify the highest ROI automation candidates across existing workflows",
      data: "Map data sources, quality gaps, and pipeline dependencies",
      ops: "Document current state processes and integration bottlenecks",
    },
  },
  {
    number: "02",
    name: "Architecture & Build",
    duration: "Weeks 3 to 8",
    tagline: "Ship working software, not prototypes.",
    description:
      "We build in production from day one. Every sprint produces functional, tested, and documented code checked into your repositories. You maintain full visibility through shared tooling with no black box development.",
    deliverables: [
      "Production ready implementation in your existing environment",
      "Automated tests and CI/CD pipelines",
      "Inline documentation and architecture diagrams",
      "Weekly sprint reviews with your team",
      "Staged rollout plan with rollback procedures",
    ],
    capabilities: {
      ai: "RAG pipelines, agent frameworks, LLM routing, and prompt engineering in production",
      data: "Snowflake/dbt models, Airflow DAGs, data quality checks, and semantic layer",
      ops: "Workflow automation, process tooling, and integration scaffolding",
    },
  },
  {
    number: "03",
    name: "Deploy to Production",
    duration: "Weeks 8 to 12",
    tagline: "Real usage. Real feedback. Real iteration.",
    description:
      "Production deployment is not the end. It is the beginning of the value curve. We support live rollout, monitor system behavior, and iterate based on real usage patterns. Adoption is part of the deliverable.",
    deliverables: [
      "Monitored production deployment with alerting and observability",
      "User onboarding and internal adoption sessions",
      "Performance benchmarking against the baseline from before the engagement",
      "Issue triage and rapid iteration cycles",
      "Updated runbooks and operating procedures",
    ],
    capabilities: {
      ai: "Agent orchestration in live workflows with feedback loops and model monitoring",
      data: "Live pipeline observability, SLA dashboards, and data quality alerting",
      ops: "Operational handoff with trained internal champions and escalation paths",
    },
  },
  {
    number: "04",
    name: "Handoff & Team Ownership",
    duration: "Weeks 12 to 16",
    tagline: "Our goal is to make ourselves redundant.",
    description:
      "The engagement ends when your team can own, extend, and operate everything we built without us. We transfer full IP, train your engineers, document everything, and leave no dependencies on Vantix.",
    deliverables: [
      "Full IP transfer: all code, configs, and credentials",
      "Internal team training and knowledge transfer sessions",
      "Comprehensive system documentation in your preferred format",
      "Thirty day support window after handoff (async)",
      "Optional retainer for ongoing iteration (scoped separately)",
    ],
    capabilities: {
      ai: "Model management playbook, prompt iteration guide, and escalation framework",
      data: "Pipeline ownership guide, dbt model documentation, and oncall runbook",
      ops: "Process owner designation, workflow documentation, and governance framework",
    },
  },
];

const capabilityLabels: Record<string, string> = {
  ai: "AI Orchestration",
  data: "Data Engineering",
  ops: "Operational Redesign",
};

export default function ProcessPage() {
  return (
    <div className="pt-14">
      {/* Hero */}
      <section className="border-b border-zinc-800 py-24 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-zinc-600">How We Work</span>
            <h1
              className="text-4xl md:text-5xl text-white mt-3 mb-8"
              style={{ fontWeight: 300, letterSpacing: "0.05em" }}
            >
              From Kickoff
              <br />
              to Team Ownership.
            </h1>
            <p className="text-zinc-400 font-light leading-relaxed mb-4">
              Every Vantix engagement follows the same four-phase structure regardless of which capabilities are in
              scope. The phases are designed to move fast, maintain full transparency, and transfer ownership to
              your team by the end.
            </p>
            <p className="text-zinc-400 font-light leading-relaxed">
              Below is a clear breakdown of what happens in each phase and how the work changes based on whether
              your focus is AI Orchestration, Data Engineering, Operational Redesign, or a combination of all three.
            </p>
          </div>
          <div className="border border-zinc-800 divide-y divide-zinc-800">
            {[
              { metric: "2 weeks", label: "From kickoff to first production insight" },
              { metric: "< 6 weeks", label: "Typical time from kickoff to first working build" },
              { metric: "90 days", label: "Target window for positive ROI on engagement investment" },
              { metric: "0", label: "IP retained by Vantix. Everything we build is yours." },
            ].map((item, i) => (
              <div key={i} className="px-8 py-6">
                <div className="text-2xl text-white mb-1" style={{ fontWeight: 300 }}>
                  {item.metric}
                </div>
                <div className="text-xs text-zinc-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline phases */}
      {phases.map((phase, pi) => (
        <section
          key={pi}
          className={`py-20 border-b border-zinc-800 ${pi % 2 === 0 ? "bg-[#18181b]" : "bg-[#09090b]"}`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10">
              {/* Phase header */}
              <div className="lg:col-span-4">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <span className="text-xs font-mono text-zinc-700 tracking-wider">{phase.number}</span>
                    <div className="w-px h-12 bg-zinc-800 ml-1.5 mt-2" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-zinc-600 tracking-wider block mb-1">{phase.duration}</span>
                    <h2
                      className="text-2xl text-white mb-2"
                      style={{ fontWeight: 300, letterSpacing: "0.04em" }}
                    >
                      {phase.name}
                    </h2>
                    <p className="text-sm text-zinc-500 font-light italic">{phase.tagline}</p>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">{phase.description}</p>
              </div>

              {/* Deliverables */}
              <div className="lg:col-span-4">
                <h3
                  className="text-xs tracking-[0.15em] uppercase text-zinc-600 mb-4"
                >
                  Deliverables
                </h3>
                <ul className="space-y-2.5">
                  {phase.deliverables.map((d, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-400 leading-relaxed">
                      <ArrowRight className="w-3 h-3 mt-0.5 flex-shrink-0 text-zinc-700" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Per-capability activity */}
              <div className="lg:col-span-4">
                <h3
                  className="text-xs tracking-[0.15em] uppercase text-zinc-600 mb-4"
                >
                  By Capability
                </h3>
                <div className="space-y-3">
                  {(Object.entries(phase.capabilities) as [string, string][]).map(([key, text]) => (
                    <div key={key} className="border border-zinc-800 p-4">
                      <p className="text-xs font-mono text-zinc-600 tracking-wider mb-1.5">
                        {capabilityLabels[key]}
                      </p>
                      <p className="text-xs text-zinc-500 font-light leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-24 bg-[#18181b]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2
            className="text-3xl text-white mb-5"
            style={{ fontWeight: 300, letterSpacing: "0.05em" }}
          >
            Ready to start your 90-day clock?
          </h2>
          <p className="text-zinc-400 font-light mb-10 max-w-xl mx-auto leading-relaxed">
            Most engagements begin within two weeks of an initial conversation. Reach out to discuss scope,
            timeline, and availability.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/about#contact"
              className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase bg-white text-zinc-900 px-8 py-3.5 hover:bg-zinc-200 transition-colors font-medium"
            >
              Start a Conversation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/value-calculator"
              className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase border border-zinc-700 text-zinc-300 px-8 py-3.5 hover:border-zinc-400 hover:text-white transition-all"
            >
              Estimate Your Value
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
