import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { blogPosts } from "../posts";
import { blogPostingSchema } from "../schema";
import { JsonLd } from "@/components/JsonLd";

const DECK_URL = "/decks/workforce-transformation-with-ai";

const comparison = [
  { label: "Mission", pod: "Build the known roadmap, faster", fde: "Find and attack the unknown" },
  { label: "Where", pod: "Inside an existing product team", fde: "Embedded with the business, where engineering is not" },
  { label: "Shape", pod: "Smaller pods, same output", fde: "Small, senior, generalist" },
  { label: "Horizon", pod: "Long lived ownership", fde: "Weeks. Scope, prove, hand off" },
  { label: "Judged on", pod: "Throughput and quality", fde: "Business value delivered" },
];

const sections = [
  {
    number: "01",
    label: "Scrum Team",
    title: "Smaller Pods, Same Output",
    subtitle: "The scrum team of the future",
    body: [
      "Traditional product teams are five or more people, sized for the effort it used to take to write, test, and ship code. With AI absorbing much of the build work, groups of three can deliver the same result.",
      "The work does not change. The number of people it takes to deliver it does. Roles stay distinct, and each person still specializes in a part of the software lifecycle, but there are fewer handoffs and far less coordination overhead.",
      "The real payoff is portfolio shape. More pods from the same headcount means more parallel bets, and pods become the natural long term owners of whatever forward deployed engineers prove out.",
    ],
    points: [
      "Roles stay distinct across the SDLC",
      "Fewer handoffs, less coordination overhead",
      "More pods from the same headcount",
      "Pods own what FDEs prove out",
    ],
  },
  {
    number: "02",
    label: "FDEs",
    title: "The Swiss Army Knife",
    subtitle: "What a forward deployed engineer actually is",
    body: [
      "Forward deployed engineers are the first people in. They scout the lay of the land before anyone commits a roadmap, then pull out whichever tool the situation needs.",
      "They sit with the business to map the process, the systems, the data, and the people. They separate the real problem from the requested one. They put working software in front of real users in days, wire it into the systems the business already runs on, and package it so a team can own it long after they move on.",
      "Just as important, they tell the business when AI is the wrong answer, and what to do instead.",
    ],
    points: ["Discover", "Scope", "Prototype", "Integrate", "Advise", "Hand off"],
  },
  {
    number: "03",
    label: "Where FDEs Go",
    title: "Attacking Technical Deserts",
    subtitle: "Real, expensive problems with no engineering coverage",
    body: [
      "Every large organization has technical deserts: parts of the business with real, expensive problems and no engineering coverage. The work runs on spreadsheets, inboxes, and heroics.",
      "A platform team can't help, because there is no roadmap and nobody has defined the product yet. A scrum team can't help either, because there is no backlog. The requirements do not exist until someone goes and finds them.",
      "FDEs create both. Discovery turns into a scoped problem, then a working prototype, then something a team can own.",
    ],
    points: [
      "Finance and risk modeling in fragile, manual workflows",
      "Vendor and third party management across email and trackers",
      "Executive office work: briefings, follow ups, decision support",
      "Operations teams doing high volume, repeatable judgment work",
    ],
  },
  {
    number: "04",
    label: "Engagements",
    title: "From Scouting to Handoff",
    subtitle: "How an engagement runs, and who should own it",
    body: [
      "An engagement moves through five stages: scout, scope, triage, build, and measure. The FDE embeds with the business, names the problem and success metric, baselines today's process, prototypes on a paved road with weekly user feedback, and reports the delta before transitioning to an owning team.",
      "Engagements are short and time boxed. If one has not shown value by the end of the box, it gets re-scoped or stopped.",
      "Not every use case earns an FDE. Ambiguous, cross-boundary problems that no team owns go to an FDE. Well defined, long lived feature work in an existing product goes to a scrum team. And some problems belong with neither: a process change, an off the shelf tool, or a value case that does not justify the build. An FDE who concludes \"this belongs with a scrum team\" has run a successful engagement, not a failed one.",
    ],
    points: ["Scout", "Scope", "Triage", "Build", "Measure"],
  },
  {
    number: "05",
    label: "Value",
    title: "Measuring AI Transformation",
    subtitle: "How engagements are judged",
    body: [
      "Value shows up in four places: time (hours saved, cycle time from request to result), money (cost avoided, revenue protected, spend consolidated), productivity (throughput per person, manual steps removed), and adoption (active users, old workflows actually retired).",
      "Measure today's process before building, so the result is a delta, not a claim. And weigh more than dollars. Risk reduced, decision quality, and what the organization learned all count too.",
    ],
    points: ["Time", "Money", "Productivity", "Adoption"],
  },
  {
    number: "06",
    label: "Enablement",
    title: "The Paved Road",
    subtitle: "What a successful FDE program runs on",
    body: [
      "FDEs are only fast if the road is paved. That means an internal rapid prototyping platform: templated scaffolds for common shapes (web app, API, agent, RAG), a shared model gateway, safe data access through masked or synthetic data, and one step deploys with auth and logging built in.",
      "It also means getting through enterprise red tape once, at the platform level, so every engagement inherits the approval instead of re-fighting it: a pre-approved cloud landing zone, an approved model catalog with clear rules on which data classes can touch which models, a security and privacy fast lane, and responsible AI review built into the lifecycle.",
      "Finally, the practice has to compound. One front door for intake, a visible pipeline from scout to handoff, a reuse library of components and prompts, short lessons learned after every engagement, and a value ledger that rolls up outcomes across the practice.",
    ],
    points: [
      "Rapid prototyping platform",
      "Approved infrastructure and AI governance",
      "Knowledge sharing and engagement tracking",
    ],
  },
  {
    number: "07",
    label: "Together",
    title: "One Operating Model",
    subtitle: "How the two transformations fit together",
    body: [
      "FDEs discover a problem in a technical desert and prove value against a baseline. A pod of three takes ownership and hardens it. Running it in production surfaces the next opportunity, and that goes back to the FDEs.",
      "FDEs keep the pipeline of new work full. Pods turn proven work into durable products. Neither works as well alone.",
    ],
    points: ["FDE: Discover", "FDE: Prove", "Pod: Scale", "Pod: Surface"],
  },
  {
    number: "08",
    label: "Starting Out",
    title: "The First 90 Days",
    subtitle: "Standing up a practice today",
    body: [
      "Days 0 to 30 are foundation: secure an executive sponsor, open the governance conversation with security, legal, and privacy, and stand up a minimum paved road.",
      "Days 30 to 60 are the first deserts: pick two or three with visible pain and a willing partner, baseline them before building, and run the first engagements.",
      "Days 60 to 90 are prove and publish: ship, measure, and share results widely, open the intake front door, and start the knowledge base from day one. Hire versatile generalists over narrow specialists: builders who are comfortable with ambiguity, can talk with the business, and can ship end to end on their own.",
    ],
    points: ["Foundation", "First deserts", "Prove and publish"],
  },
];

const post = blogPosts.find((p) => p.slug === "workforce-transformation-with-ai")!;

export const metadata: Metadata = {
  title: post.title,
  description: post.excerpt,
  alternates: { canonical: `/blog/${post.slug}` },
  openGraph: {
    title: post.title,
    description: post.excerpt,
    type: "article",
    url: `/blog/${post.slug}`,
    images: ["/opengraph-image.png"],
    publishedTime: new Date(post.date).toISOString(),
    authors: [post.author],
  },
};

export default function WorkforceTransformationPage() {
  return (
    <div className="pt-14">
      <JsonLd data={blogPostingSchema(post)} />
      {/* Hero */}
      <section className="border-b border-zinc-800 py-24 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="text-xs tracking-[0.2em] uppercase text-zinc-600">Blog</span>
          <h1
            className="text-4xl md:text-5xl text-white mt-3 mb-6 max-w-3xl"
            style={{ fontWeight: 300, letterSpacing: "0.05em" }}
          >
            Workforce Transformation
            <br />
            with AI
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs tracking-[0.08em] uppercase text-zinc-600 mb-6">
            <span>By {post.author}</span>
            <span className="text-zinc-700">•</span>
            <span>{post.date}</span>
            <span className="text-zinc-700">•</span>
            <span>{post.category}</span>
            <span className="text-zinc-700">•</span>
            <span>{post.readTime}</span>
          </div>
          <p className="text-zinc-400 font-light max-w-2xl leading-relaxed mb-8">
            AI collapses the cost of building software. That changes two things at once: how many people a product
            team needs, and where engineering can afford to go. This is a look at both transformations, the scrum team
            of the future and the forward deployed engineer, and the operating model that makes them work together.
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

      {/* Deck */}
      <section className="py-20 bg-[#18181b] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs tracking-[0.2em] uppercase text-zinc-600">The Deck</span>
              <h2
                className="text-3xl text-white mt-3"
                style={{ fontWeight: 300, letterSpacing: "0.05em" }}
              >
                Two Transformations. One Enabler.
              </h2>
            </div>
            <a
              href={DECK_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-xs tracking-[0.12em] uppercase text-zinc-300 hover:text-white transition-colors border border-zinc-700 hover:border-zinc-500 px-4 py-2"
            >
              View Full Screen
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="aspect-[4/5] sm:aspect-video w-full border border-zinc-700 bg-[#09090b]">
            <iframe
              src={DECK_URL}
              title="Workforce Transformation with AI slide deck"
              loading="lazy"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <p className="text-xs font-mono text-zinc-600 tracking-wider mt-4">
            Click the deck, then use ← → or swipe to move through it. Press O for the full map.
          </p>
        </div>
      </section>

      {/* Thesis comparison */}
      <section className="py-20 bg-[#09090b] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs tracking-[0.2em] uppercase text-zinc-600">The Thesis</span>
            <h2
              className="text-3xl text-white mt-3 mb-1"
              style={{ fontWeight: 300, letterSpacing: "0.05em" }}
            >
              Two Transformations
            </h2>
            <p className="text-xs font-mono text-zinc-600 tracking-wider">
              The enabler: AI changes both how many people a team needs and where engineering can go
            </p>
          </div>
          <div className="border border-zinc-800 overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[560px]">
              <thead>
                <tr className="border-b border-zinc-800 bg-[#18181b]">
                  <th className="px-6 py-4 w-1/5" />
                  <th className="px-6 py-4 text-xs tracking-[0.12em] uppercase text-zinc-400 font-normal">
                    01 · Scrum Team of the Future
                  </th>
                  <th className="px-6 py-4 text-xs tracking-[0.12em] uppercase text-zinc-400 font-normal">
                    02 · Forward Deployed Engineers
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-b border-zinc-800 last:border-b-0">
                    <td className="px-6 py-4 text-xs tracking-[0.1em] uppercase text-zinc-600">{row.label}</td>
                    <td className="px-6 py-4 text-zinc-400 font-light">{row.pod}</td>
                    <td className="px-6 py-4 text-zinc-400 font-light">{row.fde}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
              <div className="lg:col-span-7 space-y-5">
                {section.body.map((paragraph, pi) => (
                  <p key={pi} className="text-zinc-400 font-light leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="lg:col-span-5">
                <div className="border border-zinc-800 bg-[#09090b]">
                  {section.points.map((point, pi) => (
                    <div
                      key={pi}
                      className="flex items-start gap-4 px-6 py-4 border-b border-zinc-800 last:border-b-0"
                    >
                      <span className="text-xs font-mono text-zinc-700 flex-shrink-0 mt-0.5">
                        {String(pi + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-zinc-300 font-light leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
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
            Standing up a practice of your own?
          </h2>
          <p className="text-zinc-400 font-light mb-10 max-w-xl mx-auto leading-relaxed">
            We help teams find their technical deserts, prove value quickly, and hand off work their own engineers can
            own. If that is the shift you are planning, that is where we work.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase bg-white text-zinc-900 px-8 py-3.5 hover:bg-zinc-200 transition-colors font-medium"
            >
              Start a Conversation
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
