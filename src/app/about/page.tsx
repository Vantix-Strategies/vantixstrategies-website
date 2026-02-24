import { Zap, Target, Heart, Rocket, Users } from "lucide-react";

const values = [
  {
    icon: Rocket,
    title: "Speed First",
    description: "We believe in rapid iteration and getting to market quickly. Perfect is the enemy of shipped.",
  },
  {
    icon: Target,
    title: "Results-Driven",
    description: "We measure success by your business outcomes, not just lines of code delivered.",
  },
  {
    icon: Heart,
    title: "True Partnership",
    description: "We're not just vendors—we're invested in your success and act as an extension of your team.",
  },
  {
    icon: Users,
    title: "Startup Empathy",
    description: "We've been there. We understand the constraints, pressures, and excitement of building something new.",
  },
  {
    icon: Zap,
    title: "Technical Excellence",
    description: "Fast doesn't mean sloppy. We maintain high code quality and engineering best practices.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Built by <span className="text-gradient">Founders</span>, for Founders
            </h1>
            <p className="text-xl text-[#A1A1AA] mb-6">
              We're a team of ex-startup founders and senior engineers who got tired of watching 
              early-stage companies get overcharged by agencies or wait months for simple MVPs.
            </p>
            <p className="text-[#A1A1AA]">
              Our mission is simple: give startups access to elite technical talent without the 
              enterprise overhead. We ship fast, communicate constantly, and actually understand 
              what it's like to build on a budget.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50+", label: "Projects Delivered" },
              { value: "30+", label: "Happy Clients" },
              { value: "5+", label: "Years Experience" },
              { value: "100%", label: "Remote Team" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-[#A1A1AA]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-[#A1A1AA] max-w-2xl mx-auto">
              The principles that guide how we work and the partnerships we build.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-[#141414] border border-[#27272A] hover:border-blue-500/30 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-[#A1A1AA] text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-[#141414]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Our <span className="text-gradient">Story</span>
          </h2>
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-[#A1A1AA]">
              After years working at top tech companies and startups, we noticed a pattern. 
              Early-stage companies needed elite technical talent, but couldn't afford big agency prices 
              or wait months for delivery.
            </p>
            <p className="text-[#A1A1AA]">
              We started DevStudio to fill that gap. A lean team of senior developers who can move as fast 
              as a startup needs, without sacrificing code quality. No bloated processes, no junior developers 
              learning on your dime—just experienced engineers who ship.
            </p>
            <p className="text-[#A1A1AA]">
              Today, we've helped 50+ startups launch products, raise funding, and scale their technical 
              infrastructure. From AI-powered apps to cloud platforms, we bring enterprise expertise with 
              startup agility.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
