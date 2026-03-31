import Link from "next/link";
import { ArrowRight } from "lucide-react";

const sections = [
  {
    number: "01",
    label: "The Shift",
    title: "Systems of Action",
    subtitle: "From record-keeping to autonomous execution",
    body: [
      "For thirty years, the ERP and CRM were the enterprise's memory: passive repositories that told you what happened after it happened. That era is ending. The defining infrastructure shift of 2026 is the emergence of what Redwood and Gartner call \"systems of action\": platforms that don't wait for human instruction but instead execute tasks, resolve exceptions, and trigger downstream workflows on their own.",
      "By the end of 2026, Gartner projects that 40% of enterprise applications will feature task-specific AI agents embedded directly in their workflows, up from less than 5% in 2025. That is not incremental adoption. That is a category redefinition happening inside a single fiscal year.",
      "The implication for enterprise leaders is structural, not cosmetic. When your ERP can autonomously reconcile vendor invoices, flag anomalies, and initiate purchase orders without a queue, a ticket, or a human checkpoint, the value of a disconnected orchestration layer becomes the single largest drag on operational throughput.",
    ],
    callout: {
      stat: "40%",
      label: "of enterprise applications projected to feature embedded AI agents by end of 2026, up from <5% in 2025",
      source: "Gartner via Rapidio",
      url: "https://www.rapidionline.com/blog/data-integration-trends-markets",
    },
    capability: {
      label: "Custom AI Orchestration",
      description:
        "This is the market validation for cross-system orchestration as the connective tissue of the modern enterprise. The value is not in any single agent. It is in the coordination layer that makes agents work together.",
    },
  },
  {
    number: "02",
    label: "The Bottleneck",
    title: "The 97% Data Barrier",
    subtitle: "Why most AI investments are built on sand",
    body: [
      "Here is the number that deserves more attention than it gets: only 3% of organizations have data that meets basic quality standards for AI deployment. Not sophisticated standards. Basic ones. Gartner's research is explicit: 85% of AI projects fail, and the primary cause is not model quality, not compute, and not talent. It is data integration and data quality.",
      "Meanwhile, 65% of companies report using AI in some form. The gap between \"using AI\" and \"having data that supports AI\" is where most enterprise transformation budgets quietly disappear. You can purchase the best large language model available, deploy it across your stack, and still generate outputs that are confidently wrong, because the underlying data is inconsistent, siloed, or stale.",
      "The \"zero-copy\" data foundation is a single, governed data layer that AI systems can trust. It is not a nice-to-have. It is the precondition for any ROI calculation that survives contact with production.",
    ],
    callout: {
      stat: "85%",
      label: "of AI projects fail due to data integration and quality challenges, while only 3% of organizations meet basic data quality standards",
      source: "Gartner via Rapidio / Integrate.io",
      url: "https://www.integrate.io/blog/data-quality-improvement-stats-from-etl/",
    },
    capability: {
      label: "Embedded Data Engineering",
      description:
        "Data engineering is not a dependency of AI strategy. It is the prerequisite. Without a reliable data layer, AI orchestration produces faster wrong answers. The conversation about ROI starts here.",
    },
  },
  {
    number: "03",
    label: "The M&A Imperative",
    title: "Alpha Generation",
    subtitle: "Why the deal math has permanently changed",
    body: [
      "Bain & Company's 2026 Global Private Equity Report introduced a figure that reframes the entire post-acquisition playbook: \"12 is the new 5.\" Under the old Golden Decade model, a deal generating 5% annual EBITDA growth was a success. In the current environment, with higher carry costs, compressed multiples, and longer hold periods, that threshold has moved to 12% annual EBITDA growth for a deal to clear its return hurdle.",
      "That gap does not close through revenue synergies alone. It closes through operational efficiency at a pace and precision that manual integration programs cannot deliver. High-performing firms are already responding: AI-powered labor synergy modeling is allowing acquirers to forecast integration outcomes with 90% accuracy before close, replacing the traditional 90-day post-merger scramble with pre-signed operational redesign playbooks.",
      "For private equity and corporate development teams, the question is no longer whether to operationalize AI in the integration process. The question is whether your current integration capability can generate 12% EBITDA growth on the next deal, and what happens to fund returns if it cannot.",
    ],
    callout: {
      stat: "12%",
      label: "annual EBITDA growth now required for deal success, up from 5% under the prior decade's model, per Bain & Company's 2026 PE Report",
      source: "Bain & Company, Global PE Report 2026",
      url: "https://www.bain.com/about/media-center/press-releases/2026/private-equity-resurgence-gathers-steam-as-new-era-challenges-firms-to-enhance-value-creationbain--company-global-pe-report/",
    },
    capability: {
      label: "Post-Acquisition Operational Redesign",
      description:
        "The integration window is shorter than it has ever been. Firms that enter a deal with a pre-built operational redesign framework, one informed by AI-modeled synergy maps, are the firms closing the gap between deal thesis and realized value.",
    },
  },
  {
    number: "04",
    label: "The Productivity Gap",
    title: "The Fifth Employee",
    subtitle: "Recovering the capacity you are already paying for",
    body: [
      "McKinsey's research on knowledge worker productivity surfaces a concept that should be in every operating review: the \"Fifth Employee\" effect. The finding is straightforward. If you hire five employees, you effectively have four. The fifth is occupied searching for information, hunting across systems, reformatting data, chasing approvals, and reconstructing context that already exists somewhere in your stack.",
      "The average knowledge worker loses 9.3 hours per week to information search and retrieval alone. Across a 100-person organization, that is the equivalent of 23 full-time employees whose output is absorbed entirely by administrative overhead before a single high-value task begins.",
      "AI-orchestrated research and prospecting workflows can reduce this burden by up to 90%, according to Outreach.io's 2026 sales trends analysis. The recovered capacity does not disappear. It shifts. Teams that previously spent 40% of their week on information work begin spending that time on the strategic decisions that actually move the business.",
    ],
    callout: {
      stat: "90%",
      label: "reduction in administrative research time achievable through AI-orchestrated prospecting and information workflows",
      source: "Outreach.io / McKinsey via Cottrill Research",
      url: "https://cottrillresearch.com/various-survey-statistics-workers-spend-too-much-time-searching-for-information/",
    },
    capability: {
      label: "AI Orchestration + Data Engineering",
      description:
        "The Fifth Employee effect is a data problem as much as an AI problem. Agents can only surface information that is structured and accessible. Solving it requires orchestration and clean pipelines working in concert.",
    },
  },
];

const sources = [
  {
    label: "Bain & Company: Private Equity Resurgence / Alpha Generation (2026)",
    url: "https://www.bain.com/about/media-center/press-releases/2026/private-equity-resurgence-gathers-steam-as-new-era-challenges-firms-to-enhance-value-creationbain--company-global-pe-report/",
  },
  {
    label: "Gartner via Rapidio: 40% Agent Integration and 85% Failure Rates",
    url: "https://www.rapidionline.com/blog/data-integration-trends-markets",
  },
  {
    label: "Integrate.io: The 97% Data Quality Crisis",
    url: "https://www.integrate.io/blog/data-quality-improvement-stats-from-etl/",
  },
  {
    label: "Outreach.io: 90% Research Time Reduction",
    url: "https://www.outreach.io/resources/blog/sales-trends",
  },
  {
    label: "McKinsey via Cottrill Research: The Fifth Employee Effect",
    url: "https://cottrillresearch.com/various-survey-statistics-workers-spend-too-much-time-searching-for-information/",
  },
  {
    label: "Redwood: Systems of Record to Systems of Action",
    url: "https://www.redwood.com/article/ai-automation-trends/",
  },
];

export default function AgenticOperatingModelPage() {
  return (
    <div className="pt-14">
      {/* Hero */}
      <section className="border-b border-zinc-800 py-24 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="text-xs tracking-[0.2em] uppercase text-zinc-600">Blog</span>
          <h1
            className="text-4xl md:text-5xl text-white mt-3 mb-6 max-w-3xl"
            style={{ fontWeight: 300, letterSpacing: "0.05em" }}
          >
            The Agentic
            <br />
            Operating Model
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs tracking-[0.08em] uppercase text-zinc-600 mb-6">
            <span>By Connor Holm</span>
            <span className="text-zinc-700">•</span>
            <span>March 30, 2026</span>
            <span className="text-zinc-700">•</span>
            <span>Strategy</span>
            <span className="text-zinc-700">•</span>
            <span>9 min read</span>
          </div>
          <p className="text-zinc-400 font-light max-w-2xl leading-relaxed mb-8">
            In 2026, the enterprise is moving away from standalone chatbots toward agentic orchestration: autonomous
            systems that execute complex workflows across departments, not just assist the humans running them. This
            shift requires a fundamental redesign of operational models and a data foundation capable of supporting it.
            Without one, the 85% AI project failure rate is not a cautionary statistic. It is your forecast.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs tracking-[0.12em] uppercase text-zinc-400 hover:text-zinc-100 transition-colors border border-zinc-800 hover:border-zinc-600 px-4 py-2"
          >
            Back to Blog
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Sections */}
      {sections.map((section, si) => (
        <section
          key={si}
          className={`py-20 border-b border-zinc-800 ${si % 2 === 0 ? "bg-[#18181b]" : "bg-[#09090b]"}`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-10">
              <span className="text-xs tracking-[0.2em] uppercase text-zinc-600">
                {section.number} · {section.label}
              </span>
              <h2
                className="text-3xl text-white mt-3 mb-1"
                style={{ fontWeight: 300, letterSpacing: "0.05em" }}
              >
                {section.title}
              </h2>
              <p className="text-xs font-mono text-zinc-600 tracking-wider">{section.subtitle}</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-10">
              {/* Body copy */}
              <div className="lg:col-span-7 space-y-5">
                {section.body.map((paragraph, pi) => (
                  <p key={pi} className="text-zinc-400 font-light leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-5 space-y-4">
                {/* Stat callout */}
                <div className="border border-zinc-800 p-6 bg-[#09090b]">
                  <div
                    className="text-5xl text-white mb-3"
                    style={{ fontWeight: 200, letterSpacing: "0.04em" }}
                  >
                    {section.callout.stat}
                  </div>
                  <p className="text-xs text-zinc-500 font-light leading-relaxed mb-3">
                    {section.callout.label}
                  </p>
                  <a
                    href={section.callout.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-zinc-700 underline underline-offset-2 hover:text-zinc-400 transition-colors"
                  >
                    {section.callout.source}
                  </a>
                </div>

                {/* Capability link */}
                <div className="border border-zinc-800 p-6 bg-[#09090b]">
                  <span className="text-xs tracking-[0.15em] uppercase text-zinc-600 block mb-2">
                    Our Capability
                  </span>
                  <h3
                    className="text-sm text-zinc-200 mb-2"
                    style={{ fontWeight: 300, letterSpacing: "0.03em" }}
                  >
                    {section.capability.label}
                  </h3>
                  <p className="text-xs text-zinc-500 font-light leading-relaxed mb-4">
                    {section.capability.description}
                  </p>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 text-xs tracking-[0.1em] uppercase text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    View Service
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Sources */}
      <section className="py-20 bg-[#18181b] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs tracking-[0.2em] uppercase text-zinc-600">Research</span>
            <h2
              className="text-3xl text-white mt-3"
              style={{ fontWeight: 300, letterSpacing: "0.05em" }}
            >
              Sources
            </h2>
          </div>
          <div className="border border-zinc-800">
            {sources.map((source, i) => (
              <div
                key={i}
                className="flex items-start gap-4 px-7 py-5 border-b border-zinc-800 last:border-b-0 bg-[#18181b]"
              >
                <span className="text-xs font-mono text-zinc-700 flex-shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}.
                </span>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-500 font-light underline underline-offset-2 hover:text-zinc-300 transition-colors leading-relaxed"
                >
                  {source.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#09090b]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2
            className="text-3xl text-white mb-5"
            style={{ fontWeight: 300, letterSpacing: "0.05em" }}
          >
            Ready to build the operating model?
          </h2>
          <p className="text-zinc-400 font-light mb-10 max-w-xl mx-auto leading-relaxed">
            The agentic shift is not a future trend. It is the infrastructure decision in front of you today.
            If your team is ready to move from AI experimentation to AI operations, that is where we work.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase bg-white text-zinc-900 px-8 py-3.5 hover:bg-zinc-200 transition-colors font-medium"
            >
              Explore Services
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase border border-zinc-700 text-zinc-300 px-8 py-3.5 hover:border-zinc-400 hover:text-white transition-all"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
