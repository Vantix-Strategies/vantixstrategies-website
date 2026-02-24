import type { Metadata } from "next";
import { Brain, Globe, Smartphone, Cloud } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services | Software Development Solutions",
  description: "Expert software consulting services including AI, Web, Mobile, and Cloud development for startups and small businesses.",
};

const services = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Leverage the power of artificial intelligence to automate processes, gain insights from data, and create intelligent applications.",
    features: [
      "Custom AI model development",
      "Natural language processing",
      "Computer vision solutions",
      "Predictive analytics",
      "AI integration & consulting",
    ],
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Build modern, scalable web applications using cutting-edge technologies and best practices.",
    features: [
      "Full-stack web applications",
      "Progressive Web Apps (PWA)",
      "E-commerce solutions",
      "API development",
      "CMS & headless solutions",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Create native and cross-platform mobile applications that deliver exceptional user experiences.",
    features: [
      "iOS & Android native apps",
      "React Native & Flutter",
      "App Store deployment",
      "Mobile UI/UX design",
      "App maintenance & updates",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Architect, migrate, and optimize your infrastructure for the cloud with security and scalability in mind.",
    features: [
      "Cloud architecture design",
      "AWS, GCP, Azure services",
      "DevOps & CI/CD pipelines",
      "Serverless applications",
      "Cloud migration strategy",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Our Services
            </h1>
            <p className="text-lg text-muted-foreground">
              We offer comprehensive software development services tailored to help 
              your business grow and succeed in the digital age.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-background rounded-lg p-8 border border-border/40 shadow-sm"
              >
                <service.icon className="h-12 w-12 text-primary mb-6" />
                <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      {/*
        TODO: Add development process timeline:
        1. Discovery & Planning
        2. Design & Prototyping
        3. Development
        4. Testing & QA
        5. Deployment & Support
      */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A proven approach to delivering high-quality software solutions
            </p>
          </div>
          {/* Process steps go here */}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
            <p className="text-muted-foreground mb-8">
              Let us discuss your project requirements and create a tailored solution for your business.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Get a Free Consultation
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
