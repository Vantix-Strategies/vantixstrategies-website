"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import type { CodeBlock as CodeBlockData } from "@/app/careers/data";

export function CodeBlock({ filename, code }: CodeBlockData) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — no-op */
    }
  }

  return (
    <div className="border border-zinc-800 bg-[#0a0a0c] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-[#0d0d0f]">
        <span className="text-[10px] font-mono tracking-[0.1em] text-zinc-500 truncate">
          {filename ?? "code"}
        </span>
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={copy}
          className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.12em] uppercase text-zinc-500 hover:text-white transition-colors flex-shrink-0 ml-3"
          aria-label="Copy code to clipboard"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied" : "Copy"}
        </motion.button>
      </div>
      <pre className="px-4 py-3 text-xs text-zinc-300 font-mono leading-relaxed overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}
