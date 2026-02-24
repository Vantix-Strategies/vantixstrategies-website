import { Brain, Globe, Smartphone, Cloud, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Brain,
    title: "AI Solutions",
    description: "Harness the power of artificial intelligence to automate processes, gain insights, and create intelligent user experiences.",
    features: [
      "LLM Integration (GPT-4, Claude, etc.)",
      "Custom Machine Learning Models",
      "Intelligent Automation",
      "Natural Language Processing",
      "Computer Vision Solutions",
      "AI Consulting & Strategy",
    ],
    technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI API", "Hugging Face"],
    timeline: "2-6 weeks",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "High-performance web applications built with modern frameworks and optimized for scale.",
    features: [
      "React & Next.js Applications",
      "Progressive Web Apps (PWA)",
      "E-commerce Solutions",
      "SaaS Platform Development",
      "API Development & Integration",
      "Performance Optimization",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis"],
    timeline: "2-4 weeks",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile experiences that users love and businesses rely on.",
    features: [
      "iOS & Android Native Apps",
      "React Native Development",
      "Flutter Applications",
      "App Store Optimization",
      "Push Notifications & Real-time",
      "Mobile Backend Integration",
    ],
    technologies: ["Swift", "Kotlin", "React Native", "Flutter", "Firebase"],
    timeline: "3-6 weeks",
    gradient: "from-green-500 to-teal-500",
  },
  {
    icon: Cloud,
    title: "Cloud Services",
    description: "Scalable cloud infrastructure, DevOps automation, and reliable deployment pipelines.",
    features: [
      "AWS/Azure/GCP Architecture",
      "Infrastructure as Code",
      "CI/CD Pipeline Setup",
      "Container Orchestration",
      "Database Optimization",
      "24/7 Monitoring & Support",
    ],
    technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    timeline: "1-3 weeks",
    gradient: "from-orange-500 to-red-500",
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Services Built for <span className="text-gradient">Growth</span>
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto">
            End-to-end development solutions tailored for startups and small businesses. 
            From AI to cloud, we deliver the expertise you need.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-[#0A0A0A] border border-[#27272A] hover:border-blue-500/30 transition-all"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">{service.title}</h2>
                <p className="text-[#A1A1AA] mb-6">{service.description}</p>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-white mb-3">What We Deliver</h3>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-[#A1A1AA]">
                        <Check className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-white mb-2">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-[#1A1A1A] text-[#A1A1AA] text-xs border border-[#27272A]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-[#27272A]">
                  <div>
                    <span className="text-sm text-[#71717A]">Timeline</span>
                    <p className="text-white font-semibold">{service.timeline}</p>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Get Quote
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle Package */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Full-Stack Startup Package</h2>
              <p className="text-[#A1A1AA]">
                Everything you need to launch: Web app + Mobile app + Cloud infrastructure + AI features
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-white font-semibold mb-3">Includes</h3>
                <ul className="space-y-2">
                  {[
                    "Responsive web application",
                    "iOS & Android mobile apps",
                    "Cloud infrastructure setup",
                    "AI/ML feature integration",
                    "Database design & optimization",
                    "CI/CD pipeline",
                    "3 months support",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm text-[#A1A1AA]">
                      <Check className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-3">Timeline & Investment</h3>
                <div className="p-4 rounded-lg bg-[#0A0A0A] border border-[#27272A]">
                  <div className="flex justify-between mb-2">
                    <span className="text-[#A1A1AA]">Delivery</span>
                    <span className="text-white font-semibold">6-10 weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A1A1AA]">Starting at</span>
                    <span className="text-blue-400 font-bold">$25,000</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Discuss Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
