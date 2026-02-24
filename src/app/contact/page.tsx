import { Mail, MapPin, Phone, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Let's <span className="text-gradient">Talk</span>
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto">
            Ready to build something great? Tell us about your project and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
              <p className="text-[#A1A1AA] mb-8">
                Whether you have a detailed project brief or just an idea, we'd love to hear from you. 
                Let's discuss how we can help bring your vision to life.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-[#71717A]">Email</p>
                    <p className="text-white">hello@devstudio.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-[#71717A]">Phone</p>
                    <p className="text-white">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-[#71717A]">Location</p>
                    <p className="text-white">San Francisco, CA (Remote Worldwide)</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-[#71717A]">Response Time</p>
                    <p className="text-white">Within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="p-6 rounded-xl bg-[#0A0A0A] border border-[#27272A]">
                <h3 className="text-white font-semibold mb-4">Frequently Asked</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-white text-sm font-medium mb-1">What's your typical project timeline?</p>
                    <p className="text-[#A1A1AA] text-sm">Most MVPs ship in 2-4 weeks. Complex projects may take 6-10 weeks.</p>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium mb-1">Do you work with startups only?</p>
                    <p className="text-[#A1A1AA] text-sm">We specialize in startups and small businesses, but work with any company needing fast, quality development.</p>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium mb-1">What's your pricing model?</p>
                    <p className="text-[#A1A1AA] text-sm">We offer fixed-price projects based on scope. Typical projects range from $10K-$50K.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-[#27272A]">
              <h2 className="text-2xl font-bold text-white mb-6">Start Your Project</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Name</label>
                    <Input
                      type="text"
                      placeholder="Your name"
                      className="bg-[#141414] border-[#27272A] text-white placeholder:text-[#71717A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="you@company.com"
                      className="bg-[#141414] border-[#27272A] text-white placeholder:text-[#71717A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Company</label>
                  <Input
                    type="text"
                    placeholder="Your company name"
                    className="bg-[#141414] border-[#27272A] text-white placeholder:text-[#71717A]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Project Type</label>
                  <select className="w-full h-10 px-3 rounded-md bg-[#141414] border border-[#27272A] text-white">
                    <option value="">Select a service...</option>
                    <option value="ai">AI Solutions</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile Apps</option>
                    <option value="cloud">Cloud Services</option>
                    <option value="fullstack">Full-Stack Package</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Budget Range</label>
                  <select className="w-full h-10 px-3 rounded-md bg-[#141414] border border-[#27272A] text-white">
                    <option value="">Select budget...</option>
                    <option value="10-25k">$10,000 - $25,000</option>
                    <option value="25-50k">$25,000 - $50,000</option>
                    <option value="50-100k">$50,000 - $100,000</option>
                    <option value="100k+">$100,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Project Details</label>
                  <Textarea
                    placeholder="Tell us about your project, goals, and timeline..."
                    rows={5}
                    className="bg-[#141414] border-[#27272A] text-white placeholder:text-[#71717A]"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
                >
                  Send Message
                  <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
