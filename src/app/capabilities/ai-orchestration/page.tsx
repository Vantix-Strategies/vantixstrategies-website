import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const focusAreas = [
  "RAG over proprietary policies, contracts, docs, and tickets",
  "Agent workflows for multi-step business processes",
  "Evaluation harnesses for correctness, cost, and latency",
  "Guardrails for PII, policy constraints, and hallucination control",
  "Production observability with trace-level monitoring",
  "Hybrid deployment: on-prem, AWS Bedrock, or Azure OpenAI",
];

const engagementPhases = [
  {
    phase: "Discover",
    details: "Map target workflows, source systems, risk boundaries, and integration constraints.",
  },
  {
    phase: "Build",
    details: "Implement retrieval pipelines, orchestration, evaluation suites, and service APIs.",
  },
  {
    phase: "Deploy",
    details: "Ship production infrastructure with monitoring, rollback, and runbook documentation.",
  },
  {
    phase: "Handoff",
    details: "Transfer complete code ownership, architecture docs, and team enablement sessions.",
  },
];

export default function AIOrchestrationPage() {
  return (
    <div className="pt-14">
      <section className="border-b border-zinc-800 py-24 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs text-zinc-700 block mb-3">01</span>
          <h1 className="text-4xl md:text-6xl text-white mb-4" style={{ fontWeight: 300, letterSpacing: "0.05em" }}>
            AI Orchestration
          </h1>
          <p className="text-xs tracking-widest text-zinc-600 uppercase font-mono mb-7">
            RAG · Agents · LLM Ops · Evaluation
          </p>
          <p className="text-zinc-400 font-light max-w-3xl leading-relaxed">
            We design and ship production AI systems inside your environment. That includes retrieval augmented generation,
            multi-agent workflows, evaluation infrastructure, and operational guardrails that keep systems reliable after launch.
          </p>
        </div>
      </section>

      <section className="border-b border-zinc-800 py-20 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="text-xs tracking-[0.15em] uppercase text-zinc-600 mb-4">What We Build</p>
            <p className="text-sm text-zinc-500 leading-relaxed">
              We replace pilot-grade AI implementations with systems that can survive real production traffic,
              governance reviews, and cross-team adoption.
            </p>
          </div>
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {focusAreas.map((item, index) => (
              <div key={index} className="flex items-start gap-2.5">
                <Check className="w-3.5 h-3.5 text-zinc-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-zinc-400 font-light">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-800 py-20 bg-[#18181b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs tracking-[0.15em] uppercase text-zinc-600 mb-6">Delivery Model</p>
          <div className="border border-zinc-800 divide-y divide-zinc-800">
            {engagementPhases.map((step, index) => (
              <div key={index} className="grid md:grid-cols-12 gap-4 px-6 py-5">
                <div className="md:col-span-2 text-sm text-zinc-300" style={{ fontWeight: 300, letterSpacing: "0.03em" }}>
                  {step.phase}
                </div>
                <div className="md:col-span-10 text-sm text-zinc-500 font-light leading-relaxed">{step.details}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#09090b]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl text-white mb-5" style={{ fontWeight: 300, letterSpacing: "0.05em" }}>
            Need Production AI, Not a Demo?
          </h2>
          <p className="text-zinc-400 font-light mb-10 max-w-xl mx-auto">
            We can scope an embedded engagement and begin shipping inside weeks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase bg-white text-zinc-900 px-8 py-3.5 hover:bg-zinc-200 transition-colors font-medium"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase border border-zinc-700 text-zinc-400 px-8 py-3.5 hover:border-zinc-500 hover:text-zinc-200 transition-all font-light"
            >
              Back to Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
