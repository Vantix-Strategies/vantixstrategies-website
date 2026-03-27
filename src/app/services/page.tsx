import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Custom AI Orchestration",
    subtitle: "RAG · Agents · LLM Ops · Evaluation",
    description:
      "We design, build, and deploy production AI systems inside your existing infrastructure. From retrieval augmented generation pipelines over your proprietary data corpus to autonomous multi agent frameworks, our FDEs operate at the system level, not the slide level.",
    features: [
      "RAG architecture over internal knowledge bases",
      "Multi agent orchestration (LangChain, LlamaIndex)",
      "LLM model tuning, evaluation and guardrails",
      "Embedding pipelines & vector store management",
      "Model serving, scaling & latency optimization",
      "On premise, AWS, or Azure deployment",
    ],
    stack: ["Python", "LangChain", "LlamaIndex", "Pinecone", "Weaviate", "FastAPI", "AWS Bedrock", "Azure OpenAI"],
  },
  {
    number: "02",
    title: "Embedded Enterprise Data Engineering",
    subtitle: "Snowflake · dbt · Airflow · Delta Lake · Spark",
    description:
      "AI is only as good as the data beneath it. We embed directly into your data organization to build the foundational pipelines, semantic layers, and governance structures that transform raw enterprise data into a reliable AI substrate.",
    features: [
      "Data lakehouse architecture & modernization",
      "Snowflake, Databricks & Delta Lake implementation",
      "dbt semantic layer & data model design",
      "Airflow / Prefect orchestration pipelines",
      "Real time streaming (Kafka, Kinesis)",
      "Data quality, observability & lineage (Great Expectations, Monte Carlo)",
    ],
    stack: ["Snowflake", "dbt", "Airflow", "Spark", "Kafka", "Delta Lake", "Terraform", "AWS / Azure"],
  },
  {
    number: "03",
    title: "Post Acquisition Operational Redesign",
    subtitle: "M&A Integration · Tech Rationalization · Process Automation",
    description:
      "M&A creates complexity that consulting decks cannot resolve. Our FDEs embed in the combined entity after close to map, consolidate, and redesign technical operations, compressing multi year integration timelines and protecting projected deal value.",
    features: [
      "Legacy system audit & technology rationalization",
      "Cross entity data integration & master data management",
      "Process automation across combined business units",
      "ERP and SaaS stack consolidation",
      "Executive operational KPI dashboards",
      "Change management and documentation handoff",
    ],
    stack: ["Python", "TypeScript", "SQL", "Power BI", "Tableau", "CI/CD", "AWS", "Azure"],
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-14">
      {/* Hero */}
      <section className="border-b border-zinc-800 py-24 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="text-xs tracking-[0.2em] uppercase text-zinc-600">Services</span>
          <h1
            className="text-4xl md:text-6xl text-white mt-3 mb-6 max-w-3xl"
            style={{ fontWeight: 300, letterSpacing: "0.05em" }}
          >
            Production Systems.
            <br />
            Not Recommendations.
          </h1>
          <p className="text-zinc-400 font-light max-w-xl leading-relaxed">
            Three core service lines. One delivery model: embedded, accountable, and production focused.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-0 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {services.map((svc, i) => (
            <div key={i} className="border-b border-zinc-800 py-16">
              <div className="grid lg:grid-cols-12 gap-10">
                {/* Number + title */}
                <div className="lg:col-span-4">
                  <span className="font-mono text-xs text-zinc-700 block mb-3">{svc.number}</span>
                  <h2
                    className="text-2xl md:text-3xl text-white mb-2"
                    style={{ fontWeight: 300, letterSpacing: "0.04em" }}
                  >
                    {svc.title}
                  </h2>
                  <p className="text-xs tracking-widest text-zinc-600 uppercase font-mono mb-6">
                    {svc.subtitle}
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed">{svc.description}</p>
                </div>

                {/* Features + Stack */}
                <div className="lg:col-span-8">
                  <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    {svc.features.map((f, fi) => (
                      <div key={fi} className="flex items-start gap-2.5">
                        <Check className="w-3.5 h-3.5 text-zinc-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-zinc-400 font-light">{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-zinc-800 pt-6">
                    <p className="text-xs tracking-[0.15em] uppercase text-zinc-600 mb-3">Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {svc.stack.map((t, ti) => (
                        <span key={ti} className="tech-badge">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-800 py-24 bg-[#18181b]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2
            className="text-3xl md:text-4xl text-white mb-5"
            style={{ fontWeight: 300, letterSpacing: "0.05em" }}
          >
            Scope an Engagement
          </h2>
          <p className="text-zinc-400 font-light mb-10 max-w-lg mx-auto">
            Tell us what you&apos;re building. We&apos;ll tell you how we can be embedded in it within weeks.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase bg-white text-zinc-900 px-8 py-3.5 hover:bg-zinc-200 transition-colors font-medium"
          >
            Contact Us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
