"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    engagementArea: "",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Unable to send your message right now.");
      }

      setSubmitted(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your message right now. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
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
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
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
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
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
          value={formData.company}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, company: e.target.value }))
          }
          placeholder="Organization name"
          className="bg-[#18181b] border-zinc-800 text-zinc-200 placeholder:text-zinc-700 focus:border-zinc-600 rounded-none"
        />
      </div>

      <div>
        <label className="block text-xs tracking-[0.1em] uppercase text-zinc-500 mb-2">
          Engagement Area
        </label>
        <select
          required
          value={formData.engagementArea}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, engagementArea: e.target.value }))
          }
          className="w-full h-10 px-3 bg-[#18181b] border border-zinc-800 text-zinc-400 text-sm focus:outline-none focus:border-zinc-600 rounded-none"
        >
          <option value="">Select one...</option>
          <option value="ai">Custom AI Orchestration</option>
          <option value="data">Embedded Data Engineering</option>
          <option value="reeng">Post Acquisition Operational Redesign</option>
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
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          placeholder="Describe the problem you are solving, relevant data and technology context, and your timeline expectations..."
          rows={6}
          className="bg-[#18181b] border-zinc-800 text-zinc-200 placeholder:text-zinc-700 focus:border-zinc-600 rounded-none resize-none"
        />
      </div>

      {errorMessage && (
        <p className="text-xs text-red-400">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase bg-white text-zinc-900 px-6 py-3 hover:bg-zinc-200 transition-colors font-medium"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
