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
          <p className="text-zinc-700 text-xs tracking-widest uppercase">
            Minneapolis, MN
          </p>
        </div>
      </div>
    </footer>
  );
}
