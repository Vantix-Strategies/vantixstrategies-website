"use client";

import { useState } from "react";
import { Check, ArrowRight, Zap, Building2, Rocket, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const tiers = [
  {
    icon: Zap,
    name: "MVP Sprint",
    description: "Perfect for validating your idea quickly",
    price: "$8,000",
    timeline: "2-3 weeks",
    features: [
      "Single platform (Web or Mobile)",
      "Core features only",
      "Basic UI/UX design",
      "Authentication system",
      "Database setup",
      "Deployment & hosting",
      "30 days support",
    ],
    idealFor: "Startups validating ideas",
    cta: "Start MVP Sprint",
    popular: false,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Building2,
    name: "Growth Package",
    description: "Complete solution for market-ready products",
    price: "$25,000",
    timeline: "4-6 weeks",
    features: [
      "Multi-platform (Web + Mobile)",
      "Advanced features",
      "Custom UI/UX design",
      "User dashboard & admin panel",
      "Payment integration",
      "AI/ML integration (basic)",
      "Cloud infrastructure",
      "Analytics setup",
      "90 days support",
    ],
    idealFor: "Startups ready to scale",
    cta: "Get Growth Package",
    popular: true,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Rocket,
    name: "Enterprise Build",
    description: "Full-scale solution with advanced capabilities",
    price: "$60,000+",
    timeline: "8-12 weeks",
    features: [
      "Multi-platform ecosystem",
      "Complex custom features",
      "Premium UI/UX design system",
      "Advanced AI/ML integration",
      "Third-party API integrations",
      "Scalable cloud architecture",
      "CI/CD pipeline setup",
      "Security & compliance",
      "Performance optimization",
      "12 months support",
    ],
    idealFor: "Established companies",
    cta: "Discuss Enterprise",
    popular: false,
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Crown,
    name: "AI Transformation",
    description: "Add AI capabilities to existing products",
    price: "$15,000+",
    timeline: "3-5 weeks",
    features: [
      "LLM integration (GPT-4, Claude)",
      "Custom AI model training",
      "Natural language processing",
      "Computer vision features",
      "AI workflow automation",
      "Data pipeline setup",
      "AI consulting & strategy",
      "60 days support",
    ],
    idealFor: "Companies adding AI",
    cta: "Explore AI Options",
    popular: false,
    gradient: "from-emerald-500 to-teal-500",
  },
];

const addons = [
  {
    name: "Strategy Workshop",
    price: "$2,000",
    description: "2-hour deep dive with our leadership team to define scope, timeline, and roadmap",
  },
  {
    name: "UI/UX Design System",
    price: "$3,500",
    description: "Complete design system with component library, style guide, and brand assets",
  },
  {
    name: "Ongoing Maintenance",
    price: "$2,500/mo",
    description: "Priority support, bug fixes, updates, and minor feature enhancements",
  },
  {
    name: "Cloud Infrastructure",
    price: "$1,500",
    description: "AWS/Azure/GCP setup, CI/CD pipelines, monitoring, and DevOps configuration",
  },
];

export default function PricingPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Transparent <span className="text-gradient">Pricing</span>
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto">
            No hidden fees, no surprises. Choose the package that fits your stage and goals. 
            Every project includes senior-level developers and dedicated project management.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-24 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className={`relative p-6 rounded-2xl bg-[#0A0A0A] border transition-all ${
                  tier.popular
                    ? "border-purple-500/50 shadow-lg shadow-purple-500/10"
                    : "border-[#27272A] hover:border-blue-500/30"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-purple-500 text-white text-xs font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center mb-4`}>
                  <tier.icon className="w-6 h-6 text-white" />
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">{tier.name}</h2>
                <p className="text-[#A1A1AA] text-sm mb-4">{tier.description}</p>

                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">{tier.price}</span>
                  {tier.price.includes("+") && <span className="text-[#A1A1AA]"> starting</span>}
                </div>

                <div className="flex items-center text-sm text-[#A1A1AA] mb-6">
                  <Zap className="w-4 h-4 text-blue-500 mr-2" />
                  {tier.timeline}
                </div>

                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-[#A1A1AA]">
                      <Check className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-[#27272A]">
                  <p className="text-xs text-[#71717A] mb-4">Ideal for: {tier.idealFor}</p>
                  <Link href={`/contact?tier=${tier.name.toLowerCase().replace(" ", "-")}`}>
                    <Button
                      className={`w-full ${
                        tier.popular
                          ? "bg-purple-600 hover:bg-purple-700 text-white"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {tier.cta}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Enhance Your <span className="text-gradient">Project</span>
            </h2>
            <p className="text-[#A1A1AA]">Optional add-ons to customize your package</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addons.map((addon, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-[#141414] border border-[#27272A] hover:border-blue-500/30 transition-all"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{addon.name}</h3>
                <p className="text-2xl font-bold text-blue-400 mb-3">{addon.price}</p>
                <p className="text-sm text-[#A1A1AA]">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#141414]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Common Questions</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "What's included in the price?",
                a: "All packages include development, testing, deployment, and post-launch support. We handle everything from database design to hosting setup.",
              },
              {
                q: "How do payments work?",
                a: "We typically do 50% upfront, 25% at midpoint, and 25% upon completion. For larger projects, we can arrange milestone-based payments.",
              },
              {
                q: "What if my project doesn't fit these tiers?",
                a: "These are starting points. Every project is unique—contact us for a custom quote tailored to your specific needs.",
              },
              {
                q: "Do you offer ongoing support?",
                a: "Yes! All packages include initial support period. After that, we offer maintenance retainers starting at $2,500/month.",
              },
              {
                q: "Can I upgrade my package mid-project?",
                a: "Absolutely. Many clients start with an MVP and upgrade as they get traction. We'll adjust scope and pricing accordingly.",
              },
            ].map((faq, index) => (
              <div key={index} className="p-6 rounded-xl bg-[#0A0A0A] border border-[#27272A]">
                <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                <p className="text-[#A1A1AA]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-b from-[#141414] to-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Not Sure Which Package?
          </h2>
          <p className="text-xl text-[#A1A1AA] mb-8">
            Book a free 30-minute consultation. We'll analyze your needs and recommend the best approach.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg glow-blue">
                Schedule Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
