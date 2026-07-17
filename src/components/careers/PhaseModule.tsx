"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Phase } from "@/app/careers/data";
import { phaseBySlug } from "@/app/careers/data";
import { useCareersProgress } from "./useCareersProgress";
import { AskClaudePrompt } from "./AskClaudePrompt";
import { CodeBlock } from "./CodeBlock";
import { KnowledgeCheck } from "./KnowledgeCheck";
import { PhaseDiagram } from "./diagrams";

export function PhaseModule({ phase }: { phase: Phase }) {
  const {
    toggleStep,
    isStepDone,
    setQuizPassed,
    isQuizPassed,
    phasePercent,
  } = useCareersProgress();

  const percent = phasePercent(phase.slug);
  const prev = phase.prevSlug ? phaseBySlug(phase.prevSlug) : undefined;
  const next = phase.nextSlug ? phaseBySlug(phase.nextSlug) : undefined;

  return (
    <div className="pt-14">
      {/* Sticky per-phase progress bar, just under the navbar */}
      <div className="fixed top-14 left-0 right-0 z-40 h-0.5 bg-zinc-900">
        <div
          className="h-full w-full bg-white origin-left transition-transform duration-500 ease-out"
          style={{ transform: `scaleX(${percent / 100})` }}
        />
      </div>

      {/* Hero */}
      <section className="border-b border-zinc-800 py-20 md:py-24 bg-[#09090b]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-xs tracking-[0.12em] uppercase text-zinc-600 hover:text-zinc-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-3 h-3" />
            The Track
          </Link>
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-zinc-600">
              Phase {phase.number} of 4
            </span>
            <span className="text-xs font-mono text-zinc-700">·</span>
            <span className="text-xs font-mono tracking-[0.1em] text-zinc-600">
              {percent}% complete
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl text-white mb-4"
            style={{ fontWeight: 300, letterSpacing: "0.04em" }}
          >
            {phase.name}
          </h1>
          <p className="text-lg text-zinc-400 font-light mb-3">{phase.subtitle}</p>
          <p className="text-sm text-zinc-500 font-light italic mb-10">{phase.tagline}</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <div className="border border-zinc-800 p-5">
              <p className="text-[10px] font-mono tracking-[0.18em] uppercase text-zinc-600 mb-2">
                You build
              </p>
              <p className="text-sm text-zinc-300 font-light leading-relaxed">{phase.youBuild}</p>
            </div>
            <div className="border border-zinc-800 p-5">
              <p className="text-[10px] font-mono tracking-[0.18em] uppercase text-zinc-600 mb-2">
                Core concept
              </p>
              <p className="text-sm text-zinc-300 font-light leading-relaxed">{phase.coreConcept}</p>
            </div>
          </div>

          <div className="space-y-4">
            {phase.intro.map((p, i) => (
              <p key={i} className="text-sm text-zinc-400 font-light leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* Why it matters in industry */}
          <div className="mt-10 border-l-2 border-zinc-700 pl-5 py-1">
            <p className="text-[10px] font-mono tracking-[0.18em] uppercase text-zinc-600 mb-2">
              Why it matters in industry
            </p>
            <p className="text-sm text-zinc-400 font-light leading-relaxed mb-3">{phase.industry.why}</p>
            <p className="text-sm text-zinc-500 font-light leading-relaxed">
              <span className="text-zinc-600">Example — </span>
              {phase.industry.example}
            </p>
          </div>

          {/* Reference links for this phase, surfaced up front */}
          {phase.resources.length > 0 && (
            <div className="mt-10 border border-zinc-800 bg-[#0d0d0f] p-5">
              <p className="text-[10px] font-mono tracking-[0.18em] uppercase text-zinc-600 mb-3">
                Reference for this phase
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2.5">
                {phase.resources.map((r) => (
                  <a
                    key={r.url}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3 h-3 text-zinc-600" />
                    {r.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Vocabulary */}
      {phase.vocab && phase.vocab.length > 0 && (
        <section className="border-b border-zinc-800 py-16 bg-[#18181b]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-xs tracking-[0.2em] uppercase text-zinc-600 font-mono mb-6">
              A few terms, in plain English
            </h2>
            <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
              {phase.vocab.map((v) => (
                <div key={v.term}>
                  <dt className="text-sm text-zinc-200 font-mono mb-1">{v.term}</dt>
                  <dd className="text-xs text-zinc-500 font-light leading-relaxed">{v.def}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Steps */}
      {phase.steps.map((step, si) => {
        const done = isStepDone(step.id);
        return (
          <section
            key={step.id}
            className={cn("py-16 border-b border-zinc-800", si % 2 === 0 ? "bg-[#09090b]" : "bg-[#18181b]")}
          >
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="flex items-start justify-between gap-6 mb-6">
                <div>
                  <p className="text-[10px] font-mono tracking-[0.18em] uppercase text-zinc-600 mb-2">
                    {step.eyebrow}
                  </p>
                  <h2
                    className="text-2xl text-white"
                    style={{ fontWeight: 300, letterSpacing: "0.03em" }}
                  >
                    {step.title}
                  </h2>
                </div>
                <button
                  onClick={() => toggleStep(step.id)}
                  className={cn(
                    "flex-shrink-0 mt-1 inline-flex items-center gap-2 px-3 py-1.5 border text-[10px] font-mono tracking-[0.12em] uppercase transition-colors",
                    done
                      ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-400"
                      : "border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:text-zinc-300",
                  )}
                  aria-pressed={done}
                >
                  <span
                    className={cn(
                      "flex items-center justify-center w-3.5 h-3.5 rounded-full border",
                      done ? "border-emerald-400 bg-emerald-400/20" : "border-zinc-600",
                    )}
                  >
                    {done && <Check className="w-2.5 h-2.5" />}
                  </span>
                  {done ? "Done" : "Mark done"}
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {step.body.map((p, i) => (
                  <p key={i} className="text-sm text-zinc-400 font-light leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              {step.diagram && <PhaseDiagram name={step.diagram} />}

              {step.prompts && step.prompts.length > 0 && (
                <div className="space-y-3 mb-6">
                  {step.prompts.map((p, i) => (
                    <AskClaudePrompt key={i} prompt={p.prompt} note={p.note} />
                  ))}
                </div>
              )}

              {step.code && step.code.length > 0 && (
                <div className="space-y-3 mb-6">
                  {step.code.map((c, i) => (
                    <CodeBlock key={i} filename={c.filename} code={c.code} />
                  ))}
                </div>
              )}

              {step.callouts && step.callouts.length > 0 && (
                <div className="space-y-3 mb-2">
                  {step.callouts.map((c, i) => (
                    <div key={i} className="border border-zinc-800 bg-[#0d0d0f] p-4">
                      <p className="text-xs text-zinc-300 font-medium mb-1.5">{c.title}</p>
                      <p className="text-xs text-zinc-500 font-light leading-relaxed">{c.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {step.resources && step.resources.length > 0 && (
                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
                  {step.resources.map((r) => (
                    <a
                      key={r.url}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-200 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {r.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* Done-when checklist */}
      <section className="py-16 border-b border-zinc-800 bg-[#09090b]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-xs tracking-[0.2em] uppercase text-zinc-600 font-mono mb-6">
            Done when
          </h2>
          <ul className="space-y-3">
            {phase.checklist.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-zinc-400 font-light leading-relaxed">
                <ArrowRight className="w-3.5 h-3.5 mt-1 flex-shrink-0 text-zinc-700" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Knowledge check */}
      {phase.quiz.length > 0 && (
        <section className="py-16 border-b border-zinc-800 bg-[#18181b]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <KnowledgeCheck
              phaseSlug={phase.slug}
              questions={phase.quiz}
              initiallyPassed={isQuizPassed(`${phase.slug}/quiz`)}
              onPass={() => setQuizPassed(`${phase.slug}/quiz`, true)}
            />
          </div>
        </section>
      )}

      {/* Prev / next navigation */}
      <section className="py-16 bg-[#18181b]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 grid sm:grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/careers/${prev.slug}`}
              className="group border border-zinc-800 p-6 hover:border-zinc-600 transition-colors"
            >
              <span className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.18em] uppercase text-zinc-600 mb-2">
                <ArrowLeft className="w-3 h-3" />
                Phase {prev.number}
              </span>
              <p className="text-base text-zinc-300 group-hover:text-white transition-colors" style={{ fontWeight: 300 }}>
                {prev.name}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/careers/${next.slug}`}
              className="group border border-zinc-800 p-6 hover:border-zinc-600 transition-colors text-right"
            >
              <span className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.18em] uppercase text-zinc-600 mb-2 justify-end w-full">
                Phase {next.number}
                <ArrowRight className="w-3 h-3" />
              </span>
              <p className="text-base text-zinc-300 group-hover:text-white transition-colors" style={{ fontWeight: 300 }}>
                {next.name}
              </p>
            </Link>
          ) : (
            <Link
              href="/about#contact"
              className="group border border-zinc-700 bg-white/[0.02] p-6 hover:border-zinc-400 transition-colors text-right"
            >
              <span className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.18em] uppercase text-zinc-500 mb-2 justify-end w-full">
                You finished the track
                <ArrowRight className="w-3 h-3" />
              </span>
              <p className="text-base text-zinc-200 group-hover:text-white transition-colors" style={{ fontWeight: 300 }}>
                Show us what you built
              </p>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
