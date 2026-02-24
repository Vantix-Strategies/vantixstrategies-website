import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software Consulting | AI, Web, Mobile & Cloud Development",
  description: "We help startups and small businesses build scalable software solutions. Specializing in AI, Web, Mobile, and Cloud development.",
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Build Your Digital Future
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              We help startups and small businesses transform ideas into scalable software solutions. 
              From AI to Cloud, we deliver excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/services"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Explore Services
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-base font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {/* 
        TODO: Add services grid with:
        - AI & Machine Learning
        - Web Development  
        - Mobile Development
        - Cloud Solutions
      */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive software solutions tailored to your business needs
            </p>
          </div>
          {/* Service cards go here */}
        </div>
      </section>

      {/* About/Why Us Section */}
      {/*
        TODO: Add:
        - Company stats/metrics
        - Key differentiators
        - Client testimonials
      */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trusted by startups and small businesses worldwide
            </p>
          </div>
          {/* Stats, features, testimonials go here */}
        </div>
      </section>

      {/* Case Studies/Portfolio Section */}
      {/*
        TODO: Add:
        - Featured projects
        - Success stories
        - Client logos
      */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Work</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how we have helped businesses succeed
            </p>
          </div>
          {/* Project cards go here */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-muted-foreground mb-8">
              Let us discuss how we can help bring your ideas to life
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
