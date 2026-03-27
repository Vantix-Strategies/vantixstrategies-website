import { ArrowRight } from "lucide-react";
import Link from "next/link";

const principles = [
  {
    label: "Code, not decks.",
    body: "Every engagement ends with production systems checked into your repositories, not a PDF filed away. Our deliverables are measured in uptime and adoption, not page count.",
  },
  {
    label: "Embedded, not external.",
    body: "We join your Slack, attend your standups, and operate inside your security perimeter. Insights and institutional knowledge stay with you always.",
  },
  {
    label: "You own the IP.",
    body: "Everything we build is yours. No licensing, no lock in, no dependency on Vantix beyond what you choose. Our goal is to make ourselves redundant by making you self sufficient.",
  },
  {
    label: "Rigor at speed.",
    body: "Startup velocity with enterprise level engineering standards. We move fast because we have strong opinions on architecture, testing, and documentation, not despite them.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-14">
      {/* Hero */}
      <section className="border-b border-zinc-800 py-24 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-zinc-600">About</span>
            <h1
              className="text-4xl md:text-5xl text-white mt-3 mb-8"
              style={{ fontWeight: 300, letterSpacing: "0.05em" }}
            >
              The Bridge Between
              <br />
              AI Potential and Enterprise Reality.
            </h1>
            <p className="text-zinc-400 font-light leading-relaxed mb-6">
              Vantix Strategies is an AI Forward Deployed Engineering consultancy headquartered in Minneapolis, MN. We serve Fortune 500 enterprises and high growth companies that need more than a strategy. They need engineers who embed inside the business and ship.
            </p>
            <p className="text-zinc-400 font-light leading-relaxed">
              The FDE model was pioneered at the frontier of enterprise software. We bring that operating model to AI implementation, data infrastructure, and post acquisition integration. These are domains where the gap between vision and production reality is widest, and the cost of that gap is highest.
            </p>
          </div>

          <div className="border border-zinc-800 divide-y divide-zinc-800">
            {[
              { metric: "95%", label: "Enterprise AI projects fail to reach production" },
              { metric: "Weeks", label: "Average time from kickoff to first production deployment" },
              { metric: "0", label: "Client IP retained by Vantix" },
              { metric: "100%", label: "Senior engineers only. No junior staffing model." },
            ].map((item, i) => (
              <div key={i} className="px-8 py-6">
                <div className="text-2xl text-white mb-1" style={{ fontWeight: 300 }}>
                  {item.metric}
                </div>
                <div className="text-xs text-zinc-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-24 bg-[#18181b] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs tracking-[0.2em] uppercase text-zinc-600">Operating Principles</span>
            <h2
              className="text-3xl text-white mt-3"
              style={{ fontWeight: 300, letterSpacing: "0.05em" }}
            >
              How We Work
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-px border border-zinc-800 bg-zinc-800">
            {principles.map((p, i) => (
              <div key={i} className="bg-[#18181b] p-8">
                <h3
                  className="text-base text-white mb-3"
                  style={{ fontWeight: 300, letterSpacing: "0.04em" }}
                >
                  {p.label}
                </h3>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Minneapolis context */}
      <section className="py-24 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <span className="text-xs tracking-[0.2em] uppercase text-zinc-600 block mb-3">Location</span>
            <h2
              className="text-3xl text-white mb-6"
              style={{ fontWeight: 300, letterSpacing: "0.05em" }}
            >
              Built for Minneapolis.
              <br />
              Deployed Anywhere.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-zinc-400 font-light leading-relaxed mb-4">
              Minneapolis is home to a dense concentration of Fortune 500 headquarters. These companies have massive amounts of proprietary data, complex operational footprints, and growing pressure to deploy AI at scale. They are strategic buyers who need partners that can operate inside their environments with rigor.
            </p>
            <p className="text-zinc-400 font-light leading-relaxed">
              We combine the speed of a startup with the operational standards required by enterprise compliance, security, and IT governance. That combination is rare, and it is what Vantix was built to deliver.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-800 py-24 bg-[#18181b]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2
            className="text-3xl text-white mb-5"
            style={{ fontWeight: 300, letterSpacing: "0.05em" }}
          >
            Work with us.
          </h2>
          <p className="text-zinc-400 font-light mb-10">
            We keep a small portfolio of active engagements to ensure depth of focus. Reach out to discuss availability.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase bg-white text-zinc-900 px-8 py-3.5 hover:bg-zinc-200 transition-colors font-medium"
          >
            Start a Conversation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
