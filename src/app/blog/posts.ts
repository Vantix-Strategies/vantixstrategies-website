export interface SourceLink {
  label: string;
  url: string;
}

export interface BenchmarkAssumption {
  label: string;
  explanation: string;
  source: string;
  sourceLinks?: SourceLink[];
}

export interface BenchmarkSection {
  capability: string;
  subtitle: string;
  number: string;
  assumptions: BenchmarkAssumption[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  kind: "benchmark" | "article";
}

export const generalAssumptions = [
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

export const capabilityBenchmarks: BenchmarkSection[] = [
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
        sourceLinks: [
          { label: "BizTech / McKinsey — GenAI Productivity (2024)", url: "https://biztechmagazine.com/article/2024/11/5-tech-essentials-boost-efficiency-financial-services" },
        ],
      },
      {
        label: "1.5% to 16% revenue uplift from accelerated decision cycles",
        explanation:
          "Organizations that deploy AI-assisted decision support consistently report 1 to 2% revenue impact from faster cycle times, better lead scoring, dynamic pricing, and reduced churn. We model 1.5% as the conservative floor. Orgvue research finds that organizations with access to real-time data see up to 16% higher profit growth opportunity — reflecting a wide range depending on decision maturity and data latency. The calculator uses 1.5% to remain grounded and auditable.",
        source: "McKinsey, “The economic potential of generative AI” (2023); Forrester, “The AI-Powered Enterprise” (2024); Orgvue, “New research finds link between faster decision-making and a greater share of profit” (2024)",
        sourceLinks: [
          { label: "Orgvue — Faster Decisions & Profit Growth", url: "https://www.orgvue.com/news/new-research-finds-link-between-faster-decision-making-and-a-greater-share-of-profit/" },
          { label: "C.H. Robinson Q1 2025 — AI Profit Impact (1.5% floor)", url: "https://www.truckingdive.com/news/chrobinson-q12025-ai-technology-productivity-profit/747329/" },
        ],
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
        label: "9.3 hours/week lost per employee to data friction",
        explanation:
          "McKinsey research indicates knowledge workers spend an average of 9.3 hours per week searching and gathering information — what McKinsey calls the \"Fifth Employee\" effect. This reflects the total information burden across reporting, data preparation, and search tasks, not a single sub-task. Earlier models used 3.5 hours (a sub-task floor from IDC), but 9.3 hours better captures the full scope of data-related overhead that modern data infrastructure can address.",
        source: "McKinsey Global Institute, various surveys on information worker productivity; cottrillresearch.com/various-survey-statistics-workers-spend-too-much-time-searching-for-information/",
        sourceLinks: [
          { label: "Cottrill Research — McKinsey Search Time Survey", url: "https://cottrillresearch.com/various-survey-statistics-workers-spend-too-much-time-searching-for-information/" },
        ],
      },
      {
        label: "20% efficiency capture rate",
        explanation:
          "Of the 9.3 hours modeled as lost per employee, we apply a conservative 20% capture rate — the midpoint of McKinsey’s 15% to 25% optimization potential benchmark for indirect functions such as reporting and data engineering. This is more conservative than our prior 65% figure, which applied to targeted sub-tasks rather than the broader information burden. The remaining 80% reflects irreducible research, analyst judgment, and stakeholder communication that cannot be automated away.",
        source: "McKinsey Industry 4.0 and Lean Management research; McKinsey, “Generative AI and the future of work” (2023–2024)",
      },
      {
        label: "1.8% revenue uplift from improved decision quality",
        explanation:
          "Organizations with mature data infrastructure report higher revenue per decision-maker due to reduced data latency, fewer errors, and faster board-level reporting. We model 1.8% as a slightly higher uplift than AI Orchestration because data quality improvements affect the entire decision-making chain.",
        source: "McKinsey, “The data-driven enterprise of 2025”; Gartner, “Business Value of Data Quality” (2023)",
        sourceLinks: [
          { label: "Blend Commerce / IRP — eCommerce Conversion Benchmarks (2026)", url: "https://blendcommerce.com/blogs/shopify/ecommerce-conversion-rate-benchmarks-2026" },
        ],
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
        sourceLinks: [
          { label: "Bain & Company — 30% Revenue Risk Press Release", url: "https://www.bain.com/about/media-center/press-releases/20252/business-as-usual-could-erase-30-of-revenue-for-tech-services-firms-bain--co-finds/" },
        ],
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

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-orchestration-in-practice",
    title: "AI Orchestration in Practice: RAG, Agents, Evaluation, and Production Infrastructure",
    excerpt:
      "Most AI orchestration conversations stop at the architecture diagram. This post covers the specific retrieval strategies, agent coordination patterns, evaluation frameworks, and production infrastructure decisions that determine whether an AI system survives its first week in production.",
    author: "Connor Holm",
    date: "April 1, 2026",
    category: "Technical",
    readTime: "11 min read",
    kind: "article",
  },
  {
    slug: "agentic-operating-model",
    title: "The Agentic Operating Model: Orchestrating the 2026 Digital Workforce",
    excerpt:
      "The enterprise is moving away from standalone chatbots toward agentic orchestration — autonomous systems that execute complex workflows across departments. This shift requires a redesigned operating model and a data foundation built to support it. Without one, the 85% AI project failure rate is not a cautionary statistic. It is your forecast.",
    author: "Connor Holm",
    date: "March 30, 2026",
    category: "Strategy",
    readTime: "9 min read",
    kind: "article",
  },
  {
    slug: "industry-metrics-we-evaluated",
    title: "Industry Metrics We Evaluated (AI, Data, and Operations)",
    excerpt:
      "We reviewed analyst reports and operations studies to see where teams actually gain time and margin. This post is a plain-language walkthrough of the benchmark assumptions we used.",
    author: "Connor Holm",
    date: "March 5, 2026",
    category: "Methodology",
    readTime: "8 min read",
    kind: "benchmark",
  },
];
