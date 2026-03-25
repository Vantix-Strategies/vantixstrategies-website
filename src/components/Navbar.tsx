"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="glass">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-6 h-6 border border-zinc-500 group-hover:border-zinc-300 transition-colors flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-zinc-300" />
              </div>
              <span className="text-sm font-light tracking-[0.18em] uppercase text-zinc-200 group-hover:text-white transition-colors">
                Vantix Strategies
              </span>
            </Link>

            {/* Desktop Navigation — right-aligned, SpaceX style */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-light tracking-[0.12em] uppercase text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="text-xs font-light tracking-[0.12em] uppercase border border-zinc-700 hover:border-zinc-400 text-zinc-300 hover:text-white px-4 py-1.5 transition-all"
              >
                Engage Us
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-zinc-400 hover:text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden glass border-t border-zinc-800"
          >
            <div className="px-6 py-6 space-y-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-xs tracking-[0.12em] uppercase text-zinc-400 hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block text-xs tracking-[0.12em] uppercase border border-zinc-700 text-zinc-300 px-4 py-2 text-center transition-all hover:border-zinc-400 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Engage Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
