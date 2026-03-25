import { Mail, MapPin, ArrowRight } from "lucide-react";
import { ContactForm } from "./ContactForm";

export default function ContactPage() {
  return (
    <div className="pt-14">
      {/* Hero */}
      <section className="border-b border-zinc-800 py-24 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="text-xs tracking-[0.2em] uppercase text-zinc-600">Contact</span>
          <h1
            className="text-4xl md:text-6xl text-white mt-3 mb-6 max-w-2xl"
            style={{ fontWeight: 300, letterSpacing: "0.05em" }}
          >
            Start a Conversation.
          </h1>
          <p className="text-zinc-400 font-light max-w-lg leading-relaxed">
            We keep a small active portfolio to ensure depth of focus. Describe your initiative and we&apos;ll respond within one business day.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="py-20 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
          {/* Left sidebar */}
          <div className="lg:col-span-4">
            <div className="border border-zinc-800 divide-y divide-zinc-800 mb-8">
              <div className="px-6 py-5 flex items-start gap-3">
                <Mail className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs tracking-widest uppercase text-zinc-600 mb-1">Email</p>
                  <a
                    href="mailto:hello@vantixstrategies.com"
                    className="text-sm text-zinc-300 hover:text-white transition-colors"
                  >
                    hello@vantixstrategies.com
                  </a>
                </div>
              </div>
              <div className="px-6 py-5 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs tracking-widest uppercase text-zinc-600 mb-1">Headquarters</p>
                  <p className="text-sm text-zinc-300">Minneapolis, MN</p>
                  <p className="text-xs text-zinc-600 mt-0.5">Deployed anywhere.</p>
                </div>
              </div>
              <div className="px-6 py-5">
                <p className="text-xs tracking-widest uppercase text-zinc-600 mb-1">Response Time</p>
                <p className="text-sm text-zinc-300">Within 1 business day</p>
              </div>
            </div>

            <div className="border border-zinc-800 p-6">
              <h3
                className="text-sm text-white mb-4"
                style={{ fontWeight: 300, letterSpacing: "0.06em" }}
              >
                What to include
              </h3>
              <ul className="space-y-2">
                {[
                  "Your core initiative or problem statement",
                  "Relevant data / tech context",
                  "Rough timeline expectations",
                  "Internal team composition",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-zinc-500">
                    <ArrowRight className="w-3 h-3 mt-0.5 flex-shrink-0 text-zinc-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
