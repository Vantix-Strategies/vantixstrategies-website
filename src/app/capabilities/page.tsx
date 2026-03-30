"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronRight } from "lucide-react";

const CAPABILITIES = [
  {
    id: "ai-orchestration",
    number: "01",
    label: "AI Orchestration",
    title: "Custom AI Orchestration",
    subtitle: "RAG · Agents · LLM Ops · Evaluation",
    tagline: "Production AI systems. Not proofs of concept.",
    description:
      "Most AI pilots fail at the boundary between experimentation and production. Our Forward Deployed Engineers live in that boundary. We design, build, and ship AI orchestration layers, including retrieval augmented generation pipelines, multi-agent frameworks, and LLM evaluation infrastructure, directly inside your existing environment.",
    problems: [
      "AI pilots that cannot cross the staging-to-production gap",
      "RAG systems returning hallucinated or stale results",
      "LLM costs and latency that are unsustainable at scale",
      "No observability or guardrails over model behavior",
      "Vendor lock-in preventing architectural control",
    ],
    deliverables: [
      "RAG architecture over internal knowledge bases and document corpora",
      "Multi-agent orchestration with LangChain and LlamaIndex",
      "LLM evaluation pipelines, guardrails, and behavioral monitoring",
      "Embedding pipelines and vector store management (Pinecone, Weaviate)",
      "Model serving, latency optimization, and cost controls",
      "On-premise, AWS Bedrock, or Azure OpenAI deployment",
    ],
    outcomes: [
      { metric: "<6 weeks", label: "From kickoff to production deployment" },
      { metric: "100%", label: "IP ownership transferred to client at close" },
      { metric: "0", label: "Strategy decks delivered" },
    ],
    stack: ["Python", "LangChain", "LlamaIndex", "Pinecone", "Weaviate", "FastAPI", "AWS Bedrock", "Azure OpenAI"],
  },
  {
    id: "data-engineering",
    number: "02",
    label: "Data Engineering",
    title: "Embedded Enterprise Data Engineering",
    subtitle: "Snowflake · dbt · Airflow · Delta Lake · Spark",
    tagline: "AI is only as good as the data beneath it.",
    description:
      "Enterprises do not have an AI problem. They have a data problem. Fragmented pipelines, inconsistent schemas, undocumented transformations, and absent governance make every AI initiative brittle. Our FDEs embed directly into your data organization to build the foundational infrastructure that makes enterprise AI trustworthy and scalable.",
    problems: [
      "Fragmented data sources with no unified semantic layer",
      "Pipelines that break silently and corrupt downstream models",
      "No lineage, observability, or data quality enforcement",
      "Data warehouses that cost more than they deliver",
      "Teams blocked on missing features in legacy infrastructure",
    ],
    deliverables: [
      "Data lakehouse architecture design and migration",
      "Snowflake, Databricks, and Delta Lake implementation",
      "dbt semantic layer and data model design",
      "Airflow and Prefect orchestration pipeline development",
      "Real-time streaming with Kafka and Kinesis",
      "Data quality, observability, and lineage (Great Expectations, Monte Carlo)",
    ],
    outcomes: [
      { metric: "Days", label: "To production-quality pipelines, not sprints" },
      { metric: "Zero", label: "Vendor lock-in is eliminated because you own every asset" },
      { metric: "Full", label: "Handoff with documentation and team enablement" },
    ],
    stack: ["Snowflake", "dbt", "Airflow", "Spark", "Kafka", "Delta Lake", "Terraform", "AWS / Azure"],
  },
  {
    id: "operational-redesign",
    number: "03",
    label: "Operational Redesign",
    title: "Post-Acquisition Operational Redesign",
    subtitle: "M&A Integration · Tech Rationalization · Process Automation",
    tagline: "Compress multi-year integration timelines.",
    description:
      "M&A deals are won in the boardroom and lost in the server room. After close, fragmented technical operations, redundant systems, and misaligned data definitions erode projected deal value at speed. Our FDEs embed in the combined entity to map, consolidate, and redesign technical operations, which compresses multi-year integration timelines to a fraction of the expected duration.",
    problems: [
      "Redundant SaaS stacks and overlapping tooling with no rationalization plan",
      "Incompatible data models between acquired and acquiring entities",
      "Manual cross-entity processes with no automation path",
      "Leadership missing a unified operational view post-close",
      "Integration timelines slipping past deal value realization windows",
    ],
    deliverables: [
      "Legacy system audit and technology rationalization roadmap",
      "Cross-entity data integration and master data management",
      "Process automation across combined business units",
      "ERP and SaaS stack consolidation",
      "Executive operational KPI dashboards",
      "Change management documentation and team handoff",
    ],
    outcomes: [
      { metric: "Weeks", label: "To unified operational visibility post-close" },
      { metric: "50%+", label: "Reduction in redundant tooling cost (typical)" },
      { metric: "0", label: "Integration roadmaps left unexecuted" },
    ],
    stack: ["Python", "TypeScript", "SQL", "Power BI", "Tableau", "CI/CD", "AWS", "Azure"],
  },
];

export default function CapabilitiesPage() {
  return (
    <div className="pt-14">
      {/* Hero */}
      <section className="border-b border-zinc-800 py-24 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs tracking-[0.2em] uppercase text-zinc-600">Capabilities</span>
            <h1
              className="text-4xl md:text-6xl text-white mt-3 mb-6 max-w-3xl"
              style={{ fontWeight: 300, letterSpacing: "0.05em" }}
            >
              What We Build.
              <br />
              How We Deliver.
            </h1>
            <p className="text-zinc-400 font-light max-w-xl leading-relaxed mb-10">
              Three focused capability lines. Each is delivered by senior engineers embedded inside your organization,
              not managed from a distance.
            </p>

            {/* Capability anchors */}
            <div className="flex flex-wrap gap-3">
              {CAPABILITIES.map((cap) => (
                <a
                  key={cap.id}
                  href={`#${cap.id}`}
                  className="inline-flex items-center gap-1.5 text-xs tracking-[0.12em] uppercase border border-zinc-800 text-zinc-400 px-4 py-2 hover:border-zinc-600 hover:text-zinc-200 transition-all font-light"
                >
                  <span className="font-mono text-zinc-700">{cap.number}</span>
                  {cap.label}
                  <ChevronRight className="w-3 h-3" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capability Sections */}
      {CAPABILITIES.map((cap, i) => (
        <section
          key={cap.id}
          id={cap.id}
          className="border-b border-zinc-800 scroll-mt-14"
          style={{ backgroundColor: i % 2 === 0 ? "#09090b" : "#18181b" }}
        >
          {/* Section header */}
          <div className="border-b border-zinc-800">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="font-mono text-xs text-zinc-700 block mb-3">{cap.number}</span>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                  <div>
                    <h2
                      className="text-3xl md:text-4xl text-white mb-2"
                      style={{ fontWeight: 300, letterSpacing: "0.04em" }}
                    >
                      {cap.title}
                    </h2>
                    <p className="text-xs tracking-widest text-zinc-600 uppercase font-mono">{cap.subtitle}</p>
                  </div>
                  <p
                    className="text-base text-zinc-300 max-w-xs text-right hidden md:block"
                    style={{ fontWeight: 300, letterSpacing: "0.02em" }}
                  >
                    {cap.tagline}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Section body */}
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div className="grid lg:grid-cols-12 gap-12">
              {/* Left: description + problems */}
              <motion.div
                className="lg:col-span-5"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                <p className="text-sm text-zinc-400 leading-relaxed mb-10">{cap.description}</p>

                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-zinc-600 mb-4">Problems We Solve</p>
                  <ul className="space-y-3">
                    {cap.problems.map((problem, pi) => (
                      <li key={pi} className="flex items-start gap-2.5 text-sm text-zinc-500 font-light">
                        <span className="font-mono text-zinc-700 mt-px text-xs flex-shrink-0">
                          {String(pi + 1).padStart(2, "0")}
                        </span>
                        {problem}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Right: deliverables + outcomes + stack */}
              <motion.div
                className="lg:col-span-7"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="mb-10">
                  <p className="text-xs tracking-[0.15em] uppercase text-zinc-600 mb-5">What We Deliver</p>
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                    {cap.deliverables.map((d, di) => (
                      <div key={di} className="flex items-start gap-2.5">
                        <Check className="w-3.5 h-3.5 text-zinc-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-zinc-400 font-light">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outcomes */}
                <div className="border border-zinc-800 grid grid-cols-3 mb-8 divide-x divide-zinc-800">
                  {cap.outcomes.map((o, oi) => (
                    <div key={oi} className="px-5 py-5">
                      <div
                        className="text-2xl text-white mb-1"
                        style={{ fontWeight: 300, letterSpacing: "0.04em" }}
                      >
                        {o.metric}
                      </div>
                      <div className="text-xs text-zinc-500 leading-snug">{o.label}</div>
                    </div>
                  ))}
                </div>

                {/* Stack */}
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-zinc-600 mb-3">Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {cap.stack.map((t, ti) => (
                      <span key={ti} className="tech-badge">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="border-t border-zinc-800 py-24 bg-[#09090b]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2
            className="text-3xl md:text-4xl text-white mb-5"
            style={{ fontWeight: 300, letterSpacing: "0.05em" }}
          >
            Scope an Engagement
          </h2>
          <p className="text-zinc-400 font-light mb-10 max-w-lg mx-auto leading-relaxed">
            Tell us what you&apos;re building. We&apos;ll tell you how we can be embedded in it within weeks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/about#contact"
              className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase bg-white text-zinc-900 px-8 py-3.5 hover:bg-zinc-200 transition-colors font-medium"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase border border-zinc-700 text-zinc-400 px-8 py-3.5 hover:border-zinc-500 hover:text-zinc-200 transition-all font-light"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
