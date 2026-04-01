import Link from "next/link";
import { ArrowRight } from "lucide-react";

const sections = [
  {
    number: "01",
    label: "The Foundation",
    title: "Retrieval Augmented Generation",
    subtitle: "From hallucination-prone prompts to grounded, auditable answers",
    body: [
      "The most common failure mode in enterprise LLM deployments is not the model. It is the context. A standalone language model answering questions about your contracts, policies, or customer tickets is working from its training data, not yours. Retrieval Augmented Generation solves this by injecting verified, source-attributed context into every prompt before the model generates a response.",
      "The implementation starts with an ingestion pipeline. Documents are chunked using a recursive strategy that respects semantic boundaries: section headers, paragraph breaks, and list structures rather than fixed token windows. Each chunk is embedded using a model tuned for the domain, typically OpenAI text-embedding-3-large or Cohere embed-v3, and stored in a vector database such as Pinecone or Weaviate. Metadata tagging at ingestion time, including document type, access tier, and freshness timestamp, enables filtered retrieval that respects both relevance and governance.",
      "At query time, the retrieval layer performs a hybrid search combining dense vector similarity with sparse keyword matching via BM25. Retrieved chunks are reranked using a cross-encoder model before being assembled into the prompt context window. The result is a system that does not guess. It retrieves, cites, and generates, and every answer can be traced back to a specific document, paragraph, and timestamp.",
    ],
    callout: {
      stat: "3x",
      label: "improvement in answer accuracy when RAG pipelines use hybrid retrieval with reranking versus naive vector search alone",
      source: "LlamaIndex Benchmark Report, 2025",
      url: "https://www.llamaindex.ai/blog",
    },
    capability: {
      label: "Document-Grounded AI Systems",
      description:
        "RAG is not a feature. It is the architecture that makes enterprise AI trustworthy. Without retrieval, you have a chatbot. With it, you have a system that can cite its sources and survive a compliance review.",
    },
  },
  {
    number: "02",
    label: "The Coordination Layer",
    title: "Multi-Agent Orchestration",
    subtitle: "Decomposing complex workflows into supervised agent networks",
    body: [
      "Single-agent architectures hit a ceiling the moment a workflow requires more than one skill: reading a contract, querying a database, drafting a response, and routing an approval. Multi-agent orchestration decomposes these workflows into specialized agents, each with a defined role, tool set, and output schema, coordinated by a supervisor agent that manages execution order, error handling, and human-in-the-loop checkpoints.",
      "In practice, we implement this using LangGraph's stateful graph execution model. Each agent is a node in a directed graph with typed state that flows between nodes. A contract review workflow, for example, might involve a retrieval agent that pulls relevant clauses, an analysis agent that flags risk terms against a policy matrix, a drafting agent that produces redline suggestions, and a routing agent that determines whether the output requires human review based on confidence scores and risk thresholds.",
      "The critical architectural decision is where to place human-in-the-loop gates. We default to a principle we call \"high-stakes, low-frequency\": any action that is irreversible or customer-facing requires explicit human approval, while high-volume internal actions proceed autonomously with post-hoc audit logging. This keeps throughput high without sacrificing the governance controls that enterprise environments require.",
    ],
    callout: {
      stat: "60%",
      label: "of enterprise AI adopters plan to deploy multi-agent systems by 2027, up from 12% in 2025, according to Gartner's AI agent adoption survey",
      source: "Gartner, Emerging Tech: AI Agents (2025)",
      url: "https://www.gartner.com/en/articles/intelligent-agent-in-ai",
    },
    capability: {
      label: "Agent Workflow Design",
      description:
        "The value of multi-agent systems is not complexity for its own sake. It is the ability to automate end-to-end business processes that previously required four people, three systems, and a shared spreadsheet.",
    },
  },
  {
    number: "03",
    label: "The Safety Net",
    title: "Evaluation and Guardrails",
    subtitle: "Catching failures before they reach production users",
    body: [
      "Deploying a language model without an evaluation harness is the AI equivalent of shipping code without tests. Evaluation infrastructure is the system that answers the question every stakeholder eventually asks: how do we know this is working? The answer cannot be anecdotal. It has to be measured, versioned, and automated.",
      "Our evaluation stack operates at three layers. First, offline evaluation: a curated dataset of question-answer pairs with gold-standard references, scored on faithfulness, relevance, and completeness using LLM-as-judge frameworks calibrated against human ratings. Second, online evaluation: production traces sampled and scored continuously, with drift detection that alerts when answer quality degrades beyond a configured threshold. Third, adversarial testing: red-team prompt suites designed to trigger hallucination, policy violations, and PII leakage, run on every model or prompt update before deployment.",
      "Guardrails operate as middleware in the request pipeline. Input guardrails scan for prompt injection, PII in user queries, and out-of-scope requests. Output guardrails validate that responses conform to policy constraints, do not contain hallucinated citations, and fall within confidence thresholds. When a guardrail fires, the system does not silently fail. It routes to a fallback response, logs the event for review, and increments an alert counter that feeds into the operations dashboard.",
    ],
    callout: {
      stat: "85%",
      label: "of AI projects fail to reach production, with lack of evaluation infrastructure and governance cited as a top barrier by enterprise teams",
      source: "Gartner via Integrate.io",
      url: "https://www.integrate.io/blog/data-quality-improvement-stats-from-etl/",
    },
    capability: {
      label: "Production-Grade AI Governance",
      description:
        "Evaluation is not a one-time gate. It is a continuous system that runs in parallel with production, catching regressions before users do. Without it, you are relying on customer complaints as your monitoring layer.",
    },
  },
  {
    number: "04",
    label: "The Production Stack",
    title: "Deployment and Observability",
    subtitle: "From staging to production with full operational visibility",
    body: [
      "The gap between a working notebook and a production AI system is infrastructure. Model serving, cost management, latency optimization, and trace-level observability are not afterthoughts. They are the difference between a demo that impresses in a conference room and a system that processes ten thousand requests a day without an on-call page.",
      "We deploy orchestration services behind FastAPI endpoints with async request handling, structured logging, and OpenTelemetry-compatible tracing. Every LLM call, retrieval query, and agent step is captured as a span in a distributed trace, giving operators full visibility into latency breakdowns, token usage, and failure points. Cost controls are enforced at the API gateway layer: per-user rate limits, model routing rules that direct low-complexity queries to smaller models, and circuit breakers that prevent runaway token consumption from malformed inputs.",
      "Infrastructure is provisioned as code using Terraform, deployed on the client's cloud account, and handed over with full documentation. We support AWS Bedrock, Azure OpenAI, and on-premise GPU clusters depending on data residency and compliance requirements. The handoff includes not just the codebase but runbooks, architecture decision records, and a team enablement session that ensures the client's engineers can operate, extend, and debug the system independently from day one.",
    ],
    callout: {
      stat: "100%",
      label: "of IP and infrastructure ownership transferred to the client at engagement close, with zero vendor lock-in or recurring license dependencies",
      source: "Vantix Engagement Model",
      url: "/capabilities/ai-orchestration",
    },
    capability: {
      label: "Full-Stack AI Infrastructure",
      description:
        "Production AI is an infrastructure problem, not a model problem. The model is a component. The system around it, the serving layer, the observability stack, the cost controls, is what determines whether it survives contact with real users.",
    },
  },
];

const sources = [
  {
    label: "LlamaIndex: RAG Pipeline Benchmarks and Hybrid Retrieval Performance (2025)",
    url: "https://www.llamaindex.ai/blog",
  },
  {
    label: "Gartner: Emerging Technology — Intelligent AI Agents and Multi-Agent Systems (2025)",
    url: "https://www.gartner.com/en/articles/intelligent-agent-in-ai",
  },
  {
    label: "Gartner via Integrate.io: 85% AI Project Failure Rate and Data Quality Crisis",
    url: "https://www.integrate.io/blog/data-quality-improvement-stats-from-etl/",
  },
  {
    label: "LangChain / LangGraph: Stateful Multi-Agent Orchestration Framework",
    url: "https://www.langchain.com/langgraph",
  },
  {
    label: "OpenTelemetry: Distributed Tracing for LLM Applications",
    url: "https://opentelemetry.io/docs/",
  },
  {
    label: "Pinecone: Vector Database Architecture for Production RAG Systems",
    url: "https://www.pinecone.io/learn/retrieval-augmented-generation/",
  },
];

export default function AIOrchestrationInPracticePage() {
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
            AI Orchestration
            <br />
            in Practice
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs tracking-[0.08em] uppercase text-zinc-600 mb-6">
            <span>By Connor Holm</span>
            <span className="text-zinc-700">&bull;</span>
            <span>April 1, 2026</span>
            <span className="text-zinc-700">&bull;</span>
            <span>Technical</span>
            <span className="text-zinc-700">&bull;</span>
            <span>11 min read</span>
          </div>
          <p className="text-zinc-400 font-light max-w-2xl leading-relaxed mb-8">
            Most AI orchestration conversations stop at the architecture diagram. This post goes further: the
            specific retrieval strategies, agent coordination patterns, evaluation frameworks, and production
            infrastructure decisions that determine whether an AI system survives its first week in production
            or joins the 85% that never make it past staging.
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
                {section.number} &middot; {section.label}
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
                    href="/capabilities/ai-orchestration"
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
            Ready to ship production AI?
          </h2>
          <p className="text-zinc-400 font-light mb-10 max-w-xl mx-auto leading-relaxed">
            If your team has an AI pilot that needs to become a production system, or a workflow
            that needs to become an agent pipeline, that is exactly where we work.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/capabilities/ai-orchestration"
              className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase bg-white text-zinc-900 px-8 py-3.5 hover:bg-zinc-200 transition-colors font-medium"
            >
              Explore AI Orchestration
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
