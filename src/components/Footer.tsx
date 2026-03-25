import Link from "next/link";
import { Linkedin } from "lucide-react";

const footerLinks = {
  capabilities: [
    { label: "AI Orchestration", href: "/services" },
    { label: "Data Engineering", href: "/services" },
    { label: "Operational Re-engineering", href: "/services" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center space-x-2.5 mb-4 group">
              <div className="w-5 h-5 border border-zinc-600 flex items-center justify-center">
                <div className="w-2 h-2 bg-zinc-400" />
              </div>
              <span className="text-xs font-light tracking-[0.18em] uppercase text-zinc-300 group-hover:text-white transition-colors">
                Vantix Strategies
              </span>
            </Link>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-xs">
              Forward Deployed Engineers. We don&apos;t deliver strategy decks — we ship production systems inside your environment.
            </p>
            <a
              href="#"
              className="mt-4 inline-flex items-center justify-center w-8 h-8 border border-zinc-800 hover:border-zinc-600 text-zinc-500 hover:text-zinc-300 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Capabilities */}
          <div>
            <h3 className="text-xs font-medium tracking-[0.12em] uppercase text-zinc-500 mb-4">Capabilities</h3>
            <ul className="space-y-2">
              {footerLinks.capabilities.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-medium tracking-[0.12em] uppercase text-zinc-500 mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-xs tracking-wide">
            © {new Date().getFullYear()} Vantix Strategies. All rights reserved.
          </p>
          <p className="text-zinc-700 text-xs tracking-widest uppercase">
            Minneapolis, MN
          </p>
        </div>
      </div>
    </footer>
  );
}
