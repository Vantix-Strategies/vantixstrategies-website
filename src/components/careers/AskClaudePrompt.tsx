"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import type { AskClaudePrompt as AskClaudePromptData } from "@/app/careers/data";

export function AskClaudePrompt({ prompt, note }: AskClaudePromptData) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — no-op */
    }
  }

  return (
    <div className="border border-zinc-800 border-l-2 border-l-zinc-500 bg-[#0d0d0f]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
        <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-zinc-500">
          ▸ Ask Claude
        </span>
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={copy}
          className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.12em] uppercase text-zinc-500 hover:text-white transition-colors"
          aria-label="Copy prompt to clipboard"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied" : "Copy"}
        </motion.button>
      </div>
      <p className="px-4 py-3 text-sm text-zinc-300 font-mono leading-relaxed">“{prompt}”</p>
      {note && (
        <p className="px-4 pb-3 -mt-1 text-xs text-zinc-500 font-light leading-relaxed">{note}</p>
      )}
    </div>
  );
}
