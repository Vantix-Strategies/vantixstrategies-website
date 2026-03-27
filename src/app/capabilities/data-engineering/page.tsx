import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const focusAreas = [
  "Lakehouse design and migration planning",
  "Snowflake, Databricks, and Delta Lake implementation",
  "dbt model architecture and semantic layer design",
  "Airflow / Prefect orchestration for batch + event pipelines",
  "Streaming with Kafka / Kinesis for operational use cases",
  "Data quality, lineage, and observability controls",
];

const engagementPhases = [
  {
    phase: "Assess",
    details: "Audit current warehouse, ETL jobs, schema drift, and reliability bottlenecks.",
  },
  {
    phase: "Architect",
    details: "Define data contracts, canonical models, lineage strategy, and governance boundaries.",
  },
  {
    phase: "Implement",
    details: "Build pipelines, semantic layers, and automated tests with production SLAs.",
  },
  {
    phase: "Enable",
    details: "Deliver runbooks, documentation, and internal team training for full ownership.",
  },
];

export default function DataEngineeringPage() {
  return (
    <div className="pt-14">
      <section className="border-b border-zinc-800 py-24 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="font-mono text-xs text-zinc-700 block mb-3">02</span>
          <h1 className="text-4xl md:text-6xl text-white mb-4" style={{ fontWeight: 300, letterSpacing: "0.05em" }}>
            Data Engineering
          </h1>
          <p className="text-xs tracking-widest text-zinc-600 uppercase font-mono mb-7">
            Snowflake · dbt · Airflow · Delta Lake · Spark
          </p>
          <p className="text-zinc-400 font-light max-w-3xl leading-relaxed">
            Reliable AI requires reliable data. We embed with your team to modernize pipelines, unify semantics,
            and add governance so analytics and AI workloads can scale without constant break/fix cycles.
          </p>
        </div>
      </section>

      <section className="border-b border-zinc-800 py-20 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="text-xs tracking-[0.15em] uppercase text-zinc-600 mb-4">Core Delivery Areas</p>
            <p className="text-sm text-zinc-500 leading-relaxed">
              We focus on creating a durable data substrate that supports BI, machine learning, and automation
              without repeated rework.
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
            Ready to Stabilize Your Data Foundation?
          </h2>
          <p className="text-zinc-400 font-light mb-10 max-w-xl mx-auto">
            We can embed with your data team and start delivering production pipeline improvements quickly.
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
