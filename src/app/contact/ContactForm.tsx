"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-zinc-800 p-10 text-center">
        <p
          className="text-2xl text-white mb-3"
          style={{ fontWeight: 300, letterSpacing: "0.05em" }}
        >
          Message received.
        </p>
        <p className="text-sm text-zinc-400 font-light">
          We&apos;ll be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-zinc-800 p-8 space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs tracking-[0.1em] uppercase text-zinc-500 mb-2">
            Name
          </label>
          <Input
            required
            type="text"
            placeholder="Your name"
            className="bg-[#18181b] border-zinc-800 text-zinc-200 placeholder:text-zinc-700 focus:border-zinc-600 rounded-none"
          />
        </div>
        <div>
          <label className="block text-xs tracking-[0.1em] uppercase text-zinc-500 mb-2">
            Work Email
          </label>
          <Input
            required
            type="email"
            placeholder="you@company.com"
            className="bg-[#18181b] border-zinc-800 text-zinc-200 placeholder:text-zinc-700 focus:border-zinc-600 rounded-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs tracking-[0.1em] uppercase text-zinc-500 mb-2">
          Company
        </label>
        <Input
          required
          type="text"
          placeholder="Organization name"
          className="bg-[#18181b] border-zinc-800 text-zinc-200 placeholder:text-zinc-700 focus:border-zinc-600 rounded-none"
        />
      </div>

      <div>
        <label className="block text-xs tracking-[0.1em] uppercase text-zinc-500 mb-2">
          Engagement Area
        </label>
        <select
          className="w-full h-10 px-3 bg-[#18181b] border border-zinc-800 text-zinc-400 text-sm focus:outline-none focus:border-zinc-600 rounded-none"
        >
          <option value="">Select one...</option>
          <option value="ai">Custom AI Orchestration</option>
          <option value="data">Embedded Data Engineering</option>
          <option value="reeng">Post-Acquisition Re-engineering</option>
          <option value="discovery">Discovery Sprint</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-xs tracking-[0.1em] uppercase text-zinc-500 mb-2">
          Initiative Description
        </label>
        <Textarea
          required
          placeholder="Describe the problem you're solving, relevant data/tech context, and your timeline expectations..."
          rows={6}
          className="bg-[#18181b] border-zinc-800 text-zinc-200 placeholder:text-zinc-700 focus:border-zinc-600 rounded-none resize-none"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase bg-white text-zinc-900 px-6 py-3 hover:bg-zinc-200 transition-colors font-medium"
      >
        Send Message
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
