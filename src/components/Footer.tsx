import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  capabilities: [
    { label: "AI Orchestration", href: "/capabilities/ai-orchestration" },
    { label: "Data Engineering", href: "/capabilities/data-engineering" },
    { label: "Operational Redesign", href: "/capabilities/operational-redesign" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Process", href: "/process" },
    { label: "Benchmarks", href: "/benchmarks" },
    { label: "Contact", href: "/about#contact" },
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
              <Image
                src="/logo.svg"
                alt="Vantix Strategies LLC logo"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span className="text-xs font-light tracking-[0.18em] uppercase text-zinc-300 group-hover:text-white transition-colors">
                Vantix Strategies LLC
              </span>
            </Link>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-xs">
              Forward Deployed Engineers. We do not deliver strategy decks. We ship production systems inside your environment.
            </p>
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
            © {new Date().getFullYear()} Vantix Strategies LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/vantix-strategies"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-zinc-300 transition-colors"
              aria-label="Vantix Strategies on LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <p className="text-zinc-700 text-xs tracking-widest uppercase">
              Minneapolis, MN
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
