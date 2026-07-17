"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizQuestion } from "@/app/careers/data";

interface Props {
  phaseSlug: string;
  questions: QuizQuestion[];
  /** Fired once the user has every answer correct. Never unsets a prior pass. */
  onPass: () => void;
  initiallyPassed: boolean;
}

export function KnowledgeCheck({ phaseSlug, questions, onPass, initiallyPassed }: Props) {
  // Selected option index per question (null = unanswered).
  const [selected, setSelected] = useState<Record<string, number | null>>(() =>
    Object.fromEntries(questions.map((q) => [q.id, null])),
  );

  const allCorrect =
    questions.length > 0 && questions.every((q) => selected[q.id] === q.answer);

  useEffect(() => {
    if (allCorrect) onPass();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCorrect]);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs tracking-[0.2em] uppercase text-zinc-600 font-mono">
          Knowledge Check
        </span>
        {(allCorrect || initiallyPassed) && (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.12em] uppercase text-emerald-400">
            <CircleCheck className="w-3.5 h-3.5" />
            Passed
          </span>
        )}
      </div>

      <div className="space-y-8">
        {questions.map((q, qi) => {
          const choice = selected[q.id];
          const answered = choice !== null && choice !== undefined;
          return (
            <div key={q.id}>
              <p className="text-sm text-zinc-200 font-light leading-relaxed mb-4">
                <span className="font-mono text-zinc-600 mr-2">{qi + 1}.</span>
                {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, oi) => {
                  const isChoice = choice === oi;
                  const isCorrect = oi === q.answer;
                  const showState = answered && (isChoice || (isCorrect && choice !== q.answer));
                  return (
                    <motion.button
                      key={oi}
                      whileHover={answered ? undefined : { scale: 1.005 }}
                      whileTap={answered ? undefined : { scale: 0.995 }}
                      disabled={answered && isChoice && isCorrect}
                      onClick={() => setSelected((s) => ({ ...s, [q.id]: oi }))}
                      className={cn(
                        "w-full text-left flex items-start gap-3 px-4 py-3 border text-sm font-light leading-relaxed transition-colors",
                        !answered && "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200",
                        showState && isCorrect && "border-emerald-500/50 bg-emerald-500/5 text-zinc-100",
                        showState && !isCorrect && isChoice && "border-red-500/50 bg-red-500/5 text-zinc-100",
                        answered && !showState && "border-zinc-800 text-zinc-600",
                      )}
                    >
                      <span className="mt-0.5 flex-shrink-0">
                        {showState && isCorrect ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : showState && isChoice ? (
                          <X className="w-4 h-4 text-red-400" />
                        ) : (
                          <span className="block w-4 h-4 rounded-full border border-zinc-700" />
                        )}
                      </span>
                      {opt}
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence>
                {answered && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden text-xs text-zinc-500 font-light leading-relaxed mt-3 pl-1"
                  >
                    {choice === q.answer ? "Correct. " : "Not quite. "}
                    {q.explanation}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-xs text-zinc-600 font-mono">
        {allCorrect
          ? `Phase ${phaseSlug} check complete.`
          : "Answer every question correctly to complete this phase."}
      </p>
    </div>
  );
}
