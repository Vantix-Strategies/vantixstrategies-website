"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import DotBackground from "@/components/DotBackground";

const TECH_BADGES = [
  "Python", "TypeScript", "LangChain", "LlamaIndex",
  "VectorDB", "Snowflake", "dbt", "Airflow",
  "AWS", "Azure", "Terraform", "CI/CD",
  "FastAPI", "Docker", "Kubernetes", "PostgreSQL",
];

const FDE_COMPARISON = [
  { dimension: "Delivery Format", vantix: "Production Code", traditional: "Strategy Decks" },
  { dimension: "Engagement Model", vantix: "Embedded in Your Org", traditional: "Advisory / External" },
  { dimension: "Output", vantix: "Systems Ready for Handoff", traditional: "Roadmaps & Recommendations" },
  { dimension: "Ownership", vantix: "Client Owns All IP", traditional: "Vendor Retains Leverage" },
  { dimension: "Timeline", vantix: "Weeks to Production", traditional: "Months to POC" },
  { dimension: "Risk", vantix: "Low. We ship or iterate.", traditional: "High. Advice is unvalidated." },
];

const SERVICES = [
  {
    href: "/capabilities/ai-orchestration",
    number: "01",
    title: "Custom AI Orchestration",
    subtitle: "RAG Pipelines · Agents · LLM Ops",
    description:
      "We architect and ship production AI systems: retrieval augmented generation pipelines, multi agent frameworks, and LLM orchestration layers, deployed inside your existing infrastructure. No pilot theater. No vendor lock in.",
    bullets: [
      "Context aware RAG over proprietary data",
      "Autonomous agent workflows (LangChain, LlamaIndex)",
      "LLM evaluation, guardrails & monitoring",
      "On premise or cloud native deployment",
    ],
  },
  {
    href: "/capabilities/data-engineering",
    number: "02",
    title: "Embedded Enterprise Data Engineering",
    subtitle: "Snowflake · dbt · Airflow · Delta Lake",
    description:
      "Modern AI requires trustworthy data. We embed directly into your data organization to build the pipelines, semantic layers, and governance structures that make enterprise AI actually work.",
    bullets: [
      "Data lakehouse architecture & migration",
      "Semantic layer and feature store design",
      "Real time streaming and batch orchestration",
      "Data quality, lineage & observability",
    ],
  },
  {
    href: "/capabilities/operational-redesign",
    number: "03",
    title: "Post Acquisition Operational Redesign",
    subtitle: "M&A Integration · Tech Stack Consolidation",
    description:
      "When your M&A closes, execution is everything. We accelerate integration by mapping, consolidating, and redesigning fragmented technical operations so the deal delivers its projected value.",
    bullets: [
      "Legacy system audit & rationalization",
      "Cross organization data and process integration",
      "Workflow automation across combined entities",
      "Executive dashboards & operational KPIs",
    ],
  },
];

const STATS = [
  { value: "95%", label: "Of AI pilots die in staging. Ours do not." },
  { value: "<6 weeks", label: "From kickoff to production deployment" },
  { value: "100%", label: "Production systems, owned by you" },
];

export default function HomePage() {
  return (
    <div className="pt-14">
      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <DotBackground />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(250,250,250,0.04) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-xs tracking-[0.2em] uppercase text-zinc-500 mb-8 border border-zinc-800 px-3 py-1">
              Forward Deployed Engineering
            </span>

            <h1
              className="text-5xl md:text-7xl text-white mb-8 leading-[1.05]"
              style={{ fontWeight: 300, letterSpacing: "0.03em" }}
            >
              Engineering Impact
              <br />
              at the Speed of AI.
            </h1>

            <p className="text-base md:text-lg text-zinc-400 max-w-xl mb-12 leading-relaxed font-light">
              We are Forward Deployed Engineers. We do not deliver strategy decks;
              we ship production systems inside your existing environment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 text-sm tracking-[0.1em] uppercase bg-white text-zinc-900 px-6 py-3 hover:bg-zinc-200 transition-colors font-medium"
              >
                Start an Engagement
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 text-sm tracking-[0.1em] uppercase border border-zinc-700 text-zinc-300 px-6 py-3 hover:border-zinc-400 hover:text-white transition-all font-light"
              >
                Our Capabilities
              </Link>
            </div>
          </motion.div>

          {/* Stats row */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-px border border-zinc-800 bg-zinc-800">
            {STATS.map((stat, i) => (
              <div key={i} className="bg-[#09090b] px-8 py-6">
                <div
                  className="text-3xl md:text-4xl text-white mb-1"
                  style={{ fontWeight: 300, letterSpacing: "0.04em" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-zinc-500 leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="border-t border-zinc-800 py-24 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs tracking-[0.2em] uppercase text-zinc-600">Capabilities</span>
            <h2
              className="text-3xl md:text-4xl text-white mt-3"
              style={{ fontWeight: 300, letterSpacing: "0.05em" }}
            >
              The FDE Service Model
            </h2>
          </div>

          <div className="space-y-px border border-zinc-800 bg-zinc-800">
            {SERVICES.map((svc, i) => (
              <Link key={i} href={svc.href} className="block group">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#09090b] p-8 md:p-10 card-glow border border-transparent cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:gap-12">
                    <div className="flex-none mb-4 md:mb-0">
                      <span className="font-mono text-xs text-zinc-700">{svc.number}</span>
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-xl md:text-2xl text-white mb-1 group-hover:text-zinc-200 transition-colors"
                        style={{ fontWeight: 300, letterSpacing: "0.04em" }}
                      >
                        {svc.title}
                      </h3>
                      <p className="text-xs tracking-widest text-zinc-600 uppercase mb-4 font-mono">
                        {svc.subtitle}
                      </p>
                      <p className="text-sm text-zinc-400 leading-relaxed mb-6 max-w-2xl">
                        {svc.description}
                      </p>
                      <ul className="grid sm:grid-cols-2 gap-2 mb-6">
                        {svc.bullets.map((b, bi) => (
                          <li key={bi} className="flex items-start gap-2 text-xs text-zinc-500">
                            <Check className="w-3.5 h-3.5 text-zinc-400 mt-0.5 flex-shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <span className="inline-flex items-center gap-2 text-xs tracking-[0.12em] uppercase text-zinc-400 group-hover:text-zinc-100 transition-colors">
                        View capability
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FDE Difference ── */}
      <section className="border-t border-zinc-800 py-24 bg-[#18181b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs tracking-[0.2em] uppercase text-zinc-600">Why Vantix</span>
            <h2
              className="text-3xl md:text-4xl text-white mt-3"
              style={{ fontWeight: 300, letterSpacing: "0.05em" }}
            >
              The FDE Difference
            </h2>
          </div>

          <div className="border border-zinc-800 overflow-hidden">
            <div className="grid grid-cols-3 border-b border-zinc-800 bg-[#09090b]">
              <div className="px-6 py-4 text-xs tracking-[0.15em] uppercase text-zinc-600">Dimension</div>
              <div className="px-6 py-4 text-xs tracking-[0.15em] uppercase text-zinc-300 border-l border-zinc-800">
                Vantix
              </div>
              <div className="px-6 py-4 text-xs tracking-[0.15em] uppercase text-zinc-600 border-l border-zinc-800">
                Traditional Consultancy
              </div>
            </div>

            {FDE_COMPARISON.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 border-b border-zinc-800 last:border-b-0 ${
                  i % 2 === 0 ? "bg-[#18181b]" : "bg-[#1c1c1f]"
                }`}
              >
                <div className="px-6 py-4 text-xs text-zinc-500 font-mono">{row.dimension}</div>
                <div className="px-6 py-4 text-sm text-zinc-100 border-l border-zinc-800 font-light">
                  {row.vantix}
                </div>
                <div className="px-6 py-4 text-sm text-zinc-600 border-l border-zinc-800 font-light">
                  {row.traditional}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack Badge Cloud ── */}
      <section className="border-t border-zinc-800 py-20 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs tracking-[0.2em] uppercase text-zinc-600">Technology</span>
            <h2
              className="text-2xl text-white mt-3"
              style={{ fontWeight: 300, letterSpacing: "0.05em" }}
            >
              Our Stack
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {TECH_BADGES.map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="tech-badge"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-zinc-800 py-28 bg-[#18181b]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2
            className="text-4xl md:text-5xl text-white mb-6"
            style={{ fontWeight: 300, letterSpacing: "0.05em" }}
          >
            Ready to ship?
          </h2>
          <p className="text-base text-zinc-400 font-light mb-12 max-w-xl mx-auto leading-relaxed">
            Describe your initiative. We&apos;ll scope an engagement that delivers production results, not a proof of concept.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase bg-white text-zinc-900 px-8 py-3.5 hover:bg-zinc-200 transition-colors font-medium"
            >
              Start an Engagement
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase border border-zinc-700 text-zinc-400 px-8 py-3.5 hover:border-zinc-500 hover:text-zinc-200 transition-all font-light"
            >
              About Vantix
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
