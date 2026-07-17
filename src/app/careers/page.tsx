import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import DotBackground from "@/components/DotBackground";
import { JsonLd } from "@/components/JsonLd";
import { AskClaudePrompt } from "@/components/careers/AskClaudePrompt";
import { OverallProgress, PhaseRoadmap } from "@/components/careers/PhaseRoadmap";
import { introContent, phases } from "./data";
import { breadcrumbSchema, trackCourseSchema } from "./schema";

const description =
  "An interactive, hands-on track that takes you from “I can write code” to “I've built and deployed a full AI system on cloud infrastructure I own.” See what it takes to engineer with us — and start building.";

export const metadata: Metadata = {
  title: "Careers — AI Engineering Track",
  description,
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers — AI Engineering Track | Vantix Strategies",
    description,
    url: "/careers",
    images: ["/opengraph-image.png"],
  },
};

export default function CareersPage() {
  return (
    <div className="pt-14">
      <JsonLd data={trackCourseSchema(phases)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ])}
      />
      {/* ── Hero ── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden border-b border-zinc-800">
        <DotBackground />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(250,250,250,0.04) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <span className="inline-block text-xs tracking-[0.2em] uppercase text-zinc-500 mb-8 border border-zinc-800 px-3 py-1">
              Vantix Strategies · AI Engineering Track
            </span>
            <h1
              className="text-4xl md:text-6xl text-white mb-8 leading-[1.08]"
              style={{ fontWeight: 300, letterSpacing: "0.03em" }}
            >
              Want to build with us?
              <br />
              Build the thing.
            </h1>
            <p className="text-lg text-zinc-400 font-light leading-relaxed mb-6 max-w-2xl">
              We&apos;re Forward Deployed Engineers — we don&apos;t deliver slide decks, we ship production AI systems.
              This is the exact track we&apos;d hand a new engineer: five phases where you build and deploy a real AI
              system on cloud infrastructure you own, by directing an AI assistant the way we work every day.
            </p>
            <p className="text-sm text-zinc-500 font-light leading-relaxed mb-10 max-w-2xl">
              It&apos;s interactive and self-paced. Copy the prompts, check off your progress, pass each phase&apos;s
              knowledge check. Finish it and you&apos;ll have a live, deployed AI application — and a reason to reach out.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href={`/careers/${phases[0].slug}`}
                className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase bg-white text-zinc-900 px-8 py-3.5 hover:bg-zinc-200 transition-colors font-medium"
              >
                Start Phase 0
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#roadmap"
                className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase border border-zinc-700 text-zinc-300 px-8 py-3.5 hover:border-zinc-400 hover:text-white transition-all"
              >
                See the five phases
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Progress ── */}
      <section className="py-16 border-b border-zinc-800 bg-[#09090b]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <OverallProgress />
        </div>
      </section>

      {/* ── The method ── */}
      <section className="py-20 border-b border-zinc-800 bg-[#18181b]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <span className="text-xs tracking-[0.2em] uppercase text-zinc-600 font-mono">
            {introContent.eyebrow}
          </span>
          <h2
            className="text-3xl text-white mt-3 mb-6"
            style={{ fontWeight: 300, letterSpacing: "0.04em" }}
          >
            {introContent.title}
          </h2>
          <p className="text-sm text-zinc-400 font-light leading-relaxed mb-4">{introContent.lede}</p>
          <p className="text-sm text-zinc-400 font-light leading-relaxed mb-10">{introContent.coreIdea}</p>

          {/* The loop */}
          <h3 className="text-xs tracking-[0.18em] uppercase text-zinc-600 font-mono mb-5">
            The loop you&apos;ll repeat constantly
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-12">
            {introContent.loop.map((s, i) => (
              <div key={i} className="border border-zinc-800 bg-[#09090b] p-4">
                <span className="text-xs font-mono text-zinc-700">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-sm text-zinc-200 mt-2 mb-1" style={{ fontWeight: 300 }}>
                  {s.title}
                </p>
                <p className="text-xs text-zinc-500 font-light leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>

          {/* Unstuck prompts */}
          <h3 className="text-xs tracking-[0.18em] uppercase text-zinc-600 font-mono mb-5">
            Prompts that get you unstuck
          </h3>
          <div className="space-y-3 mb-8">
            {introContent.unstuckPrompts.map((p, i) => (
              <AskClaudePrompt key={i} prompt={p.prompt} note={p.note} />
            ))}
          </div>
          <p className="text-xs text-zinc-500 font-light leading-relaxed border-l-2 border-zinc-800 pl-4">
            {introContent.toolNote}
          </p>
        </div>
      </section>

      {/* ── Roadmap ── */}
      <section id="roadmap" className="py-20 border-b border-zinc-800 bg-[#09090b] scroll-mt-14">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <span className="text-xs tracking-[0.2em] uppercase text-zinc-600 font-mono">The Map</span>
          <h2
            className="text-3xl text-white mt-3 mb-4"
            style={{ fontWeight: 300, letterSpacing: "0.04em" }}
          >
            Five phases, one project
          </h2>
          <p className="text-sm text-zinc-400 font-light leading-relaxed mb-10 max-w-2xl">
            Each phase adds one capability to the same project and ends with something working you can show off. You
            can stop after any phase and still have a real, deployed result. Go in order — each phase assumes the last.
          </p>
          <PhaseRoadmap />
        </div>
      </section>

      {/* ── Keep in mind ── */}
      <section className="py-20 border-b border-zinc-800 bg-[#18181b]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <span className="text-xs tracking-[0.2em] uppercase text-zinc-600 font-mono">
            Two things to keep in mind
          </span>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            {introContent.keepInMind.map((k, i) => (
              <div key={i} className="border border-zinc-800 bg-[#09090b] p-6">
                <p className="text-base text-zinc-200 mb-2" style={{ fontWeight: 300 }}>
                  {k.title}
                </p>
                <p className="text-sm text-zinc-500 font-light leading-relaxed">{k.text}</p>
              </div>
            ))}
          </div>

          {/* Bookmark resources */}
          <h3 className="text-xs tracking-[0.18em] uppercase text-zinc-600 font-mono mt-12 mb-5">
            Worth bookmarking
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {introContent.resources.map((r) => (
              <a
                key={r.url}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-zinc-800 p-4 hover:border-zinc-600 transition-colors"
              >
                <span className="inline-flex items-center gap-2 text-sm text-zinc-300 group-hover:text-white transition-colors">
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400" />
                  {r.label}
                </span>
                {r.note && <p className="text-xs text-zinc-600 font-light mt-1.5">{r.note}</p>}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Apply CTA ── */}
      <section className="py-24 bg-[#09090b]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2
            className="text-3xl text-white mb-5"
            style={{ fontWeight: 300, letterSpacing: "0.05em" }}
          >
            Built it? Show us.
          </h2>
          <p className="text-zinc-400 font-light mb-10 max-w-xl mx-auto leading-relaxed">
            If you work through this track and deploy your own AI system, that&apos;s the strongest application you
            could send. Reach out with a link to what you built and how you built it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/about#contact"
              className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase bg-white text-zinc-900 px-8 py-3.5 hover:bg-zinc-200 transition-colors font-medium"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/careers/${phases[0].slug}`}
              className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase border border-zinc-700 text-zinc-300 px-8 py-3.5 hover:border-zinc-400 hover:text-white transition-all"
            >
              Start the Track
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
