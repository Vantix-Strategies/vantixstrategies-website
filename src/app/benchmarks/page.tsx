import Link from "next/link";
import { ArrowRight } from "lucide-react";

const generalAssumptions = [
  {
    label: "Revenue and employee counts use midpoint estimates",
    explanation:
      "When you select a band (for example, “$25M to $100M”), the model uses the arithmetic midpoint ($62.5M). This is a deliberate choice to produce unbiased estimates without anchoring to either extreme. If your organization sits at the high end of a band, your actual savings will likely exceed the estimate.",
  },
  {
    label: "Default manual hours assumption: 8 hrs/week",
    explanation:
      "If you do not enter a manual hours value, the model defaults to 8 hours per week per employee. This is the median response in McKinsey’s 2023 worker survey when employees were asked to estimate time spent on repetitive, low-judgment tasks.",
  },
  {
    label: "All estimates are annual",
    explanation:
      "All figures represent the annualized steady-state value once systems are in production. Year 1 values will typically be lower due to ramp time and change management. Years 2+ typically exceed the estimate as adoption deepens.",
  },
  {
    label: "Capabilities are modeled independently",
    explanation:
      "Each capability’s value is calculated separately. In practice, combined deployments often produce compounding returns (e.g., better data pipelines amplify AI agent performance). The model does not capture this compounding effect, which means combined estimates are conservative.",
  },
];

const capabilityBenchmarks = [
  {
    capability: "AI Orchestration",
    subtitle: "RAG · Agents · LLM Ops",
    number: "01",
    assumptions: [
      {
        label: "65% automation capture rate",
        explanation:
          "The model applies a 65% automation capture rate to your stated manual hours. This reflects Gartner’s 2024 Future of Work analysis, which found that AI-assisted workflows reliably automate 60 to 70% of targeted repetitive tasks once pipelines are in production. The remaining 35% accounts for task variability, exception handling, and human-in-the-loop requirements.",
        source: "Gartner, “Future of Work Trends” (2024); McKinsey Global Institute, “Generative AI and the future of work in America” (2023)",
      },
      {
        label: "1.5% revenue uplift from accelerated decision cycles",
        explanation:
          "Organizations that deploy AI-assisted decision support consistently report 1 to 2% revenue impact from faster cycle times, better lead scoring, dynamic pricing, and reduced churn. We model 1.5% as a conservative midpoint. This uplift is independent of labor savings and compounds with scale.",
        source: "McKinsey, “The economic potential of generative AI” (2023); Forrester, “The AI-Powered Enterprise” (2024)",
      },
      {
        label: "Hourly rate derived from revenue per employee",
        explanation:
          "We estimate the blended hourly rate of your workforce as: Annual Revenue ÷ Number of Employees ÷ 2,000 working hours per year. This is a well-established proxy for the economic value of an employee-hour in knowledge work environments. It intentionally captures total economic contribution, not just salary.",
        source: "Standard labor economics methodology; used in Deloitte, PwC, and McKinsey ROI frameworks",
      },
      {
        label: "Conservative to optimistic range multiplier: ×0.85 to ×1.35",
        explanation:
          "We apply a ±25% confidence band around the base estimate to reflect variability in infrastructure maturity, data quality, and organizational readiness. The conservative bound (0.85×) assumes partial adoption. The optimistic bound (1.35×) assumes strong org alignment and clean data.",
        source: "Internal calibration against Vantix engagement outcomes and Forrester TEI methodology",
      },
    ],
  },
  {
    capability: "Data Engineering",
    subtitle: "Snowflake · dbt · Pipelines",
    number: "02",
    assumptions: [
      {
        label: "3.5 hours/week lost per employee to data friction",
        explanation:
          "IDC’s Data and Analytics research consistently finds that knowledge workers spend 30 to 40% of their time searching for, cleaning, or waiting on data. We apply a conservative floor of 3.5 hours per week per employee, which is below the IDC mean, to represent the portion attributable specifically to brittle reporting workflows and not general research time.",
        source: "IDC, “Data Literacy as a Business Strategy” (2023); Forrester, “Total Economic Impact of Modern Data Stack” studies",
      },
      {
        label: "65% efficiency capture rate",
        explanation:
          "Of the 3.5 hours modeled as lost per employee, we assume 65% is recoverable through reliable, governed pipelines and self-serve analytics. The remaining 35% reflects irreducible data exploration, analyst judgment, and stakeholder communication time that cannot be automated away.",
        source: "Forrester TEI methodology; Snowflake customer outcome studies (2022 to 2024)",
      },
      {
        label: "1.8% revenue uplift from improved decision quality",
        explanation:
          "Organizations with mature data infrastructure report higher revenue per decision-maker due to reduced data latency, fewer errors, and faster board-level reporting. We model 1.8% as a slightly higher uplift than AI Orchestration because data quality improvements affect the entire decision-making chain.",
        source: "McKinsey, “The data-driven enterprise of 2025”; Gartner, “Business Value of Data Quality” (2023)",
      },
      {
        label: "Conservative to optimistic range multiplier: ×0.80 to ×1.40",
        explanation:
          "Data Engineering outcomes have slightly more variability than AI Orchestration because they depend heavily on existing warehouse maturity. A greenfield data environment yields faster, larger wins; a heavily customized legacy stack takes longer to modernize.",
        source: "Internal calibration; Databricks State of Data + AI Report (2024)",
      },
    ],
  },
  {
    capability: "Operational Redesign",
    subtitle: "M&A Integration · Process · Automation",
    number: "03",
    assumptions: [
      {
        label: "30% of revenue flows through redesignable operations",
        explanation:
          "Not all revenue-generating activity is subject to operational redesign. We model 30% of total revenue as flowing through operational processes directly impacted by M&A integration, workflow automation, or process standardization. This figure is drawn from Bain & Company’s post-acquisition analysis, which identifies operations-adjacent cost centers as the primary lever for deal value capture.",
        source: "Bain & Company, “M&A Report 2023”; BCG, “Capturing Value in M&A” (2022)",
      },
      {
        label: "20% efficiency gain from systematic process redesign",
        explanation:
          "McKinsey’s Operations Practice benchmarks consistently show 15 to 25% efficiency improvements in the first 12 months of systematic process redesign engagements. We model 20% as the midpoint. This applies to the ops-dependent revenue base (30% of total), not total revenue, keeping the estimate grounded.",
        source: "McKinsey Operations Practice, “Lean Management in the Digital Age” (2023); Bain, “Operational Integration Playbook”",
      },
      {
        label: "Conservative to optimistic range multiplier: ×0.85 to ×1.50",
        explanation:
          "Operational Redesign has the widest confidence interval of the three capabilities because outcomes depend significantly on leadership alignment, cultural readiness, and M&A deal complexity. The upper bound (1.50×) reflects engagements with clean deal structures and executive sponsorship. The lower bound (0.85×) reflects partial adoption or complex legacy integrations.",
        source: "Internal Vantix engagement data; BCG M&A Integration benchmarks",
      },
    ],
  },
];

export default function BenchmarksPage() {
  return (
    <div className="pt-14">
      {/* Hero */}
      <section className="border-b border-zinc-800 py-24 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="text-xs tracking-[0.2em] uppercase text-zinc-600">Methodology</span>
          <h1
            className="text-4xl md:text-5xl text-white mt-3 mb-6 max-w-3xl"
            style={{ fontWeight: 300, letterSpacing: "0.05em" }}
          >
            Industry Benchmark
            <br />
            Methodology
          </h1>
          <p className="text-zinc-400 font-light max-w-2xl leading-relaxed mb-6">
            Every number in the Value Calculator is grounded in published research. This page explains exactly which
            benchmarks we use, why we chose them, and how we apply them to your inputs. If you disagree with an
            assumption, use that as the starting point for a conversation with us.
          </p>
          <Link
            href="/value-calculator"
            className="inline-flex items-center gap-2 text-xs tracking-[0.12em] uppercase text-zinc-400 hover:text-zinc-100 transition-colors border border-zinc-800 hover:border-zinc-600 px-4 py-2"
          >
            Back to Value Calculator
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* General assumptions */}
      <section className="py-20 bg-[#18181b] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs tracking-[0.2em] uppercase text-zinc-600">Universal</span>
            <h2
              className="text-3xl text-white mt-3"
              style={{ fontWeight: 300, letterSpacing: "0.05em" }}
            >
              General Model Assumptions
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-px border border-zinc-800 bg-zinc-800">
            {generalAssumptions.map((item, i) => (
              <div key={i} className="bg-[#18181b] p-7">
                <h3
                  className="text-sm text-white mb-3"
                  style={{ fontWeight: 300, letterSpacing: "0.04em" }}
                >
                  {item.label}
                </h3>
                <p className="text-xs text-zinc-500 font-light leading-relaxed">{item.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Per-capability benchmarks */}
      {capabilityBenchmarks.map((section, si) => (
        <section
          key={si}
          className={`py-20 border-b border-zinc-800 ${si % 2 === 0 ? "bg-[#09090b]" : "bg-[#18181b]"}`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-10">
              <span className="text-xs tracking-[0.2em] uppercase text-zinc-600">
                Capability {section.number}
              </span>
              <h2
                className="text-3xl text-white mt-3 mb-1"
                style={{ fontWeight: 300, letterSpacing: "0.05em" }}
              >
                {section.capability}
              </h2>
              <p className="text-xs font-mono text-zinc-600 tracking-wider">{section.subtitle}</p>
            </div>

            <div className="border border-zinc-800">
              {section.assumptions.map((assumption, ai) => (
                <div
                  key={ai}
                  className={`p-7 border-b border-zinc-800 last:border-b-0 ${
                    si % 2 === 0 ? "bg-[#09090b]" : "bg-[#18181b]"
                  }`}
                >
                  <div className="grid lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-4">
                      <div className="flex items-start gap-2.5">
                        <span className="text-xs font-mono text-zinc-700 flex-shrink-0 mt-0.5">
                          {String(ai + 1).padStart(2, "0")}.
                        </span>
                        <h3
                          className="text-sm text-zinc-200"
                          style={{ fontWeight: 300, letterSpacing: "0.03em" }}
                        >
                          {assumption.label}
                        </h3>
                      </div>
                    </div>
                    <div className="lg:col-span-8">
                      <p className="text-xs text-zinc-500 font-light leading-relaxed mb-3">
                        {assumption.explanation}
                      </p>
                      <p className="text-xs text-zinc-700 font-mono leading-relaxed">
                        Source: {assumption.source}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-24 bg-[#09090b]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2
            className="text-3xl text-white mb-5"
            style={{ fontWeight: 300, letterSpacing: "0.05em" }}
          >
            Disagree with an assumption?
          </h2>
          <p className="text-zinc-400 font-light mb-10 max-w-xl mx-auto leading-relaxed">
            Good. That means you have context we don&apos;t. Bring your own numbers and we&apos;ll build a model
            calibrated to your actual environment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/about#contact"
              className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase bg-white text-zinc-900 px-8 py-3.5 hover:bg-zinc-200 transition-colors font-medium"
            >
              Discuss a Custom Model
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/value-calculator"
              className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase border border-zinc-700 text-zinc-300 px-8 py-3.5 hover:border-zinc-400 hover:text-white transition-all"
            >
              Back to Calculator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
