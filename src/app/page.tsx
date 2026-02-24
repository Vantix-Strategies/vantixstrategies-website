"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Clock, DollarSign, Users, Brain, Globe, Smartphone, Cloud } from "lucide-react";

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              AI • Web • Mobile • Cloud
            </span>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Launch Faster.
              <br />
              <span className="text-gradient">Build Smarter.</span>
            </h1>
            
            <p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto mb-10">
              From idea to production in weeks, not months. Expert development for startups 
              that can't afford to wait.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg glow-blue animate-glow-pulse"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-[#27272A] text-white hover:bg-[#1A1A1A] px-8 py-6 text-lg"
              >
                View Our Work
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "2-4", label: "Weeks Average Delivery" },
              { value: "50+", label: "Projects Shipped" },
              { value: "95%", label: "Client Satisfaction" },
              { value: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-[#A1A1AA]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Services Built for <span className="text-gradient">Growth</span>
            </h2>
            <p className="text-[#A1A1AA] max-w-2xl mx-auto">
              End-to-end development solutions tailored for startups and small businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Brain,
                title: "AI Solutions",
                description: "Machine learning models, LLM integration, and intelligent automation.",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Globe,
                title: "Web Development",
                description: "High-performance web apps with modern frameworks and cloud architecture.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Smartphone,
                title: "Mobile Apps",
                description: "Native and cross-platform mobile experiences that users love.",
                color: "from-green-500 to-teal-500",
              },
              {
                icon: Cloud,
                title: "Cloud Services",
                description: "Scalable infrastructure, DevOps, and cloud migration services.",
                color: "from-orange-500 to-red-500",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl bg-[#141414] border border-[#27272A] hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-[#A1A1AA] text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Why Startups Choose <span className="text-gradient">Us</span>
              </h2>
              <p className="text-[#A1A1AA] mb-8">
                We understand the startup mindset. Speed, flexibility, and results matter more than 
                bureaucratic processes.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: Clock,
                    title: "Rapid Development",
                    description: "2-4 week sprints. Get to market before your competition.",
                  },
                  {
                    icon: DollarSign,
                    title: "Startup-Friendly Pricing",
                    description: "Big agency quality without the enterprise overhead.",
                  },
                  {
                    icon: Users,
                    title: "Embedded Partnership",
                    description: "We work as an extension of your team, not just vendors.",
                  },
                  {
                    icon: Zap,
                    title: "Full-Stack Expertise",
                    description: "AI, web, mobile, and cloud—all under one roof.",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                      <p className="text-[#A1A1AA] text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl" />
              <div className="relative p-8 rounded-2xl bg-[#1A1A1A] border border-[#27272A]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-[#0A0A0A]">
                    <span className="text-[#A1A1AA]">Typical Agency</span>
                    <span className="text-red-400">3-6 months</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <span className="text-white font-medium">Our Approach</span>
                    <span className="text-blue-400 font-bold">2-4 weeks</span>
                  </div>
                </div>
                <p className="mt-6 text-center text-sm text-[#71717A]">
                  Average time to MVP
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our <span className="text-gradient">Process</span>
            </h2>
            <p className="text-[#A1A1AA] max-w-2xl mx-auto">
              A streamlined approach designed for speed without sacrificing quality.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Strategy", description: "Define goals, target audience, and create a roadmap for success." },
              { step: "02", title: "Design", description: "Create visually appealing and user-friendly interfaces aligned with your brand." },
              { step: "03", title: "Develop", description: "Build high-quality products using the latest technologies and best practices." },
              { step: "04", title: "Launch", description: "Deploy your solution and ensure a smooth transition to the live environment." },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-5xl font-bold text-[#27272A] mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-[#A1A1AA] text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-[#141414] to-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to <span className="text-gradient">Build?</span>
          </h2>
          <p className="text-xl text-[#A1A1AA] mb-10">
            Let's turn your idea into reality. Start with a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg glow-blue"
            >
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-[#27272A] text-white hover:bg-[#1A1A1A] px-8 py-6 text-lg"
            >
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
