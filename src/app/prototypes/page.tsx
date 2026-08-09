import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prototypes } from "./data";

export const metadata: Metadata = {
  title: "Prototypes",
  robots: { index: false, follow: false },
};

export default function PrototypesPage() {
  return (
    <div className="pt-14">
      <section className="border-b border-zinc-800 py-24 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="text-xs tracking-[0.2em] uppercase text-zinc-600">Prototypes</span>
          <h1
            className="text-4xl md:text-5xl text-white mt-3 mb-6"
            style={{ fontWeight: 300, letterSpacing: "0.05em" }}
          >
            Campaign Prototypes
          </h1>
          <p className="text-zinc-400 font-light max-w-2xl leading-relaxed">
            Working demos built for specific campaigns, showing what Vantix would build for that
            audience. Not deployed applications — standalone previews.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#09090b] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-5">
            {prototypes.map((proto) => (
              <article key={proto.slug} className="border border-zinc-700 p-7 bg-[#18181b] card-glow">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs tracking-[0.08em] uppercase text-zinc-600 mb-3">
                  <span>{proto.campaign}</span>
                  <span className="text-zinc-700">•</span>
                  <span>{proto.industry}</span>
                </div>
                <h2
                  className="text-2xl text-white mb-3"
                  style={{ fontWeight: 300, letterSpacing: "0.04em" }}
                >
                  {proto.title}
                </h2>
                <p className="text-zinc-400 font-light leading-relaxed mb-5 max-w-3xl">
                  {proto.summary}
                </p>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs tracking-[0.08em] uppercase text-zinc-600">
                    {proto.status === "live" ? "Live" : "Draft"}
                  </p>
                  <Link
                    href={`/prototypes/${proto.slug}`}
                    className="inline-flex items-center gap-2 text-xs tracking-[0.12em] uppercase text-zinc-300 hover:text-white transition-colors"
                  >
                    Open Prototype
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
