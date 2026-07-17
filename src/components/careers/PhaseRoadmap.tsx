"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Circle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { phases } from "@/app/careers/data";
import { useCareersProgress } from "./useCareersProgress";

export function OverallProgress() {
  const { overallPercent, resetProgress } = useCareersProgress();
  const percent = overallPercent();

  return (
    <div className="border border-zinc-800 bg-[#18181b] p-6 sm:p-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-zinc-600">
          Your progress
        </span>
        <div className="flex items-center gap-4">
          <span className="text-sm font-mono text-zinc-300">{percent}%</span>
          {percent > 0 && (
            <button
              onClick={resetProgress}
              className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.12em] uppercase text-zinc-600 hover:text-zinc-300 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>
      </div>
      <div className="h-1 bg-zinc-800 overflow-hidden">
        <div
          className="h-full w-full bg-white origin-left transition-transform duration-500 ease-out"
          style={{ transform: `scaleX(${percent / 100})` }}
        />
      </div>
      <p className="text-xs text-zinc-600 font-light mt-3">
        {percent === 0
          ? "Progress is saved to this browser only — no sign-in needed. Start with Phase 0."
          : percent === 100
            ? "Track complete. You've built and deployed a full AI system — reach out and show us."
            : "Progress is saved to this browser. Pick up where you left off below."}
      </p>
    </div>
  );
}

export function PhaseRoadmap() {
  const { phasePercent, isPhaseComplete } = useCareersProgress();

  return (
    <div className="space-y-4">
      {phases.map((phase) => {
        const percent = phasePercent(phase.slug);
        const complete = isPhaseComplete(phase.slug);
        const started = percent > 0;
        return (
          <Link key={phase.slug} href={`/careers/${phase.slug}`} className="block">
            <motion.div
              whileHover={{ scale: 1.008 }}
              whileTap={{ scale: 0.995 }}
              className="card-glow group border border-zinc-800 bg-[#09090b] p-6 sm:p-7"
            >
              <div className="flex items-start gap-5">
                {/* Status dot / number */}
                <div className="flex-shrink-0 flex flex-col items-center pt-1">
                  <span
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full border font-mono text-xs",
                      complete
                        ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                        : started
                          ? "border-zinc-500 text-zinc-200"
                          : "border-zinc-700 text-zinc-500",
                    )}
                  >
                    {complete ? <Check className="w-4 h-4" /> : phase.number}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mb-1.5">
                    <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-zinc-600">
                      Phase {phase.number}
                    </span>
                    {complete ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono tracking-[0.1em] uppercase text-emerald-400">
                        <Check className="w-3 h-3" /> Complete
                      </span>
                    ) : started ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono tracking-[0.1em] uppercase text-zinc-400">
                        <Circle className="w-2.5 h-2.5 fill-current" /> {percent}% · In progress
                      </span>
                    ) : null}
                  </div>
                  <h3
                    className="text-xl text-white mb-1 group-hover:text-white transition-colors"
                    style={{ fontWeight: 300, letterSpacing: "0.03em" }}
                  >
                    {phase.name}
                    <span className="text-zinc-600"> · {phase.subtitle}</span>
                  </h3>
                  <p className="text-sm text-zinc-500 font-light leading-relaxed mb-3">
                    <span className="text-zinc-400">Build:</span> {phase.youBuild}{" "}
                    <span className="text-zinc-700">|</span>{" "}
                    <span className="text-zinc-400">Learn:</span> {phase.coreConcept}
                  </p>
                  {/* Thin progress line */}
                  <div className="h-0.5 bg-zinc-800 overflow-hidden max-w-xs">
                    <div
                      className={cn(
                        "h-full w-full origin-left transition-transform duration-500 ease-out",
                        complete ? "bg-emerald-500" : "bg-zinc-400",
                      )}
                      style={{ transform: `scaleX(${percent / 100})` }}
                    />
                  </div>
                </div>

                <ArrowRight className="flex-shrink-0 w-4 h-4 text-zinc-700 group-hover:text-zinc-300 group-hover:translate-x-0.5 transition-all mt-2" />
              </div>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
}
