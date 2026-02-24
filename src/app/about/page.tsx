import type { Metadata } from "next";
import { Award, Users, Rocket, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Software Consulting Company",
  description: "Learn about our mission to help startups and small businesses succeed through innovative software solutions.",
};

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description: "We focus on delivering measurable outcomes that drive business growth.",
  },
  {
    icon: Users,
    title: "Client Partnership",
    description: "We work closely with you as partners, not just service providers.",
  },
  {
    icon: Rocket,
    title: "Innovation First",
    description: "We stay ahead of technology trends to bring you cutting-edge solutions.",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description: "We maintain the highest standards in code quality and user experience.",
  },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "5+", label: "Years Experience" },
  { value: "100%", label: "Client Satisfaction" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              About Us
            </h1>
            <p className="text-lg text-muted-foreground">
              We are a team of passionate technologists dedicated to helping 
              businesses transform their ideas into reality.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                To empower startups and small businesses with world-class software solutions 
                that drive growth, efficiency, and innovation.
              </p>
              <p className="text-muted-foreground mb-4">
                We believe that every business deserves access to cutting-edge technology, 
                regardless of size. Our mission is to bridge the gap between ambitious ideas 
                and technical execution.
              </p>
              <p className="text-muted-foreground">
                By combining technical expertise with a deep understanding of business needs, 
                we deliver solutions that not only work beautifully but also drive real results.
              </p>
            </div>
            <div className="bg-background rounded-lg p-8 border border-border/40">
              <h3 className="text-xl font-semibold mb-6">By the Numbers</h3>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="text-center p-6 rounded-lg bg-muted/50"
              >
                <value.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/*
        TODO: Add team member cards with:
        - Photos
        - Names
        - Roles
        - Brief bios
      */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The talented people behind our success
            </p>
          </div>
          {/* Team member cards go here */}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Want to Work With Us?</h2>
            <p className="text-muted-foreground mb-8">
              We are always looking for new challenges and exciting projects.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Start a Conversation
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
