export interface BenchmarkAssumption {
  label: string;
  explanation: string;
  source: string;
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
  kind: "benchmark";
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

export const blogPosts: BlogPost[] = [
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
